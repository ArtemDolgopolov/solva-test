import { ReactNode } from "react"
import classes from './Content.module.scss'

export type Props = {
 children: ReactNode
}

export default function Content({ children }: Props) {
 return <div className={classes.content}>{children}</div>
}