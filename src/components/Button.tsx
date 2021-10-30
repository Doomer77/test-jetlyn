import React, { FC } from 'react'
import './index.css'

type ButtonType = {
    name?: string
    onClick?: (event: React.MouseEvent<HTMLElement>, name: string) => void
    variant: 'dot' | 'rectangle'
    children?: any
}

export const Button: FC<ButtonType> = ({
    name = '',
    onClick,
    variant = 'rectangle',
    children,
}) => {
    return (
        <button
            className={variant === 'dot' ? 'btn-dot' : 'btn'}
            onClick={(event: React.MouseEvent<HTMLElement>) =>
                onClick && onClick(event, name)
            }
        >
            {children ? children : name}
        </button>
    )
}
