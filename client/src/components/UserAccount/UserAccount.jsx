import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Info from "../Info/Info";
import DogInfo from "../DogInfo/DogInfo";
import CardOrder from "../CardOrder/CardOrder";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDogsAC } from "../../redux/actionCreators/dogAC";
import { Box, Button, jssPreset } from "@material-ui/core";
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

export default function UserAccount() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const animalByUser = useSelector((state) => state.user.animal);
  console.log(animalByUser);
  const orders = useSelector((state) => state.user.orders);

  useEffect(() => {
    fetch("http://localhost:3001/api/v1/dog")
      .then((response) => response.json())
      .then((responseFromServer) => dispatch(getDogsAC(responseFromServer)));
  }, []);

  const history = useHistory();

  const addOrderFormHandler = () => {
    history.push("/order");
  };

  return (
    <div className={classes.root}>
      <h3>Личный кабинет Заказчика</h3>
      <Grid container spacing={3} direction="row">
        {/* <Grid item xs={1}/> */}
        <Grid item xs={3}>
          <Paper className={classes.paper}>Мои данные</Paper>
          <Info />
          <Box m={1}>
            <Button variant="outlined">Мои заказы</Button>
          </Box>
          <Box m={1}>
            <Button variant="outlined">Мои отзывы</Button>
          </Box>
          <Box m={1}>
            <Link to="/addAnimal">Добавить питомца</Link>
            {/* <Button variant="outlined">Добавить питомца</Button> */}
          </Box>
          <Box m={1}>
            <Button variant="outlined" onClick={addOrderFormHandler}>
              Добавить заказ
            </Button>
          </Box>
        </Grid>

        <Grid item xs={8} direction="column">
          <Grid item>
            <Paper className={classes.paper}>Мои питомцы</Paper>
            <Box m={3}>
              <Grid item container spacing={2} direction="row">
                {/* <Box m={4}> */}
                {animalByUser?.length ?
                  animalByUser.map((dog) =>
                    <Grid item xs={12} sm={3}>
                      <DogInfo
                        key={dog._id}
                        id={dog._id}
                        nickname={dog.nickname}
                        breed={dog.breed}
                        gender={dog.gender}
                        weight={dog.weight}
                        pullsTheLeash={dog.pullsTheLeash}
                        contactWithOther={dog.contactWithOther}
                        phobia={dog.phobia}
                        letGo={dog.letGo}
                        avatar={dog.avatar}
                      />
                    </Grid>
                  )
                  : <p>Пока нет сохраненных питомцев</p>
                }
                {/* </Box> */}
              </Grid>
            </Box>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>Текущие заказы</Paper>
            <Box m={2}>
              <Grid item container spacing={2} direction="row">
                {/* <Box m={4}> */}

                {
                  orders?.length ?
                    orders.map((order) =>
                      <Grid item xs={12} sm={3}>
                        <CardOrder
                          key={order._id}
                          description={order.description}
                          date={order.date}
                          price={order.price}
                          address={order.address.name}
                        />

                      </Grid>
                    ) : <p>Нет заказов</p>
                }
                {/* </Box> */}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
