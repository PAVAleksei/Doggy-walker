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

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h3>Личный кабинет Исполнителя</h3>
      <Grid container spacing={3} direction="row">
        <Grid item xs={3}>
          <Paper className={classes.paper}>Мои данные</Paper>
          <Info />
          <Box m={1}>
            <Button variant="outlined">Мои заказы</Button>
          </Box>
          <Box m={1}>
            <Button variant="outlined">Мои отзывы</Button>
          </Box>
        </Grid>
        <Grid item xs={8} direction="column">
          <Grid item>
            <Paper className={classes.paper}>Ближайшие заказы</Paper>
            <CardList/>
          </Grid>

          <Grid item>
            <Paper className={classes.paper}>Текущие заказы</Paper>
            <Box m={3}>
              <Grid item container spacing={2} direction="row">
                <YandexMap />
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Grid>

      {/* <Grid container spacing={3}>
        <Grid item xs={3}>
					<Paper className={classes.paper}>Мои данные</Paper>
					<Info />
					<button>Мои заказы</button>
					<button>Мои отзывы</button>
				</Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>Ближайшие заказы</Paper>
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
          <YandexMap />
        </Grid>
      </Grid> */}
    </div>
  );
}

export default ExecutorAccount;
