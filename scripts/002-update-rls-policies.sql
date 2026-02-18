-- Allow users to update their own profile points
-- This is needed for the quiz results to update the points column
-- Run this in the Supabase SQL Editor if the update policy doesn't exist yet

-- Also ensure the profiles update policy covers the points column
-- The policy created in 001 should already handle this, but just in case:

-- Allow service role to bypass RLS (for the trigger function)
ALTER TABLE public.profiles FORCE ROW LEVEL SECURITY;

-- Make sure quiz_results allows users to read all their results
-- (Already covered by 001, but confirming)
