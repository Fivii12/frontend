// //TextRedusers.ts
// import { TextBlock, ImageBlock, ArtObjectBlock } from "../types";
// import { doc } from "../maxData";
// import { Page } from "../types";
// import React from "react";

// interface TextState {
//     fontSizeInput: number;
//     fontFamilyInput: string;
//     isBold: boolean;
//     isItalic: boolean;
//     isUnderline: boolean;
//     textColor: string;
// }

// const initialTextState: TextState = {
//     fontSizeInput: 16,
//     fontFamilyInput: "Arial",
//     isBold: false,
//     isItalic: false,
//     isUnderline: false,
//     textColor: "black",
// };

// const SET_TEXT_FONT_SIZE_INPUT = 'SET_TEXT_FONT_SIZE_INPUT';
// const SET_TEXT_FONT_FAMILY_INPUT = 'SET_TEXT_FONT_FAMILY_INPUT';
// const SET_TEXT_BOLD = 'SET_TEXT_BOLD';
// const SET_TEXT_ITALIC = 'SET_TEXT_ITALIC';
// const SET_TEXT_UNDERLINE = 'SET_TEXT_UNDERLINE';
// const SET_TEXT_COLOR = 'SET_TEXT_COLOR';

// interface SetTextFontSizeInputAction {
//     type: typeof SET_TEXT_FONT_SIZE_INPUT;
//     payload: number;
// }
// interface SetTextFontFamilyInputAction {
//     type: typeof SET_TEXT_FONT_FAMILY_INPUT;
//     payload: string;
// }

// interface SetTextBoldAction {
//     type: typeof SET_TEXT_BOLD;
//     payload: boolean | ((prev: boolean) => boolean)
// }

// interface SetTextItalicAction {
//     type: typeof SET_TEXT_ITALIC;
//     payload: boolean | ((prev: boolean) => boolean);
// }

// interface SetTextUnderlineAction {
//     type: typeof SET_TEXT_UNDERLINE;
//     payload: boolean | ((prev: boolean) => boolean);
// }

// interface SetTextColorAction {
//     type: typeof SET_TEXT_COLOR;
//     payload: string;
// }
// export const setFontSizeInput = (TextFontSize: number): SetTextFontSizeInputAction => ({
//     type: SET_TEXT_FONT_SIZE_INPUT,
//     payload: TextFontSize,
// });
// export const setFontFamilyInput = (fontFamily: string): SetTextFontFamilyInputAction => ({
//     type: SET_TEXT_FONT_FAMILY_INPUT,
//     payload: fontFamily,
// });

// export const setIsBold = (isBold: boolean | ((prev: boolean) => boolean)): SetTextBoldAction => ({
//     type: SET_TEXT_BOLD,
//     payload: isBold,
// });

// export const setIsItalic = (isItalic: boolean | ((prev: boolean) => boolean)): SetTextItalicAction => ({
//     type: SET_TEXT_ITALIC,
//     payload: isItalic,
// });

// export const setIsUnderline = (isUnderline: boolean | ((prev: boolean) => boolean)): SetTextUnderlineAction => ({
//     type: SET_TEXT_UNDERLINE,
//     payload: isUnderline,
// });

// export const setTextColor = (color: string): SetTextColorAction => ({
//     type: SET_TEXT_COLOR,
//     payload: color,
// });

// type AllTextActionsTypee = SetTextFontSizeInputAction | SetTextFontFamilyInputAction | SetTextBoldAction | SetTextItalicAction | SetTextUnderlineAction | SetTextColorAction;

// export const textReducer = (state: TextState = initialTextState, action: AllTextActionsTypee): TextState => {
//     console.log(action.type, action.payload)
//     switch (action.type) {
//         case 'SET_TEXT_FONT_SIZE_INPUT':
//             if (state.fontSizeInput !== action.payload) {
//                 return {
//                     ...state,
//                     fontSizeInput: action.payload,
//                 };
//             }
//             return state;
//         case 'SET_TEXT_FONT_FAMILY_INPUT':
//             return {
//                 ...state,
//                 fontFamilyInput: action.payload,
//             };
//         case 'SET_TEXT_BOLD':
//             return {
//                 ...state,
//                 isBold: typeof action.payload === 'function' ? action.payload(state.isBold) : action.payload,
//             };
//         case 'SET_TEXT_ITALIC':
//             return {
//                 ...state,
//                 isItalic: typeof action.payload === 'function' ? action.payload(state.isItalic) : action.payload,
//             };
//         case 'SET_TEXT_UNDERLINE':
//             return {
//                 ...state,
//                 isUnderline: typeof action.payload === 'function' ? action.payload(state.isUnderline) : action.payload,
//             };
//         case 'SET_TEXT_COLOR':
//             return {
//                 ...state,
//                 textColor: action.payload,
//             };
//         default:
//             return state;
//     }
// };
export {}