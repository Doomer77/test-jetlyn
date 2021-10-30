import React, { FC } from 'react'
import './index.css'

interface IDetails {
    detailsData: any
}

export const UserDetails: FC<IDetails> = ({ detailsData }) => {
    return (
        <div className="user-details">
            <span>Дополнительная информация:</span>
            <div>Email: {detailsData.email}</div>
            <div>Phone: {detailsData.phone}</div>
        </div>
    )
}
