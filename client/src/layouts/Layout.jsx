import React from 'react';

import AuctionNav from '../components/AuctionNav.jsx';

function Layout ({ children }) {
  return (
    <>
      <AuctionNav />
      <div>
        {children}
      </div>
    </>
  );
}

export default Layout;
