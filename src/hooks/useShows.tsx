import {
    createShow,
    deleteShow,
    getAllShows,
    getShowByCategory,
    getShowById,
    updateShow,
} from '@/\bapi/show'
import { PostState } from '@/recoil/atoms/postState'
import { useMutation, useQuery, useQueryClient } from 'react-query'

// 전체 게시글 조회
export function useAllShow() {
    return useQuery<PostState[], Error>('allShows', getAllShows, {
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    })
}

// 게시글 생성
export function useCreateShow() {
    const querClient = useQueryClient()
    return useMutation<string | null, Error, PostState>(createShow, {
        onSuccess: () => {
            querClient.invalidateQueries('allshows')
        },
        onError: () => console.error('게시글 생성 에러'),
    })
}

// id를 이용한 게시글 조회
export function useGetShowById(id: string) {
    return useQuery<PostState | null, Error>(
        ['show', id],
        () => getShowById(id),
        {
            refetchOnMount: false,
        },
    )
}

// 카테고리별 게시글 조회
export function useGetShowByCategory(category: number) {
    return useQuery<PostState[], Error>(['showByCategory', category], () =>
        getShowByCategory(category),
    )
}
// 게시글 수정
export function useUpdateShow() {
    const queryClient = useQueryClient()

    return useMutation<void, Error, { id: string; data: Partial<PostState> }>(
        ({ id, data }) => updateShow(id, data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('allShows')
            },
        },
    )
}

// 게시글 삭제
export function useDeleteShow() {
    const queryClient = useQueryClient()

    return useMutation<void, Error, string>(deleteShow, {
        onSuccess: () => {
            queryClient.invalidateQueries('allShows')
        },
    })
}
