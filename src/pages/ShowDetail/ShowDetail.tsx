import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getShowById } from '@/\bapi/show'
import { postState } from '@/recoil/atoms/postState'
import { useRecoilState } from 'recoil'
import { MdImageNotSupported } from 'react-icons/md'
import * as S from './ShowDetail.styles'
import { CategoryMap } from '@/util/CategoryList'
import { LikeButton } from '@/components/LikeButton/LikeButton'

export function ShowDetail() {
    const { id } = useParams<{ id: string }>()
    const [post, setPost] = useRecoilState(postState)
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const postData = await getShowById(id!)
                if (postData) {
                    setPost([postData])
                } else {
                    setPost([])
                }
            } catch (error) {
                console.error('게시물조회 에러', error)
            }
        }

        fetchPost()
    }, [id, setPost])

    return (
        <S.Container>
            {post && post.length > 0 && (
                <S.ContentWrap>
                    <S.TitleWrap>
                        <h2>
                            {`${CategoryMap.get(post[0].category)}
                             <${post[0].title}>`}
                        </h2>

                        <p>
                            {`${post[0].showStartDate} ~ ${post[0].showEndDate} | ${post[0].address.areaAddress}`}
                        </p>
                    </S.TitleWrap>
                    <S.ImageWrap>
                        {post[0].selectedImage !== null ? (
                            <S.ImageBox>
                                <img
                                    src={post[0].selectedImage}
                                    alt={post[0].title}
                                />
                                <LikeButton
                                    id={id ? id.toString() : ''}
                                    like={post[0].like}
                                />
                                <p>{post[0].id}</p>
                            </S.ImageBox>
                        ) : (
                            <div>
                                <MdImageNotSupported />
                            </div>
                        )}

                        <S.ImageTextWrap>
                            <p>
                                <b>관람시간</b> {post[0].showTime}분
                            </p>
                            <S.PerFomer>
                                <b>출연</b> <span>{post[0].performer}</span>
                            </S.PerFomer>
                            <p>
                                <b>장르</b>
                                {CategoryMap.get(post[0].category)}
                            </p>
                            <p>
                                <b>가격</b> {post[0].price}
                            </p>
                        </S.ImageTextWrap>
                    </S.ImageWrap>
                    <div>
                        <p>{post[0].description}</p>
                        {post[0].descriptionImage !== null ? (
                            <img
                                src={post[0].descriptionImage}
                                alt={post[0].description}
                            />
                        ) : (
                            <div>
                                <MdImageNotSupported />
                            </div>
                        )}
                    </div>
                </S.ContentWrap>
            )}
        </S.Container>
    )
}
