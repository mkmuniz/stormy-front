import React from 'react';
import { Navigate, Route, Routes } from "react-router-dom";

/* pages */
import ErroPage from '../../pages/erro';
import Login from '../../pages/login';
import SignUp from '../../pages/signup';

export function RotasPublicas() {

  return <Routes>

    <Route path="/login" element={<Login />} />

    <Route path="/signup" element={<SignUp />} />

    <Route path="*" element={<ErroPage />} />
  </Routes>;
}

