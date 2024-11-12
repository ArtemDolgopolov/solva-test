import classes from './Auth.module.scss';
import SignIn from '../../components/Forms/SignIn';
import SignUp from '../../components/Forms/SignUp';
import { useLocation, useNavigate } from 'react-router';
import { useEffect } from 'react';
import { useAppSelector } from '../../hooks/appHooks';

export default function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const { formType } = location.state || { formType: 'signin' };
  const { isUserSignIn } = useAppSelector((state) => state.project);

  useEffect(() => {
    if (isUserSignIn) {
      navigate('/characters');
    }
  }, [isUserSignIn, navigate]);

  return (
    <section className={classes.auth}>
      {formType === 'signup' ? <SignUp /> : <SignIn />}
    </section>
  );
}