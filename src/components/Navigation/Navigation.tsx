import { NavLink } from "react-router-dom"
import { useAppSelector, usePlaceholdersContext } from "../../hooks/appHooks"
import UserPanel from "../UserPanel/UserPanel"
import classes from './Navigation.module.scss'

export default function Navigation() {
 const { t } = usePlaceholdersContext()
 const { isUserSignIn } = useAppSelector((state) => state.project)

 const currentLinkAppearance = () => {
  const link = isUserSignIn ? '/characters' : '/'
  const title = isUserSignIn ? t('mainPage') : t('welcomeHeader')

  return (
   <NavLink className={classes.nav_link} to={link}>
    {title}
   </NavLink>
  )
 }

 return (
  <nav className={classes.container}>
   <NavLink className={`${classes.nav_link} ${classes.logo_link}`} to="/" />
   {currentLinkAppearance()}
   <UserPanel />
  </nav>
 )
}

