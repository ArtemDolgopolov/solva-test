import classes from './Loader.module.scss'

export default function Loader() {
  return (
    <div className={classes.loader_wrapper} data-testid="loader">
      <div className={classes.loader} />
    </div>
  );
}