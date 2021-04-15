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
import { useEffect, useState } from "react";
import { getDogsAC } from "../../redux/actionCreators/dogAC";

const useStyles = makeStyles({
  root: {
    // maxWidth: 345,
    // border: "1px solid #1C3E6A",
    width: 450,
    height: 470,
    marginBottom: 40,
  },
  media: {
    height: 190,
  },
  pos: {
    margin: 2,
  },
  profile: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
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
  dogId,
}) => {
  const classes = useStyles();
  let history = useHistory();
  let dispatch = useDispatch();

  useEffect(() => {
    fetch("http://localhost:3001/api/v1/dog")
      .then((response) => response.json())
      .then((responseFromServer) => dispatch(getDogsAC(responseFromServer)));
  }, []);

  const allDogs = useSelector((state) => state.dogs);
  const imgDog = allDogs.find((el) => el._id == dogId).avatar;

  return (
    <Box className={classes.pos} m={1}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={imgDog}
            title="Contemplative Reptile"
          />
          <CardContent className={classes.profile}>
            <Typography gutterBottom component="h2">
              Дата выгула: {new Date(date).toLocaleString("ru-RU")}
            </Typography>
            {/* <Typography variant="body2" color="textSecondary" component="p">
                Описание: {description}
              </Typography> */}
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
            <Box
              textAlign="center"
              fontWeight="fontWeightBold"
              m={6}
              fontFamily="Monospace"
            >
              <Typography fontWeight="fontWeightBold" alignItems="center">
                Вы выполнили заказ
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default DoneOrderItem;
