import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import exp from 'constants';

const Dashboard = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!user) return <div>No user</div>;

  return (
    <div>
      Welcome {user.name}!
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

export default withPageAuthRequired(Dashboard);
