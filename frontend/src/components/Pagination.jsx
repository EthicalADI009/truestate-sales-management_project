import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ current, total, onPageChange }) => {
    if (total <= 1) return null;

    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        let start = Math.max(1, current - Math.floor(maxVisible / 2));
        let end = Math.min(total, start + maxVisible - 1);

        if (end - start + 1 < maxVisible) {
            start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-xl shadow-card mt-4">
            <div className="flex flex-1 justify-between sm:hidden">
                <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); onPageChange(current - 1); }}
                    disabled={current === 1}
                    className="relative inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                >
                    Previous
                </button>
                <button
                    type="button"
                    onClick={(e) => { e.preventDefault(); onPageChange(current + 1); }}
                    disabled={current === total}
                    className="relative ml-3 inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                >
                    Next
                </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-500">
                        Showing page <span className="font-semibold text-gray-900">{current}</span> of <span className="font-semibold text-gray-900">{total}</span>
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <button
                            type="button"
                            onClick={(e) => { e.preventDefault(); onPageChange(current - 1); }}
                            disabled={current === 1}
                            className="relative inline-flex items-center rounded-l-lg px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 transition-colors"
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                        </button>

                        {getPageNumbers().map(page => (
                            <button
                                key={page}
                                type="button"
                                onClick={(e) => { e.preventDefault(); onPageChange(page); }}
                                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold transition-all ${page === current
                                        ? 'bg-blue-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                                        : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            type="button"
                            onClick={(e) => { e.preventDefault(); onPageChange(current + 1); }}
                            disabled={current === total}
                            className="relative inline-flex items-center rounded-r-lg px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 transition-colors"
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRight className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
