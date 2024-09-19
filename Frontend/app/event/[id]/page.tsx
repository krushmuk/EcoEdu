/**
 * v0 by Vercel.
 * @see https://v0.dev/t/aUGXxDOTOiX
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
'use client'
import { usePathname } from 'next/navigation'
import { useState } from 'react';
import { useEffect } from 'react';
import {EventPage} from '@/components/event-page'
import {Logo} from '@/components/logo'
import Link from "next/link"
import {url} from '@/back_config'
import {getEvent} from '@/app/Filters'


export default function Component() {
  const id = usePathname().split('/')[2]
  const [data, setData] = useState([])
  useEffect(() => {
    getEvent(id).then(resp => {
      setData(resp)
    })
  }, [id]);
  return (
    <div>{EventPage(data)}</div>
  )
}