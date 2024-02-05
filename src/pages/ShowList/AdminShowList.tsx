// import { useRecoilState, useRecoilValue } from 'recoil'
// import { useNavigate } from 'react-router-dom'
// import * as S from './ShowList.styles'
// import { getAllPostSelectors } from '../../recoil/selectors/getPosts'
// import { MdImageNotSupported } from 'react-icons/md'
// import { SlOptionsVertical } from 'react-icons/sl'
// import { useCallback, useEffect } from 'react'
// import { partialModal } from '../../recoil/atoms/partialModal'
// import { Title } from '../../components/Text/Text'
// import { deleteDoc, doc } from 'firebase/firestore/lite'
// import { db } from '../../firebase'

export function AdminShowList() {
    // // const { id } = useParams()
    // const navigate = useNavigate()
    // const posts = useRecoilValue(getAllPostSelectors)
    // const [isOpenModal, setOpenModal] = useRecoilState(partialModal)
    // console.log(isOpenModal)
    // // 수정버튼
    // const onEditButtonClick = useCallback(
    //     (id: string | undefined) => {
    //         // 수정 버튼 클릭 시 수정 페이지로 이동
    //         navigate(`/showedit/${id}`)
    //         setOpenModal((prev) => ({
    //             ...prev,
    //             isOpen: false,
    //             selectedIndex: null,
    //         }))
    //         console.log(id)
    //     },
    //     [navigate, setOpenModal],
    // )
    // const onClickToggleModal = useCallback(
    //     (id: string) => {},
    //     [setOpenModal],
    // )
    // useEffect(() => {}, [posts]) // 삭제 후 리렌더링 로직 필요 삭제시 조회 함수를 다시 실행시키는 방향
    // // 게시글 삭제
    // async function onDeleteButtonClick(id: string | undefined) {
    //     const isConfirmed = window.confirm('정말로 삭제하시겠습니까?')
    //     if (isConfirmed) {
    //         try {
    //             const postDocRef = doc(db, 'show', id || '')
    //             await deleteDoc(postDocRef)
    //             setOpenModal((prev) => ({
    //                 ...prev,
    //                 isOpen: false,
    //                 selectedIndex: null,
    //             }))
    //             // window.location.reload()
    //             // window.location.replace('/showlist')
    //             // navigate('/showlist')
    //         } catch (error) {
    //             console.error(error)
    //         }
    //     }
    // }
    // return (
    //     <S.Container>
    //         <Title text={'전체보기'} size="h2" />
    //         <S.PostWrap>
    //             {posts ? (
    //                 posts.map((post) => (
    //                     <S.PostContent key={post.id}>
    //                         {post.selectedImage !== null ? (
    //                             <img
    //                                 src={post.selectedImage}
    //                                 alt={post.title}
    //                             />
    //                         ) : (
    //                             <S.EmptyImage>
    //                                 <MdImageNotSupported />
    //                             </S.EmptyImage>
    //                         )}
    //                         <S.EditIcon
    //                             onClick={() =>
    //                                 post.id && onClickToggleModal(post.id)
    //                             }
    //                         >
    //                             <SlOptionsVertical />
    //                         </S.EditIcon>
    //                         {isOpenModal.isOpen &&
    //                             isOpenModal.selectedIndex === post.id && (
    //                                 <S.EditModal>
    //                                     <button
    //                                         onClick={() =>
    //                                             onEditButtonClick(post.id)
    //                                         }
    //                                     >
    //                                         수정
    //                                     </button>
    //                                     <button
    //                                         onClick={() =>
    //                                             onDeleteButtonClick(
    //                                                 post.id || '',
    //                                             )
    //                                         }
    //                                     >
    //                                         삭제
    //                                     </button>
    //                                 </S.EditModal>
    //                             )}
    //                         <h2>{post.title}</h2>
    //                         <div>{post.date}</div>
    //                     </S.PostContent>
    //                 ))
    //             ) : (
    //                 <div>Loading...</div>
    //             )}
    //         </S.PostWrap>
    //     </S.Container>
    // )
}
