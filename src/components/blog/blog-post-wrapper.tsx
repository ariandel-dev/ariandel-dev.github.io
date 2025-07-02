'use client'

import React from 'react'
import { cva } from 'class-variance-authority'
import { useTextSize } from '@/contexts/text-size-context'

interface BlogPostWrapperProps {
  children: React.ReactNode
}

const textSizeVariants = cva("prose max-w-none", {
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
    <div className={textSizeVariants({ size: currentSize })}>
      {children}
    </div>
  )
} 