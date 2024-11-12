import classes from './UserPanel.module.scss'
import UserIcons from '../../components/UserIcons/UserIcons'

export default function UserPanel() {
 return (
  <div className={classes.user_panel}>
    <UserIcons  />
  </div>
 )
}