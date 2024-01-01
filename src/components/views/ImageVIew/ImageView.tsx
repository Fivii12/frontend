//ImageView.tsx
import React, {useState,useRef,useEffect} from 'react';
import { ImageBlock } from '../../../types';
import styles from './ImageView.module.css';

type ImageViewProps = {
    imageBlock: ImageBlock;
    selectedBlockStyle: React.CSSProperties;
}

export function ImageView({ imageBlock, selectedBlockStyle }: ImageViewProps) {  

    const imageStyle = {
        left: `${imageBlock.position.x}px`,
        top: `${imageBlock.position.y}px`,
        width: `${imageBlock.size.width}px`,
        height: `${imageBlock.size.height}px`,
        ...selectedBlockStyle,
    };

    const squareStyle: React.CSSProperties = {
        width: '10px',
        height: '10px',
        backgroundColor: 'red',
        position: 'absolute',
        bottom: '0',
        right: '0',
        opacity: 0.5,

    };

    return (
        <div style={{...imageStyle, position:'absolute'}}>
            <img className={styles.imageView} style={{...imageStyle, position:'fixed'}} src={imageBlock.data} alt=""/>
            <div style={squareStyle}></div>

        </div>
    );
}