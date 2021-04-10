import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Info from '../Info/Info';
import DogInfo from '../DogInfo/DogInfo';
import CardOrder from '../CardOrder/CardOrder';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import {getDogsAC } from '../../redux/actionCreators/dogAC';

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

  const dogs = useSelector(state => state.dogs)
  console.log(dogs);

  useEffect(() => {
    fetch('http://localhost:3001/api/v1/dog')
      .then(response => response.json())
      .then(responseFromServer => dispatch(getDogsAC(responseFromServer)))
      
  }, [])

  return (
    <div className={classes.root}>
      <h3>Личный кабинет</h3>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>Мои данные</Paper>
          <Info />
          <Link to='/addAnimal'>Добавить питомца</Link>
          <button>Добавить заказ</button>
          <button>Мои заказы</button>
          <button>Мои отзывы</button>
        </Grid>
        <Grid item xs={9}>
          <Paper className={classes.paper}>Мои питомцы</Paper>
          <Grid container spacing={5}>
            <Grid item xs={4}>
              <Paper className={classes.paper}>xs=4</Paper>
{
  dogs ? 
  dogs[0]?.map(dog => ( <DogInfo key={dog.id} id={dog._id} nickname={dog.nickname} breed={dog.breed} gender={dog.gender} weight={dog.weight} pullsTheLeash={dog.pullsTheLeash} contactWithOther={dog.contactWithOther} phobia={dog.phobia} letGo={dog.letGo} avatar={dog.avatar} />)) : <p>Добавьте вашу собаку</p>
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
      </Grid>
    </div>
  );
}
