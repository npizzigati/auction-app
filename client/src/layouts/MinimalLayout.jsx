import React from 'react';

import MinimalAuctionNav from '../components/MinimalAuctionNav.jsx';

function MinimalLayout ({ children }) {
  return (
    <>
      <MinimalAuctionNav />
      <div>
        {children}
      </div>
    </>
  );
}

export default MinimalLayout;
