import { Routes, Route, Redirect, useNavigate } from 'react-router-dom';
import Task from './app';
import Homepage from './components/pages/home/Homepage';
import Header from './components/layout/Header';
import Login from './components/pages/login/Login';
import '../index.css';
import { userState } from './components/recoil/atoms/userAtom';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import Transaction from './components/pages/transactions/Transactions';

function RouterWrapper() {
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem('user')
    const userObj =JSON.parse(currentUser);
  if (userObj) {
      setUser(userObj)
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/task" element={<Task />} />
        <Route path="/transactions" element={<Transaction />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default RouterWrapper;
