import pg from "pg";

const connectionString = process.env.POSTGRES_URL;

if (!connectionString) {
  console.error("POSTGRES_URL is not set");
  process.exit(1);
}

const client = new pg.Client({ connectionString });

async function main() {
  await client.connect();
  console.log("Connected to database");

  // Create profiles table
  await client.query(`
    CREATE TABLE IF NOT EXISTS public.profiles (
      id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      points INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);
  console.log("Created profiles table");

  // Create quiz_results table
  await client.query(`
    CREATE TABLE IF NOT EXISTS public.quiz_results (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
      score INTEGER NOT NULL,
      total_questions INTEGER NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);
  console.log("Created quiz_results table");

  // Create index
  await client.query(`
    CREATE INDEX IF NOT EXISTS idx_quiz_results_user_id ON public.quiz_results(user_id);
  `);
  console.log("Created index");

  // Enable RLS
  await client.query(`ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;`);
  await client.query(`ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;`);
  console.log("Enabled RLS");

  // RLS Policies for profiles
  await client.query(`
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can view their own profile') THEN
        CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
      END IF;
    END $$;
  `);
  await client.query(`
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can update their own profile') THEN
        CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
      END IF;
    END $$;
  `);
  await client.query(`
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can insert their own profile') THEN
        CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
      END IF;
    END $$;
  `);
  console.log("Created profiles RLS policies");

  // RLS Policies for quiz_results
  await client.query(`
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'quiz_results' AND policyname = 'Users can view their own quiz results') THEN
        CREATE POLICY "Users can view their own quiz results" ON public.quiz_results FOR SELECT USING (auth.uid() = user_id);
      END IF;
    END $$;
  `);
  await client.query(`
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'quiz_results' AND policyname = 'Users can insert their own quiz results') THEN
        CREATE POLICY "Users can insert their own quiz results" ON public.quiz_results FOR INSERT WITH CHECK (auth.uid() = user_id);
      END IF;
    END $$;
  `);
  console.log("Created quiz_results RLS policies");

  // Function & Trigger for auto-creating profile on signup
  await client.query(`
    CREATE OR REPLACE FUNCTION public.handle_new_user()
    RETURNS TRIGGER AS $$
    BEGIN
      INSERT INTO public.profiles (id, name, email, points)
      VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'name', ''),
        NEW.email,
        0
      );
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;
  `);
  await client.query(`DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;`);
  await client.query(`
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
  `);
  console.log("Created trigger for auto profile creation");

  console.log("All tables and policies created successfully!");
  await client.end();
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
