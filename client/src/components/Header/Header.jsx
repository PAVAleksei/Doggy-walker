import {
	AppBar,
	Typography,
	Toolbar,
	IconButton,
	Button,
	Box,
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu'

import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import styles from "./header.module.css";

const useStyles = makeStyles((theme) => ({
	root: {

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
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position="fixed">
				<Toolbar>
					{/* <IconButton edge="start"
            color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
					<Typography align="left" variant="h6" className={classes.title}>
						DOGGY WALKER
            </Typography>
					<Box mr={1}>
						{checkAuth ? (
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
									<Link className={styles.navlinks} to="/account">
										Личный кабинет
                  </Link>
								</Button>
								<Button color="inherit">
									<a
										className={styles.navlinks}
										href="http://127.0.0.1:3001/auth/logout"
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
									{/* <Button color="inherit"><Link className={styles.navlinks} to="/login">Вход</Link>
                  </Button> */}

									<Button color="inherit">
										<Link className={styles.navlinks} to="/executorLogin">
											Исполнитель
                  </Link>
									</Button>

									{/* <Button color="inherit"><Link className={styles.navlinks} to="/register">Регистрация</Link>
                  </Button> */}
									<Button color="inherit">
										<Link className={styles.navlinks} to="/customerLogin">
											Заказчик
                  </Link>
									</Button>
								</>
							)}
					</Box>
				</Toolbar>
			</AppBar>
		</div>


	);
}

export default Header;


