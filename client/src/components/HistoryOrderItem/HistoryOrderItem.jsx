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

const useStyles = makeStyles({
  root: {
    // maxWidth: 345,
    border: "1px solid #1C3E6A",
    width: 450,
    height: 470,
    marginBottom: 40,
  },
  media: {
    height: 140,
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
}) => {
  const classes = useStyles();
  let history = useHistory();
  let dispatch = useDispatch();

  const handlerDoneOrder = () => {
    console.log(id);
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
            image="https://ampravda.ru/files/articles-2/90408/cvyc25f7qt98-1-640.jpg"
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
                Запланированная дата:{date.toLocaleString("ru-RU")}
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
              <Typography variant="body2" color="textSecondary" component="p">
                <Box fontWeight="fontWeightBold" m={1}>
                  Статус заказа:
                  {order.inWork && !order.completed && (
                    <span>В процессе выполнения</span>
                  )}
                  {!order.inWork && (
                    <span>Ожидает подтверждения от заказчика</span>
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
                ? "Я закрыл заказ, жду чтобы заказчик закрыл"
                : "Я Выполнил, жду чтобы заказчик подтвердил"}
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
