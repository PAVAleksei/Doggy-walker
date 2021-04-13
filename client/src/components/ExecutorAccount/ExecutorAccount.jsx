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
import { setOrders } from "../../redux/actionCreators/orderAc";

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
}));

function ExecutorAccount() {
  //обновялет все ордера в редакс
  // const allOrders = useSelector((state) => state.allOrders);
  // useEffect(() => dispatch(setOrders()), [allOrders]);

  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const handlerHistoryOrders = () => {
    history.push("/historyOrders");
  };
  const handlerDoneOrders = () => {
    history.push("/doneOrders");
  };

  return (
    <div className={classes.root}>
      <h3>Личный кабинет Исполнителя</h3>
      <Grid container spacing={3} direction="row">
        <Grid item xs={3}>
          <Paper className={classes.paper}>Мои данные</Paper>
          <Info />
          <Box m={1}>
            <Button variant="outlined" onClick={handlerHistoryOrders}>
              Текущие заказы
            </Button>
          </Box>
          <Box m={1}>
            <Button variant="outlined" onClick={handlerDoneOrders}>
              Выполненные заказы
            </Button>
          </Box>
          <Box m={1}>
            <Button variant="outlined">Мои отзывы</Button>
          </Box>
        </Grid>
        <Grid item xs={8} direction="column">
          <Grid item>
            <Paper className={classes.paper}>Все заказы</Paper>
            <CardList />
          </Grid>

          <Grid item>
            <Paper className={classes.paper}>Все заказы на карте</Paper>
            <Box m={3}>
              <Grid item container spacing={2} direction="row">
                <YandexMap />
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default ExecutorAccount;
