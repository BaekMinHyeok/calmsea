import {
    DocumentData,
    DocumentSnapshot,
    collection,
    getDocs,
} from 'firebase/firestore/lite'
import { Title } from '@/components/Text/Text'
import { Container } from '@/pages/Concert/Concert.styles'

import { useEffect, useState } from 'react'
import { db } from '../../firebase'

export interface ShowState {
    id: string
    title: string
    date: string
}
export async function all() {
    const querySnapshot = await getDocs(collection(db, 'show'))

    const showsData: ShowState[] = querySnapshot.docs.map(
        (doc: DocumentSnapshot<DocumentData>) => ({
            ...(doc.data() as ShowState),
        }),
    )
    return showsData
}
export function Concert() {
    const [shows, setShows] = useState<ShowState[] | null>(null)
    useEffect(() => {
        async function fetchData() {
            try {
                const showsData = await all()
                setShows(showsData)
            } catch (err) {
                console.error('error', err)
            }
        }
        fetchData()
    }, [setShows])
    console.log(shows)
    return (
        <Container>
            <Title text={'콘서트'} size="h2" />
            <div>
                {shows === null ? (
                    <p>Loading...</p>
                ) : (
                    shows.map((show, index) => (
                        <div key={index}>
                            <p>Title: {show.title}</p>
                            <p>Date: {show.date}</p>
                        </div>
                    ))
                )}
            </div>
        </Container>
    )
}
