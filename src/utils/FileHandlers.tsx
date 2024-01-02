//FileHandlers.tsx
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Page } from "../types";
import { useState } from "react";
import { SetPage } from "../redux/redusers";
import { setInputKey } from "../redux/redusers";

export const useFileHandlers = () => {
    const dispatch = useAppDispatch()
    const page = useAppSelector(state => state.app.Page)
    const inputKey = useAppSelector(state => state.app.inputKey)
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
                    dispatch(SetPage(jsonData));
                } catch (error) {
                    console.error('Invalid JSON file', error);
                }
            };
            reader.readAsText(file);
            dispatch(setInputKey(inputKey + 1));
        }
    };
    return {saveToJSON, loadFromJSON}
}