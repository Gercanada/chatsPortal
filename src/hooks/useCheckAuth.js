import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkCredentials, verificarToken } from '../store/slices/auth';

export const useCheckAuth = () => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkCredentials());
    dispatch(verificarToken());
  }, []);
  return {
    status,
  };
};
