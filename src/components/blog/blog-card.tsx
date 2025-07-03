import Link from 'next/link'
import { BlogPost, getAllBlogPosts, getLabels, getPostsByLabel } from '@/lib/blog-utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const BlogCard = ({ post }: { post: BlogPost }) => {
  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <Card key={post.slug} className="hover:shadow-md transition-shadow group">
        <CardHeader className="pb-0">
          <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {post.metadata.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {post.metadata.description && (
            <p className="text-muted-foreground text-sm mb-3">
              {post.metadata.description}
            </p>
          )}
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span>
              {new Date(post.metadata.date).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
          {post.labels.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {post.labels.map((label) => (
                <Badge key={label} variant="outline" className="text-xs">
                  {label}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}