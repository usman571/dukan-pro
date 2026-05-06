import { queryOptions } from '@tanstack/react-query';
import { getCustomer, getCustomers, getTransactions, getUdhaarStats } from './service';
import type { TransactionFilters, UdhaarFilters } from './types';

export const udhaarKeys = {
  all: ['udhaar'] as const,
  customers: () => [...udhaarKeys.all, 'customers'] as const,
  customer: (id: number) => [...udhaarKeys.all, 'customer', id] as const,
  customersList: (filters: UdhaarFilters) => [...udhaarKeys.customers(), 'list', filters] as const,
  transactions: (filters: TransactionFilters) =>
    [...udhaarKeys.all, 'transactions', filters] as const,
  stats: () => [...udhaarKeys.all, 'stats'] as const
};

export const customersQueryOptions = (filters: UdhaarFilters) =>
  queryOptions({
    queryKey: udhaarKeys.customersList(filters),
    queryFn: () => getCustomers(filters)
  });

export const customerQueryOptions = (id: number) =>
  queryOptions({
    queryKey: udhaarKeys.customer(id),
    queryFn: () => getCustomer(id)
  });

export const transactionsQueryOptions = (filters: TransactionFilters) =>
  queryOptions({
    queryKey: udhaarKeys.transactions(filters),
    queryFn: () => getTransactions(filters),
    enabled: filters.customerId > 0
  });

export const statsQueryOptions = () =>
  queryOptions({
    queryKey: udhaarKeys.stats(),
    queryFn: () => getUdhaarStats()
  });
