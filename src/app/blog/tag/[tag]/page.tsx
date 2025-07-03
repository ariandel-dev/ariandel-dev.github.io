import Link from 'next/link'
import { BlogPost, getAllBlogPosts, getLabels, getPostsByLabel } from '@/lib/blog-utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BlogFilters } from '@/components/blog/blog-filters'
import { loadSearchParams } from '@/lib/search-params'

interface BlogPageProps {
  params: {
    tag: string
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  // 서버 사이드에서 검색 파라미터 파싱
  const { tag: selectedLabel } = params
  
  const allPosts = await getAllBlogPosts()
  const labels = getLabels(allPosts)
  
  // 선택된 라벨이 있으면 필터링
  const posts = selectedLabel ? getPostsByLabel(allPosts, selectedLabel) : allPosts
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">글 목록</h1>
        <p className="text-muted-foreground">
          {selectedLabel ? `${selectedLabel} 라벨의 포스트` : '모든 포스트'} - 총 {posts.length}개
        </p>
      </div>
      
      {/* 클라이언트 사이드 필터 컴포넌트 */}
      <BlogFilters 
        labels={labels} 
        selectedLabel={selectedLabel} 
        className="mb-6" 
      />
      
      <div className="space-y-4">
        {posts.map((post) => <BlogCard key={post.slug} post={post} />)}
      </div>
      
      {posts.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <p className="text-muted-foreground">
              {selectedLabel ? `${selectedLabel} 라벨의 포스트가 없습니다.` : '아직 블로그 포스트가 없습니다.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

const BlogCard = ({ post }: { post: BlogPost }) => {
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