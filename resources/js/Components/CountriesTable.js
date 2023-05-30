import React from "react";
import {Inertia} from "@inertiajs/inertia";

const CountriesTable = ({paginatedData, headers, actions, onDelete, onEdit}) => {
    const {current_page, data, per_page, total} = paginatedData;

    // Calculate total number of pages
    const totalPages = Math.ceil(total / per_page);

    const goToPage = (page) => {
        if (page === current_page) return;
        Inertia.visit('?page=' + page);
    };

    return (
        <div className="p-4">
            <table className="min-w-full border border-gray-300 table-auto">
                <thead>
                <tr>
                    {headers.map((header) => (
                        <th
                            key={header}
                            className="py-2 px-4 border-b text-left"
                        >
                            {header}
                        </th>
                    ))}
                    {actions && (
                        <th className="py-2 px-4 border-b text-left">Actions</th>
                    )}
                </tr>
                </thead>
                <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        <td className="py-2 px-4 border-b">{item.id}</td>
                        <td className="py-2 px-4 border-b">{item.name}</td>
                        <td className="py-2 px-4 border-b">{item.iso}</td>
                        {actions && (
                            <td className="py-2 px-4 border-b">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
                                    onClick={() => onEdit(item)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => onDelete(item.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        )}

                    </tr>
                ))}
                </tbody>
            </table>

            <div className="mt-4">
                <nav>
                    <ul className="flex justify-center">
                        {Array.from(Array(totalPages).keys()).map((page) => (
                            <li
                                key={page}
                                className={`${
                                    page + 1 === current_page
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 hover:bg-gray-300'
                                } px-2 py-1 mx-1 rounded cursor-pointer`}
                                onClick={() => goToPage(page + 1)}
                            >
                                {page + 1}
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default CountriesTable;
