

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
import { useDispatch, useSelector } from 'react-redux'
import { deleteFetchDogAC } from '../../redux/actionCreators/userAC';
import { uploadDogAvatarFetch } from '../../redux/actionCreators/dogAC';

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

export default function DogInfo({ id, nickname, breed, gender, avatar }) {

  const classes = useStyles();
  const dispatch = useDispatch()
  const bull = <span className={classes.bullet}>•</span>;
  const dog = useSelector(state => state.user.animal)
  console.log(dog, 'dog');

  const uploadHandler = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    dispatch(uploadDogAvatarFetch(formData, id))
  }

  const inputAvatarHandler = (e) => {
    const file = e.target.files[0];
    uploadHandler(file);
  }


  // const onClickHandler = () => {
  //   dispatch(deleteFetchDogAC(id))
  // }

  return (
    <Card className={classes.root}>
      <Link
        variant="contained"
        component="label"
      >
        <input onChange={(e) => inputAvatarHandler(e)} accept="image/*" type="file" hidden name="photo" />
        <Avatar className={classes.big} src={avatar} />
      </Link>
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
