/**
 * v0 by Vercel.
 * @see https://v0.dev/t/aUGXxDOTOiX
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
'use client'
import { useRouter } from 'next/navigation'
import {EventPage} from '@/components/event-page'
import {Logo} from '@/components/logo'
import Link from "next/link"
import {url} from '@/back_config'


export default function Component() {
  const router = useRouter()
  
  return (
    <EventPage/>
  )
}