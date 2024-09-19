import { Card, CardContent } from "@/components/ui/card"
import { beautify } from '@/back_config'
import Link from "next/link"
import internal from "stream";
import { useRouter } from 'next/navigation'

export function EventCard(id:number, title: string, description: string, categories: Array<string>, picture) {
    console.log(id) 
    const router = useRouter()
    if (description.length >= 140) {
        description = description.slice(0,140).trim()
        while (description[description.length] in ['.', ',', ':', ';', '-', '']){
            description = description.slice(0, description.length-1)
        }
        description = description + '...'
    }
    const catList = categories.map(cat =>
          <div className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-2, mr-2">
              {beautify[cat]}
            </div>
      );
    return (
    <Card>
        <img
          src={"/"+picture}
          width={650}
          height={250}
          alt="Article Image"
          className="rounded-t-lg object-cover object-top"
          style={{ aspectRatio: "400/250", objectFit: "cover" }}
        />
        <CardContent className="p-4">
          {catList}
          <h3 className="text-xl font-bold mb-2">
            {title}
          </h3>
          <p className="text-gray-600 mb-4, break-words">
            {description}
          </p>
          <div onClick={() => router.push('/event/'+id)}>
            <Link
              href="#"
              className="inline-flex items-center gap-2 text-green-500 hover:text-green-600 transition-colors"
              prefetch={false}
            >
              Подробнее
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
            </div>
        </CardContent>
    </Card>
    )
}

function ArrowRightIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    )
  }
