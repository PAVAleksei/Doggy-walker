import { Box, Button, Container, Grid, TextareaAutosize, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder } from '../../redux/actionCreators/orderAc';
import { setError } from '../../redux/actionCreators/errorAC'


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      // width: '25ch',
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
  area: {
    width: "32ch",
  }
}));


function Order () {

  const classes = useStyles();

  // const [selectedDate, setSelectedDate] = useState(new Date('2020-04-01T21:11:54'));
  const dispatch = useDispatch();
  const userEmail = useSelector(state => state.user.email);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [description, setDescription] = useState('');

  
  const handleDateChange = (date) => {
    setSelectedDate(date);
    // console.log(date);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  }

  const addNewOrderHandler = () => {
    console.log(selectedDate, description, userEmail);
    
    if (selectedDate && description) {
      try {
        dispatch(addOrder( { selectedDate, description, userEmail } ))
      } catch (error) {
        dispatch(setError({ status: true, text: 'Не удалось добавить новое задание.'}))
      }

    }
  }

  
  return (
    <div className={classes.root}>
      <Container>
        <h3>Оформить заказ</h3>
        <Box>
          <Grid>
            <TextField disabled id="standard-required" label="Услуга" defaultValue="Выгул" />
          </Grid>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Дата"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            </Grid>
            <Grid>
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Время"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </Grid>
          </MuiPickersUtilsProvider>
          <Grid>
          <Box m={3}>
            <TextareaAutosize className={classes.area} onChange={handleDescriptionChange} value={description} aria-label="minimum height" rowsMin={5} placeholder="Добавьте дополнительную информацию" />
          </Box>
          </Grid>
          {/* <Grid>
            <TextField required id="standard-required" placeholder="Укажите породу" />
          </Grid>
          <Grid>
            <TextField required id="standard-required" placeholder="Укажите вес" />
          </Grid> */}
        </Box>
        <Box m={2}>
          <Button variant="contained" onClick={ addNewOrderHandler }>Оформить заказ</Button>
        </Box>
      </Container>


    </div>

  )
  
}

export default Order;
