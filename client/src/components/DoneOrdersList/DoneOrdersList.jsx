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
import DoneOrderItem from "../DoneOrderItem/DoneOrderItem";

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
    alignItems: "stretch",
  },
}));

function DoneOrders() {
  const history = useHistory();
  const classes = useStyles();

  const orders = useSelector((state) => state.user.orders).filter(
    (el) => el.closed
  );

  const handlerToAccount = () => {
    history.push("/account");
  };

  return (
    <div className={classes.root}>
      <h3>Выполненные заказы Исполнителя</h3>
      <Grid container spacing={3} direction="row">
        <Grid item xs={3}>
          <Paper className={classes.paper}>Мои данные</Paper>
          <Info />
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
                    <DoneOrderItem
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
                  <p>Нет выполненных заказов</p>
                )}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default DoneOrders;
