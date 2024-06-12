import React, { FC } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onChangeText: (text: string) => void;
    value: string;
    inputType: HTMLInputElement['type'];
    iconRight?: any;
    widthInput?: string | number
    dataTestId: string
}

export const Input: FC<InputProps> = ({
    placeholder,
    onChangeText,
    value,
    inputType,
    iconRight,
    dataTestId,
    widthInput = 'w-full',
    ...props // rest of the props
}) => {
    return (
        <div className={`flex flex-row items-center h-14 border-2 border-primary rounded-md bg-white  ${typeof widthInput === 'number' ? `w-${widthInput}` : widthInput}`}>
            <input
                data-testid={dataTestId}
                type={inputType}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChangeText(e.target.value)}
                className="w-full py-3 p-4 text-lg focus:outline-none text-primary placeholder-primary placeholder-opacity-60 max-h-1"
                {...props}
            />
            {iconRight && <div className="ml-4">
                {iconRight}
            </div>}
        </div>
    );
};
