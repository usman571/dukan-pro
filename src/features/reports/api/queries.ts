import { queryOptions } from '@tanstack/react-query';
import { getReportData } from './service';
import type { ReportFilters } from './types';

export const reportKeys = {
  all: ['reports'] as const,
  detail: (filters: ReportFilters) => [...reportKeys.all, filters] as const
};

export const reportQueryOptions = (filters: ReportFilters) =>
  queryOptions({
    queryKey: reportKeys.detail(filters),
    queryFn: () => getReportData(filters)
  });
