import YandexMap from "../YandexMap/YandexMap";
import React, { useEffect } from "react";
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
import HistoryOrderItem from "../HistoryOrderItem/HistoryOrderItem";

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
  item: {
    display: "flex",
    justifyContent: "space-between;",
    alignItems: "center",
  },
}));

function HistoryOrders() {
  const history = useHistory();
  const classes = useStyles();

  const orders = useSelector((state) => state.user.orders).filter(
    (el) => !el.closed
  );
  const allDogs = useSelector((state) => state.dogs);

  const handlerToAccount = () => {
    history.push("/account");
  };

  return (
    <div className={classes.root}>
      <h3>История заказов Исполнителя</h3>
      <Grid container spacing={3} direction="row">
        <Grid item xs={3}>
          <Paper className={classes.paper}>Мои данные</Paper>
          <Info />
          <Box m={5}>
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

        <Grid item xs={8} direction="column">
          <Grid item>
            <Paper className={classes.paper}>История заявок</Paper>
            <Box m={5}>
              <Grid
                item
                container
                spacing={2}
                direction="row"
                className={classes.item}
              >
                {orders.length ? (
                  orders.map((order) => (
                    <HistoryOrderItem
                      key={order._id}
                      description={order.description}
                      date={order.date}
                      price={order.price}
                      address={order.address.name}
                      requested={order.requested}
                      order={order}
                      inWork={order.inWork}
                      completed={order.completed}
                      closed={order.closed}
                      id={order._id}
                      dogId={order.dogId}
                    />
                  ))
                ) : (
                  <p>Нет активных заказов</p>
                )}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default HistoryOrders;
