
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Info from '../Info/Info';
import DogInfo from '../DogInfo/DogInfo';
import CardOrder from '../CardOrder/CardOrder';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getDogsAC } from '../../redux/actionCreators/dogAC';
import { Box, Button, jssPreset } from "@material-ui/core";
import { setOrders } from '../../redux/actionCreators/orderAc'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    paddingTop: 10

  },
}));

export default function UserAccount() {

  const classes = useStyles();

  const dispatch = useDispatch()

  const dogs = useSelector(state => state.dogs);
  const orders = useSelector(state => state.user.orders);
  const userEmail = useSelector(state => state.user.email);
  // console.log(dogs);

  // 
  useEffect(() => {
    fetch('http://localhost:3001/api/v1/dog')
      .then(response => response.json())
      .then(responseFromServer => dispatch(getDogsAC(responseFromServer)))

    // fetch('http://localhost:3001/api/customer/orders', {
    //   method: 'GET',
    //   header: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(userEmail)
    // })
    //   .then(res => res.json())
    //   .then(ordersFromServer => dispatch(setOrders(ordersFromServer)))

  }, [])

  const history = useHistory();

  const addOrderFormHandler = () => {
    history.push("/order");
  };
  const handlerVerifPage = () => {
    history.push("/verification");
  };

  return (
    <div className={classes.root}>
      <h3>Личный кабинет</h3>
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
            <Link to='/addAnimal'>Добавить питомца</Link>
					  {/* <Button variant="outlined">Добавить питомца</Button> */}
          </Box>
          <Box m={1}>
            <Button variant="outlined" onClick={ addOrderFormHandler }>Добавить заказ</Button>
          </Box>
        </Grid>

        <Grid item xs={8} direction="column">
          <Grid item>
            <Paper>Верификация аккаунта</Paper>
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
          <Grid item>
            <Paper className={classes.paper}>Мои питомцы</Paper>
            <Grid item>
              <Grid item>
                <Box m={4}>
                {
                  dogs.length ?
                    dogs.map((dog) => (<DogInfo key={dog._id} id={dog._id} nickname={dog.nickname} breed={dog.breed} gender={dog.gender} weight={dog.weight} pullsTheLeash={dog.pullsTheLeash} contactWithOther={dog.contactWithOther} phobia={dog.phobia} letGo={dog.letGo} avatar={dog.avatar} />)) : <p>Пока нет сохраненных питомцев</p>
                }
                </Box>

              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>Текущие заказы</Paper>
              <Grid item container direction="row">
                <Grid item xs={3}>
                  {/* <Box m={2}> */}
                      {
                        orders?.length ? 
                          orders.map((order) => 
                            <CardOrder key={order._id} description={order.description} date={order.date} price={order.price}/>
                          ) : <p>Нет заказов</p>
                      }
                  {/* </Box> */}

                </Grid>
              </Grid>
          </Grid>

        </Grid>
      </Grid>

        {/* <Grid item xs={9}>
          <Paper className={classes.paper}>Мои питомцы</Paper>
          <Grid container spacing={5}>
            <Grid item xs={4}>
              <Paper className={classes.paper}>xs=4</Paper>

              {
                dogs ?
                  dogs.map((dog) => (<DogInfo key={dog._id} id={dog._id} nickname={dog.nickname} breed={dog.breed} gender={dog.gender} weight={dog.weight} pullsTheLeash={dog.pullsTheLeash} contactWithOther={dog.contactWithOther} phobia={dog.phobia} letGo={dog.letGo} avatar={dog.avatar} />)) : <p>Добавьте вашу собаку</p>
              }

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
      </Grid> */}
    </div>
  );
}
