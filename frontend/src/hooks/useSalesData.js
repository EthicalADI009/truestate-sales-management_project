import { useState, useEffect, useCallback } from 'react';
import { fetchSalesData } from '../services/api';

export const useSalesData = () => {
    // Initialize state from URL
    const getInitialState = () => {
        const params = new URLSearchParams(window.location.search);
        const page = parseInt(params.get('page')) || 1;
        const search = params.get('search') || '';
        const sort = params.get('sort') || '';
        let filters = {};
        try {
            const filtersParam = params.get('filters');
            if (filtersParam) filters = JSON.parse(filtersParam);
        } catch (e) {
            console.error("Error parsing filters from URL", e);
        }
        return { page, search, sort, filters };
    };

    const initialState = getInitialState();

    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ page: initialState.page, limit: 10, total: 0, totalPages: 0 });
    const [search, setSearch] = useState(initialState.search);
    const [sort, setSort] = useState(initialState.sort);
    const [filters, setFilters] = useState(initialState.filters);

    // Sync state to URL
    useEffect(() => {
        const params = new URLSearchParams();
        if (pagination.page > 1) params.set('page', pagination.page);
        if (search) params.set('search', search);
        if (sort) params.set('sort', sort);
        if (Object.keys(filters).length > 0) params.set('filters', JSON.stringify(filters));

        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.replaceState({}, '', newUrl);
    }, [pagination.page, search, sort, filters]);

    const loadSales = async () => {
        setLoading(true);
        try {
            const params = {
                page: pagination.page,
                limit: pagination.limit,
                search,
                sort,
                filters: JSON.stringify(filters)
            };
            const data = await fetchSalesData(params);
            setSales(data.data);
            setPagination(data.pagination);
        } catch (error) {
            // Error handled in service, but we could add toast here
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSales();
    }, [pagination.page, search, sort, filters]);

    const handleSearch = useCallback((term) => {
        setSearch(term);
        setPagination(prev => ({ ...prev, page: 1 }));
    }, []);

    const handleFilterChange = useCallback((newFilters) => {
        setFilters(newFilters);
        setPagination(prev => ({ ...prev, page: 1 }));
    }, []);

    const handleSortChange = useCallback((field) => {
        if (sort.startsWith(field)) {
            setSort(sort.endsWith('desc') ? `${field}:asc` : `${field}:desc`);
        } else {
            setSort(`${field}:desc`);
        }
    }, [sort]);

    const handlePageChange = useCallback((newPage) => {
        setPagination(prev => ({ ...prev, page: newPage }));
    }, []);

    return {
        sales,
        loading,
        pagination,
        search,
        sort,
        filters,
        handleSearch,
        handleFilterChange,
        handleSortChange,
        handlePageChange
    };
};
