import { Footer, Layout, Navbar, ThemeSwitch } from 'nextra-theme-blog'
import { Banner, Head, Search } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-blog/style.css'
import Link from 'next/link'

import { NavbarLink } from './components/NavbarLink'
 
export const metadata = {
  title: 'Ariandel Blog'
}
 
export default async function RootLayout({ children }) {
  const banner = (
    <Banner storageKey="4.0-release">
      🎉 Nextra 4.0 is released.{' '}
      <a href="#" className="x:text-primary-600">
        Read more →
      </a>
    </Banner>
  )
 
  return (
    <html lang="en" suppressHydrationWarning>
      <Head backgroundColor={{ dark: '#1a1918', light: '#fefce8' }} />
      <body>
        <Layout>
          <Navbar pageMap={await getPageMap()}>
            <NavbarLink key="/" href="/">About</NavbarLink>
            <NavbarLink key="/posts" href="/posts">Posts</NavbarLink>
            <Search placeholder='포스트 검색...' />
            <ThemeSwitch />
          </Navbar>
 
          {children}
 
          <Footer>
            <abbr
              title="This site and all its content are licensed under a Creative Commons Attribution-NonCommercial 4.0 International License."
              style={{ cursor: 'help' }}
            >
              CC BY-NC 4.0
            </abbr>{' '}
            {new Date().getFullYear()} © Ariandel.
            <a href="/rss.xml" style={{ float: 'right' }}>
              RSS
            </a>
          </Footer>
        </Layout>
      </body>
    </html>
  )
}