import React, { useCallback, useState } from 'react'
import { AdressStyle, Backdrop, Container } from './Form.styes'
import { AdminBtn } from '@/components/Button/Button'
import DaumPostcode from 'react-daum-postcode'
export interface Address {
    areaAddress: string
    townAddress: string
}
interface AddressInputProps {
    id: string
    label: string
    placeholder: string
    detailPlaceholder: string
    address: Address
    onAddressChange: (address: Address) => void
}

interface AddressData {
    address: string
    sido: string
    sigungu: string
    addressType: 'R' | 'J' // 도로명주소 또는 지번주소에 대한 타입
    bname: string
    buildingName: string
}

export function AddressInput({
    id,
    label,
    placeholder,
    detailPlaceholder,
    address,
    onAddressChange,
}: AddressInputProps) {
    const [isOpenModal, setOpenModal] = useState<boolean>(false)

    const onClickToggleModal = useCallback(
        () => setOpenModal(!isOpenModal),
        [isOpenModal],
    )

    const handleComplete = (
        data: AddressData,
        // onComplete: (address: Address) => void,
    ) => {
        let fullAddress = data.address
        let extraAddress = '' // 추가될 주소
        const localAddress = data.sido + ' ' + data.sigungu // 지역주소(시, 도 + 시, 군, 구)
        if (data.addressType === 'R') {
            // 주소타입이 도로명주소일 경우
            if (data.bname !== '') {
                extraAddress += data.bname // 법정동, 법정리
            }
            if (data.buildingName !== '') {
                // 건물명
                extraAddress +=
                    extraAddress !== ''
                        ? `, ${data.buildingName}`
                        : data.buildingName
            }
            // 지역주소 제외 전체주소 치환
            fullAddress = fullAddress.replace(localAddress, '')
            // 조건 판단 완료 후 지역 주소 및 상세주소 state 수정
            const newAddress: Address = {
                areaAddress: localAddress,
                townAddress:
                    fullAddress +
                    (extraAddress !== '' ? `(${extraAddress})` : ''),
            }
            onAddressChange(newAddress)
            onClickToggleModal()

            // 주소 검색이 완료된 후 결과를 매개변수로 전달
        }
    }

    const daumModal: React.CSSProperties = {
        width: '300px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 99,
    }

    return (
        <Container>
            <label htmlFor="mainAdress-input">{label}</label>
            <AdressStyle>
                <input
                    id="mainAdress-input"
                    type="text"
                    readOnly={true}
                    placeholder={placeholder}
                    value={address.areaAddress}
                />
                <AdminBtn text={'주소검색'} onClick={onClickToggleModal} />
            </AdressStyle>
            {isOpenModal && (
                <Backdrop onClick={onClickToggleModal}>
                    <DaumPostcode
                        style={daumModal}
                        onComplete={(data) => {
                            handleComplete(data)
                        }}
                    />
                </Backdrop>
            )}

            <input
                id="subAdress-input"
                type="text"
                readOnly={true}
                placeholder={detailPlaceholder}
                value={address.townAddress}
            />
        </Container>
    )
}
