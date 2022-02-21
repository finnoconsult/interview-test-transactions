import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from '../../recoil/atoms/userAtom';

function Homepage() {
  const [user] = useRecoilState(userState);
  return (
    <div className="flex flex-col bg-[#f2f2f2] min-h-screen  justify-center items-center space-y-20">
      <div className="flex items-center space-x-4 -mt-20">
        <img
          src={
            user?.username?.includes('aki')
              ? '../assets/avatar.jpeg'
              : '../assets/guest.png'
          }
          alt="user profile avatar"
          className="h-20 w-20 rounded-full"
        />
        <h1 className="text-3xl">
          Hi <b>{user.username}</b>!
        </h1>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-10 md:space-y-0 text-center space-y-5 text-xl">
        <Link to="/task" className="button">
          Task
        </Link>
        <Link to="/transactions" className="button">
          My Transactions
        </Link>
      </div>
    </div>
  );
}

export default Homepage;
