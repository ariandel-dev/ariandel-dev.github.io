'use client'

import { isServer } from '@/lib/utils'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type TextSize = 'sm' | 'md' | 'lg' | 'xl'

interface TextSizeContextType {
  currentSize: TextSize | undefined
  setTextSize: (size: TextSize) => void
  increaseSize: () => void
  decreaseSize: () => void
}

const TextSizeContext = createContext<TextSizeContextType | undefined>(undefined)

const textSizeOrder: TextSize[] = ['sm', 'md', 'lg', 'xl']
const textSizeStorageKey = 'text-size'
const defaultTextSize = 'md'

const valueMap: Record<TextSize, string> = {
  sm: "prose-sm",
  md: "prose-md",
  lg: "prose-lg",
  xl: "prose-xl",
}

interface TextSizeProviderProps {
  children: ReactNode,
  querySelector: string,
  nonce?: string
}

export function TextSizeProvider({ children, querySelector, nonce }: TextSizeProviderProps) {
  const [currentSize, setCurrentSize] = useState<TextSize | undefined>(getTextSize(textSizeStorageKey, defaultTextSize))

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
    if (!currentSize) return
    const currentIndex = textSizeOrder.indexOf(currentSize)
    if (currentIndex < textSizeOrder.length - 1) {
      const newSize = textSizeOrder[currentIndex + 1]
      setTextSize(newSize)
    }
  }

  const decreaseSize = () => {
    if (!currentSize) return
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
      <TextSizeScript
        storageKey={textSizeStorageKey}
        defaultTextSize={defaultTextSize}
        querySelector={querySelector}
        sizes={textSizeOrder}
        valueMap={valueMap}
        nonce={typeof window === 'undefined' && nonce ? nonce : ''}
      />
    </TextSizeContext.Provider>
  )
}

interface TextSizeScriptProps {
  storageKey: string,
  defaultTextSize: TextSize
  querySelector: string,
  sizes: TextSize[],
  valueMap: Record<TextSize, string>,
  nonce?: string
}

const TextSizeScript = ({
  storageKey,
  defaultTextSize,
  querySelector,
  sizes,
  valueMap,
  nonce,
}: TextSizeScriptProps) => {
  const scriptArgs = JSON.stringify([
    storageKey,
    defaultTextSize,
    querySelector,
    sizes,
    valueMap
  ]).slice(1, -1)
  return (
    <script
      suppressHydrationWarning
      nonce={typeof window === 'undefined' && nonce ? nonce : ''}
      dangerouslySetInnerHTML={{ __html: `(${script.toString()})(${scriptArgs})` }}
    />
  )
}

const script = (storageKey: string, defaultTextSize: TextSize, querySelector: string, sizes: TextSize[], valueMap: Record<TextSize, string>) => {
  const el = document.querySelector(querySelector)
  if (el) {
    const size = localStorage.getItem(storageKey) as TextSize

    const classes = sizes.map(size => valueMap[size])
    el.classList.remove(...classes)
    el.classList.add(size ? valueMap[size] : valueMap[defaultTextSize])
  }
}

const getTextSize = (key: string, fallback: TextSize) => {
  if (isServer) return undefined

  let textSize: TextSize | undefined;

  try {
    textSize = localStorage.getItem(key) as TextSize
  } catch (e) {
    // Unsupported
  }

  return textSize || fallback
}

export function useTextSize() {
  const context = useContext(TextSizeContext)
  if (context === undefined) {
    throw new Error('useTextSize must be used within a TextSizeProvider')
  }
  return context
} 