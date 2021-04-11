import YandexMap from "../YandexMap/YandexMap"
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Info from '../Info/Info';
import DogInfo from '../DogInfo/DogInfo';
import CardOrder from '../CardOrder/CardOrder';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(1),
		textAlign: 'center',
		color: theme.palette.text.secondary,
		paddingTop: 10
	},
}));

function ExecutorAccount() {

	const classes = useStyles();

	return (
		<div className={classes.root}>
			<h3>Личный кабинет</h3>
			<Grid container spacing={3}>
				<Grid item xs={3}>
					<Paper className={classes.paper}>Мои данные</Paper>
					<Info />
					<button>Добавить питомца</button>
					<button>Добавить заказ</button>
					<button>Мои заказы</button>
					<button>Мои отзывы</button>
				</Grid>
				<Grid item xs={9}>
					<Paper className={classes.paper}>Ближайшие заказы</Paper>
					<Grid container spacing={5}>
						<Grid item xs={4}>
							<Paper className={classes.paper}>xs=4</Paper>
							<DogInfo />
						</Grid>
						<Grid item xs={4}>
							<Paper className={classes.paper}>xs=4</Paper>
						</Grid>
						<Grid item xs={4}>
							<Paper className={classes.paper}>xs=4</Paper>
						</Grid>
					</Grid>
					<Paper className={classes.paper}>Текущие заказы</Paper>
					<YandexMap />
				</Grid>
			</Grid>
		</div>
	
	)
}

export default ExecutorAccount



