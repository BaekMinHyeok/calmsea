interface TitleProps {
    text: string
    size?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'b' | 'p' | 'sub'
}

// const TextStyle = styled.p<{ size?: string }>`
//     font-size: ${(props) => (props.size ? props.size : 'inherit')};
// `

export function Title({ text, size }: TitleProps) {
    const TitleTag = size
    return <>{TitleTag ? <TitleTag>{text}</TitleTag> : null}</>
}

export function Text({ text, size }: TitleProps) {
    const TitleTag = size
    return <>{TitleTag ? <TitleTag>{text}</TitleTag> : null}</>
}
