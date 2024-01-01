//ArtObjectView.tsx
import React, { useEffect, useState } from 'react';
import { ArtObjectBlock, ArtObjectType, BlockType } from '../../../types'; 
import styles from './ArtObjectView.module.css';

type ArtObjectViewProps = {
    artObjectBlock: ArtObjectBlock;
    selectedBlockStyle: React.CSSProperties;    
}

export function ArtObjectView({ artObjectBlock, selectedBlockStyle }: ArtObjectViewProps) {


    const artObjectStyle = {
        left: `${artObjectBlock.position.x}px`,
        top: `${artObjectBlock.position.y}px`,
        width: `${artObjectBlock.size.width}px`,
        height: `${artObjectBlock.size.height}px`,
        color: artObjectBlock.color,
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

    let artObj

    if (artObjectBlock.artObject === "triangle") {
        artObj = (
            <svg
              className={styles.triangle}
              style={{ width: '100%', height: '100%' }}
              viewBox="0 0 100 100"
            >
              <polygon points="50,0 100,100 0,100" fill={artObjectBlock.color} />
            </svg>
          );
    }
    else if (artObjectBlock.artObject === "ellipse") {
        artObj = (
            <svg
                className={styles.ellipse}
                style={{ width: '100%', height: '100%' }}
                viewBox={`0 0 ${artObjectBlock.size.width} ${artObjectBlock.size.height}`}
            >
                <ellipse cx="50%" cy="50%" rx="50%" ry="50%" fill={artObjectBlock.color} />
            </svg>
        );
    }
    else if (artObjectBlock.artObject === "rectangle") {
        artObj = (
            <svg
              className={styles.rectangle}
              style={{ width: '100%', height: '100%' }}
              viewBox={`0 0 ${artObjectBlock.size.width} ${artObjectBlock.size.height}`}    
            >
              <rect x="0" y="0" width={`${artObjectBlock.size.width}px`} height={`${artObjectBlock.size.height}px`} fill={artObjectBlock.color} />
            </svg>
          );
    }



    return (
        <div className={styles.artObjectView} style={{...artObjectStyle, position:'absolute'}}>
            {artObj}
            <div style={squareStyle}></div>
        </div>
    );
}