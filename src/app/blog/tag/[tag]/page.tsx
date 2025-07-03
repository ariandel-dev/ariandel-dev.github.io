import { getAllBlogPosts, getLabels, getPostsByLabel } from '@/lib/blog-utils'
import { Card, CardContent } from '@/components/ui/card'
import { BlogFilters } from '@/components/blog/blog-filters'
import { BlogCard } from '@/components/blog/blog-card'

interface BlogPageProps {
  params: Promise<{ tag: string }>
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  const labels = getLabels(posts)
  return labels.map((label) => ({
    tag: label, // slug를 배열로 분할
  }))
}


export default async function BlogPage({ params }: BlogPageProps) {
  // 서버 사이드에서 검색 파라미터 파싱
  const { tag: selectedLabel } = await params
  
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
