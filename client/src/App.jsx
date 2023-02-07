import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home.jsx';
import Detail from './pages/Detail.jsx';
import Login from './pages/Login.jsx';
import Layout from './layouts/Layout.jsx';
import MinimalLayout from './layouts/MinimalLayout.jsx';
import AutoBidderConfig from './pages/AutoBidderConfig.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AdminDetail from './pages/AdminDetail.jsx';
import EditItem from './pages/EditItem.jsx';
import NewItem from './pages/NewItem.jsx';

function App () {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout><Home /></Layout>
    },
    {
      path: '/detail/:item_id',
      element: <Layout><Detail /></Layout>
    },
    {
      path: '/auto-bidder-config',
      element: <Layout><AutoBidderConfig /></Layout>
    },
    {
      path: '/dashboard',
      element: <Layout><Dashboard /></Layout>
    },
    {
      path: '/admin-detail/:item_id',
      element: <Layout><AdminDetail /></Layout>
    },
    {
      path: '/item/:item_id/edit',
      element: <Layout><EditItem /></Layout>
    },
    {
      path: '/item/new',
      element: <Layout><NewItem /></Layout>
    },
    {
      path: '/login',
      element: <MinimalLayout><Login /></MinimalLayout>
    }
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
