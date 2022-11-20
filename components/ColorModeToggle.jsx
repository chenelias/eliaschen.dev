import React from 'react'
import useDarkMode from './useDarkMode'
import { BiMoon, BiSun } from 'react-icons/bi'
const ColorModeToggle = () => {
    const [colorTheme, setTheme] = useDarkMode()
    return (
        <button
            onClick={() => setTheme(colorTheme === 'light' ? 'light' : 'dark')}
            className="cursor-pointer !text-black hover:ring-[3px] transition-all ring-black p-2 bg-gray-300 rounded-lg"
        >
            {''}
            {colorTheme === 'light' ? (
                <span>
                    <BiSun className="" size="20px" />
                </span>
            ) : (
                <span>
                    <BiMoon size="20px" />
                </span>
            )}
        </button>
    )
}

export default ColorModeToggle
