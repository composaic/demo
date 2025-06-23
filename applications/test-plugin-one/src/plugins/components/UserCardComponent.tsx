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
            className={`user-card-alt ${isActive ? 'active' : 'inactive'} ${role}`}
        >
            <div className="user-card-alt__avatar">
                <div className="user-card-alt__avatar-circle">
                    {name.charAt(0).toUpperCase()}
                </div>
                <div
                    className={`user-card-alt__status-dot ${isActive ? 'online' : 'offline'}`}
                />
            </div>

            <div className="user-card-alt__content">
                <div className="user-card-alt__header">
                    <h3 className="user-card-alt__name">
                        {name} - Test Plugin One
                    </h3>
                    <span className={`user-card-alt__role role-${role}`}>
                        {role}
                    </span>
                </div>

                <div className="user-card-alt__meta">
                    {age && (
                        <span className="user-card-alt__age">
                            {age} years old
                        </span>
                    )}
                    <span
                        className={`user-card-alt__status ${isActive ? 'online' : 'offline'}`}
                    >
                        {isActive ? 'Active' : 'Inactive'}
                    </span>
                </div>

                {tags.length > 0 && (
                    <div className="user-card-alt__tags">
                        {tags.map((tag, index) => (
                            <span key={index} className="user-card-alt__tag">
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                {children && (
                    <div className="user-card-alt__children">{children}</div>
                )}
            </div>
        </div>
    );
};
