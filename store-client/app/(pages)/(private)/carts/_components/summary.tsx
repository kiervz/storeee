'use client';

import React from 'react';
import { Button } from '@/app/components/ui/button';
import { FormatCurrency } from '@/app/lib/format';

interface SummaryProps {
  handleCheckout: () => void;
  isCheckingOut: boolean;
  totalAmount: number;
}

const Summary: React.FC<SummaryProps> = ({
  handleCheckout,
  isCheckingOut,
  totalAmount,
}) => {
  return (
    <>
      <p className='text-2xl mb-6'>Summary</p>
      <div className='flex justify-normal flex-col gap-4'>
        <div className='flex justify-between items-center'>
          <p>Subtotal</p>
          <p>{FormatCurrency(Number(totalAmount), '₱')}</p>
        </div>
        <div className='flex justify-between items-center'>
          <p>Delivery Fee</p>
          <p>Free</p>
        </div>

        <div className='border-b-[1px]'></div>
        <div className='flex justify-between items-center'>
          <p>Total</p>
          <p>{FormatCurrency(Number(totalAmount), '₱')}</p>
        </div>
        <div className='border-b-[1px]'></div>

        <Button
          variant='default'
          size='lg'
          className='hidden md:block w-full rounded-full h-12 text-md'
          onClick={handleCheckout}
          disabled={isCheckingOut}
        >
          Checkout
        </Button>
      </div>
    </>
  );
};

export default Summary;
