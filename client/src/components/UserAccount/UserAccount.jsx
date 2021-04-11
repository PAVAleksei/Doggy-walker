import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Info from "../Info/Info";
import DogInfo from "../DogInfo/DogInfo";
import CardOrder from "../CardOrder/CardOrder";
import { Box, Button } from "@material-ui/core";
import { useHistory, useLocation } from "react-router";

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

export default function UserAccount() {
  const classes = useStyles();
  let history = useHistory();

  const handlerVerifPage = () => {
    history.push("/verification");
  };

  return (
    <div className={classes.root}>
      <h3>Личный кабинет</h3>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>Мои данные</Paper>
          <Info />
          <button>Добавить питомца</button>
          <button>Добавить заказ</button>
          <button>Мои заказы</button>
          <button>Мои отзывы</button>
          <Box m={3}>
            <Button
              onClick={handlerVerifPage}
              variant="contained"
              size="small"
              color="primary"
            >
              Верифицировать аккаунт
            </Button>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>Мои питомцы</Paper>
          <Grid container spacing={5}>
            <Grid item xs={4}>
              <Paper className={classes.paper}>xs=4</Paper>
              <DogInfo />
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>xs=4</Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>xs=4</Paper>
            </Grid>
          </Grid>
          <Paper className={classes.paper}>Текущие заказы</Paper>
          <Grid container spacing={5}>
            <Grid item xs={4}>
              <Paper className={classes.paper}>xs=4</Paper>
              <CardOrder />
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>xs=4</Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>xs=4</Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
