import React, { useRef } from 'react'
import Body from '/components/Body.tsx'
const index = () => {
    const inputRef = useRef('')
    return (
        <Body title="Blog">
            <div>
                <h1 className="font-extrabold text-6xl tracking-tight">Blog</h1>
                <input
                    ref={inputRef}
                    aria-label="Search articles"
                    type="text"
                    placeholder="Search articles"
                    className="mt-7 block w-full px-4 py-2 text-gray-900 bg-white border border-gray-200 rounded-md dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
                />
            </div>
        </Body>
    )
}

export default index
