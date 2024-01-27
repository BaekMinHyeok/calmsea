import { ChangeEvent, FormEvent, useState } from 'react'

import { db } from '../../firebase'
import { addDoc, collection } from 'firebase/firestore/lite'

// interface Post {
//     id: string
//     title: string
//     date: string
// }
export const PostForm = () => {
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value)
    }
    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        const postsCollection = collection(db, 'show')
        try {
            const docRef = await addDoc(postsCollection, {
                title,
                date,
            })
            console.log('id', docRef.id)
        } catch (error) {
            console.log('error', error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>제목</label>
            <input type="text" value={title} onChange={handleTitleChange} />
            <label>날짜</label>
            <input type="text" value={date} onChange={handleDateChange} />
            <button type="submit">추가</button>
        </form>
    )
}
