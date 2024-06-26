import { createBrowserRouter } from 'react-router-dom'
import App from '@/App'
import { Home } from '@/pages/Home/Home'
import { ShowEditor } from '@/pages/\bShowEditor/\bShowEditor'
import { ShowDetail } from '@/pages/ShowDetail/ShowDetail'
import { ShowList } from '@/pages/ShowList/ShowList'
import { SearchResult } from '@/pages/SearchResult/SearchResult'
import { Login } from '@/pages/Login/Login'
import { Kakao } from '@/components/Auth/Kakao/Kakao'
import { Register } from '@/pages/Register/Register'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <div>error</div>,
        children: [
            {
                index: true,
                path: '/',
                element: <Home />,
            },
            { path: '/register', element: <Register /> },
            { path: '/login', element: <Login /> },
            { path: '/auth/kakao/callback', element: <Kakao /> },
            { path: '/showlist/:category', element: <ShowList /> },
            { path: '/showlist/:category/:id', element: <ShowDetail /> },
            { path: '/shownew', element: <ShowEditor /> },
            { path: '/showedit/:id', element: <ShowEditor /> },
            { path: '/search', element: <SearchResult /> },
        ],
    },
])
