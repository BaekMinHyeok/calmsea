import React from 'react'
import styled from 'styled-components'

interface TitleProps {
    level?: number
    text: string
    underline?: boolean
    size?: string
    bold?: boolean
}

const Line = styled.div<{ underline?: boolean }>`
    border: ${(props) => (props.underline ? '1px solid #103680' : 'none')};
    margin: 50px 0 20px 0;
`

const TextStyle = styled.p<{ bold?: boolean; size?: string }>`
    font-weight: ${(props) => (props.bold ? 'bold' : 'normal')};
    font-size: ${(props) => (props.size ? props.size : 'inherit')};
`

export function Title({ level, text, underline }: TitleProps) {
    const Tag = `h${level}` as 'h1' | 'h2' | 'h3'
    return (
        <>
            <Tag>{text}</Tag>
            <Line underline={underline}></Line>
        </>
    )
}

export function Text({ text, size, bold }: TitleProps) {
    return (
        <TextStyle bold={bold} size={size}>
            {text}
        </TextStyle>
    )
}
