import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface BlogFiltersProps {
  labels: string[]
  selectedLabel?: string
  className?: string
}

export function BlogFilters({ labels, selectedLabel, className }: BlogFiltersProps) {
  return (
    <div className={cn('space-y-4', className)}>      
      {/* 라벨 목록 */}
      <div className="flex flex-wrap gap-2">
        {labels.map((labelName) => (
          <Link href={`/blog/tag/${labelName}`} key={labelName}>
            <Badge
              key={labelName}
              variant={selectedLabel === labelName ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-colors hover:bg-primary hover:text-primary-foreground",
                selectedLabel === labelName && "bg-primary text-primary-foreground"
              )}
            >
              {labelName}
            </Badge>
          </Link>
        ))}
      </div>
    </div>
  )
} 