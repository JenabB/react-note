import React from 'react';

import FloatingCreateInvoiceButton from './FloatingCreateInvoiceButton';
import ShopInvoiceList from './ShopInvoiceList';

const Invoice = () => {
  return (
    <div>
      <FloatingCreateInvoiceButton />
      <ShopInvoiceList />
    </div>
  );
};

export default Invoice;
