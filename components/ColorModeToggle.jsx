import React from 'react'
import useDarkMode from './useDarkMode'
import { BiMoon, BiSun } from 'react-icons/bi'
const ColorModeToggle = () => {
    const [colorTheme, setTheme] = useDarkMode()
    return (
        <button
            aria-label="toggle colormode"
            onClick={() => setTheme(colorTheme === 'light' ? 'light' : 'dark')}
            className="cursor-pointer  dark:ring-white dark:bg-[#444444] hover:ring-[2px] transition-all ring-black p-2 bg-gray-300 rounded-lg"
        >
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
