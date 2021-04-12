import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Box, Button, FormControl } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { editDogFetch, getDogAC } from '../../redux/actionCreators/dogAC';
import { useHistory } from 'react-router';
import { editUserFetch } from '../../redux/actionCreators/userAC';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',

    },
  },
}));

export default function EditUser() {
  const classes = useStyles();
  const formRef = useRef(null);
  const history = useHistory();
  const dispatch = useDispatch();


  const user = useSelector(state => state.user)

  // useEffect(() => {
  //   fetch(`http://localhost:3001/api/v1/user`)
  //   .then(response => response.json())
  //   .then(responseFromServer => dispatch(getDogAC(responseFromServer)))
  // }, [])

  const submitHandler = (e) => {
    e.preventDefault();

    const valuesOfFields = Object.fromEntries(
      new FormData(formRef.current).entries()
    );
    if (
      Object.keys(valuesOfFields).every((key) => valuesOfFields[key].trim())
    ) {
      dispatch(editUserFetch(valuesOfFields));
      formRef.current.reset();
      // history(-1)
    }
    history.push("/account");
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
              label="Имя"
              name="firstname"
              multiline
              rowsMax={4}
              defaultValue={user.firstname}
              variant="outlined"
            />
          
            <TextField
              id="outlined-textarea"
              label="Фамилия"
              name="lastname"
              multiline
              defaultValue={user.lastname}
              variant="outlined"
            />

            <TextField
              id="outlined-textarea"
              label="Email"
              name="email"
              multiline
              defaultValue={user.email}
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
