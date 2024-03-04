import * as S from './ShowEditor.styles'
import * as T from '../../components/Text/Text'
import {
    // DateInput,
    ShowDateInput,
    TextInput,
} from '../../components/Form/TextInput'
import { useEffect } from 'react'
import { Address, AddressInput } from '../../components/Form/AddressInput'
import { CategoryCheckbox } from '../../components/Form/CategoryCheckbox'
import { CategoryItems } from '../../util/CategoryList'
import { TimeInput } from '../../components/Form/TimeInput'
import { PriceInput } from '../../components/Form/PriceInput'
import { ImageInput } from '../../components/Form/ImageInput'
import { Description } from '../../components/Form/Description'
import { AdminBtn } from '../../components/Button/Button'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { PostState, showInputState } from '../../recoil/atoms/postState'
import { useNavigate, useParams } from 'react-router-dom'
import {
    DocumentData,
    DocumentReference,
    addDoc,
    collection,
    doc,
    getDoc,
    updateDoc,
} from 'firebase/firestore/lite'
import { db } from '@/firebase'
import { postState } from '@/recoil/atoms/postState'

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
    // 게시글 수정시 해당 내용 상태관리
    useEffect(() => {
        // id가 존재할때
        if (id) {
            async function fetchShowData(): Promise<void> {
                try {
                    // const params = useParams() as { id: string }
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
                    console.log('id', docRef.id)
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
        value: string | number | Address,
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
    // 게시글 추가
    async function handleCreatePost() {
        try {
            // Firestore에 추가할 새로운 객체를 생성
            const firestoreData = { ...showInput, createdAt: Date.now() }

            // Firestore에 문서를 추가
            await addDoc(collection(db, 'show'), firestoreData)

            setShowInput(firestoreData)

            setPost((prevPosts) => [...prevPosts, firestoreData])

            console.log('showInput:', firestoreData)
            console.log('showInput', showInput)

            navigate(`/showlist`, { replace: true })
            // window.location.reload()
            alert('게시글이 작성되었습니다.')
            resetForm()
        } catch (error) {
            console.error('error', error)
        }
    }
    // 게시글 수정
    async function handleEditPost() {
        try {
            const updatedShowInput = {
                ...showInput,
                createdAt: Date.now(),
            }
            const docRef: DocumentReference<DocumentData> = doc(
                db,
                'show',
                id || '',
            )
            console.log(id)
            // Firestore 문서 업데이트
            await updateDoc(docRef, updatedShowInput)
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
            console.log(showInput)
            resetForm()
            navigate('/showlist', { replace: true })
            window.location.reload()
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
            selectedCategories: 1,
            showTime: 0,
            performer: '',
            price: 0,
            selectedImage: null,
            descriptionImage: null,
            description: '',
            like: 0,
        })
    }

    return (
        <S.Container>
            {/* 게시글 수정일때도 만들어야함 */}
            <T.Title text={id ? '게시글 수정' : '게시글 작성'} size="h2" />
            <S.Wrap>
                <TextInput
                    label="제목"
                    placeholder="제목을 입력해주세요."
                    value={showInput.title}
                    onChange={(e) =>
                        handleShowInputChange('title', e.target.value)
                    }
                />
                <ShowDateInput
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
                                key={item.categoryId}
                                {...item}
                                isSelected={
                                    item.categoryId ===
                                    showInput.selectedCategories
                                }
                                onClick={() =>
                                    handleShowInputChange(
                                        'selectedCategories',
                                        item.categoryId,
                                    )
                                }
                            />
                        ))}
                    </S.CategortWrap>
                </S.CategortContainer>
                <S.TimeContainer>
                    <TimeInput
                        label="관람시간"
                        onChange={(value) =>
                            handleShowInputChange('showTime', value)
                        }
                    />
                    <p>총 {showInput.showTime}분</p>
                </S.TimeContainer>
                <TextInput
                    label="출연자"
                    placeholder="출연자를 작성해주세요."
                    value={showInput.performer}
                    onChange={(e) =>
                        handleShowInputChange('performer', e.target.value)
                    }
                />
                <PriceInput
                    label="가격"
                    value={showInput.price}
                    onChange={(value) => handleShowInputChange('price', value)}
                />
                <ImageInput
                    label="이미지"
                    selectedImage={showInput.selectedImage}
                    onImageChange={(image) =>
                        handleShowInputChange('selectedImage', image ?? '')
                    }
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
                <AdminBtn
                    text={id ? '게시글 수정' : '게시글 작성'}
                    onClick={id ? handleEditPost : handleCreatePost}
                />
            </S.Wrap>
        </S.Container>
    )
}
