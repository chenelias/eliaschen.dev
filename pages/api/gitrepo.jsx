export async function getServerSideProps(context) {
    const res = await fetch(`https://api.github.com/users/chenelias/repos`)
    const data = await res.json()

    return {
        props: { data },
    }
}
