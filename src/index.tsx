import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/routers'
import { RecoilRoot } from 'recoil'
// import { QueryClient, QueryClientProvider } from 'react-query'
// import { ModalProvider } from './components/Modal/SelectedModal/ModalProvider'

// const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        {/* <QueryClientProvider client={queryClient}> */}
        <RecoilRoot>
            <RouterProvider router={router} />
            {/* <ModalProvider /> */}
        </RecoilRoot>
        {/* </QueryClientProvider> */}
    </React.StrictMode>,
)
