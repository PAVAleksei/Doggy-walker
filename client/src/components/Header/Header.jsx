import {
  AppBar,
  Typography,
  Toolbar,
  IconButton,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import styles from "./header.module.css";

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

function Header() {
  const checkAuth = useSelector((state) => state.user.isAuth);
  // console.log(checkAuth);

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
            {checkAuth ? (
              <>
                <Button color="inherit">
                  <Link className={styles.navlinks} to="/account">
                    Личный кабинет
                  </Link>
                </Button>
                <Button color="inherit">
                  <a
                    className={styles.navlinks}
                    href="http://localhost:3001/auth/logout"
                  >
                    Выход
                  </a>
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit">
                  <Link className={styles.navlinks} to="/">
                    Главная
                  </Link>
                </Button>
                <Button color="inherit">
                  <Link className={styles.navlinks} to="/services">
                    Услуги
                  </Link>
                </Button>
                <Button color="inherit">
                  <Link className={styles.navlinks} to="/login">
                    Вход
                  </Link>
                </Button>
                <Button color="inherit">
                  <Link className={styles.navlinks} to="/register">
                    Регистрация
                  </Link>
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}

export default Header;
