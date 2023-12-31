//PageView.tsx
import React from 'react'
import { Page } from '../../../types'
import { TextView } from '../TextView/TextView'
import { ImageView } from '../ImageVIew/ImageView';
import { TextBlock, ImageBlock, ArtObjectBlock } from '../../../types'
import { ArtObjectView } from '../ArtObejectView/ArtObjectView';

type PageViewProps = {
    page: Page;
    selectedBlock: TextBlock | ImageBlock | ArtObjectBlock | null;
    selectedBlockStyle: React.CSSProperties;
}

export function PageView({ page, selectedBlock, selectedBlockStyle }: PageViewProps) {
    const pageStyle = {
        width: `${page.size.width}px`,
        height: `${page.size.height}px`,
        backgroundColor: page.background,
        filter: page.filter === null ? 'none' : page.filter,
        border: '2px solid black'
    };

    return (
        <div style={pageStyle}>
            {page.objects.map((block, index) => {  
                switch (block.type) {
                    case 'text':
                        return <TextView key={index} textBlock={block} selectedBlockStyle={block === selectedBlock ? selectedBlockStyle : {}} />;
                    case 'image':
                        return <ImageView key={index} imageBlock={block} selectedBlockStyle={block === selectedBlock ? selectedBlockStyle : {}}/>;
                    case 'graphic':
                        return <ArtObjectView key={index} artObjectBlock={block} selectedBlockStyle={block === selectedBlock ? selectedBlockStyle : {}}/>
                    default:
                        return null;
                }
            })}
        </div>
    )
}