import classes from './Header.module.scss'
import { useEffect, useState } from 'react'
import { useAppSelector } from '../../hooks/appHooks'
import Navigation from '../Navigation/Navigation'

export default function Header() {
  const [isHeaderAnimated, setIsHeaderAnimated] = useState(false)
  
  const { isUserSignIn } = useAppSelector((state) => state.project)

  useEffect(() => {
   const headerAnimationStateHandler = () => {
    const { scrollY } = window
    setIsHeaderAnimated(scrollY > 0)
   }
   window.addEventListener('scroll', headerAnimationStateHandler)

   return () => 
     window.removeEventListener('scroll', headerAnimationStateHandler)
  }, [])

  const headerAnimationHandler = () => {
   return isHeaderAnimated ? classes.header_animated : ''
  }

  return (
   <header className={`${classes.header} ${headerAnimationHandler()}`}>
     {isUserSignIn !== null && <Navigation />}
   </header>
  )
}