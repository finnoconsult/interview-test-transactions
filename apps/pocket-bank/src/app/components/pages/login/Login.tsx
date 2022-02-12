import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { userState } from '../../recoil/atoms/userAtom';
import { login } from '../../services/authService';
import { Link } from 'react-router-dom';
import { CurrentUser, UserProps } from '../../../../typings/User';

function Login() {
  const [message, setMessage] = useState('');
  const [user, setUser] = useRecoilState(userState);

  const { register, handleSubmit, reset } = useForm<UserProps>();

  const onSubmit = async (data: UserProps) => {
    const res = await login(data.username, data.password);
    if (res) {
      const currentUser: CurrentUser = {
        username: data.username,
        token: res.token,
        loggedIn: true,
      };
      setUser(currentUser);
      localStorage.setItem('user', JSON.stringify(currentUser));
      reset();
    } else {
      setMessage('Bad credentials');
    }
  };

  if (user.loggedIn) {
    return (
      <div className="min-h-screen text-2xl bg-[#f2f2f2] px-5 flex flex-col justify-center items-center">
        <h1 className="flex flex-col md:flex-row -mt-44 text-center">
          Good to see you back on track <b className="ml-2">{user.username}!</b>{' '}
          👋🏻
        </h1>
        <div className="flex flex-col space-y-5 md:flex-row md:space-y-0 md:space-x-10 text-xl mt-20">
          <Link
            to="/"
            className="border border-gray-500 bg-gray-50 p-2 px-5 rounded-full"
          >
            Home
          </Link>
          <Link
            to="/transactions"
            className="border border-gray-500 bg-gray-50 p-2 px-5 rounded-full"
          >
            My Transactions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-2xl bg-[#f2f2f2] flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-10 -mt-44"
      >
        <label className="flex flex-col space-y-5">
          Username
          <input
            type="text"
            placeholder="John Doe"
            className="h-10 rounded-lg focus:outline-none p-2"
            {...register('username')}
          />
        </label>
        <label className="flex flex-col space-y-5">
          Password
          <input
            type="password"
            className="h-10 rounded-lg focus:outline-none p-2"
            {...register('password', { required: true })}
          />
        </label>
        {message && <p className="font-semibold text-red-500">{message}</p>}

        <button
          type="submit"
          className="bg-black text-white p-2 rounded-lg hover:text-green-500 transition-all duration-300 ease-in-out"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default Login;
