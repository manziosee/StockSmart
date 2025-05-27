// Generate a unique SKU for products
export const generateSKU = (name: string, category: string): string => {
  const namePrefix = name.substring(0, 3).toUpperCase();
  const categoryPrefix = category.substring(0, 2).toUpperCase();
  const timestamp = Date.now().toString().slice(-6);
  return `${namePrefix}-${categoryPrefix}-${timestamp}`;
};

// Generate a unique sale number
export const generateSaleNumber = (): string => {
  const prefix = 'SALE';
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}-${timestamp}-${random}`;
};

// Calculate total price for a sale
export const calculateSaleTotal = (
  items: Array<{ quantity: number; price: number }>
): number => {
  return items.reduce((total, item) => total + item.quantity * item.price, 0);
};

// Format date for reports
export const formatDate = (date: Date): string => {
  return new Date(date).toISOString().split('T')[0];
};

// Get date range for reports
export const getDateRange = (
  period: 'daily' | 'weekly' | 'monthly',
  date?: string
): { startDate: Date; endDate: Date } => {
  const today = date ? new Date(date) : new Date();
  today.setHours(23, 59, 59, 999);
  
  let startDate = new Date(today);
  
  switch (period) {
    case 'daily':
      startDate.setHours(0, 0, 0, 0);
      break;
    case 'weekly':
      startDate.setDate(today.getDate() - 6);
      startDate.setHours(0, 0, 0, 0);
      break;
    case 'monthly':
      startDate.setDate(1);
      startDate.setHours(0, 0, 0, 0);
      break;
    default:
      startDate.setHours(0, 0, 0, 0);
  }
  
  return { startDate, endDate: today };
};