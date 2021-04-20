import YandexMap from "../YandexMap/YandexMap";
import React, { Children, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Info from "../Info/Info";
import DogInfo from "../DogInfo/DogInfo";
import CardOrder from "../CardOrder/CardOrder";
import {
	Box,
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	jssPreset,
	Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import CardList from "../CardList/CardList";
import { useHistory, useParams } from "react-router-dom";
import { setError } from "../../redux/actionCreators/errorAC";
import { changeOrderStatusRequested } from "../../redux/actionCreators/orderAc";
import {
	addOrderCustomer,
	addOrderFromExecutorThunk,
} from "../../redux/actionCreators/userAC";
import { getDogsAC } from "../../redux/actionCreators/dogAC";
import Louder from "../Louder/Louder";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(1),
		textAlign: "center",
		color: theme.palette.text.secondary,
		paddingTop: 10,
	},
	rootDetail: {
		// border: "1px solid #1C3E6A",
		width: 480,
		height: 600,
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center",
		flexWrap: "wrap",
	},
	detail: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	media: {
		height: 360,
	},
}));

const DetailOrder = () => {
	const classes = useStyles();
	let history = useHistory();
	const dispatch = useDispatch();
	const [curOrder, setCurOrder] = useState(null);
	const [dogId, setDogId] = useState("");
	const [curDog, setCurDog] = useState(null);
	const [curDogAvatat, setCurDogAvatat] = useState(null);
	const [load, setLoad] = useState(true);
	let { id } = useParams();


	const allOrders = useSelector((state) => state.allOrders);
	const userOrders = useSelector((state) => state.user.orders);
	const allDogs = useSelector((state) => state.dogs);

	const sendRequestHandler = (id) => {
		dispatch(setError({ status: false, text: "" }));

		dispatch(changeOrderStatusRequested(id));
		dispatch(addOrderFromExecutorThunk(id));
	};

	const handlerHistoryOrders = () => {
		history.push("/historyOrders");
	};
	const handlerToAccount = () => {
		history.push("/account");
	};

	useEffect(() => {
		fetch("http://127.0.0.1:3001/api/v1/dog")
			.then((response) => response.json())
			.then((responseFromServer) => dispatch(getDogsAC(responseFromServer)));
	}, []);

	useEffect(() => {
		const currentOrder =
			allOrders.find((el) => el._id === id) ||
			userOrders.find((el) => el._id === id);
		if (currentOrder) {
			setCurOrder(currentOrder);
			setDogId(currentOrder.dogId);
			const currentDog = allDogs.find(
				(element) => element._id === currentOrder.dogId
			);
			setCurDog(currentDog);


      console.log(currentDog.avatar);
      setCurDogAvatat(currentDog.avatar);
      // setTimeout(() => {
      //   setLoad(true);
      // }, 300);
    }
  }, [allOrders, userOrders]);


	return (
		<>
			{curOrder && load ? (
				<div className={classes.root}>
					<h3>Подробная информация о заказе</h3>

					<Box m={3}>
						<Grid container spacing={3} direction="row">
							<Grid item xs={3}>
								<Paper className={classes.paper}>Мои данные</Paper>
								<Info />
								<Box m={3}>
									<Button variant="outlined" onClick={handlerHistoryOrders}>
										Мои текущие заказы
                  </Button>
								</Box>
								<Box m={3}>
									<Button variant="outlined">Мои отзывы</Button>
								</Box>
								<Box m={5}>
									<Grid>
										<Button
											onClick={() => handlerToAccount()}
											variant="contained"
											size="large"
											color="primary"
										>
											Личный кабинет
                    </Button>
									</Grid>
								</Box>
							</Grid>
							<Grid item xs={8} direction="column">
								<Grid item>
									<Paper className={classes.paper}>Информация о заказе</Paper>
									<Box className={classes.pos} m={1.5}>
										<Card className={(classes.rootDetail, classes.detail)}>
											<CardActionArea>
												<CardMedia
													className={classes.media}
													image={curDogAvatat}
													title="Contemplative Reptile"
												/>
												<CardContent>
													<Typography gutterBottom component="h2">
														Запланированная дата:&nbsp;
                            {new Date(curOrder.date).toLocaleString("ru-RU")}
													</Typography>
													<Typography
														variant="body2"
														color="textSecondary"
														component="p"
														variant="h6"
													>
														Комментарии от заказчика: {curOrder.description}
													</Typography>
													<Typography
														variant="body2"
														color="textSecondary"
														component="p"
													>
														Адрес: {curOrder.address.name}
													</Typography>
													<Typography
														variant="body2"
														color="textSecondary"
														component="p"
													>
														Стоимость: {curOrder.price} рублей
                          </Typography>
												</CardContent>
											</CardActionArea>
											<CardActions classes={classes.btn}>
												<Button
													variant="contained"
													disabled={curOrder.requested}
													size="large"
													color="primary"
													onClick={() => sendRequestHandler(id)}
												>
													Подать заявку
                        </Button>
											</CardActions>
										</Card>
									</Box>
								</Grid>
							</Grid>
						</Grid>
					</Box>
				</div>
			) : (
					<div style={{ paddingTop: "130px", paddingLeft: "80px" }}>
						<Louder />
					</div>
				)}
		</>
	);
};

export default DetailOrder;
