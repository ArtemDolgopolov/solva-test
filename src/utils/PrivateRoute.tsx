import { Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import { useAppSelector } from '../hooks/appHooks';
import { PrivateRouteProps } from '../types';
import { isRedirectionRequired } from './helpers';

export default function PrivateRoute({
  children,
  redirectTo,
  isReversedDirection = false
}: PrivateRouteProps) {
  const navigate = useNavigate();
  const { isUserSignIn } = useAppSelector((state) => state.project);

  const isRedirected =
    isUserSignIn !== null &&
    isRedirectionRequired({ isUserSignIn, isReversedDirection });

  useEffect(() => {
    if (isRedirected) {
      navigate(redirectTo);
    }
  }, [isUserSignIn, isReversedDirection, navigate, redirectTo, isRedirected]);

  if (isUserSignIn === null) {
    return <Loader />;
  }

  return <Suspense fallback={<Loader />}>{!isRedirected && children}</Suspense>;
}
