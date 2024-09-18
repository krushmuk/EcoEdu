import { Card, CardContent } from "@/components/ui/card"
import filters from '@/back_config'
import Link from "next/link"

export function EventCard(title: string, discription: string, categories: Array<string>) {
    // if (discription.length >= 150) {
    //     discription = discription.slice(0,150).trim()
    //     while (discription[discription.length] in ['.', ',', ':', ';', '-', '']){
    //         discription = discription.slice(0, discription.length-1)
    //     }
    //     discription = discription + '...'
    // }
    const catList = categories.map(product =>
          <div className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-2, mr-2">
              {product}
            </div>
      );
    return (
    <Card>
        <img
          src="/placeholder.svg"
          width={450}
          height={250}
          alt="Article Image"
          className="rounded-t-lg object-cover"
          style={{ aspectRatio: "400/250", objectFit: "cover" }}
        />
        <CardContent className="p-4">
          {catList}
          <h3 className="text-xl font-bold mb-2">
            {title}
          </h3>
          <p className="text-gray-600 mb-4, break-words">
            {discription}
          </p>
          <Link
            href=""
            className="inline-flex items-center gap-2 text-green-500 hover:text-green-600 transition-colors"
            prefetch={false}
          >
            Подробнее
            <ArrowRightIcon className="h-5 w-5" />
          </Link>
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
