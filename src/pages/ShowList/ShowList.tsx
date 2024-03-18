import { Show } from '@/pages/ShowList/Show/Show'
import { useParams } from 'react-router-dom'

export function ShowList() {
    const { category } = useParams()
    const categryId = Number(category)

    const getComponent = () => {
        switch (categryId) {
            case 1:
                return <Show category={categryId} />
            case 2:
                return <Show category={categryId} />
            case 3:
                return <Show category={categryId} />
            case 4:
                return <Show category={categryId} />
            default:
                return <div>error</div>
        }
    }

    return <div>{getComponent()}</div>
}
