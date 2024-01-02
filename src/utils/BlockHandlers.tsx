//BlockHandlers.tsx
import { useState } from "react";
import { TextBlock, ImageBlock, ArtObjectBlock } from "../types";
import { addBlock, SetPage, setSelectedBlock, setImageInputKey, setBlockIdCounter } from "../redux/redusers";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { BlockType } from "../types";


export const useBlockHandlers = () => {
    const dispatch = useAppDispatch();
    const selectedBlock = useAppSelector(state => state.app.selectedBlock)


    const blockIdCounter = useAppSelector(state => state.app.blockIdCounter)
    const imageInputKey = useAppSelector(state => state.app.imageInputKey)

    const addBlockHandler = (newBlock: TextBlock | ImageBlock | ArtObjectBlock) => {
        dispatch(addBlock(newBlock));
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageBlock: ImageBlock = {
                    id: `b${blockIdCounter}`,
                    position: { x: 0, y: 0, z: 0 },
                    size: { width: 300, height: 200 },
                    type: BlockType.Image,
                    data: reader.result as string,
                };

                addBlockHandler(imageBlock);
            };
            dispatch(setBlockIdCounter(blockIdCounter + 1));
            reader.readAsDataURL(file);
            dispatch(setImageInputKey(imageInputKey + 1));
        }
    };

    //удаление блока на пкм
    const removeBlock = (blockIdToRemove: string) => {
        dispatch(SetPage((prevPage) => ({
            ...prevPage,
            objects: prevPage.objects.filter((block) => block.id !== blockIdToRemove),
        })));
        dispatch(setSelectedBlock(null));
    };

    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        if (selectedBlock) {
            removeBlock(selectedBlock.id);
        }
    };
    return {handleImageUpload, handleContextMenu, addBlockHandler }
}