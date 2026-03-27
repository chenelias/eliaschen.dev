import Body from '/components/Body.tsx'
export default function ErrorPage() {
    return (
        <Body title="404">
            <div className="items-center">
                <h1 className="about-handwrite text-[3rem] font-extrabold">404</h1>
                <h1 className="text-2xl">Oops, something went wrong.</h1>
            </div>
        </Body>
    )
}
