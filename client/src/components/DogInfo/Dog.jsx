import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFetchDogAC, getDogAC } from '../../redux/actionCreators/dogAC';
import { Box, Link } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    margin: 'auto',
    padding: 'auto',
    maxWidth: 545,
  },
  media: {
    height: 140,
  },
});

export default function Dog() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams()
  const dog = useSelector(state => state.dog);
  console.log(dog, 'animalByUser DOG');

  useEffect(() => {
    fetch(`http://localhost:3001/api/v1/dog/${id}`)
      .then(response => response.json())
      .then(responseFromServer => dispatch(getDogAC(responseFromServer)))
  }, [])

  const onClickHandler = () => {
    dispatch(deleteFetchDogAC(id))
  }

  return (
    <Box m={10} >
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="https://lh3.googleusercontent.com/proxy/XLKWI-YG_Cxu1aB5-159l6uW2KDq84bir7B5I11VfQtXTJ1OcABOt_tiboZd1r-rblgbZ0Duw4eLc9rizg0iIqC1KFwjuDu8jiaIrR3kQJn-ZaO_j51rdjQaemLu5Aj8P8TaSWevl6oXxlGyI4vPKBpVpoiKEnvIK-s3PJsdBrusxgtt6GTDqtXdbz4kOdbyYrYL9RF1-3OV8In0uigIX9tW1igRmV0GJQ"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {dog.nickname}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Порода: {dog.breed}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Пол: {dog.gender}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Вес: {dog.weight}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Чего боится: {dog.phobia}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Тянет за поводок: {dog.pullsTheLeash}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Отпускать с поводка: {dog.letGo}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Контакт с другими животными: {dog.contactWithOther}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button onClick={onClickHandler} className={classes.posi} size="small" >Удалить</Button>
        </CardActions>
      </Card>
    </Box>
  );
}
