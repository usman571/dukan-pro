import { NavGroup } from '@/types';

export const navGroups: NavGroup[] = [
  {
    label: 'Menu',
    items: [
      {
        title: 'Dashboard',
        url: '/dashboard/overview',
        icon: 'dashboard',
        isActive: false,
        shortcut: ['d', 'd'],
        items: []
      },
      {
        title: 'Inventory',
        url: '/dashboard/inventory',
        icon: 'product',
        isActive: false,
        shortcut: ['i', 'i'],
        items: []
      },
      {
        title: 'Purchases',
        url: '/dashboard/purchases',
        icon: 'billing',
        isActive: false,
        shortcut: ['p', 'p'],
        items: []
      },
      {
        title: 'Udhaar',
        url: '/dashboard/udhaar',
        icon: 'teams',
        isActive: false,
        shortcut: ['u', 'u'],
        items: []
      },
      {
        title: 'Reports',
        url: '/dashboard/reports',
        icon: 'trendingUp',
        isActive: false,
        shortcut: ['r', 'r'],
        items: []
      }
    ]
  }
];
