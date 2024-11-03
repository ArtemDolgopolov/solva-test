import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import classes from './Forms.module.scss'
import { signInSchema } from '../../utils/ValidationSchemas'
import { FieldValues, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { auth, signInWithEmailAndPassword } from '../../services/firebaseAuth'
import { FirebaseError } from 'firebase/app'
import { isUserInputAuthError } from '../../utils/authErrorMessages'
import { usePlaceholdersContext } from '../../hooks/appHooks'
import Loader from '../Loader/Loader'
import { emitNotification } from '../../utils/helpers'
import { useDispatch } from 'react-redux'
import { updateUserStatus } from '../../features/projectSlice'

export default function SignUp() {
  const [firebaseErrors, setFirebaseErrors] = useState<FirebaseError | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false)

  const { t } = usePlaceholdersContext()

  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm({
    resolver: yupResolver(signInSchema),
    mode: 'onChange'
  });

  const watchEmailField = watch('email');
  const watchPasswordField = watch('password');

  useEffect(() => {
    setFirebaseErrors(null)
  }, [watchEmailField, watchPasswordField])

  const navigate = useNavigate()

  const isFormValid = () => {
    return isValid && !Boolean(firebaseErrors)
  }

  const onSubmit = async (fieldValues: FieldValues) => {
    const { email, password } = fieldValues

    try {
      setIsLoading(true)
      await signInWithEmailAndPassword(auth, email, password)
      dispatch(updateUserStatus(true))
      setFirebaseErrors(null)
      navigate('/')
      emitNotification('success', t('toastSuccessSignIn'))
    } catch (e) {
      if (e instanceof FirebaseError) {
        setFirebaseErrors(e)
      } else {
        emitNotification('error', t('toastSuccessLogout'))
      }
    } finally {
      setIsLoading(false)
    }
  };

  const isAuthError = () => {
    if (firebaseErrors) {
      return isUserInputAuthError(firebaseErrors, 'invalid-credential')
    }
    return false
  };

  if (isLoading) {
    return <Loader />
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={classes.form_heading}>{t('signIn')}</h2>
      <div className={classes.input_container}>
        <label htmlFor="email">{t('email')}</label>
        <input
          id="email"
          {...register('email')}
          placeholder={t('enterYourEmail')}
          className={`${classes.input} ${
            (errors.email || isAuthError()) && classes.error_border
          }`}
          autoComplete="email"
        />
        {errors.email && (
          <p className={classes.error_message}>{errors.email.message}</p>
        )}
      </div>
      <div className={classes.input_container}>
        <label htmlFor="password">{t('password')}</label>
        <input
          id="password"
          type="password"
          placeholder={t('enterYourPassword')}
          {...register('password')}
          className={`${classes.input} ${
            (errors.password || isAuthError()) && classes.error_border
          }`}
          autoComplete="new-password"
        />
        {errors.password && (
          <p className={classes.error_message}>{errors.password.message}</p>
        )}
        {isAuthError() && (
          <p
            className={`${classes.error_message} ${classes.error_message_auth}`}
          >
            {t('noUserFound')}
          </p>
        )}
      </div>

      {firebaseErrors && !isAuthError() && (
        <p
          className={`${classes.error_message} ${classes.error_message_unknown}`}
        >
          {firebaseErrors.message}
        </p>
      )}

      <button
        type="submit"
        className={`${classes.button_submit} ${
          !isFormValid() && classes.button_disabled
        }`}
        disabled={!isFormValid()}
      >
        {t('signInButton')}
      </button>
      <p className={classes.sign}>
        {t('dontHaveAccount')}
        <Link
          className={classes.sign_link}
          to={'/auth'}
          state={{ formType: 'signup' }}
        >
          {' '}
          {t('registerHere')}
        </Link>
      </p>
    </form>
  )
}