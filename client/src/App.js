import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import {
  createBrowserRouter, RouterProvider, Route, useNavigate,
  useLocation,
  Navigate,
  redirect
} from 'react-router-dom';
import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import './App.css';
import Home from '../src/pages/home';
import Register from '../src/pages/register';
import Messaging from '../src/pages/messaging';
import { AuthContext } from './components/auth_context.js';

const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        bg: mode('gray.100', 'gray.100')(props),
      }
    })
  },
})

const authUser = async () => {
  let response = await fetch("http://localhost:5000/auth", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include'
  });
  return response;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    loader: async () => {
      let res = await authUser();
      if (res.status === 200) {
        return redirect('/messaging');
      };
    }
  }, {
    path: '/register',
    element: <Register />,
  }, {
    path: '/messaging',
    element: <Messaging />,
    loader: async () => {
      let res = await authUser();
      if (res.status === 401) {
        return redirect('/');
      };
    }
  },
]);

function App() {
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
