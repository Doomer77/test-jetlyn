import React, { FC } from 'react'
import { IUser } from '../types'

interface IUserListProps {
    users: IUser[]
    detailsRow: any
}

export const UserList: FC<IUserListProps> = ({ users, detailsRow }) => {
    return (
        <div>
            {users.map(user => (
                <div
                    key={user.id}
                    className="user-box"
                    onMouseMove={() => detailsRow(user)}
                >
                    <div>
                        {user.id}. {user.firstName} {user.lastName}
                    </div>
                    <div className="user-box__message">
                        message: {user.message}
                    </div>
                    <div className="user-box__timestamp">
                        timestamp: {user.timestamp}
                    </div>
                </div>
            ))}
        </div>
    )
}
