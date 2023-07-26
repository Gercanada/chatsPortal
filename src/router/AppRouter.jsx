import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRouter } from '../auth/router';
import { Loader } from '../components/Loader';
import { DashboardRouter } from '../dashboard/router/DashboardRouter';
import { useCheckAuth } from '../hooks';

export const AppRouter = () => {
  const { status } = useCheckAuth();
  console.log(useCheckAuth());
  console.log({ auth: status });
  if (status === 'checking') {
    return <Loader />;
  }

  return (
    <Routes>
      {status === 'authenticated' ? (
          <Route path='/*' element={<DashboardRouter />} />
      ) : (
        <Route path='/auth/*' element={<AuthRouter />} />
      )}
      <Route path='/*' element={<Navigate to='/auth/login' />} />
    </Routes>
  );
};
