import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Info from '../Info/Info';
import DogInfo from '../DogInfo/DogInfo';
import Order from '../Order/Order';
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

export default function CenteredGrid() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
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
					<Paper className={classes.paper}>Мои питомцы</Paper>
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
					<Paper className={classes.paper}>Мои заказы</Paper>
					<Grid container spacing={5}>
						<Grid item xs={4}>
							<Paper className={classes.paper}>xs=4</Paper>
							<CardOrder />
						</Grid>
						<Grid item xs={4}>
							<Paper className={classes.paper}>xs=4</Paper>
						</Grid>
						<Grid item xs={4}>
							<Paper className={classes.paper}>xs=4</Paper>
						</Grid>
					</Grid>
				</Grid>


			</Grid>
		</div>
	);
}
