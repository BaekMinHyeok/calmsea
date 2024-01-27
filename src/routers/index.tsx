import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import { Home } from '../pages/Home/Home'
import { Concert } from '../pages/Concert/Concert'
import { ShowEditor } from '../pages/\bShowEditor/ShowEditor'
// import { ShowList } from '../pages/ShowList/ShowList'
import { AdminShowList } from '../pages/ShowList/AdminShowList'
import { PostForm } from '../pages/Concert/ConcertAdd'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <></>,
        children: [
            {
                index: true,
                path: '/',
                element: <Home />,
            },
            { path: '/concert', element: <Concert /> },
            { path: '/concert/add', element: <PostForm /> },
            { path: '/shownew', element: <ShowEditor /> },
            { path: '/showedit/:id', element: <ShowEditor /> },
            { path: '/showlist', element: <AdminShowList /> },
        ],
    },
])
