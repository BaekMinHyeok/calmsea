import { useAllShow } from './useShows'

export function QueyTest() {
    const { data, isLoading, error } = useAllShow()

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }
    console.log(error)
    if (!data) {
        return <div>No data available.</div>
    }
    return (
        <div>
            {data.map((post) => (
                <ul key={post.id}>
                    <li>{post.title}</li>
                </ul>
            ))}
        </div>
    )
}
