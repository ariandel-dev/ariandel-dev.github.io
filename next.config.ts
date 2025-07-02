import createMDX from '@next/mdx'
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
  
  // GitHub Pages 배포를 위한 설정
  output: 'export' as const,
  
  // 루트 경로를 /blog로 리다이렉트
  async redirects() {
    return [
      {
        source: '/',
        destination: '/blog',
        permanent: true,
      },
    ]
  },

  images: {
    domains: [
      "api.microlink.io", // Microlink Image Preview
    ],
    unoptimized: true, // GitHub Pages에서는 이미지 최적화를 비활성화
  },
}

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [
      // @ts-ignore
      ['remark-gfm', { strict: true, throwOnError: true }]
    ],
    rehypePlugins: [],
  },
})
 
// Merge MDX config with Next.js config
export default withMDX(nextConfig)