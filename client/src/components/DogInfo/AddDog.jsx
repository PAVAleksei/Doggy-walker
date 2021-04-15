import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Box, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { addNewDogFetch } from '../../redux/actionCreators/userAC';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',

    },
  },
}));

export default function MultilineTextFields() {
  const classes = useStyles();
  const formRef = useRef(null);

  const history = useHistory();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    const valuesOfFields = Object.fromEntries(
      new FormData(formRef.current).entries()
    );
   //  console.log(valuesOfFields);
    // console.log(valuesOfFields);
    if (
      Object.keys(valuesOfFields).every((key) => valuesOfFields[key].trim())
    ) {
      dispatch(addNewDogFetch(valuesOfFields));

      formRef.current.reset();
     history.push('/account');
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
              id="outlined-textarea"
              label="Имя питомца"
              name="nickname"
              multiline
              rowsMax={4}
              variant="outlined"
            />
            <TextField
              id="outlined-textarea"
              label="Порода"
              name="breed"
              multiline
              variant="outlined"
            />
            <TextField
              id="outlined-textarea"
              label="Пол"
              name="gender"
              multiline
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
              variant="outlined"
            />
            <TextField
              id="outlined-textarea"
              label="Тянет за поводок?"
              name="pullsTheLeash"
              multiline
              variant="outlined"
            />
            <TextField
              id="outlined-textarea"
              label="Контакт с другими собаками"
              name="contactWithOther"
              multiline
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
              variant="outlined"
            />
            <TextField
              id="outlined-textarea"
              label="Отпускать на площадке"
              name="letGo"
              multiline
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
            Добавить
          </Button>
        </Box>
      </form>
    </Box>
  );
}
