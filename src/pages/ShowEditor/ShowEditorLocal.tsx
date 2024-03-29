// import * as S from './ShowEditor.styles'
// import * as T from '../../components/Text/Text'
// import { DateInput, TextInput } from '../../components/Form/TextInput'
// import { useEffect } from 'react'
// import { Address, AddressInput } from '../../components/Form/AddressInput'
// import { CategoryCheckbox } from '../../components/Form/CategoryCheckbox'
// import { CategoryItems } from '../../util/CategoryList'
// import { TimeInput } from '../../components/Form/TimeInput'
// import { PriceInput } from '../../components/Form/PriceInput'
// import { ImageInput } from '../../components/Form/ImageInput'
// import { Description } from '../../components/Form/Description'
// import { AdminBtn } from '../../components/Button/Button'
// import { useRecoilState, useSetRecoilState } from 'recoil'
// import {
//     PostState,
//     postState,
//     showInputState,
// } from '../../recoil/atoms/postState'
// import { useNavigate, useParams } from 'react-router-dom'

// export const getStringDate = (date: Date) => {
//     return date.toISOString().slice(0, 10)
// }

// export function ShowEditorLocal() {
//     const navigate = useNavigate()
//     const { id } = useParams()
//     // 게시글 내용관리
//     const [showInput, setShowInput] = useRecoilState(showInputState)
//     // 게시글 상태관리
//     const setPost = useSetRecoilState(postState)
//     // post 상태유지
//     useEffect(() => {
//         // id가 존재할때
//         if (id) {
//             const storedPost = JSON.parse(localStorage.getItem('post') || '[]')
//             const editPost = storedPost.find(
//                 (post: PostState) => post.id === parseInt(id),
//             )
//             if (editPost) {
//                 setShowInput(editPost)
//             }
//         }
//     }, [id, setShowInput])
//     const handleShowInputChange = (
//         key: keyof PostState,
//         value: string | number | Address,
//     ) => {
//         setShowInput((prevInputState) => ({
//             ...prevInputState,
//             [key]: value,
//         }))
//     }
//     const handleAddressChange = (newAddress: Address) => {
//         // Address 객체를 문자열로 변환
//         handleShowInputChange('address', newAddress)
//     }
//     // 버튼
//     const handleCreatePost = () => {
//         setPost((prevPost) => {
//             const newPost = [
//                 ...prevPost,
//                 {
//                     ...showInput,
//                     id: prevPost.length + 1,
//                 },
//             ]
//             localStorage.setItem('post', JSON.stringify(newPost))
//             return newPost
//         })
//         resetForm()
//         navigate('/showlist')
//         window.location.reload()
//         alert('게시글이 작성되었습니다.')
//     }
//     const handleEditPost = () => {
//         const storedPosts = JSON.parse(
//             localStorage.getItem('post') || '[]',
//         ) as PostState[]
//         const editIndex = storedPosts.findIndex(
//             (post) => post.id === showInput.id,
//         )
//         if (editIndex !== -1) {
//             storedPosts[editIndex] = showInput
//             localStorage.setItem('post', JSON.stringify(storedPosts))
//             setPost(storedPosts)
//             resetForm()
//             navigate('/showlist', { replace: true })
//             window.location.reload()
//             alert('게시글이 수정되었습니다')
//         } else {
//             alert('수정할 게시글을 찾을 수 없습니다.')
//         }
//     }
//     const resetForm = () => {
//         setShowInput({
//             id: 0,
//             title: '',
//             date: new Date().toISOString().slice(0, 10),
//             address: {
//                 areaAddress: '',
//                 townAddress: '',
//             },
//             selectedCategories: 1,
//             showTime: 0,
//             performer: '',
//             price: 0,
//             selectedImage: null,
//             descriptionImage: null,
//             description: '',
//         })
//     }
//     return (
//         <S.Container>
//             {/* 게시글 수정일때도 만들어야함 */}
//             <T.Title text={id ? '게시글 수정' : '게시글 작성'} size="h2" />
//             <S.Wrap>
//                 <TextInput
//                     label="제목"
//                     placeholder="제목을 입력해주세요."
//                     value={showInput.title}
//                     onChange={(e) =>
//                         handleShowInputChange('title', e.target.value)
//                     }
//                 />
//                 <DateInput
//                     label="일정"
//                     value={showInput.date}
//                     onChange={(e) =>
//                         handleShowInputChange('date', e.target.value)
//                     }
//                 />
//                 <AddressInput
//                     label="주소"
//                     address={showInput.address}
//                     onAddressChange={handleAddressChange}
//                     placeholder="주소를 입력해주세요"
//                     detailPlaceholder="상세주소를 입력해주세요"
//                 />
//                 <S.CategortContainer>
//                     <T.Text text="카테고리" size="b" />
//                     <S.CategortWrap>
//                         {CategoryItems.map((item) => (
//                             <CategoryCheckbox
//                                 key={item.categoryId}
//                                 {...item}
//                                 isSelected={
//                                     item.categoryId ===
//                                     showInput.selectedCategories
//                                 }
//                                 onClick={() =>
//                                     handleShowInputChange(
//                                         'selectedCategories',
//                                         item.categoryId,
//                                     )
//                                 }
//                             />
//                         ))}
//                     </S.CategortWrap>
//                 </S.CategortContainer>
//                 <S.TimeContainer>
//                     <TimeInput
//                         label="관람시간"
//                         onChange={(value) =>
//                             handleShowInputChange('showTime', value)
//                         }
//                     />
//                     <p>총 {showInput.showTime}분</p>
//                 </S.TimeContainer>
//                 <TextInput
//                     label="출연자"
//                     placeholder="출연자를 작성해주세요."
//                     value={showInput.performer}
//                     onChange={(e) =>
//                         handleShowInputChange('performer', e.target.value)
//                     }
//                 />
//                 <PriceInput
//                     label="가격"
//                     value={showInput.price}
//                     onChange={(value) => handleShowInputChange('price', value)}
//                 />
//                 <ImageInput
//                     label="이미지"
//                     selectedImage={showInput.selectedImage}
//                     onImageChange={(image) =>
//                         handleShowInputChange('selectedImage', image ?? '')
//                     }
//                 />
//                 <Description
//                     label="상세설명"
//                     selectedImage={showInput.descriptionImage}
//                     description={showInput.description}
//                     onImageChange={(image) =>
//                         handleShowInputChange('descriptionImage', image ?? '')
//                     }
//                     onDescriptionChange={(e) =>
//                         handleShowInputChange('description', e)
//                     }
//                 />
//                 <AdminBtn
//                     text={id ? '게시글 수정' : '게시글 작성'}
//                     onClick={id ? handleEditPost : handleCreatePost}
//                 />
//             </S.Wrap>
//         </S.Container>
//     )
// }
export const ShowEditorLocal = () => {
    return <></>
}
