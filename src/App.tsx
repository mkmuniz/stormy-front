import 'react-toastify/dist/ReactToastify.css';

import React, { useContext } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';

/* contexto */
import { AuthProvider } from './context/Auth';
import { Rotas } from './routes/index';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContext } from './context/Auth';

const client = new QueryClient();

function App() {
  const authContext = useContext(AuthContext);
  return (
    <QueryClientProvider client={client}>
      <AuthProvider>
        <Rotas />
      </AuthProvider>
      <ToastContainer />

    </QueryClientProvider>
  );
}

export default App;
