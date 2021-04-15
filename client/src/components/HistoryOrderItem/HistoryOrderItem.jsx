import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Typography,
  Button,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
  Card,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { changeOrderStatusCompleted } from "../../redux/actionCreators/orderAc";
import { closeOrderCustomer } from "../../redux/actionCreators/userAC";
import { getDogsAC } from "../../redux/actionCreators/dogAC";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
  root: {
    // maxWidth: 345,
    // border: "1px solid #1C3E6A",
    width: 450,
    height: 470,
    marginBottom: 40,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  media: {
    height: 180,
  },
  pos: {
    margin: 0,
  },
});

const HistoryOrderItem = ({
  description,
  date,
  price,
  address,
  requested,
  inWork,
  completed,
  closed,
  order,
  id,
  dogId,
}) => {
  const classes = useStyles();
  let history = useHistory();
  let dispatch = useDispatch();
  const [curDog, setCurDog] = useState(null);
  const [imgDog, setImgDog] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/api/v1/dog")
      .then((response) => response.json())
      .then((responseFromServer) => dispatch(getDogsAC(responseFromServer)));
  }, []);
  const allDogs = useSelector((state) => state.dogs);

  useEffect(() => {
    const currDog = allDogs.find((el) => el._id == dogId);
    if (currDog) {
      setImgDog(currDog.avatar);
    }
  });

  // const imgDog = allDogs.find((el) => el._id == dogId);
  // console.log(imgDog.avatar);

  const handlerDoneOrder = () => {
    dispatch(changeOrderStatusCompleted(id));

    
    // таймер на закрытие задачи у заказчика
    dispatch(closeOrderCustomer(id));
  };

  return (
    <Box className={classes.pos} m={4}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={imgDog}
            title="Contemplative Reptile"
          />
          <CardContent>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Typography gutterBottom component="h2">
                Запланированная дата: {new Date(date).toLocaleString("ru-RU")}
              </Typography>
              <Typography variant="body2" color="text.primary" component="p">
                Описание: {description}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Адрес: {address}
              </Typography>
              <Typography variant="body2" color="text.primary" component="p">
                Стоимость: {price} рублей
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <Box m={1} color="text.primary">
                  Статус:
                  {order.inWork && !order.completed && (
                    <span> В процессе выполнения</span>
                  )}
                  {!order.inWork && (
                    <span> Ожидает подтверждения от заказчика</span>
                  )}
                  {order.completed && (
                    <span>Ожидает закрытие от заказчика</span>
                  )}
                </Box>
              </Typography>
            </div>
          </CardContent>
        </CardActionArea>
        <CardActions display="flex" justifyContent="center" alignItems="center">
          {order.inWork ? (
            <Button
              variant="contained"
              size="small"
              disabled={order.completed}
              color="primary"
              onClick={handlerDoneOrder}
            >
              {order.completed
                ? "Ожидание подтверждения от заказчика"
                : "Я Выполнил"}
            </Button>
          ) : (
            <span>
              <b>Дождитесь чтобы заказачик приянл вашу заявку</b>
            </span>
          )}
        </CardActions>
      </Card>
    </Box>
  );
};

export default HistoryOrderItem;
