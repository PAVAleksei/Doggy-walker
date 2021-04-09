import { AppBar, Typography, Toolbar, IconButton, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';
import styles from './header.module.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


 function Header () {

  const classes = useStyles();

  return (

    <>
    <div className={classes.root}>
      <AppBar position="static">
       <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            DOG WALKER
          </Typography>
          <Button color="inherit"><Link className={styles.navlinks} to="/">Главная</Link></Button>
          <Button color="inherit"><Link className={styles.navlinks} to="/services">Услуги</Link></Button>
          <Button color="inherit"><Link className={styles.navlinks} to="/register">Регистрация</Link></Button>
          <Button color="inherit"><Link className={styles.navlinks} to="/login">Вход</Link></Button>
          <Button color="inherit"><Link className={styles.navlinks} to="/account">Личный кабинет</Link></Button>
          <Button color="inherit"><Link className={styles.navlinks} to="/exaccount">ЛК исполнителя</Link></Button>
          <a href="http://localhost:3001/auth/logout">
                  google logout
                </a>
        </Toolbar>
      </AppBar>
    </div>
    </>

  );
};

export default Header
