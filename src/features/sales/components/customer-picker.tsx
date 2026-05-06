'use client';

import { useQuery } from '@tanstack/react-query';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useCartStore } from '../store/cart-store';

interface Customer {
  id: number;
  name: string;
  phone: string;
}

const MOCK_CUSTOMERS: Customer[] = [
  { id: 1, name: 'Ahmed Khan', phone: '0312-1234567' },
  { id: 2, name: 'Sara Ali', phone: '0321-9876543' },
  { id: 3, name: 'Bilal Ahmad', phone: '0333-5554443' },
  { id: 4, name: 'Fatima Stores', phone: '0300-1112223' },
  { id: 5, name: 'Imran Khan', phone: '0345-7778889' }
];

async function getCustomers(): Promise<Customer[]> {
  return new Promise((resolve) => setTimeout(() => resolve(MOCK_CUSTOMERS), 200));
}

export function CustomerPicker() {
  const { customerId, customerName, setCustomer } = useCartStore();
  const { data: customers, isLoading } = useQuery({
    queryKey: ['customers-picker'],
    queryFn: getCustomers
  });

  const currentValue =
    customerId !== null ? String(customerId) : customerName === 'Walk-in' ? 'walkin' : undefined;

  const handleChange = (value: string) => {
    if (value === 'walkin') {
      setCustomer(null, 'Walk-in');
      return;
    }
    const id = Number(value);
    const customer = customers?.find((c) => c.id === id);
    if (customer) {
      setCustomer(customer.id, customer.name);
    }
  };

  return (
    <Select value={currentValue} onValueChange={handleChange} disabled={isLoading}>
      <SelectTrigger className='w-full'>
        <SelectValue placeholder={isLoading ? 'Loading customers...' : 'Select customer'} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='walkin'>Walk-in (no account)</SelectItem>
        {customers?.map((customer) => (
          <SelectItem key={customer.id} value={String(customer.id)}>
            {customer.name} · {customer.phone}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
