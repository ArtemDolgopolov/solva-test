import classes from './UserIcons.module.scss'
import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { updateUserStatus } from "../../features/projectSlice"
import { useAppDispatch, usePlaceholdersContext } from "../../hooks/appHooks"
import { auth } from "../../services/firebaseAuth"
import { emitNotification, formatDisplayedName } from "../../utils/helpers"

export default function UserIcons() {
 const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
 const [currentUser, setCurrentUser] = useState<string | null>(null)
 const { t } = usePlaceholdersContext()
 const dispatch = useAppDispatch();

 const navigate = useNavigate()

 useEffect(() => {
  onAuthStateChanged(auth, (user) => {
   if (user) {
    dispatch(updateUserStatus(true))
    setIsUserLoggedIn(true)
    setCurrentUser(user.email)
   } else {
    setIsUserLoggedIn(false)
    setCurrentUser(null)
   }
  })
 }, [dispatch])

 const signOutButtonHandler = async () => {
   try {
    await auth.signOut()
    dispatch(updateUserStatus(false))
    emitNotification('success', t('toastSuccessLogout'))
    navigate('/')
   } catch {
    emitNotification('error', t('toastErrorLogout'))
   }
 }

 return (
  <div className={classes.user_icons_wrapper}>
    {isUserLoggedIn ? (
      <>
        <div
          className={`${classes.user_icon} ${classes.icon_signout}`}
          aria-label="sign out button"
          onClick={signOutButtonHandler}
        />
        {currentUser && (
          <span className={classes.current_user}>
            {formatDisplayedName(currentUser)}
          </span>
        )}
      </>
    ) : (
      <>
        <NavLink
          className={`${classes.user_icon} ${classes.icon_signup}`}
          aria-label="sign up button"
          to={'/auth'}
          state={{ formType: 'signup' }}
        />
        <NavLink
          className={`${classes.user_icon} ${classes.icon_signin}`}
          aria-label="sign in button"
          to={'/auth'}
          state={{ formType: 'signin' }}
        />
      </>
    )}
  </div>
);
}