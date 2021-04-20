import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getDogAC } from '../../redux/actionCreators/dogAC';
import { Box, Grid, Link, Paper } from '@material-ui/core';
import { deleteFetchDogAC } from '../../redux/actionCreators/userAC';

const useStyles = makeStyles(theme => ({
	root: {
		margin: 'auto',
		padding: 'auto',
		height: '510px',
		width: '34rem',
	},
	boxRoot: {
		display: ' flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},

	media: {
		height: 250,
	},
	infiDog: {
		alignItems: 'left',
	},
	paper: {
		padding: theme.spacing(1),
		textAlign: "center",
		color: theme.palette.text.secondary,
		paddingTop: 10,
		width: '33rem'
	},

}));

export default function Dog() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { id } = useParams()
  console.log(id, 'id');

	// const dog = useSelector(state => state.dog);
	const userDog = useSelector(state => state.user.animal);
  console.log(userDog, 'userDog');

	const currDog = userDog.find(el => el._id === id)
  console.log(currDog, 'currDog');
	//   console.log(dog, 'dog');

	const history = useHistory();

	useEffect(() => {
		fetch(`http://127.0.0.1:3001/api/v1/dog/${id}`)
			.then(response => response.json())
			.then(responseFromServer => dispatch(getDogAC(responseFromServer)))
	}, [])

	const onClickHandler = () => {
		dispatch(deleteFetchDogAC(id))
		history.push('/account')
	}

	return (
		<Box m={2} className={classes.boxRoot}>
			<h3>Подробная информация о питомце</h3>
			{/* <Grid item xs={12}>орроорло</Grid> */}
			<Paper className={classes.paper}>Мои данные</Paper>
			<Box marginTop={3} >
				<Card className={classes.root}>
					<CardActionArea>
						<CardMedia
							className={classes.media}
							image={currDog.avatar}
							title="Contemplative Reptile"
						/>


						<CardContent className={classes.infiDog}>
							<Typography gutterBottom variant="h5" component="h2">
								{currDog.nickname}
							</Typography>
							<Box ml={19}>
								<Typography align="left" variant="body2" color="textSecondary" component="p">
									Порода: {currDog.breed}
								</Typography>
								<Typography align="left" variant="body2" color="textSecondary" component="p">
									Пол: {currDog.gender}
								</Typography>
								<Typography align="left" variant="body2" color="textSecondary" component="p">
									Вес: {currDog.weight}
								</Typography>
								<Typography align="left" variant="body2" color="textSecondary" component="p">
									Чего боится: {currDog.phobia}
								</Typography>
								<Typography align="left" variant="body2" color="textSecondary" component="p">
									Тянет за поводок: {currDog.pullsTheLeash}
								</Typography>
								<Typography align="left" variant="body2" color="textSecondary" component="p">
									Отпускать с поводка: {currDog.letGo}
								</Typography>
								<Typography align="left" variant="body2" color="textSecondary" component="p">
									Контакт с другими животными: {currDog.contactWithOther}
								</Typography>
							</Box>
						</CardContent>
					</CardActionArea>
					<CardActions>
						<Button onClick={onClickHandler} className={classes.posi} size="small" >Удалить</Button>
					</CardActions>
				</Card>
			</Box>
		</Box>
	);
}
///
