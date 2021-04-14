import YandexMap from "../YandexMap/YandexMap";
import React, { useEffect, useState } from "react";
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
    border: "1px solid #1C3E6A",
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

      // setCurDogAvatat(currentDog.avatar);
    }
  }, [allOrders, userOrders]);

  return (
    <div className={classes.root}>
      <h3>Подробная информация о заказе</h3>
      {/* <img src={curDog.avatar} alt="" /> */}
      {curOrder && (
        <Grid container spacing={3} direction="row">
          <Grid item xs={3}>
            <Paper className={classes.paper}>Мои данные</Paper>
            <Info />
            <Box m={1}>
              <Button variant="outlined" onClick={handlerHistoryOrders}>
                Мои текщие заказы
              </Button>
            </Box>
            <Box m={1}>
              <Button variant="outlined">Мои отзывы</Button>
            </Box>
            <Box m={1}>
              <Grid>
                <Button
                  onClick={() => handlerToAccount()}
                  variant="contained"
                  size="small"
                  color="primary"
                >
                  Личный кабинет
                </Button>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={8} direction="column">
            <Grid item>
              <Paper className={classes.paper}>Заказ</Paper>
              <p>Информация о заказе</p>
              <Box className={classes.pos} m={4}>
                <Card className={classes.rootDetail}>
                  <CardActionArea>
                    <CardMedia
                      className={curDogAvatat}
                      // image={curDog.avatar}
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom component="h2">
                        Запланированная дата:&nbsp;
                        {curOrder.date.replace("T", " ").replace(".000Z", "")}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Задание: {curOrder.description}
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
                  <CardActions
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Button
                      variant="contained"
                      disabled={curOrder.requested}
                      size="small"
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
      )}
    </div>
  );
};

export default DetailOrder;
