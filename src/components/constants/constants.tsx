// constants.tsx

import { TextBlock, BlockType, ImageBlock, ArtObjectBlock } from '../../types';

export const textBlock: TextBlock = {
  id: 't1',
  position: { x: 0, y: 0, z: 0 },
  size: { width: 500, height: 500 },
  type: BlockType.Text,
  data: [
    {
      value: '',
      fontSize: 25,
      fontFamily: 'Arial',
      color: 'black',
      bold: false,
      underline: false,
      italic: false,
    },
  ],
};

export const imageBlock: ImageBlock = {
  id: 'i1',
  position: { x: 0, y: 0, z: 0 },
  size: { width: 900, height: 150 },
  type: BlockType.Image,
  data: './components/images/placeholder.jpg',
};

export const triangleBlock: ArtObjectBlock = {
  id: 'tri1',
  position: { x: 0, y: 0, z: 0 },
  size: { width: 120, height: 120 },
  type: BlockType.Graphic,
  artObject: 'triangle',
  color: 'blue',
};

export const rectangleBlock: ArtObjectBlock = {
  id: 'rect1',
  position: { x: 0, y: 0, z: 0 },
  size: { width: 180, height: 90 },
  type: BlockType.Graphic,
  artObject: 'rectangle',
  color: 'green',
};

export const ellipseBlock: ArtObjectBlock = {
  id: 'ellipse1',
  position: { x: 0, y: 0, z: 0 },
  size: { width: 150, height: 100 },
  type: BlockType.Graphic,
  artObject: 'ellipse',
  color: 'red',
};
