import { HtmlHTMLAttributes } from "react";

interface ButtonProps extends HtmlHTMLAttributes<HTMLButtonElement> {
    title: string;
    onClick: () => void;
    image?: any;
    textAlign?: 'default' | 'center';
    /**
     * width of the button
    **/
    size?: string;
}

export const Button = ({ onClick, title, image, textAlign = 'default', size = 'w-full', ...props }: ButtonProps) => {
    const alignItems = textAlign === 'center' ? 'items-center' : image ? 'items-start' : 'items-center';
    const justifyContent = textAlign === 'center' ? 'justify-center' : 'justify-between';
    const paddingClasses = 'pl-6 pr-4';

    return (
        <button
            {...props}
            type="button"
            onClick={onClick}
            className={`${alignItems
                } ${justifyContent} ${paddingClasses} bg-primary hover:bg-primary-hover active:bg-primary-active rounded-md h-14 w-[${!size ? 'w-full' : `${size}px`}] gap-4 flex flex-row transition duration-300 ease-in-out`}
        >
            <p className="text-white text-lg font-bold">{title}</p>
            {image}
        </button>
    );
};
