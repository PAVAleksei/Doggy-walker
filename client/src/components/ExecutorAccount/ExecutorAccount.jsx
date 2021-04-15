import YandexMap from "../YandexMap/YandexMap";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Info from "../Info/Info";
import DogInfo from "../DogInfo/DogInfo";
import CardOrder from "../CardOrder/CardOrder";
import { Box, Button, jssPreset } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import CardList from "../CardList/CardList";
import { useHistory } from "react-router";
import { setOrders } from "../../redux/actionCreators/orderAc";
import Louder from "../Louder/Louder";
import { getDogsAC } from "../../redux/actionCreators/dogAC";

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
	button: {
		width: '100%'
	}
}));

function ExecutorAccount() {
  //обновялет все ордера в редакс
  // const allOrders = useSelector((state) => state.allOrders);
  // useEffect(() => dispatch(setOrders()), [allOrders]);

  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  const handlerHistoryOrders = () => {
    history.push("/historyOrders");
  };
  const handlerDoneOrders = () => {
    history.push("/doneOrders");
  };

  useEffect(() => {
    fetch("http://localhost:3001/api/v1/dog")
      .then((response) => response.json())
      .then((responseFromServer) => dispatch(getDogsAC(responseFromServer)));
  }, []);

  useEffect(() => {
    dispatch(setOrders());
    setTimeout(() => {
      setLoad(true);
    }, 200);
  })
	return (
		<>
			{!load ? (
				<div style={{ paddingTop: "130px", paddingLeft: "80px" }}>
					<Louder />
				</div>
			) : (
					<Box m={3}>
						<div className={classes.root}>
							<h3>Личный кабинет Исполнителя</h3>
							<Grid container spacing={3} direction="row">

								<Grid item xs={3}>
									<Box m={1}>
										<Paper className={classes.paper}>Мои данные</Paper>
									</Box>
									{/* <Box xs={3}> */}
									<Info xs={3} />
									{/* </Box> */}

									<Box m={1}>
										<Button className={classes.button} variant="outlined" onClick={handlerHistoryOrders}>
											Текущие заказы
                  			</Button>
									</Box>

									<Box m={1}>
										<Button className={classes.button} variant="outlined" onClick={handlerDoneOrders}>
											Выполненные заказы
                  			</Button>
									</Box>

									<Box m={1}>
										<Button className={classes.button} variant="outlined">Мои отзывы</Button>
									</Box>

									<Box m={1}>
										<Button className={classes.button} variant="outlined"><a style={{ 'text-decoration': 'none', 'color': 'rgba(0, 0, 0, 0.87)' }} href="https://t.me/Doggy_walker_bot">Telegram Bot</a></Button>
									</Box>

								</Grid>

								<Grid item xs={8} direction="column">
									{/* <Grid item> */}
									<Box m={1}>
										<Paper className={classes.paper}>Все открытые заказы</Paper>
										<CardList />
										{/* </Grid> */}
									</Box>
									<Grid item>
										<Paper className={classes.paper}>Все заказы на карте</Paper>
										<Box m={3}>
											<Grid item container spacing={2} direction="row">
												<YandexMap />
											</Grid>
										</Box>
									</Grid>
								</Grid>
							</Grid>
						</div>
					</Box>
				)}
		</>
	);
}

export default ExecutorAccount;
