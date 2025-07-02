'use client'

import { useState } from 'react'
import { Type, Minus, Plus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useTextSize } from '@/contexts/text-size-context'

interface TextSizePreset {
  name: string
  size: 'sm' | 'md' | 'lg' | 'xl'
  description: string
}

const textSizePresets: TextSizePreset[] = [
  {
    name: '작게',
    size: 'sm',
    description: '14px'
  },
  {
    name: '보통',
    size: 'md',
    description: '16px'
  },
  {
    name: '크게',
    size: 'lg',
    description: '18px'
  },
  {
    name: '매우 크게',
    size: 'xl',
    description: '20px'
  }
]

export function TextSizeCustomizer() {
  const [open, setOpen] = useState(false)
  const { currentSize, setTextSize, increaseSize, decreaseSize } = useTextSize()

  const getCurrentPreset = () => {
    return textSizePresets.find(p => p.size === currentSize) || textSizePresets[1]
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="p-2 rounded-md bg-muted hover:bg-accent transition-colors"
          title="텍스트 크기 설정"
        >
          <Type className="w-4 h-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>텍스트 크기 설정</DialogTitle>
        </DialogHeader>
        
        {/* 현재 크기 표시 및 빠른 조절 */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">현재 크기</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={decreaseSize}
                disabled={currentSize === 'sm'}
              >
                <Minus className="w-3 h-3" />
              </Button>
              <span className="text-sm font-medium min-w-[60px] text-center">
                {getCurrentPreset().name}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={increaseSize}
                disabled={currentSize === 'xl'}
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {getCurrentPreset().description}
          </div>
        </div>

        {/* 프리셋 크기 */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">크기 프리셋</h4>
          <div className="grid grid-cols-2 gap-2">
            {textSizePresets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => {
                  setTextSize(preset.size)
                  setOpen(false)
                }}
                className={`p-3 text-sm border border-border rounded-md hover:bg-accent transition-colors text-left ${
                  currentSize === preset.size ? 'bg-accent border-primary' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded-full border border-border flex items-center justify-center text-xs"
                    style={{ 
                      fontSize: preset.size === 'sm' ? '0.875rem' : 
                              preset.size === 'md' ? '1rem' : 
                              preset.size === 'lg' ? '1.125rem' : '1.25rem'
                    }}
                  >
                    A
                  </div>
                  <div>
                    <div className="font-medium">{preset.name}</div>
                    <div className="text-xs text-muted-foreground">{preset.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 