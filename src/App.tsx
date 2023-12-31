//App.tsx

import React, { useState, useRef, useEffect } from 'react';
import { PageView } from './components/views/PageView/PageView';
import { doc, pageSize } from './maxData';
import { TextBlock, BlockType, ImageBlock, ArtObjectBlock } from './types';
import { textBlock, imageBlock, triangleBlock, rectangleBlock, ellipseBlock } from './components/constants/constants';
import { ReactComponent as TextIcon } from './components/images/T.svg';
import { ReactComponent as ImageIcon } from './path/to/image-icon.svg';
import { ReactComponent as TriangleIcon } from './components/images/triangle.svg';
import { ReactComponent as RectangleIcon } from './components/images/rectangle.svg';
import { ReactComponent as EllipseIcon } from './components/images/ellipse.svg';

import './App.css'

interface AppState {
  isAddingBlock: boolean;
  blockToAdd: TextBlock | ImageBlock | ArtObjectBlock | null;
}

function App() {
  const [page, setPage] = useState(doc.pages);
  const [canvasSize, setCanvasSize] = useState({ width: pageSize.width, height: pageSize.height });
  const [appState, setAppState] = useState<AppState>({
    isAddingBlock: false,
    blockToAdd: null,
  });

  const [inputKey, setInputKey] = useState(0);
  const [imageInputKey, setImageInputKey] = useState(1);

  const [fontSizeInput, setFontSizeInput] = useState<number | null>(16);
  const [fontFamilyInput, setFontFamilyInput] = useState<string | null>("Arial");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [textColor, setTextColor] = useState<string | null>("black");

  const [selectedBlock, setSelectedBlock] = useState<TextBlock | ImageBlock | ArtObjectBlock | null>(null);
  const [selectedBlockStyle, setSelectedBlockStyle] = useState({});

  const [isMovingBlock, setIsMovingBlock] = useState(false);

  const [isResizing, setIsResizing] = useState(false);
  const [resizingBlock, setResizingBlock] = useState<TextBlock | ImageBlock | ArtObjectBlock | null>(null);
  const [resizeHandle, setResizeHandle] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const mouseCoords = useRef<{ x: number; y: number } | null>(null);

  const [blockIdCounter, setBlockIdCounter] = useState(1);

  const handleMouseDown = (event: React.MouseEvent) => {
    const isButtonClicked = (event.target as HTMLElement).id === 'applyButton';
    if (!isButtonClicked) {
      const clickedBlock = page.objects.find((block) => {
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
        setSelectedBlock(clickedBlock);
        setIsMovingBlock(true);
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
          setIsResizing(true);
          setIsMovingBlock(false);
        }
      } else {
        setSelectedBlock(null);
        setIsMovingBlock(false);
      }
      if (selectedBlock) {
        setSelectedBlockStyle({
          outline: '2px solid black',
        });
      }

      else if (appState.isAddingBlock && appState.blockToAdd && containerRef.current) {
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
          };
          setBlockIdCounter((prevCounter) => prevCounter + 1);
          setPage((prevPage) => ({
            ...prevPage,
            objects: [...prevPage.objects, updatedBlock],
          }));
        }

        setAppState({
          isAddingBlock: false,
          blockToAdd: null,
        });
      }
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isMovingBlock && selectedBlock && mouseCoords.current) {
      const MoveX = event.clientX - mouseCoords.current.x;
      const MoveY = event.clientY - mouseCoords.current.y;

      setPage((prevPage) => {
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
      });

      mouseCoords.current = { x: event.clientX, y: event.clientY };
      event.preventDefault();
    }
    if (isResizing && resizingBlock && resizeHandle && mouseCoords.current) {
      const MoveX = event.clientX - mouseCoords.current.x;
      const MoveY = event.clientY - mouseCoords.current.y;

      setPage((prevPage) => {
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
      });

      mouseCoords.current = { x: event.clientX, y: event.clientY };
      event.preventDefault();
    }
  };

  const handleMouseUp = () => {
    if (isMovingBlock) {
      setIsMovingBlock(false);
    }

    if (isResizing) {
      setIsResizing(false);
      setResizingBlock(null);
      setResizeHandle(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isMovingBlock, isResizing]);

  const addBlock = (newBlock: TextBlock | ImageBlock | ArtObjectBlock) => {
    setAppState({
      isAddingBlock: true,
      blockToAdd: newBlock,
    });

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

        addBlock(imageBlock);
      };
      setBlockIdCounter((prevCounter) => prevCounter + 1);
      reader.readAsDataURL(file);
      setImageInputKey((prevKey) => prevKey + 1);
    }
  };

  //удаление блока на пкм
  const removeBlock = (blockIdToRemove: string) => {
    setPage((prevPage) => ({
      ...prevPage,
      objects: prevPage.objects.filter((block) => block.id !== blockIdToRemove),
    }));
    setSelectedBlock(null);
  };

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    if (selectedBlock) {
      removeBlock(selectedBlock.id);
    }
  };
  //текст
  const handleTextChange = () => {
    if (selectedBlock && selectedBlock.type === 'text' && fontSizeInput !== null) {
      setPage((prevPage) => ({
        ...prevPage,
        objects: prevPage.objects.map((prevBlock) =>
          prevBlock.id === selectedBlock.id && prevBlock.type === 'text'
            ? {
              ...prevBlock,
              data: [
                {
                  ...prevBlock.data[0],
                  fontSize: fontSizeInput !== null ? fontSizeInput : prevBlock.data[0].fontSize,
                  fontFamily: fontFamilyInput !== null ? fontFamilyInput : prevBlock.data[0].fontFamily,
                  bold: isBold ? true : false,
                  italic: isItalic ? true : false,
                  underline: isUnderline ? true : false,
                  color: textColor !== null ? textColor : prevBlock.data[0].color,
                },
              ],
            }
            : prevBlock
        ),
      }));
    }
  };

  //5лаба сохранение

  const saveToJSON = () => {
    const jsonContent = JSON.stringify(page);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const loadFromJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const jsonData = JSON.parse(reader.result as string);
          setPage(jsonData);
        } catch (error) {
          console.error('Invalid JSON file', error);
        }
      };
      reader.readAsText(file);
      setInputKey((prevKey) => prevKey + 1);
    }
  };

  return (
    <div ref={containerRef} onMouseDown={handleMouseDown} onContextMenu={handleContextMenu} className={isResizing ? 'resizing' : ''} style={{ cursor: isResizing ? 'se-resize' : 'auto' }}>
      <div className='container'>
        <button onClick={() => addBlock(textBlock)}>
          <TextIcon width="13" height="13" /> Add Text Block
        </button>
        <input key={imageInputKey} type="file" accept="image/*" onChange={handleImageUpload} />
        <button onClick={() => addBlock(triangleBlock)}>
          <TriangleIcon width="13" height="13" /> Add Triangle Block
        </button>
        <button onClick={() => addBlock(rectangleBlock)}>
          <RectangleIcon width="13" height="13" /> Add Rectangle Block
        </button>
        <button onClick={() => addBlock(ellipseBlock)}>
          <EllipseIcon width="13" height="13" /> Add Ellipse Block
        </button>
        <input
          type="number"
          placeholder="Enter Font Size"
          value={fontSizeInput !== null ? fontSizeInput : ''}
          onChange={(e) => setFontSizeInput(e.target.value !== '' ? Number(e.target.value) : null)}
        />
        <input
          type="string"
          placeholder="Font Family"
          value={fontFamilyInput !== null ? fontFamilyInput : ''}
          onChange={(e) => setFontFamilyInput(e.target.value !== '' ? String(e.target.value) : null)}
        />
        <button onClick={() => setIsBold((prev) => !prev)}>{isBold ? "Bold: On" : "Bold: Off"}</button>
        <button onClick={() => setIsItalic((prev) => !prev)}>{isItalic ? "Italic: On" : "Italic: Off"}</button>
        <button onClick={() => setIsUnderline((prev) => !prev)}>{isUnderline ? "Underline: On" : "Underline: Off"}</button>
        <input
          type="color"
          value={textColor !== null ? textColor : ''}
          onChange={(e) => setTextColor(e.target.value !== '' ? e.target.value : null)}
        />
        <button id='applyButton' onClick={handleTextChange}>Применить</button>
        <button onClick={saveToJSON}>Сохранить в JSON</button>
        <input key={inputKey} type="file" accept=".json" onChange={loadFromJSON} />
      </div>
      <PageView page={page} selectedBlock={selectedBlock} selectedBlockStyle={selectedBlockStyle} />
    </div>
  );
}

export default App;