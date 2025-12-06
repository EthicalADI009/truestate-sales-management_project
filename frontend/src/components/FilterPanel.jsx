import React from 'react';
import { Filter, MapPin, Tag, CreditCard } from 'lucide-react';

const FilterPanel = ({ filters, onChange }) => {
    const regions = ['East', 'West', 'North', 'South', 'Central'];
    const categories = ['Electronics', 'Clothing', 'Beauty', 'Home & Kitchen'];
    const paymentMethods = ['Credit Card', 'Debit Card', 'UPI', 'Cash', 'Net Banking'];

    const handleCheckboxChange = (category, value) => {
        const current = filters[category] || [];
        const updated = current.includes(value)
            ? current.filter(item => item !== value)
            : [...current, value];

        onChange({ ...filters, [category]: updated });
    };

    const Section = ({ title, icon: Icon, items, category }) => (
        <div className="pb-6 border-b border-gray-100 last:border-0 last:pb-0">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Icon className="h-3.5 w-3.5" />
                {title}
            </h3>
            <div className="space-y-2.5">
                {items.map(item => (
                    <label key={item} className="flex items-center group cursor-pointer">
                        <div className="relative flex items-center">
                            <input
                                type="checkbox"
                                className="peer h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all cursor-pointer"
                                checked={filters[category]?.includes(item) || false}
                                onChange={() => handleCheckboxChange(category, item)}
                            />
                        </div>
                        <span className="ml-2.5 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{item}</span>
                    </label>
                ))}
            </div>
        </div>
    );

    return (
        <div className="bg-white p-5 rounded-xl shadow-card border border-gray-200/60 sticky top-24">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
                <Filter className="h-4 w-4 text-blue-600" />
                <h2 className="text-base font-bold text-gray-900">Filters</h2>
                {Object.keys(filters).length > 0 && (
                    <button
                        onClick={() => onChange({})}
                        className="ml-auto text-xs text-blue-600 hover:text-blue-700 font-medium hover:underline"
                    >
                        Clear all
                    </button>
                )}
            </div>

            <div className="space-y-6">
                <Section title="Region" icon={MapPin} items={regions} category="customer_region" />
                <Section title="Category" icon={Tag} items={categories} category="product_category" />
                <Section title="Payment" icon={CreditCard} items={paymentMethods} category="payment_method" />
            </div>
        </div>
    );
};

export default FilterPanel;
