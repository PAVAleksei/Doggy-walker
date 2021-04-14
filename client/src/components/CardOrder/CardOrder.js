import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  changeOrderCustomerStatusRequested,
  changeOrderStatusInWork,
  closeOrderCustomer,
} from "../../redux/actionCreators/userAC";

const useStyles = makeStyles({
  root: {
    // maxWidth: 345,
    border: "1px solid #1C3E6A",
    height: 500,
    // width: 300,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
  },
  media: {
    height: 140,
  },
  pos: {
    margin: 0,
  },
  button: {
    // width: 350,
    height: 60,
  },
});

let socket = new WebSocket('ws://localhost:3001');

function CardOrder({
  id,
  description,
  executorId,
  date,
  price,
  address,
  requested,
  inWork,
  completed,
  closed,
  status,
  dogId,
}) {


  useEffect(() => {
    
    socket.onopen = () => {
     
      console.log('Websocket client connected');
    };


  
  }, [])

  const classes = useStyles();
  const dispatch = useDispatch();

  const dogs = useSelector((state) => state.user.animal);
  const dogPhoto = dogs.find((el) => el._id === dogId)?.avatar;
  // const status = useSelector(state => state.user.orders.filter(el => el._id === id))
  const editHandler = () => {};

  // утверждение исполнителя на заказ
  const approveExecutorHandler = (id) => {

    const messageToServer = {
          type: 'message',
          // payload: {
          message: id,
          // },
        }
    
    socket.send(JSON.stringify(messageToServer));

    dispatch(changeOrderStatusInWork(id));
  };

  const denyExecutorHandler = (id) => {
    dispatch(changeOrderCustomerStatusRequested(id));
  };

  const closeOrderHandler = () => {
    dispatch(closeOrderCustomer(id));
  };
  console.log(date);
  return (
    <Box className={classes.pos} m={4}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={dogPhoto}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom component="h2">
              Запланированная дата: {date.toLocaleString("ru-RU")}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Задание: {description}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Адрес: {address}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Стоимость: {price} рублей
            </Typography>
            <Typography variant="body3" color="textSecondary" component="h3">
              Статус задания: {status}
            </Typography>
            <Typography variant="body3" color="textSecondary" component="h3">
              {/* <Button color="inherit">
                  <Link to="/executorToCustomer">
                    Исполнитель
                  </Link>
                </Button> */}
            </Typography>
          </CardContent>
        </CardActionArea>

        {!requested ? (
          <CardActions align="center"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              onClick={editHandler}
              variant="outlined"
              size="small"
              color="primary"
              className={classes.button}
            >
              Подробнее
            </Button>
            {/* <Button
              variant="contained"
              size="small"
              color="secondary"
              className={classes.button}
            >
              Удалить
            </Button> */}
          </CardActions>
        ) : (
          ""
        )}

        {requested && !inWork ? (
          <CardActions
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              data-btn-approve="data-btn-approve"
              disabled={inWork}
              onClick={() => approveExecutorHandler(id)}
              variant="contained"
              size="small"
              color="primary"
              className={classes.button}
            >
              Одобрить исполнителя
            </Button>
            <Button
              disabled={inWork}
              onClick={() => denyExecutorHandler(id)}
              variant="contained"
              size="small"
              color="secondary"
              className={classes.button}
            >
              Отказать
            </Button>
          </CardActions>
        ) : (
          ""
        )}
        {completed && !closed ? (
          <CardActions
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              onClick={() => closeOrderHandler(id)}
              variant="contained"
              size="small"
              color="secondary"
              className={classes.button}
            >
              Закрыть
            </Button>
          </CardActions>
        ) : (
          ""
        )}
      </Card>
    </Box>
  );
}
export default CardOrder;
