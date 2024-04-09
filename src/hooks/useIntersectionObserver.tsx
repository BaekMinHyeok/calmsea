import { useEffect, useState } from 'react'
import { InfiniteQueryObserverResult } from 'react-query'

interface IntersectionObserverProps {
    threshold?: number
    hasNextPage: boolean | undefined
    fetchNextPage: () => Promise<InfiniteQueryObserverResult>
}

export const useIntersectionObserver = ({
    threshold = 0.1,
    hasNextPage,
    fetchNextPage,
}: IntersectionObserverProps) => {
    const [target, setTarget] = useState<HTMLDivElement | null>(null)

    useEffect(() => {
        // eslint-disable-next-line no-undef
        const observerCallback: IntersectionObserverCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && hasNextPage) {
                    fetchNextPage()
                }
            })
        }
        if (!target) return
        const observer = new IntersectionObserver(observerCallback, {
            threshold,
        })
        observer.observe(target)
        return () => observer.unobserve(target)
    }, [target, threshold, hasNextPage, fetchNextPage])
    return { setTarget }
}
