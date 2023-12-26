import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import { Home } from '../pages/Home/Home'
import { Concert } from '../pages/Concert/Concert'

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
        ],
    },
])
