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

    return (
        <div>
            <img className={styles.imageView} style={imageStyle} src={imageBlock.data} alt=""/>
        </div>
    );
}