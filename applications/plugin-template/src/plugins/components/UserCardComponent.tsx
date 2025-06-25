import React from 'react';
import './UserCardComponent.scss';

interface UserCardProps {
    name: string;
    age?: number;
    role: 'admin' | 'user' | 'guest';
    tags: string[];
    isActive: boolean;
    children?: React.ReactNode;
}

export const UserCardComponent: React.FC<UserCardProps> = ({
    name,
    age,
    role,
    tags,
    isActive,
    children,
}) => {
    return (
        <div
            className={`user-card ${isActive ? 'active' : 'inactive'} ${role}`}
        >
            <div className="user-card__header">
                <h3 className="user-card__name">{name}</h3>
                <span
                    className={`user-card__status ${isActive ? 'online' : 'offline'}`}
                >
                    {isActive ? '🟢 Online' : '🔴 Offline'} - Plugin Template
                </span>
            </div>

            <div className="user-card__info">
                {age && <p className="user-card__age">Age: {age}</p>}
                <span className={`user-card__role role-${role}`}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                </span>
            </div>

            {tags.length > 0 && (
                <div className="user-card__tags">
                    {tags.map((tag, index) => (
                        <span key={index} className="user-card__tag">
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {children && <div className="user-card__content">{children}</div>}
        </div>
    );
};
