//MouseHandlers.tsx
import React, { useState, useRef, useEffect } from "react";
import { Page } from "../types";
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setBlockIdCounter, setSelectedBlock, setIsResizing, SetPage, addBlock, setIsMovingBlock, setSelectedBlockStyle } from "../redux/redusers";
import { TextBlock, ImageBlock, ArtObjectBlock } from "../types";
import { pageSize } from "../maxData";


export const useMouseHandlers = () => {
    const dispatch = useAppDispatch();
    const appState = useAppSelector(state => state.app);
    const selectedBlock = useAppSelector(state => state.app.selectedBlock)
    const page = useAppSelector(state => state.app.Page)

    const [canvasSize, setCanvasSize] = useState({ width: pageSize.width, height: pageSize.height });

    const isResizing = useAppSelector(state => state.app.isResizing);

    const mouseCoords = useRef<{ x: number; y: number } | null>(null);

    const isMovingBlock = useAppSelector(state => state.app.isMoving)

    const [resizingBlock, setResizingBlock] = useState<TextBlock | ImageBlock | ArtObjectBlock | null>(null);
    const [resizeHandle, setResizeHandle] = useState<string | null>(null);
    const blockIdCounter = useAppSelector(state => state.app.blockIdCounter)


    const HandleMouseDown = (event: React.MouseEvent) => {
        const isButtonClicked = (event.target as HTMLElement).id === 'applyButton';
        if (!isButtonClicked) {
            const reversedObjects = [...page.objects].reverse();

            const clickedBlock = reversedObjects.find((block) => {
                const blockX = block.position.x;
                const blockY = block.position.y;
                const blockWidth = block.size.width;
                const blockHeight = block.size.height;

                return (
                    event.clientX >= blockX &&
                    event.clientX <= blockX + blockWidth &&
                    event.clientY >= blockY &&
                    event.clientY <= blockY + blockHeight
                );
            });
            if (clickedBlock) {
                dispatch(setSelectedBlock(clickedBlock));
                dispatch(setIsMovingBlock(true));
                mouseCoords.current = { x: event.clientX, y: event.clientY };
                const resizingHandles = ['nw', 'ne', 'se', 'sw'];
                const handleClicked = resizingHandles.find(() => {
                    const handleX = clickedBlock.position.x + clickedBlock.size.width;
                    const handleY = clickedBlock.position.y + clickedBlock.size.height;
                    return (
                        event.clientX >= handleX - 10 &&
                        event.clientX <= handleX + 10 &&
                        event.clientY >= handleY - 10 &&
                        event.clientY <= handleY + 10
                    );
                });

                if (handleClicked) {
                    setResizingBlock(clickedBlock);
                    setResizeHandle(handleClicked);
                    dispatch(setIsResizing(true));
                    dispatch(setIsMovingBlock(false));
                }
            } else {
                dispatch(setSelectedBlock(null));
                dispatch(setIsMovingBlock(false));
            }
            if (selectedBlock) {
                dispatch(setSelectedBlockStyle({
                    outline: '2px solid black',
                }));
            }

            else if (appState.isAddingBlock && appState.blockToAdd) {
                const { clientX, clientY } = event;
                const x = clientX;
                const y = clientY;

                const blockWidth = appState.blockToAdd.size.width;
                const blockHeight = appState.blockToAdd.size.height;

                let updatedBlock: TextBlock | ImageBlock | ArtObjectBlock;
                if (
                    x >= 0 &&
                    y >= 30 &&
                    x + blockWidth <= canvasSize.width &&
                    y + blockHeight <= canvasSize.height + 30
                ) {
                    updatedBlock = {
                        ...appState.blockToAdd,
                        position: { x, y, z: 0 },
                        id: `b${blockIdCounter}`,
                        size: appState.blockToAdd.size
                    };
                    dispatch(setBlockIdCounter(blockIdCounter + 1));
                    const updatedPage: Page = {
                        ...page,
                        objects: [...page.objects, updatedBlock],
                    };
                    dispatch(SetPage(updatedPage));
                }

                dispatch(addBlock(null));

            }
        }
    };

    const HandleMouseMove = (event: MouseEvent) => {
        if (isMovingBlock && selectedBlock && mouseCoords.current) {
            const MoveX = event.clientX - mouseCoords.current.x;
            const MoveY = event.clientY - mouseCoords.current.y;

            dispatch(SetPage((prevPage) => {
                const updatedObjects = prevPage.objects.map((prevBlock) => {
                    if (prevBlock.id === selectedBlock.id) {
                        const controlX = prevBlock.position.x + MoveX;
                        const controlY = prevBlock.position.y + MoveY;

                        if (controlX >= 0 && controlY >= 30 && controlX + prevBlock.size.width <= canvasSize.width && controlY + prevBlock.size.height <= canvasSize.height + 30) {
                            return {
                                ...prevBlock,
                                position: {
                                    x: controlX,
                                    y: controlY,
                                    z: prevBlock.position.z,
                                },
                            };
                        }
                    }
                    return prevBlock;
                });

                return {
                    ...prevPage,
                    objects: updatedObjects,
                };
            }));

            mouseCoords.current = { x: event.clientX, y: event.clientY };
            event.preventDefault();
        }
        if (isResizing && resizingBlock && resizeHandle && mouseCoords.current) {
            const MoveX = event.clientX - mouseCoords.current.x;
            const MoveY = event.clientY - mouseCoords.current.y;

            dispatch(SetPage((prevPage) => {
                const updatedObjects = prevPage.objects.map((prevBlock) => {
                    if (prevBlock.id === resizingBlock.id) {
                        const newWidth = prevBlock.size.width + (resizeHandle.includes('w') ? MoveX : 0) + (resizeHandle.includes('e') ? -MoveX : 0);
                        const newHeight = prevBlock.size.height + (resizeHandle.includes('n') ? MoveY : 0) + (resizeHandle.includes('s') ? -MoveY : 0);
                        if (
                            resizingBlock.position.x + newWidth <= canvasSize.width &&
                            resizingBlock.position.y + newHeight <= canvasSize.height + 30 &&
                            newWidth >= 50 &&
                            newHeight >= 50
                        ) {
                            let newSize = { ...prevBlock.size };
                            if (resizeHandle.includes('n')) newSize.height += MoveY;
                            if (resizeHandle.includes('s')) newSize.height -= MoveY;
                            if (resizeHandle.includes('w')) newSize.width += MoveX;
                            if (resizeHandle.includes('e')) newSize.width -= MoveX;

                            return {
                                ...prevBlock,
                                size: newSize,
                            };
                        }
                    }
                    return prevBlock;
                });

                return {
                    ...prevPage,
                    objects: updatedObjects,
                };
            }));

            mouseCoords.current = { x: event.clientX, y: event.clientY };
            event.preventDefault();
        }
    };

    const HandleMouseUp = () => {
        if (isMovingBlock) {
            dispatch(setIsMovingBlock(false));
        }

        if (isResizing) {
            dispatch(setIsResizing(false));
            setResizingBlock(null);
            setResizeHandle(null);
        }
    };
    return { HandleMouseDown, HandleMouseMove, HandleMouseUp };
}