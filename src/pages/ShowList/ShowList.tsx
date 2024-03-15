import { Concert } from '@/pages/ShowList/Concert/Concert'
import { Family } from '@/pages/ShowList/Family/Family'
import { Musical } from '@/pages/ShowList/Musical/Musical'
import { Theater } from '@/pages/ShowList/Theater/Theater'
import { useParams } from 'react-router-dom'

export function ShowList() {
    const { category } = useParams()

    const getComponent = () => {
        switch (category) {
            case '1':
                return <Concert />
            case '2':
                return <Musical />
            case '3':
                return <Theater />
            case '4':
                return <Family />
            default:
                return <div>error</div>
        }
    }

    return <div>{getComponent()}</div>
}
