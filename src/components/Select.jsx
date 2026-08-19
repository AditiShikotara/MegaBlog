import React, { useId } from 'react'

function Select({
    options,
    label,
    className = "",
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full'>
            {label && (
                <label htmlFor={id} className='mb-1.5 inline-block pl-0.5 text-sm font-medium text-ink-soft'>
                    {label}
                </label>
            )}
            <select
                {...props}
                id={id}
                ref={ref}
                className={`w-full rounded-lg border border-line bg-white px-3 py-2.5 text-ink outline-none
                    transition-colors duration-200 focus:border-forest focus:ring-2 focus:ring-forest/15 ${className}`}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)
