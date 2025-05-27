// API Configuration
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// App Configuration
export const APP_NAME = 'StockSmart';
export const APP_VERSION = '1.0.0';

// Date formats
export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm';

// Pagination defaults
export const DEFAULT_PAGE_SIZE = 10;
export const PAGINATION_SIZES = [5, 10, 20, 50, 100];

// Role permissions
export const ROLES = {
  OWNER: 'owner',
  ADMIN: 'admin',
  CASHIER: 'cashier',
};

// Currency formatting
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// Date formatting
export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString();
};