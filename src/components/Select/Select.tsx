
type SelectOption = {
    value: string;
    label: string;
}

type SelectProps = {
    options: SelectOption[];
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    placeholder: string;
    error?: string;
    type?: 'unique' | undefined
}

export const Select = ({ options, type, label, value, onChange, placeholder, error, ...props }: SelectProps) => {
    return (
        <div className='flex gap-2 items-center w-full'>
            {
                type === undefined && <div className="flex items-center justify-center bg-primary py-1 px-3 rounded-lg h-14">
                    <label className="whitespace-nowrap text-white font-semibold" htmlFor={label}>{label}</label>
                </div>
            }

            <select
                className='border-primary text-primary border-2 outline-none rounded-md px-2 py-2 h-14 w-full'
                id={label}
                value={value}
                onChange={onChange}
                {...props}            >
                <option value='' selected disabled>
                    {placeholder}
                </option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <span className='text-red-500'>{error}</span>}
        </div>
    )
}