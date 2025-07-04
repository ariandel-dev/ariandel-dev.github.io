'use client'

import React from 'react'
import { cva } from 'class-variance-authority'
import { TextSize, useTextSize } from '@/contexts/text-size-context'

interface BlogPostWrapperProps {
  children: React.ReactNode
}

const textSizeVariants = cva("prose dark:prose-invert max-w-none blog-post-wrapper", {
  variants: {
    size: {
      sm: "prose-sm",
      md: "prose-md",
      lg: "prose-lg",
      xl: "prose-xl",
    },
  },
})

export function BlogPostWrapper({ children }: BlogPostWrapperProps) {
  const { currentSize } = useTextSize()

  return (
    <div className={textSizeVariants({ size: currentSize })} suppressHydrationWarning >
      {children}
    </div>
  )
}