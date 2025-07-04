import { BlogPostWrapper } from '@/components/blog/blog-post-wrapper'

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params
  const slugString = slug.join('/')
  const { default: Post } = await import(`@/content/${slugString}.mdx`)
 
  return (
    <BlogPostWrapper>
      <Post />
    </BlogPostWrapper>
  )
}

export const dynamicParams = false