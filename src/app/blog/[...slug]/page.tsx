import { Metadata } from 'next'
import Link from 'next/link'
import { getAllBlogPosts } from '@/lib/blog-utils'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { BlogPostWrapper } from '@/components/blog/blog-post-wrapper'

// 동적 slug 목록 생성 (재귀적 폴더 탐색)
export async function generateStaticParams() {
  const posts = await getAllBlogPosts();

  return posts.map((post) => ({
    slug: post.slug.split('/'), // slug를 배열로 분할
  }))
}

// 동적 메타데이터 생성
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata> {
  const { slug } = await params
  const slugString = slug.join('/') // 배열을 문자열로 결합
  const { metadata } = await import(`@/content/${slugString}.mdx`)

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      type: 'article',
      publishedTime: metadata.date,
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params
  const slugString = slug.join('/') // 배열을 문자열로 결합
  const { default: Post, metadata } = await import(`@/content/${slugString}.mdx`)
  
  // 카테고리와 라벨 정보 가져오기
  const posts = await getAllBlogPosts()
  const currentPost = posts.find(post => post.slug === slugString)
  const labels = currentPost?.labels || []
 
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-6">
        <div className="flex items-center gap-2 mb-4">
        </div>
        
        <h1 className="text-3xl font-bold text-foreground mb-4">
          {metadata.title}
        </h1>
        
        <p className="text-muted-foreground text-lg mb-4">
          {metadata.description}
        </p>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <time dateTime={metadata.date}>
            {new Date(metadata.date).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </div>

        <div className="flex flex-wrap gap-1">
          {labels.map((label) => (
            <Link key={label} href={`/blog?label=${encodeURIComponent(label)}`}>
              <Badge 
                variant="outline" 
                className="text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {label}
              </Badge>
            </Link>
          ))}
        </div>
      </header>
      
      <Separator className="mb-8" />
      
      <BlogPostWrapper>
        <Post />
      </BlogPostWrapper>
    </article>
  )
}

export const dynamicParams = false