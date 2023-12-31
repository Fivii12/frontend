import {
    BlockType,
    Char,
    Size,
    Position,
    StandartBlock,
    TextBlock,
    ImageBlock,
    ArtObjectBlock,
    Template,
    Operation,
    OperationHistory,
    Filter,
    ChosenArea,
    Page,
    Doc,
    ExportPhoto,
} from './types';

import icon from './components/images/cats.jpeg'

const char: Char = {
  value: 'Aadasda',
  fontSize: 24,
  fontFamily: 'Arial',
  color: 'green',
  bold: true,
  underline: true,
  italic: true,
};

const position: Position = {
  x: 10,
  y: 20,
  z: 0,
};

const size: Size = {
  width: 100,
  height: 50,
};

const standardBlock: StandartBlock = {
  id: '1',
  position: position,
  size: size,
};

const textBlockPosition: Position = {
  x: 1000,
  y: 200,
  z: 0,
};

const textBlockSize: Size = {
  width: 100,
  height: 100,
};

const textBlock: TextBlock = {
  id: 't1',
  position: textBlockPosition,
  size: textBlockSize,
  type: BlockType.Text,
  data: [char],
};

const imageBlockPosition: Position = {
  x: 50,
  y: 80,
  z: 0,
};

const imageBlockSize: Size = {
  width: 900,
  height: 150,
};

const imageBlock: ImageBlock = {
  id: 'i1',
  position: imageBlockPosition,
  size: imageBlockSize,
  type: BlockType.Image,
  data: icon,
};

const triangleBlockPosition: Position = {
  x: 100,
  y: 190,
  z: 0,
};

const triangleBlockSize: Size = {
  width: 120,
  height: 120,
};

const triangleBlockColor: string = 'blue';

const triangleBlock: ArtObjectBlock = {
  id: 'a1',
  position: triangleBlockPosition,
  size: triangleBlockSize,
  type: BlockType.Graphic,
  artObject: "triangle",
  color: triangleBlockColor,
};

const rectangleBlockPosition: Position = {
  x: 60,
  y: 400,
  z: 0,
};

const rectangleBlockSize: Size = {
  width: 180,
  height: 90,
};

const rectangleBlockColor: string = 'green';

const rectangleBlock: ArtObjectBlock = {
  id: 'r1',
  position: rectangleBlockPosition,
  size: rectangleBlockSize,
  type: BlockType.Graphic,
  artObject: "rectangle",
  color: rectangleBlockColor,
};

const ellipseBlockPosition: Position = {
  x: 90,
  y: 300,
  z: 0,
};

const ellipseBlockSize: Size = {
  width: 150,
  height: 100,
};

const ellipseBlockColor: string = 'blue';

const ellipseBlock: ArtObjectBlock = {
  id: 'e1',
  position: ellipseBlockPosition,
  size: ellipseBlockSize,
  type: BlockType.Graphic,
  artObject: "ellipse",
  color: ellipseBlockColor,
};

const operation1: Operation = {
  id: '1',
};

const operation2: Operation = {
  id: '2',
};

const operationHistory: OperationHistory = [operation1, operation2];

const chosenArea: ChosenArea = {
  size: size,
  position: position,
};

const template: Template = {
  Pattern: 'roses',
}

const filter: Filter = 'red';

export const pageSize: Size = {
  width: 1700,
  height: 800,
}

const page: Page = {
  background: 'white',
  size: pageSize,
  filter: filter,
  objects: [textBlock, imageBlock, triangleBlock, rectangleBlock, ellipseBlock],
};

export const doc: Doc = {
  name: 'Page',
  pages: page,
};

const exportPhoto: ExportPhoto = {
  object: page,
};

