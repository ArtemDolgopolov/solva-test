import { Link, useNavigate } from 'react-router-dom'
import classes from './Forms.module.scss'
import { signUpSchema } from '../../utils/ValidationSchemas'
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldValues, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../services/firebaseAuth'
import { FirebaseError } from 'firebase/app'
import {
  transformAuthErrorMessage,
  isUserInputAuthError
} from '../../utils/authErrorMessages'
import { usePlaceholdersContext } from '../../hooks/appHooks'
import Loader from '../Loader/Loader'
import { emitNotification } from '../../utils/helpers'
import { useDispatch } from 'react-redux'
import { updateUserStatus } from '../../features/projectSlice'

export default function SignUp() {
  const [firebaseErrors, setFirebaseErrors] = useState<FirebaseError | null>(
    null
  )
  const [isLoading, setIsLoading] = useState(false)

  const { t } = usePlaceholdersContext()

  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm({
    resolver: yupResolver(signUpSchema),
    mode: 'onChange'
  })

  const navigate = useNavigate()

  const watchEmailField = watch('email')

  useEffect(() => {
    setFirebaseErrors(null)
  }, [watchEmailField])

  const isAuthError = () => {
    if (firebaseErrors) {
      return isUserInputAuthError(firebaseErrors, 'email')
    }
    return false
  }

  const isFormValid = () => {
    return isValid && !Boolean(firebaseErrors)
  }

  const onSubmit = async (fieldValues: FieldValues) => {
    const { email, password } = fieldValues
    try {
      setIsLoading(true)
      await createUserWithEmailAndPassword(auth, email, password)
      dispatch(updateUserStatus(true))
      setFirebaseErrors(null)
      emitNotification('success', t('toastSuccessSignUp'))
      navigate('/')
    } catch (e) {
      if (e instanceof FirebaseError) {
        setFirebaseErrors(e)
      } else {
        emitNotification('error', 'Error on account sign up!')
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={classes.form_heading}>{t('signUp')}</h2>
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
        {isAuthError() && (
          <p className={classes.error_message}>
            {transformAuthErrorMessage(firebaseErrors!.code)}
          </p>
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
            errors.password && classes.error_border
          }`}
          autoComplete="new-password"
        />
        {errors.password && (
          <p className={classes.error_message}>{errors.password.message}</p>
        )}
      </div>
      <div className={classes.input_container}>
        <label htmlFor="passwordConfirm">{t('confirmPassword')}</label>
        <input
          id="passwordConfirm"
          type="password"
          placeholder={t('confirmYourPassword')}
          {...register('passwordConfirm')}
          className={`${classes.input} ${
            errors.passwordConfirm && classes.error_border
          }`}
          autoComplete="new-password"
        />
        {errors.passwordConfirm && (
          <p className={classes.error_message}>
            {errors.passwordConfirm.message}
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
        className={`${classes.button_submit} ${
          !isFormValid() && classes.button_disabled
        }`}
        disabled={!isFormValid()}
      >
        {t('signUpButton')}
      </button>
      <p className={classes.sign}>
        {t('alreadyHaveAccount')}
        <Link
          className={classes.sign_link}
          to={'/auth'}
          state={{ formType: 'signin' }}
        >
          {' '}
          {t('signInButton')}
        </Link>
      </p>
    </form>
  );
}