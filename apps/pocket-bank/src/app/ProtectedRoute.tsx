import { FC } from 'react';
import { Navigate } from 'react-router-dom';

interface PropType {
  component: React.FC;
}

const ProtectedRoute: FC<PropType> = ({ component: Component }) => {
  const auth = localStorage.getItem('user');

  if (auth) return <Component />;
  return <Navigate to="/login" />;
};
export default ProtectedRoute;
