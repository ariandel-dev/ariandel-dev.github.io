"use client"

import * as React from "react"
import { ZoomIn } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface ImageViewerProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  showZoomIcon?: boolean
}

export function ImageViewer({
  src,
  alt,
  className,
  width,
  height,
  showZoomIcon = true,
}: ImageViewerProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="relative group cursor-pointer inline-block">
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={cn(
              "transition-transform duration-200 my-0!",
              className
            )}
          />
          {showZoomIcon && (
            <span className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
              <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </span>
          )}
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[calc(100%-2rem)] md:max-w-[90vw] 2xl:max-w-[80vw] p-0 bg-transparent border-none shadow-none" showCloseButton={false}>
        <DialogTitle className="sr-only">Image Viewer</DialogTitle>
        <span className="relative w-full h-full flex items-center justify-center">
          <img
            src={src}
            alt={alt}
            className="object-contain rounded-lg"
          />
        </span>
      </DialogContent>
    </Dialog>
  )
}

// MDX에서 사용할 수 있는 간단한 버전
export function MDXImage({ src, alt, ...props }: ImageViewerProps) {
  return <ImageViewer src={src} alt={alt} className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200" {...props} />;
}
