import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ViaCardProps {
  title: string
  description?: string
  href: string
  image: string
}

export function ViaCard({ title, description, href, image }: ViaCardProps) {
  return (
    <Link 
      href={href}
      className="group relative block overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white text-lg md:text-xl font-bold drop-shadow-lg">
            {title}
          </h3>
          {description && (
            <p className="text-white/80 text-sm mt-1 line-clamp-2">
              {description}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
