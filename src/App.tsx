//App.tsx

import React, { useState, useRef, useEffect } from 'react';
import { PageView } from './components/views/PageView/PageView';
import { textBlock, imageBlock, triangleBlock, rectangleBlock, ellipseBlock } from './maxData';
import { ReactComponent as TextIcon } from './components/images/T.svg';
import { ReactComponent as TriangleIcon } from './components/images/triangle.svg';
import { ReactComponent as RectangleIcon } from './components/images/rectangle.svg';
import { ReactComponent as EllipseIcon } from './components/images/ellipse.svg';

import { useMouseHandlers } from './utils/MouseHandlers';
import { useBlockHandlers } from './utils/BlockHandlers';
import { useFileHandlers } from './utils/FileHandlers';
import { useTextBlockHandlers } from './utils/TextHandlers';



import { useAppDispatch, useAppSelector } from './redux/hooks';

import './App.css'



function App() {
  const selectedBlock = useAppSelector(state => state.app.selectedBlock)
  const selectedBlockStyle = useAppSelector(state => state.app.selectedBlockStyle)

  const page = useAppSelector(state => state.app.Page)

  const inputKey = useAppSelector(state => state.app.inputKey)
  const imageInputKey = useAppSelector(state => state.app.imageInputKey)  

  const isMovingBlock = useAppSelector(state => state.app.isMoving)
  const isResizing = useAppSelector(state => state.app.isResizing);

  const {
    fontSizeInput,
    setFontSizeInput,
    fontFamilyInput,
    setFontFamilyInput,
    isBold,
    setIsBold,
    isItalic,
    setIsItalic,
    isUnderline,
    setIsUnderline,
    textColor,
    setTextColor,
    handleTextChange,
  } = useTextBlockHandlers();

  const { HandleMouseDown, HandleMouseMove, HandleMouseUp } = useMouseHandlers();

  const { handleImageUpload, handleContextMenu, addBlockHandler } = useBlockHandlers();

  const { saveToJSON, loadFromJSON } = useFileHandlers();


  useEffect(() => {

    document.addEventListener('mousemove', HandleMouseMove);
    document.addEventListener('mouseup', HandleMouseUp);

    return () => {
      document.removeEventListener('mousemove', HandleMouseMove);
      document.removeEventListener('mouseup', HandleMouseUp);
    };
  }, [isMovingBlock, isResizing]);



  return (
    <div onMouseDown={HandleMouseDown} onContextMenu={handleContextMenu} className={isResizing ? 'resizing' : ''} style={{ cursor: isResizing ? 'se-resize' : 'auto' }}>
      <div className='container'>
        <button onClick={() => addBlockHandler(textBlock)}>
          <TextIcon width="13" height="13" /> Add Text Block
        </button>
        <input key={imageInputKey} type="file" accept="image/*" onChange={handleImageUpload} />
        <button onClick={() => addBlockHandler(triangleBlock)}>
          <TriangleIcon width="13" height="13" /> Add Triangle Block
        </button>
        <button onClick={() => addBlockHandler(rectangleBlock)}>
          <RectangleIcon width="13" height="13" /> Add Rectangle Block
        </button>
        <button onClick={() => addBlockHandler(ellipseBlock)}>
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