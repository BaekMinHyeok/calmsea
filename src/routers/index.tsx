import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import { Home } from '../pages/Home/Home'
import { Concert } from '../pages/Concert/Concert'
// import { ShowEditor } from '../pages/\bShowEditor/ShowEditor'
import { ShowEditorRecoil } from '../pages/\bShowEditor/ShowEditorRecoil'
import { ShowList } from '../pages/ShowList/ShowList'

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
            { path: '/shownew', element: <ShowEditorRecoil /> },
            { path: '/showlist', element: <ShowList /> },
        ],
    },
])
