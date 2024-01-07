import React from 'react'
import styled from 'styled-components'

interface TitleProps {
    text: string
    size?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'b' | 'p' | 'sub'
}

const LineStyle = styled.div`
    border: 1px solid #103680;
    margin: 50px 0 20px 0;
`

// const TextStyle = styled.p<{ size?: string }>`
//     font-size: ${(props) => (props.size ? props.size : 'inherit')};
// `

export function Title({ text, size }: TitleProps) {
    const TitleTag = size
    return (
        <>
            {TitleTag ? <TitleTag>{text}</TitleTag> : null}
            <LineStyle />
        </>
    )
}

export function Text({ text, size }: TitleProps) {
    const TitleTag = size
    return <>{TitleTag ? <TitleTag>{text}</TitleTag> : null}</>
}
