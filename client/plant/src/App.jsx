import { useState } from 'react';
import './App.scss';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import Register from './Components/Register';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProductGrid from './Components/Productgrid';
import Details from './Components/Details'
import Cart from './Components/Cart'


const router = createBrowserRouter([
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/register',
    element: <Register />,
  },
 
  {
    path: '/',
    element: <Login />, 
  },
  {
    path: '/login',
    element: <Login />, 
  },{
    path: '/grid',
    element: <ProductGrid />, 
  },{
    path: '/details/:id',
    element: <Details />,
  }
  ,{
    path: '/cart',
    element: <Cart/>,
  }
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
