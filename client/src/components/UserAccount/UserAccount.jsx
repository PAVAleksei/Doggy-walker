import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Info from "../Info/Info";
import DogInfo from "../DogInfo/DogInfo";
import CardOrder from "../CardOrder/CardOrder";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDogsAC } from "../../redux/actionCreators/dogAC";
import { Box, Button, jssPreset } from "@material-ui/core";
import {
	setOrders,
	setOrdersCustomer,
} from "../../redux/actionCreators/orderAc";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { signupAC } from "../../redux/actionCreators/userAC";
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
  accordeon: {
    width: "100%",
    paddingBottom: '8px'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

// let socket = new WebSocket('ws://localhost:3001');
// let socket = new WebSocket(window.location.origin.replace('http', 'ws'));

// let socket = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
let btnApprove = document.querySelector("[data-btn-approve]");

// btnApprove.onClick = function() {
//   console.log()
//   const messageToServer = {
//     type: 'newMessage',
//     payload: {
//       message: value,
//     },
//   }

//   socket.send(JSON.stringify(messageToServer));

// };

// function submitHandler() {

//   const messageToServer = {
//     type: 'newMessage',
//     payload: {
//       message: value,
//     },
//   }

//   socket.send(JSON.stringify(messageToServer));

// }

// socket.onmessage = function(event) {
//   const parseMessage = JSON.parse(event.data)

//   switch (parseMessage.type){
//     case 'greeting':

//     break

//     default:
//       break

//   }

// };

// socket.onclose = function(event) {
//   if (event.wasClean) {
//     alert(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
//   } else {
//     // например, сервер убил процесс или сеть недоступна
//     // обычно в этом случае event.code 1006
//     alert('[close] Соединение прервано');
//   }
// };

// socket.onerror = function(error) {
//   alert(`[error] ${error.message}`);
// };

export default function UserAccount() {
	const [messages, setMessages] = useState([]);
	const [load, setLoad] = useState(true);

	const classes = useStyles();

	const history = useHistory();
	const dispatch = useDispatch();
	const animalByUser = useSelector((state) => state.user.animal);
  console.log(animalByUser, 'animalByUser');
	const orders = useSelector((state) => state.user.orders);
	// const orders = useSelector(state => state.allOrders);

	useEffect(() => {
		fetch("http://localhost:3001/api/v1/dog")
			.then((response) => response.json())
			.then((responseFromServer) => dispatch(getDogsAC(responseFromServer)));
	}, []);
	// useEffect(() => {
	// 	fetch("http://localhost:3001/user/checkAuth", {
	// 		credentials: "include",
	// 	})
	// 		.then((res) => res.json())
	// 		.then((resFromServer) => dispatch(signupAC(resFromServer)))
	// 		.then(
	// 			setTimeout(() => {
	// 				setLoad(true);
	// 			}, 200)
	// 		);
	// }, []);

	const addOrderFormHandler = () => {
		history.push("/order");
	};

	const addDogFormHandler = () => {
		history.push("/addDog");
	};
	const handlerToAccount = () => {
		// history.push("/account");
		history.go(0);
	};

	return (
		<>
			{!load ? (
				<div style={{ paddingTop: "130px", paddingLeft: "80px" }}>
					<Louder />
				</div>
			) : (
					<div className={classes.root}>
						<h3>Личный кабинет Заказчика</h3>
						<Grid container spacing={3} direction="row">
							<Grid item xs={1}></Grid>
							<Grid item xs={3}>
								<Paper className={classes.paper}>Мои данные</Paper>
								<Info />
								{/* <Box m={3}>
									<Button variant="outlined" color="primary">
										Пополнить счет
                </Button>
								</Box> */}
								<Box m={3}>
									<Button variant="outlined">Мои заказы</Button>
								</Box>
								{/* <Box m={3}>
									<Button variant="outlined">Мои отзывы</Button>
								</Box> */}
								<Box m={3}>
									<Button variant="outlined" onClick={addOrderFormHandler}>
										Добавить заказ
                </Button>
								</Box>
								<Box m={3}>
									<Button variant="outlined" onClick={addDogFormHandler}>
										Добавить питомца
                </Button>
								</Box>
								<Box m={3}>
									<Button variant="outlined"><a href="https://t.me/Doggy_walker_bot">Telegram Bot</a></Button>
								</Box>
								<Box m={3}>
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

        <Grid item xs={7} direction="column">
          <div className={classes.accordeon}>
            <Accordion >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>Мои питомцы</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid item container spacing={2} direction="row">
                  {animalByUser?.length ? (
                    animalByUser?.map((dog) => (
                      <Grid item xs={12} sm={3}>
                        <DogInfo
                          key={dog._id}
                          id={dog._id}
                          nickname={dog.nickname}
                          breed={dog.breed}
                          gender={dog.gender}
                          weight={dog.weight}
                          pullsTheLeash={dog.pullsTheLeash}
                          contactWithOther={dog.contactWithOther}
                          phobia={dog.phobia}
                          letGo={dog.letGo}
                          avatar={dog.avatar}
                        />
                      </Grid>
                    ))
                  ) : (
                    <p>Пока нет сохраненных питомцев</p>
                  )}
                </Grid>
              </AccordionDetails>
            </Accordion>
          </div>

								<Grid item>
									<Paper className={classes.paper}>Текущие заказы</Paper>
									<Box m={2}>
										<Grid item container spacing={2} direction="row">
											{orders?.length ? (
												orders?.map((order) => (
													<Grid item xs={12} sm={3}>
														<CardOrder
															key={order._id}
															id={order._id}
															description={order.description}
															date={new Date(order.date)}
															price={order.price}
															address={order.address.name}
															requested={order.requested}
															inWork={order.inWork}
															completed={order.completed}
															closed={order.closed}
															status={order.status}
															dogId={order.dogId}
															executorId={order.executorId}
														/>
													</Grid>
												))
											) : (
													<p>Нет заказов</p>
												)}
										</Grid>
									</Box>
								</Grid>
							</Grid>
							<Grid item xs={1}></Grid>
						</Grid>
					</div>
				)}
		</>
	);
}
