import { Routes, Route } from 'react-router-dom';
import Transaction from './components/pages/transactions/Transactions';
import Homepage from './components/pages/home/Homepage';
import Header from './components/layout/Header';
import Login from './components/pages/login/Login';
import ProtectedRoute from './ProtectedRoute';
import Task from './components/pages/task/Task';
import '../index.css';

function RouterWrapper() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/transactions"
          element={<ProtectedRoute component={Transaction} />}
        />
        <Route path="/task" element={<ProtectedRoute component={Task} />} />
        <Route path="/" element={<ProtectedRoute component={Homepage} />} />
      </Routes>
    </>
  );
}

export default RouterWrapper;
