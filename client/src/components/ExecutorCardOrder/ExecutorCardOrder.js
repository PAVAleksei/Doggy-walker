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
import { getDogsAC } from "../../redux/actionCreators/dogAC";
import { useEffect } from "react";

const useStyles = makeStyles({
  root: {
    // maxWidth: 345,
    border: "1px solid #1C3E6A",
    // width: 340,
    height: 440,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  media: {
    height: 200,
  },
  pos: {
    margin: 0,
  },
});

function ExecutorCardOrder({
  id,
  description,
  date,
  price,
  address,
  sendRequestHandler,
  requested,
  dogId,
}) {
  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch();

  //Подтягиваем всех dogs c бека и записываем state dogs
  // useEffect(() => {
  //   fetch("http://localhost:3001/api/v1/dog")
  //     .then((response) => response.json())
  //     .then((responseFromServer) => dispatch(getDogsAC(responseFromServer)));
  // }, []);

  const dogImg = useSelector(
    (state) => state.dogs.find((el) => el._id == dogId)?.avatar
  );
  console.log(dogId);

  const handlerDetailInfo = (id) => {
    history.push(`/order/${id}`);
  };

  return (
    <Box className={classes.pos} m={5}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={dogImg}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom component="h2">
              {/* {date.replace("T", " ").replace(".000Z", "")} */}
              Дата: {new Date(date).toLocaleString("ru-RU")}
            </Typography>
            {/* <Typography variant="body2" color="textSecondary" component="p">
              Задание: {description}
            </Typography> */}
            <Typography variant="body2" color="textSecondary" component="p">
              Адрес: {address}
            </Typography>
            {/* <Typography variant="body2" color="textSecondary" component="p">
              Стоимость: {price} рублей
            </Typography> */}
          </CardContent>
        </CardActionArea>
        <CardActions display="flex" justifyContent="center" alignItems="center">
          <Button
            disabled={requested}
            onClick={() => handlerDetailInfo(id)}
            variant="contained"
            size="large"
            color="primary"
          >
            Подробнее
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
export default ExecutorCardOrder;
