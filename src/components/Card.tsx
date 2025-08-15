import React from "react";

type CardProps = {
    title: string;
    color?: string;
    icon?: React.ElementType;
    value: string | number;
}

function Card({ title, value, icon: Icon }: CardProps) {
    return (
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            {/* Ele renderiza qualquer componente que receber */}
            {Icon && <Icon className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3" />}

            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">{value}</h5>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">{title}</p>
        </div>
    );
}

export default Card;