import { AppBar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import styles from './header.module.css';

 function Header () {

  return (
    <AppBar position="fixed">
      <Typography>DOG WALKER</Typography>
      <div className={styles.wrap}>
      <Link className="links" to="/">Главная</Link>
      </div>
      <div className={styles.wrap}>
      <Link className="links" to="/register">Регистрация</Link>
      </div>
      <div className={styles.wrap}>
      <Link className="links" to="/login">Вход</Link>
      </div>
      <div className={styles.wrap}>
      <Link className="links" to="/account">Личный кабинет</Link>
      </div>
      <div className={styles.wrap}>
      <Link className="links" to="/services">Услуги</Link>
      </div>
      <div className={styles.wrap}>
      <a className="links" href="http://localhost:3001/auth/google">Google</a>
      </div>
    </AppBar>
  );
};

export default Header
