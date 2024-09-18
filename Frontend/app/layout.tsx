// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import './globals.css'
import {Header} from '@/components/news-main'
import {Footer} from '@/components/news-main'
import Head from 'next/head'

const fontHeading = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
})

const fontBody = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

export default function Layout({ children }) {
  return (
    <html lang="ru">
      <body  className={ cn( 'antialiased',fontHeading.variable, fontBody.variable) }>
        <header><Header/></header>
        {children}
        <footer className='bg-[#f5f5f5] py-8 px-4 md:px-8'><Footer/></footer>
      </body>
    </html>
  )
}