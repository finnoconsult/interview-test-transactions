import { useEffect, useState } from 'react';
import { Health } from '@interview-homework-transaction-list/api-interfaces';
import { healthCheck } from '../../services/defaultService';
import Instructions from './Instructons';

export const Task = () => {
  const [health, setHealth] = useState<Health>({
    status: 'pending...',
    userCount: -1,
    started: null,
  });

  useEffect(() => {
    async function health() {
      const res = await healthCheck();
      setHealth(res);
    }
    health();
  }, []);

  return (
    <div className="p-5">
      <h3 className="mb-5">
        Server status:{' '}
        <span
          className={`${
            health.status === 'OK' ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {health.status}
        </span>
        {health.started && (
          <small>
            , running since:{' '}
            <span className="text-transparent bg-gradient-to-r from-black to-blue-500 bg-clip-text">
              {new Date(health.started).toString().substr(0, 28)}
            </span>
          </small>
        )}
      </h3>

      <Instructions />
    </div>
  );
};

export default Task;
