import React from 'react';
import Layout from './components/Layout';
import SalesTable from './components/SalesTable';
import FilterPanel from './components/FilterPanel';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import { useSalesData } from './hooks/useSalesData';

function App() {
  const {
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
  } = useSalesData();

  return (
    <Layout>
      <div className="flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-64 flex-shrink-0">
          <FilterPanel filters={filters} onChange={handleFilterChange} />
        </aside>
        <main className="flex-1 flex flex-col gap-4">
          <div className="flex justify-between items-center gap-4">
            <SearchBar onSearch={handleSearch} />
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select
                className="border rounded p-2 text-sm"
                value={sort}
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value="">Newest</option>
                <option value="date:asc">Oldest</option>
                <option value="quantity:desc">Quantity (High-Low)</option>
                <option value="quantity:asc">Quantity (Low-High)</option>
                <option value="price_per_unit:desc">Price (High-Low)</option>
                <option value="price_per_unit:asc">Price (Low-High)</option>
              </select>
            </div>
          </div>

          <SalesTable
            data={sales}
            loading={loading}
            sort={sort}
            onSort={handleSortChange}
          />

          <Pagination
            current={pagination.page}
            total={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </main>
      </div>
    </Layout>
  );
}

export default App;
