'use client'

import { useQueryState } from 'nuqs'
import { parseAsString } from 'nuqs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BlogFiltersProps {
  labels: string[]
  selectedLabel?: string
  className?: string
}

export function BlogFilters({ labels, selectedLabel, className }: BlogFiltersProps) {
  const [label, setLabel] = useQueryState('label', parseAsString.withDefault('').withOptions({ history: 'push', shallow: false }))

  const handleLabelClick = (clickedLabel: string) => {
    if (label === clickedLabel) {
      // 같은 라벨을 클릭하면 필터 제거
      setLabel('')
    } else {
      // 다른 라벨을 클릭하면 해당 라벨로 필터
      setLabel(clickedLabel)
    }
  }

  const clearFilter = () => {
    setLabel('')
  }

  return (
    <div className={cn('space-y-4', className)}>      
      {/* 라벨 목록 */}
      <div className="flex flex-wrap gap-2">
        {labels.map((labelName) => (
          <Badge
            key={labelName}
            variant={selectedLabel === labelName ? "default" : "outline"}
            className={cn(
              "cursor-pointer transition-colors hover:bg-primary hover:text-primary-foreground",
              selectedLabel === labelName && "bg-primary text-primary-foreground"
            )}
            onClick={() => handleLabelClick(labelName)}
          >
            {labelName}
          </Badge>
        ))}
      </div>
    </div>
  )
} 