import type {
  CustomersResponse,
  RecordPaymentInput,
  TransactionFilters,
  TransactionsResponse,
  UdhaarCustomer,
  UdhaarFilters,
  UdhaarStats,
  UdhaarTransaction
} from './types';

const MOCK_CUSTOMERS: UdhaarCustomer[] = [
  {
    id: 1,
    name: 'Ahmed Khan',
    phone: '03001234567',
    balance: 4500,
    lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString()
  },
  {
    id: 2,
    name: 'Sara Ali',
    phone: '03211234567',
    balance: 1200,
    lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString()
  },
  {
    id: 3,
    name: 'Bilal Ahmad',
    phone: '03451234567',
    balance: 6800,
    lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45).toISOString()
  },
  {
    id: 4,
    name: 'Fatima Stores',
    phone: '03121234567',
    balance: 2900,
    lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString()
  },
  {
    id: 5,
    name: 'Imran Khan',
    phone: '03331234567',
    balance: 1390,
    lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 144).toISOString(),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString()
  }
];

let MOCK_TRANSACTIONS: UdhaarTransaction[] = [
  {
    id: 1,
    customerId: 1,
    type: 'sale',
    amount: 2000,
    note: 'Goods on credit',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString()
  },
  {
    id: 2,
    customerId: 1,
    type: 'payment',
    amount: 1000,
    note: 'Cash payment',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString()
  },
  {
    id: 3,
    customerId: 1,
    type: 'sale',
    amount: 3500,
    note: 'Goods on credit',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
  },
  {
    id: 4,
    customerId: 2,
    type: 'sale',
    amount: 1200,
    note: 'Goods on credit',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString()
  },
  {
    id: 5,
    customerId: 3,
    type: 'sale',
    amount: 4000,
    note: 'Goods on credit',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 168).toISOString()
  },
  {
    id: 6,
    customerId: 3,
    type: 'payment',
    amount: 700,
    note: 'Partial payment',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString()
  },
  {
    id: 7,
    customerId: 3,
    type: 'sale',
    amount: 3500,
    note: 'Goods on credit',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString()
  },
  {
    id: 8,
    customerId: 4,
    type: 'sale',
    amount: 5000,
    note: 'Goods on credit',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 240).toISOString()
  },
  {
    id: 9,
    customerId: 4,
    type: 'payment',
    amount: 2100,
    note: 'Bank transfer',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString()
  },
  {
    id: 10,
    customerId: 5,
    type: 'sale',
    amount: 1390,
    note: 'Goods on credit',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 144).toISOString()
  }
];

let nextTransactionId = 11;

export async function getCustomers(filters: UdhaarFilters): Promise<CustomersResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      let result = [...MOCK_CUSTOMERS];
      if (filters.search) {
        const q = filters.search.toLowerCase();
        result = result.filter((c) => c.name.toLowerCase().includes(q) || c.phone.includes(q));
      }
      const total = result.length;
      const start = (filters.page - 1) * filters.limit;
      resolve({ items: result.slice(start, start + filters.limit), total });
    }, 300);
  });
}

export async function getCustomer(id: number): Promise<UdhaarCustomer | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_CUSTOMERS.find((c) => c.id === id));
    }, 200);
  });
}

export async function getTransactions(filters: TransactionFilters): Promise<TransactionsResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const items = MOCK_TRANSACTIONS.filter((t) => t.customerId === filters.customerId).toSorted(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      resolve({ items });
    }, 200);
  });
}

export async function getUdhaarStats(): Promise<UdhaarStats> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const totalOutstanding = MOCK_CUSTOMERS.reduce((sum, c) => sum + c.balance, 0);
      const totalCustomers = MOCK_CUSTOMERS.length;
      const avgBalance = totalCustomers > 0 ? Math.round(totalOutstanding / totalCustomers) : 0;
      resolve({ totalOutstanding, totalCustomers, avgBalance });
    }, 200);
  });
}

export async function recordPayment(input: RecordPaymentInput): Promise<UdhaarTransaction> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const customer = MOCK_CUSTOMERS.find((c) => c.id === input.customerId);
      if (customer) {
        customer.balance = Math.max(0, customer.balance - input.amount);
        customer.lastActivity = new Date().toISOString();
      }
      const transaction: UdhaarTransaction = {
        id: nextTransactionId++,
        customerId: input.customerId,
        type: 'payment',
        amount: input.amount,
        note: input.note,
        createdAt: new Date().toISOString()
      };
      MOCK_TRANSACTIONS = [transaction, ...MOCK_TRANSACTIONS];
      resolve(transaction);
    }, 300);
  });
}
