import React, { FC } from 'react'

interface ButtonsRowProps {
    className?: string
}


const ButtonsRow: FC<ButtonsRowProps> = ({ children, className = "" }) => {
    return (
        <div className={`buttons ${className}`}>
            {children}
        </div>
    )
}

export default ButtonsRow