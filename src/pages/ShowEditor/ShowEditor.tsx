import { ShowDateInput, TextInput } from '../../components/Form/TextInput'
import { useEffect, useState } from 'react'
import { Address, AddressInput } from '../../components/Form/AddressInput'
import { CategoryCheckbox } from '../../components/Form/CategoryCheckbox'
import { CategoryItems } from '../../util/CategoryList'
import { TimeInput } from '../../components/Form/TimeInput'
import { PriceInput } from '../../components/Form/PriceInput'
import { Description } from '../../components/Form/Description'
import { AdminBtn } from '../../components/Button/Button'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { PostState, showInputState } from '../../recoil/atoms/postState'
import { useNavigate, useParams } from 'react-router-dom'
import {
    DocumentData,
    DocumentReference,
    doc,
    getDoc,
} from 'firebase/firestore/lite'
import { db } from '@/firebase'
import { postState } from '@/recoil/atoms/postState'
import { QuantityInput } from '@/components/Form/QuantityInput'
import { FireImageInput } from '@/components/Form/FireImageInput'
import { createShow, updateShow } from '@/\bapi/show'
import * as S from './ShowEditor.styles'
import * as T from '../../components/Text/Text'
// import { ImageInput } from '@/components/Form/ImageInput'
import { createImage, deleteImage } from '@/\bapi/storage'

export const getStringDate = (date: Date) => {
    return date.toISOString().slice(0, 10)
}

export function ShowEditor() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    // 게시글 내용관리
    const [showInput, setShowInput] = useRecoilState(showInputState)
    // 게시글 상태관리
    const setPost = useSetRecoilState(postState)
    // 이미지 파일관리
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    // 게시글 수정시 해당 내용 상태관리
    useEffect(() => {
        // id가 존재할때
        if (id) {
            async function fetchShowData(): Promise<void> {
                try {
                    const docRef: DocumentReference<DocumentData> = doc(
                        db,
                        'show',
                        id!,
                    )

                    const docSnap = await getDoc(docRef)

                    if (docSnap.exists()) {
                        const data = docSnap.data() as PostState
                        setShowInput(data)
                    }
                } catch (error) {
                    console.error('error', error)
                }
            }
            fetchShowData()
        }
    }, [id, setShowInput])
    // 페이지를 떠날 때마다 상태 초기화
    useEffect(() => {
        return () => {
            resetForm()
        }
    }, [id]) // id가 변경될 때만 초기화

    // input value 업데이트
    const handleShowInputChange = (
        key: keyof PostState,
        value: string | number | Address | File | null,
    ) => {
        setShowInput((prevInputState) => ({
            ...prevInputState,
            [key]: value,
        }))
    }
    // 주소
    const handleAddressChange = (newAddress: Address) => {
        // Address 객체를 문자열로 변환
        handleShowInputChange('address', newAddress)
    }

    console.log(showInput.selectedImage)

    // 게시글 생성
    async function handleCreatePost() {
        try {
            if (selectedFile) {
                console.log('selectedImage', showInput.selectedImage)
                const imageUrl = await createImage(selectedFile)
                if (!imageUrl) {
                    throw new Error('이미지 업로드 실패')
                }
                console.log('imageUrl', imageUrl)
                // const imageFile = await fetchImageFile(imageUrl)
                // console.log('imageFile', imageFile)
                // Firestore에 추가할 새로운 객체를 생성
                const firestoreData: PostState = {
                    ...showInput,
                    createdAt: Date.now(),
                    selectedImage: imageUrl,
                }

                // Firestore에 문서를 추가
                await createShow(firestoreData)
                console.log(firestoreData)
                setShowInput(firestoreData)
                setPost((prevPosts) => [...prevPosts, firestoreData])
                const category = showInput.category
                navigate(`/showlist/${category}`, { replace: true })
                // window.location.reload()
                alert('게시글이 작성되었습니다.')
                resetForm()
            } else {
                alert('이미지를 선택해주세요.')
            }
        } catch (error) {
            console.error('error', error)
        }
    }

    // 게시글 수정
    async function handleEditPost() {
        try {
            let updatedShowInput = { ...showInput }

            // 새 이미지가 선택되었는지 확인합니다.
            if (selectedFile) {
                // 이전 이미지를 스토리지에서 삭제합니다.
                if (updatedShowInput.selectedImage) {
                    await deleteImage(updatedShowInput.selectedImage)
                }

                // 새 이미지를 스토리지에 업로드하고 URL을 가져옵니다.
                const imageUrl = await createImage(selectedFile)

                updatedShowInput = {
                    ...updatedShowInput,
                    selectedImage: imageUrl,
                }
            }

            // ㅇㅁ
            updatedShowInput.createdAt = Date.now()
            // Firestore 문서 업데이트
            await updateShow(id!, updatedShowInput)
            setPost((prevPostState) => {
                return [
                    ...prevPostState.map((post) =>
                        post.id === id
                            ? { ...post, ...updatedShowInput }
                            : post,
                    ),
                ]
            })
            setShowInput(updatedShowInput)
            resetForm()
            const category = showInput.category
            navigate(`/showlist/${category}`, { replace: true })
            // window.location.reload()
            alert('게시글이 수정되었습니다')
        } catch (error) {
            console.error('error', error)
            alert('수정할 게시글을 찾을 수 없습니다.')
        }
    }
    // 게시글 리셋
    function resetForm() {
        setShowInput({
            title: '',
            createdAt: Date.now(),
            showStartDate: new Date().toISOString().slice(0, 10),
            showEndDate: new Date().toISOString().slice(0, 10),
            address: {
                areaAddress: '',
                townAddress: '',
            },
            category: 1,
            showTime: 0,
            performer: '',
            price: 0,
            selectedImage: null,
            descriptionImage: null,
            description: '',
            like: 0,
            quantity: 0,
        })
    }
    console.log(showInput.selectedImage)
    return (
        <S.Container>
            {/* 게시글 수정일때도 만들어야함 */}
            <T.Title text={id ? '게시글 수정' : '게시글 작성'} size="h2" />
            <S.Wrap>
                <TextInput
                    id="title-input"
                    label="제목"
                    placeholder="제목을 입력해주세요."
                    value={showInput.title}
                    onChange={(e) =>
                        handleShowInputChange('title', e.target.value)
                    }
                />
                <ShowDateInput
                    id="date-input"
                    label="상영일자"
                    startValue={showInput.showStartDate}
                    endValue={showInput.showEndDate}
                    startOnChange={(e) =>
                        handleShowInputChange('showStartDate', e.target.value)
                    }
                    endOnChange={(e) =>
                        handleShowInputChange('showEndDate', e.target.value)
                    }
                />
                <AddressInput
                    id="address-input"
                    label="주소"
                    address={showInput.address}
                    onAddressChange={handleAddressChange}
                    placeholder="주소를 입력해주세요"
                    detailPlaceholder="상세주소를 입력해주세요"
                />
                <S.CategortContainer>
                    <T.Text text="카테고리" size="b" />
                    <S.CategortWrap>
                        {CategoryItems.map((item) => (
                            <CategoryCheckbox
                                id={`category${item.categoryId}-input`}
                                key={item.categoryId}
                                {...item}
                                isSelected={
                                    item.categoryId === showInput.category
                                }
                                onClick={() =>
                                    handleShowInputChange(
                                        'category',
                                        item.categoryId,
                                    )
                                }
                            />
                        ))}
                    </S.CategortWrap>
                </S.CategortContainer>
                <S.TimeContainer>
                    <TimeInput
                        id={`time-input`}
                        label="관람시간"
                        onChange={(value) =>
                            handleShowInputChange('showTime', value)
                        }
                    />
                    <p>총 {showInput.showTime}분</p>
                </S.TimeContainer>
                <TextInput
                    id="perfomer-input"
                    label="출연자"
                    placeholder="출연자를 작성해주세요."
                    value={showInput.performer}
                    onChange={(e) =>
                        handleShowInputChange('performer', e.target.value)
                    }
                />
                <PriceInput
                    id="price-input"
                    label="가격"
                    value={showInput.price}
                    onChange={(value) => handleShowInputChange('price', value)}
                />
                {/* <ImageInput
                    id="img-input"
                    label="이미지"
                    selectedImage={showInput.selectedImage}
                    onImageChange={(image) =>
                        handleShowInputChange('selectedImage', image ?? '')
                    }
                /> */}
                <FireImageInput
                    id="img-input"
                    label="testImg"
                    selectedImage={showInput.selectedImage ?? undefined}
                    onImageChange={(image) => setSelectedFile(image)}
                />
                <Description
                    label="상세설명"
                    selectedImage={showInput.descriptionImage}
                    description={showInput.description}
                    onImageChange={(image) =>
                        handleShowInputChange('descriptionImage', image ?? '')
                    }
                    onDescriptionChange={(e) =>
                        handleShowInputChange('description', e)
                    }
                />
                <QuantityInput
                    id="quantity-input"
                    label="수량"
                    value={showInput.quantity}
                    onChange={(value) =>
                        handleShowInputChange('quantity', value)
                    }
                    min={0}
                    max={100}
                />

                <AdminBtn
                    text={id ? '게시글 수정' : '게시글 작성'}
                    onClick={id ? handleEditPost : handleCreatePost}
                />
            </S.Wrap>
        </S.Container>
    )
}
