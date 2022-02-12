import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from '../recoil/atoms/userAtom';
import { logout } from '../services/authService';

function Header() {
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logout();
    setUser({ username: null, loggedIn: false, token: null });
    localStorage.removeItem('user');
    navigate('/login');
  };
  return (
    <header className="h-16 flex items-center bg-gradient-to-r from-blue-500 to-cyan-200 p-2 px-4 justify-between">
      <Link to="/">
        <img
          className="header__logo"
          src="./assets/logo.svg"
          alt="Finno"
          width="180px"
        />
      </Link>
      <Link to={`${user.loggedIn ? '/' : '/login'}`}>
        {user.loggedIn && (
          <button
            className="rounded-lg bg-black text-white p-2 hover:text-blue-500 transition-all duration-300"
            onClick={logoutHandler}
          >
            Sign out
          </button>
        )}
        {!user.loggedIn && (
          <button className="rounded-lg bg-black text-white p-2 hover:text-green-500 transition-all duration-300">
            Sign in
          </button>
        )}
      </Link>
    </header>
  );
}

export default Header;
