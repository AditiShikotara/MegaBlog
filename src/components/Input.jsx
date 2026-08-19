import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full'>
            {label && (
                <label
                    className='mb-1.5 inline-block pl-0.5 text-sm font-medium text-ink-soft'
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`w-full rounded-lg border border-line bg-white px-3 py-2.5 text-ink outline-none
                    transition-colors duration-200 placeholder:text-ink-soft/50
                    focus:border-forest focus:ring-2 focus:ring-forest/15 ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
})

export default Input
