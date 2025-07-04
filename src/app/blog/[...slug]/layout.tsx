import { Metadata } from 'next'
import { getAllBlogPosts } from '@/lib/blog-utils'
import { notFound } from 'next/navigation'
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

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
  const posts = await getAllBlogPosts()
  const currentPost = posts.find(post => post.slug === slugString)

  if (!currentPost) {
    return notFound()
  }

  const metadata = currentPost.metadata
  const labels = currentPost.labels

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      type: 'article',
      publishedTime: metadata.date,
      tags: labels.join(','),
    },
  }
}

export default async function MdxLayout({ 
  children,
  params 
}: { 
  children: React.ReactNode
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params
  const slugString = slug.join('/')
  
  // 포스트 데이터 가져오기
  const posts = await getAllBlogPosts()
  const currentPost = posts.find(post => post.slug === slugString)

  if (!currentPost) {
    return notFound()
  }

  const metadata = currentPost.metadata
  const labels = currentPost.labels || []

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
            <Link key={label} href={`/blog/tag/${label}`}>
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
      
      {children}
    </article>
  )
}