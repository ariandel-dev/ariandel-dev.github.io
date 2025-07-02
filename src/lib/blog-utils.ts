import fs from 'fs'
import path from 'path'

export interface BlogPost {
  slug: string
  labels: string[]
  metadata: {
    title: string
    description: string
    date: string
  }
}

export interface LabelGroup {
  name: string
  posts: BlogPost[]
}

// 재귀적으로 MDX 파일들을 찾는 함수
function findMdxFiles(dir: string, baseDir: string = dir): BlogPost[] {
  const posts: BlogPost[] = []
  
  try {
    const items = fs.readdirSync(dir)
    
    for (const item of items) {
      const fullPath = path.join(dir, item)
      const stat = fs.statSync(fullPath)
      
      if (stat.isDirectory()) {
        // 재귀적으로 하위 폴더 탐색
        const subPosts = findMdxFiles(fullPath, baseDir)
        posts.push(...subPosts)
      } else if (item.endsWith('.mdx')) {
        // MDX 파일인 경우
        const relativePath = path.relative(baseDir, fullPath)
        const slug = relativePath.replace(/\.mdx$/, '')
        const dirPath = path.dirname(relativePath)
        
        // 라벨은 모든 폴더 경로를 분리
        const labels = dirPath ? dirPath.split(path.sep) : []
        
        try {
          const { metadata = {} } = require(`@/content/${slug}.mdx`)

          if (!metadata?.title) {
            metadata.title = slug.split('/').pop()?.replace('.mdx', '')
          }

          if (!metadata?.date) {
            // 파일 생성일자를 가져오기
            const fileStats = fs.statSync(fullPath)
            const fileCreatedDate = fileStats.birthtime.toISOString().split('T')[0] // YYYY-MM-DD 형식
            
            // metadata.date가 없으면 파일 생성일자 사용
            metadata.date = fileCreatedDate
          }

          posts.push({
            slug,
            labels,
            metadata
          })
        } catch (error) {
          console.warn(`Failed to load metadata for ${slug}:`, error)
        }
      }
    }
  } catch (error) {
    console.warn(`Failed to read directory ${dir}:`, error)
  }
  
  return posts
}

// 모든 블로그 포스트를 가져오는 함수
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const contentDir = path.join(process.cwd(), 'src/content')
  const posts = findMdxFiles(contentDir)
  
  // 날짜순으로 정렬 (최신순)
  return posts.sort((a, b) => {
    const dateA = new Date(a.metadata.date || '1970-01-01')
    const dateB = new Date(b.metadata.date || '1970-01-01')
    return dateB.getTime() - dateA.getTime()
  })
}

// 라벨별로 포스트를 그룹화하는 함수
export function groupPostsByLabel(posts: BlogPost[]): LabelGroup[] {
  const labelMap = new Map<string, BlogPost[]>()
  
  posts.forEach(post => {
    // 각 포스트의 모든 라벨에 대해 그룹화
    if (post.labels.length === 0) {
      // 라벨이 없는 경우 "기타"로 분류
      if (!labelMap.has('기타')) {
        labelMap.set('기타', [])
      }
      labelMap.get('기타')!.push(post)
    } else {
      post.labels.forEach(label => {
        if (!labelMap.has(label)) {
          labelMap.set(label, [])
        }
        labelMap.get(label)!.push(post)
      })
    }
  })
  
  // 라벨별로 정렬하고 각 라벨 내에서 날짜순 정렬
  return Array.from(labelMap.entries())
    .map(([name, posts]) => ({
      name,
      posts: posts.sort((a, b) => {
        const dateA = new Date(a.metadata.date || '1970-01-01')
        const dateB = new Date(b.metadata.date || '1970-01-01')
        return dateB.getTime() - dateA.getTime()
      })
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

// 특정 라벨의 포스트만 가져오는 함수
export function getPostsByLabel(posts: BlogPost[], label: string): BlogPost[] {
  return posts.filter(post => post.labels.includes(label))
}

// 라벨 목록을 가져오는 함수
export function getLabels(posts: BlogPost[]): string[] {
  const labels = new Set<string>()
  posts.forEach(post => {
    post.labels.forEach(label => labels.add(label))
  })
  return Array.from(labels).sort()
} 