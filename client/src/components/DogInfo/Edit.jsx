import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Box, Button, FormControl } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getDogAC } from '../../redux/actionCreators/dogAC';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { editDogFetch } from '../../redux/actionCreators/userAC';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',

    },
  },
}));

export default function EditDog() {
  const classes = useStyles();
  const formRef = useRef(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const {id} = useParams()

  const dog = useSelector(state => state.dog)

  useEffect(() => {
    fetch(`http://localhost:3001/api/v1/dog/${id}`)
    .then(response => response.json())
    .then(responseFromServer => dispatch(getDogAC(responseFromServer)))
  }, [])

  const submitHandler = (e) => {
    e.preventDefault();

    const valuesOfFields = Object.fromEntries(
      new FormData(formRef.current).entries()
    );
    if (
      Object.keys(valuesOfFields).every((key) => valuesOfFields[key].trim())
    ) {
      dispatch(editDogFetch(valuesOfFields, dog._id));

      formRef.current.reset();
      history.push("/account");
    }
  };

  return (
    <Box m={10}>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        ref={formRef}
        onSubmit={submitHandler}
      >
        <Box m={3}>
          <div>

            <TextField
              id="outlined-multiline"
              label="Имя питомца"
              name="nickname"
              multiline
              rowsMax={4}
              defaultValue={dog.nickname}
              variant="outlined"
            />
          
            <TextField
              id="outlined-textarea"
              label="Порода"
              name="breed"
              multiline
              defaultValue={dog.breed}
              variant="outlined"
            />
            <TextField
              id="outlined-textarea"
              label="Пол"
              name="gender"
              multiline
              defaultValue={dog.gender}
              variant="outlined"
            />
          </div>
        </Box>
        <Box m={3}>
          <div>
            <TextField
              id="outlined-textarea"
              label="Вес животного"
              name="weight"
              multiline
              rowsMax={4}
              defaultValue={dog.weight}
              variant="outlined"
            />
            <TextField
              id="outlined-textarea"
              label="Тянет за поводок?"
              name="pullsTheLeash"
              multiline
              defaultValue={dog.pullsTheLeash}
              variant="outlined"
            />
            <TextField
              id="outlined-textarea"
              label="Контакт с другими собаками"
              name="contactWithOther"
              multiline
              defaultValue={dog.contactWithOther}
              variant="outlined"
            />
          </div>
        </Box>
        <Box m={3}>
          <div>
            <TextField
              id="outlined-textarea"
              label="Чего боится?"
              name="phobia"
              multiline
              rowsMax={4}
              defaultValue={dog.phobia}
              variant="outlined"
            />
            <TextField
              id="outlined-textarea"
              label="Отпускать на площадке"
              name="letGo"
              multiline
              defaultValue={dog.letGo}
              variant="outlined"
            />
            
          </div>
        </Box>
        <Box m={3}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            color="primary"
          >
            Редактировать
          </Button>
        </Box>
      </form>
    </Box>
  );
}
