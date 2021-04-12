

import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import { Button, Avatar, List, ListItem, ListItemText, Divider, Grid } from '@material-ui/core'
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { deleteFetchDogAC } from '../../redux/actionCreators/userAC';

const useStyles = makeStyles({
  root: {
    // minWidth: 175,
    // maxWidth: 175,
    paddingTop: 7,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  big: {
    height: 130,
    width: 130,
    display: 'inline-block'
  },
  posi: {
    display: 'inline-block'
  }
});

export default function DogInfo({ id, nickname, breed, gender }) {

  const classes = useStyles();
  const dispatch = useDispatch()
  const bull = <span className={classes.bullet}>•</span>;


  // const onClickHandler = () => {
  //   dispatch(deleteFetchDogAC(id))
  // }

  return (
    <Card className={classes.root}>
      <Avatar className={classes.big} src='https://lapkins.ru/upload/iblock/bd2/bd20f15bbc1ed4fba71b161ccd44d08d.jpg' />
      <CardContent>
        <Typography variant="h6" component="h4">
          Имя: {nickname}
        </Typography>
        <Typography className={classes.title} color="textSecondary">
          Порода: {breed}
        </Typography>
      </CardContent>
      <CardActions>

        <Link to={`/edit/${id}`}><EditIcon className={classes.posi} /></Link>
        <Link to={`/dog/${id}`} ><Button className={classes.posi} size="small">Подробнее...</Button></Link>
        

      </CardActions>
    </Card>
  );
}
