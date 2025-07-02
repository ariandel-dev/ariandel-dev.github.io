import Link from 'next/link'
import { ThemeCustomizer } from '@/components/theme-customizer'
import { TextSizeCustomizer } from '@/components/text-size-customizer'
import { TextSizeProvider } from '@/contexts/text-size-context'

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <TextSizeProvider>
      <div className="min-h-screen bg-background">
        <nav className="bg-card border-b border-border shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/blog" className="text-xl font-semibold text-foreground hover:text-primary transition-colors">
                블로그
              </Link>
              <div className="flex items-center gap-4">
                {/* <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  홈으로
                </Link> */}
                {/* <TextSizeCustomizer /> */}
                <ThemeCustomizer />
              </div>
            </div>
          </div>
        </nav>
        
        <main className="bg-background">
          {children}
        </main>
      </div>
    </TextSizeProvider>
  )
} 