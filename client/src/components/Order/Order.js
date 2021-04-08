import { Box, Button, Container, Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { useState } from 'react';


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
}));


function Order () {

  

  const classes = useStyles();

  const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const addNewOrderHandler = () => {

  }

  
  return (
    <div className={classes.root}>
      <Container>
        <h3>Оформить заказ</h3>
        <Box>
          <Grid>
            <TextField required id="standard-required" placeholder="Введите телефон"  />
          </Grid>
          {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date picker inline"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Time picker"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </Grid>
          </MuiPickersUtilsProvider> */}

          <Grid>
            <TextField required id="standard-required" placeholder="Укажите породу" />
          </Grid>
          <Grid>
            <TextField required id="standard-required" placeholder="Укажите вес" />
          </Grid>
        </Box>
        <Box m={2}>
          <Button variant="contained" onClick={ addNewOrderHandler }>Оформить заказ</Button>
        </Box>
      </Container>


    </div>

  )
  
}

export default Order;
