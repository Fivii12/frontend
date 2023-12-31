//TextView.tsx
import React, { useEffect } from 'react'
import { TextBlock, ImageBlock, ArtObjectBlock } from '../../../types'
import styles from './TextView.module.css';

type TextViewProps = {
    textBlock: TextBlock;
    selectedBlockStyle: React.CSSProperties;
}

export function TextView({ textBlock, selectedBlockStyle }: TextViewProps) {
    const textStyle = {
        left: `${textBlock.position.x}px`,
        top: `${textBlock.position.y}px`,
        width: `${textBlock.size.width}px`,
        height: `${textBlock.size.height}px`,
        fontFamily: textBlock.data[0].fontFamily,
        fontSize: `${textBlock.data[0].fontSize}px`,
        color: textBlock.data[0].color,
        fontWeight: textBlock.data[0].bold ? 'bold' : 'normal',
        textDecoration: textBlock.data[0].underline ? 'underline' : 'none',
        fontStyle: textBlock.data[0].italic ? 'italic' : 'normal',
        ...selectedBlockStyle,
    };

    return (
        <textarea
            className={styles.textBlock}
            style={{ ...textStyle, resize: 'none' }}
        >
            {textBlock.data[0].value}
        </textarea>
    );
}