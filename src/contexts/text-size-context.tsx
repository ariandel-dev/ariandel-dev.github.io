'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type TextSize = 'sm' | 'md' | 'lg' | 'xl'

interface TextSizeContextType {
  currentSize: TextSize
  setTextSize: (size: TextSize) => void
  increaseSize: () => void
  decreaseSize: () => void
}

const TextSizeContext = createContext<TextSizeContextType | undefined>(undefined)

const textSizeOrder: TextSize[] = ['sm', 'md', 'lg', 'xl']

interface TextSizeProviderProps {
  children: ReactNode
}

export function TextSizeProvider({ children }: TextSizeProviderProps) {
  const [currentSize, setCurrentSize] = useState<TextSize>('md')

  useEffect(() => {
    // 저장된 텍스트 크기 불러오기
    const savedSize = localStorage.getItem('text-size') as TextSize
    if (savedSize && textSizeOrder.includes(savedSize)) {
      setCurrentSize(savedSize)
    }
  }, [])

  const setTextSize = (size: TextSize) => {
    setCurrentSize(size)
    localStorage.setItem('text-size', size)
  }

  const increaseSize = () => {
    const currentIndex = textSizeOrder.indexOf(currentSize)
    if (currentIndex < textSizeOrder.length - 1) {
      const newSize = textSizeOrder[currentIndex + 1]
      setTextSize(newSize)
    }
  }

  const decreaseSize = () => {
    const currentIndex = textSizeOrder.indexOf(currentSize)
    if (currentIndex > 0) {
      const newSize = textSizeOrder[currentIndex - 1]
      setTextSize(newSize)
    }
  }

  return (
    <TextSizeContext.Provider value={{
      currentSize,
      setTextSize,
      increaseSize,
      decreaseSize
    }}>
      {children}
    </TextSizeContext.Provider>
  )
}

export function useTextSize() {
  const context = useContext(TextSizeContext)
  if (context === undefined) {
    throw new Error('useTextSize must be used within a TextSizeProvider')
  }
  return context
} 