import { NewSaleViewWrapper } from './new-sale-view-wrapper';
import { NewSalePOSWrapper } from './new-sale-pos-wrapper';

export default function SalesPage() {
  return (
    <div className='md:flex md:h-full md:flex-col'>
      {/* Mobile: M2 cart view */}
      <div className='flex h-full flex-col md:hidden'>
        <NewSaleViewWrapper />
      </div>
      {/* Desktop: D3 POS layout */}
      <div className='hidden md:flex md:flex-1 md:flex-col md:overflow-hidden'>
        <NewSalePOSWrapper />
      </div>
    </div>
  );
}
