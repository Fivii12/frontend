//TextHandlers.tsx
import { useState, useEffect } from "react";
import { SetPage, setSelectedBlock } from "../redux/redusers";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

export const useTextBlockHandlers = () => {
    const dispatch = useAppDispatch();
    const selectedBlock = useAppSelector(state => state.app.selectedBlock);

    const [fontSizeInput, setFontSizeInput] = useState<number | null>(16);
    const [fontFamilyInput, setFontFamilyInput] = useState<string | null>("Arial");
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [textColor, setTextColor] = useState<string | null>("black");

    const handleTextChange = () => {
        if (selectedBlock && selectedBlock.type === 'text' && fontSizeInput !== null) {
            dispatch(SetPage((prevPage) => ({
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
            })));
        }
    };

    return {
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
    };
};

