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

const DoneOrderItem = ({
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
                Дата выгула:{date.toLocaleString("ru-RU")}
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
                  Статус заказа: Заказ завершен
                </Box>
              </Typography>
            </div>
          </CardContent>
        </CardActionArea>
        <CardActions display="flex" justifyContent="center" alignItems="center">
          Вы полнили заказ
        </CardActions>
      </Card>
    </Box>
  );
};

export default DoneOrderItem;
