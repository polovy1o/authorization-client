import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

const defaultStyles = {
    color: 'blue',
    textDecoration: 'none'
}

export function Link({children, style, ...props})
{
    return (
        <RouterLink style={{...defaultStyles, ...style}} {...props}>
            {children}
        </RouterLink>
    )
}