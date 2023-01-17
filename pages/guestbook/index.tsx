import React from 'react'
import Body from '../../components/Body'
import { createClient } from '@supabase/supabase-js'
export async function getStaticProps() {
    const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || '',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    )

    const { data } = await supabaseAdmin.from('guestbook-data').select('*').order('user')
    return {
        props: {
            data: data,
        },
    }
}

function cn(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

// type Image = {
//   id: number
//   href: string
//   imageSrc: string
//   name: string
//   username: string
// }

// export default function Gallery({ images }: { images: Image[] }) {
//   return (
//     <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
//       <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
//         {images.map((image) => (
//           <BlurImage key={image.id} image={image} />
//         ))}
//       </div>
//     </div>
//   )
// }

const index = ({ data:data }) => {
    return (
        <Body title="Guestbook">
            <div className="mb-6">
                <h1>
                    {data.map((data) => {
                     
                            <div key={data.user} className="">
                                <h1>data.user</h1>
                            </div>
                        
                    })}
                </h1>
                <h1 className="font-extrabold text-6xl tracking-tight">Guestbook</h1>
                <p className="text-md mt-1">Leave a message for me and other visitors here!</p>
            </div>
            <div className="p-3 dark:bg-neutral-800 bg-neutral-200 drop-shadow-lg rounded-lg block">
                <textarea
                    name=""
                    id=""
                    cols={10}
                    rows={10}
                    className="p-2 w-full text-lg rounded-lg h-[130px] dark:bg-neutral-900 bg-neutral-100"
                ></textarea>
                <div className="flex w-full">
                    <button className="p-2 dark:bg-neutral-900 rounded-lg w-full hover:drop-shadow-lg duration-100 mt-3 bg-neutral-100">
                        Send It
                    </button>
                </div>
            </div>
        </Body>
    )
}

export default index
