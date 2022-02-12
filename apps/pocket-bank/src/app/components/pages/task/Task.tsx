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
    <div>
      <h3>
        Server status: {health.status}
        {health.started && (
          <small>
            , running since: {new Date(health.started).toString().substr(0, 28)}
          </small>
        )}
      </h3>

      <Instructions />
    </div>
  );
};

export default Task;
