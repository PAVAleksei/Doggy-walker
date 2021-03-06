import React, { useState } from "react";
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
    // border: "1px solid #1C3E6A",
    height: 500,
    // width: 300,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  media: {
    height: 140,
  },
  pos: {
    margin: 0,
  },
  button: {
    width: 340,
    height: 60,
  },
});

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
  const classes = useStyles();
  const dispatch = useDispatch();

  const dogs = useSelector((state) => state.user.animal);
  const dogPhoto = dogs.find((el) => el._id === dogId)?.avatar;
  // const status = useSelector(state => state.user.orders.filter(el => el._id === id))
  const editHandler = () => {};

  const approveExecutorHandler = (id) => {
    dispatch(changeOrderStatusInWork(id));
  };

  const denyExecutorHandler = (id) => {
    dispatch(changeOrderCustomerStatusRequested(id));
  };

  const closeOrderHandler = () => {
    dispatch(closeOrderCustomer(id));
  };

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
              ?????????????????????????????? ????????: {date.toLocaleString("ru-RU")}
              {/* ?????????????????????????????? ????????:&nbsp;
              {date.replace('T', ' ').replace('.000Z', '')} */}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              ??????????????: {description}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              ??????????: {address}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              ??????????????????: {price} ????????????
            </Typography>
            <Typography variant="body3" color="textSecondary" component="h3">
              ???????????? ??????????????: {status}
            </Typography>
            <Typography variant="body3" color="textSecondary" component="h3">
              {/* <Button color="inherit">
                  <Link to="/executorToCustomer">
                    ??????????????????????
                  </Link>
                </Button> */}
            </Typography>
          </CardContent>
        </CardActionArea>

        {!requested ? (
          <CardActions
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
              ??????????????????
            </Button>
            {/* <Button
              variant="contained"
              size="small"
              color="secondary"
              className={classes.button}
            >
              ??????????????
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
              disabled={inWork}
              onClick={() => approveExecutorHandler(id)}
              variant="contained"
              size="small"
              color="primary"
              className={classes.button}
            >
              ????????????????
            </Button>
            <Button
              disabled={inWork}
              onClick={() => denyExecutorHandler(id)}
              variant="contained"
              size="small"
              color="secondary"
              className={classes.button}
            >
              ????????????????
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
              ??????????????
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
