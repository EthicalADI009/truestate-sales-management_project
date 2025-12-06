import React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown, Package, Calendar, User, CreditCard } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/formatters';

const SalesTable = ({ data, loading, sort, onSort }) => {
    if (loading) {
        return (
            <div className="w-full h-96 flex flex-col items-center justify-center text-gray-400 gap-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="text-sm font-medium">Loading sales data...</p>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="w-full h-96 flex flex-col items-center justify-center text-gray-400 gap-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                <Package className="h-12 w-12 text-gray-200" />
                <p className="text-sm font-medium">No sales found matching your criteria.</p>
            </div>
        );
    }

    const getSortIcon = (field) => {
        if (!sort.startsWith(field)) return <ArrowUpDown className="h-3.5 w-3.5 text-gray-300 group-hover:text-gray-500 transition-colors" />;
        return sort.endsWith('desc')
            ? <ArrowDown className="h-3.5 w-3.5 text-blue-600" />
            : <ArrowUp className="h-3.5 w-3.5 text-blue-600" />;
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
            case 'pending': return 'bg-amber-50 text-amber-700 border-amber-100';
            case 'cancelled': return 'bg-red-50 text-red-700 border-red-100';
            case 'returned': return 'bg-gray-50 text-gray-700 border-gray-100';
            default: return 'bg-blue-50 text-blue-700 border-blue-100';
        }
    };

    return (
        <div className="bg-white shadow-card rounded-xl border border-gray-200/60 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-100">
                    <thead>
                        <tr className="bg-gray-50/50">
                            <th
                                className="group px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={() => onSort('date')}
                            >
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-3.5 w-3.5 text-gray-400" />
                                    <span>Date</span>
                                    {getSortIcon('date')}
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                <div className="flex items-center gap-2">
                                    <User className="h-3.5 w-3.5 text-gray-400" />
                                    <span>Customer</span>
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                            <th
                                className="group px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={() => onSort('quantity')}
                            >
                                <div className="flex items-center gap-1">Qty {getSortIcon('quantity')}</div>
                            </th>
                            <th
                                className="group px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={() => onSort('total_amount')}
                            >
                                <div className="flex items-center gap-1">Amount {getSortIcon('total_amount')}</div>
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                <div className="flex items-center gap-2">
                                    <CreditCard className="h-3.5 w-3.5 text-gray-400" />
                                    <span>Payment</span>
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-50">
                        {data.map((row) => (
                            <tr key={row.transaction_id} className="hover:bg-blue-50/30 transition-colors group">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">{formatDate(row.date)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-gray-900">{row.customer_name}</span>
                                        <span className="text-xs text-gray-400 group-hover:text-blue-500 transition-colors">{row.phone_number}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{row.product_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2.5 py-0.5 inline-flex text-xs font-medium rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                                        {row.product_category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 pl-8">{row.quantity}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{formatCurrency(row.total_amount)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.payment_method}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2.5 py-1 inline-flex text-xs font-medium rounded-md border ${getStatusColor(row.order_status)}`}>
                                        {row.order_status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SalesTable;
