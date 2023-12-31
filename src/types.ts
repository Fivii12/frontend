export enum BlockType {
  Text = "text",
  Image = "image",
  Graphic = "graphic",
}

export type ArtObjectType = "triangle" | "rectangle" | "ellipse";

type Char = {
  value: string;
  fontSize: number | undefined;
  fontFamily: string | undefined;
  color: string | undefined;
  bold: boolean;
  underline:boolean;
  italic:boolean;
};

type Position = {
  x: number;
  y: number;
  z: number;
};

type Size = {
  width: number;
  height: number;
};

type StandartBlock = {
  id: string;
  position: Position;
  size: Size;
};

type TextBlock = StandartBlock & {
  type: BlockType.Text;
  data: Array<Char>;
};

type ImageBlock = StandartBlock & {
  type: BlockType.Image;
  data: string;
};

type ArtObjectBlock = StandartBlock & {
  type: BlockType.Graphic;
  artObject: ArtObjectType;
  color: string;
};

type Template = {
  Pattern: string;
};

type Operation = {
  id: string;
};

type OperationHistory = Array<Operation>;

type Filter = "grey" | "red" | "blue" | "green" | null;

type ChosenArea = {
  size: Size;
  position: Position;
};

type Page = {
  background: string;
  size: Size;
  filter: Filter;
  objects: Array<TextBlock | ImageBlock | ArtObjectBlock>;
};

type Doc = {
  name: string;
  pages: Page;
};

type ExportPhoto = {
  object: Page;
};

export type {
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
};