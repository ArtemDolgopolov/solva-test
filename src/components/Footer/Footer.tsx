import classes from './Footer.module.scss';

export default function Footer() {
  return (
    <footer>
      <div className={classes.footer_content}>
        <div className={classes.text_wrapper}>
          <p>All rights reserved (с)</p>
        </div>
        <div className={classes.github_wrapper}>
          <a
            href="https://github.com/ArtemDolgopolov"
            target="_blank"
            rel="noopener noreferrer"
          >
            ArtemDolgopolov
          </a>
        </div>

        <div className={classes.year_wrapper}>© 2024</div>
      </div>
    </footer>
  );
}
