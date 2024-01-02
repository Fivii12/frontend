//redusers.ts
import { TextBlock, ImageBlock, ArtObjectBlock } from "../types";
import { doc } from "../maxData";
import { Page } from "../types";
import React from "react";

interface AppState {
    isAddingBlock: boolean;
    isResizing: boolean;
    blockToAdd: TextBlock | ImageBlock | ArtObjectBlock | null;
    selectedBlock: TextBlock | ImageBlock | ArtObjectBlock | null;
    Page: Page;
    isMoving: boolean;
    selectedBlockStyle: React.CSSProperties;
    inputKey: number;
    imageInputKey: number;
    blockIdCounter: number;
}

const initialState: AppState = {
    isAddingBlock: false,
    isResizing: false,
    blockToAdd: null,
    selectedBlock: null,
    Page: doc.pages,
    isMoving: false,
    selectedBlockStyle: {},
    inputKey: 0,
    imageInputKey: 1,
    blockIdCounter: 1,
};

const ADD_BLOCK = 'ADD_BLOCK';
const SET_SELECTED_BLOCK = 'SET_SELECTED_BLOCK';
const SET_SELECTED_BLOCK_STYLE = 'SET_SELECTED_BLOCK_STYLE'
const SET_ISRESIZING_BLOCK = 'SET_ISRESIZING_BLOCK';
const SET_PAGE = 'SET_PAGE';
const SET_ISMOVING_BLOCK = 'SET_ISMOVING_BLOCK'
const SET_INPUT_KEY = 'SET_INPUT_KEY';
const SET_IMAGE_INPUT_KEY = 'SET_IMAGE_INPUT_KEY';
const SET_BLOCK_ID_COUNTER = 'SET_BLOCK_ID_COUNTER'

interface AddBlockAction {
    type: typeof ADD_BLOCK;
    payload: TextBlock | ImageBlock | ArtObjectBlock | null;
}
interface SetSelectedBlockAction {
    type: typeof SET_SELECTED_BLOCK;
    payload: TextBlock | ImageBlock | ArtObjectBlock | null;
}
interface SetSelectedBlockStyleAction {
    type: typeof SET_SELECTED_BLOCK_STYLE;
    payload: React.CSSProperties;
}
interface SetIsResizingAction {
    type: typeof SET_ISRESIZING_BLOCK;
    payload: true | false;
}
interface SetPageAction {
    type: typeof SET_PAGE;
    payload: Page | ((prevPage: Page) => Page);
}
interface SetIsMovingAction {
    type: typeof SET_ISMOVING_BLOCK;
    payload: true | false;
}
interface SetInputKeyAction {
    type: typeof SET_INPUT_KEY;
    payload: number;
}
interface SetImageInputKeyAction {
    type: typeof SET_IMAGE_INPUT_KEY;
    payload: number;
}
interface setBlockIdCounterAction {
    type: typeof SET_BLOCK_ID_COUNTER;
    payload: number;
}

export const addBlock = (newBlock: AddBlockAction["payload"]): AddBlockAction => ({
    type: ADD_BLOCK,
    payload: newBlock,
});

export const setSelectedBlock = (selectedBlock: SetSelectedBlockAction["payload"]): SetSelectedBlockAction => ({
    type: SET_SELECTED_BLOCK,
    payload: selectedBlock,
});

export const setSelectedBlockStyle = (selectedBlockStyle: SetSelectedBlockStyleAction["payload"]): SetSelectedBlockStyleAction => ({
    type: SET_SELECTED_BLOCK_STYLE,
    payload: selectedBlockStyle,
});
export const setIsResizing = (isResizing: SetIsResizingAction["payload"]): SetIsResizingAction => ({
    type: SET_ISRESIZING_BLOCK,
    payload: isResizing,
});
export const SetPage = (Page: SetPageAction["payload"]): SetPageAction => ({
    type: SET_PAGE,
    payload: Page,
});
export const setIsMovingBlock = (isMoving: SetIsMovingAction["payload"]): SetIsMovingAction => ({
    type: SET_ISMOVING_BLOCK,
    payload: isMoving,
});
export const setInputKey = (inputKey: SetInputKeyAction["payload"]): SetInputKeyAction => ({
    type: SET_INPUT_KEY,
    payload: inputKey,
});
export const setImageInputKey = (imageInputKey: SetImageInputKeyAction["payload"]): SetImageInputKeyAction => ({
    type: SET_IMAGE_INPUT_KEY,
    payload: imageInputKey,
});
export const setBlockIdCounter = (blockIdCounter: setBlockIdCounterAction["payload"]): setBlockIdCounterAction => ({
    type: SET_BLOCK_ID_COUNTER,
    payload: blockIdCounter,
});


type AllActionsType = AddBlockAction | SetSelectedBlockAction | SetIsResizingAction | SetPageAction | SetIsMovingAction | SetSelectedBlockStyleAction | SetInputKeyAction | SetImageInputKeyAction | setBlockIdCounterAction;

const appReducer = (state: AppState = initialState, action: AllActionsType): AppState => {
    switch (action.type) {
        case 'ADD_BLOCK':
            return {
                ...state,
                isAddingBlock: true,
                blockToAdd: action.payload,
            };
        case 'SET_SELECTED_BLOCK':
            return {
                ...state,
                selectedBlock: action.payload,
            };
        case 'SET_SELECTED_BLOCK_STYLE':
            return {
                ...state,
                selectedBlockStyle: action.payload,
            };
        case 'SET_ISRESIZING_BLOCK':
            return {
                ...state,
                isResizing: action.payload,
            };
        case 'SET_PAGE':
            return {
                ...state,
                Page: typeof action.payload === 'function' ? action.payload(state.Page) : action.payload,
            };
        case 'SET_ISMOVING_BLOCK':
            return {
                ...state,
                isMoving: action.payload,
            };
        case SET_INPUT_KEY:
            return {
                ...state,
                inputKey: action.payload,
            };
        case SET_IMAGE_INPUT_KEY:
            return {
                ...state,
                imageInputKey: action.payload,
            };
        case SET_BLOCK_ID_COUNTER:
            return {
                ...state,
                blockIdCounter: action.payload ,
            };
        default:
            return state;
    }
};
export default appReducer;
