import { useRouter } from 'next/router'

function NavlinkColor({ children, href, className }) {
    const router = useRouter()
    const style = {
        color: router.asPath === href ? '#f97316' : '',
    }

    const handleClick = (e) => {
        e.preventDefault()
        router.push(href)
    }

    return (
        <a
            href={href}
            className={className}
            style={style}
        >
            {children}
        </a>
    )
}

export default NavlinkColor
