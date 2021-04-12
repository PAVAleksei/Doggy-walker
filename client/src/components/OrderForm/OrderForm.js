import {
  Box,
  Button,
  Container,
  Grid,
  TextareaAutosize,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrder, addOrderFromServer } from "../../redux/actionCreators/orderAc";
import { setError } from "../../redux/actionCreators/errorAC";
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css'
import { useHistory } from "react-router-dom";
import { addOrderCustomer, addOrderCustomerFromServer } from "../../redux/actionCreators/userAC";


const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
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
    width: "25ch",
  },
  area: {
    width: "32ch",
  },
}));

function OrderForm() {
  const classes = useStyles();

  const dispatch = useDispatch();
  // const userEmail = useSelector((state) => state.user.email);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const error = useSelector((state) => state.error);
  const [address, setAddress] = useState();
  const [description, setDescription] = useState('');
  const history = useHistory();

  // console.log(address.data);

  const handleDateChange = (date) => {
    // console.log(date)
    // const dateRu = date.toLocaleString('ru-RU');
    // console.log(dateRu);
    setSelectedDate(date);
    // console.log(date);
  };

  const handleDescriptionChange = (e) => {
  
    setDescription(e.target.value);
  };

  const addNewOrderHandler = () => {
    
    setError({ status: false, text: "" });

    const addressToServer = { 
      name: address.value,
      coordinates: [Number(address.data.geo_lat), Number(address.data.geo_lon)]
    }

    if (selectedDate >= Date.now() + 1 * 2 * 60 * 60 * 1000 && description.trim() && addressToServer) {
      setError({ status: false, text: "" });

      try {
        dispatch(addOrderCustomer({ selectedDate, description, addressToServer }))
          // .then((newOrder) => {
          //   console.log(newOrder); 
          //   dispatch(addOrderCustomerFromServer(newOrder))
            return history.push('/account');
          // })
          // .catch(error => {
          //   setError({status: true, text: 'Для введения заказа необходимо авторизоваться.'})
          //   return history.push('/customer');
          // })
      } catch (error) {
        return dispatch(
          setError({ status: true, text: "Не удалось добавить новое задание." })
        );
      }
    } else {
      dispatch(
        setError({
          status: true,
          text: "Заказ можно оформить на время через 2 часа минимум.",
        })
      );
    }
  };

  return (
    <div className={classes.root}>
      <Container>
        <h3>Оформить заказ</h3>
        <Box>
          <Grid>
            <TextField
              disabled
              id="standard-required"
              label="Услуга"
              defaultValue="Выгул"
            />
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
                  "aria-label": "change date",
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
                  "aria-label": "change time",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <Grid>
            <Box m={3}>
              <AddressSuggestions token="8536f85322589081ac698e1b9d9f1979cbd98e52" value={address} onChange={setAddress} />
            </Box>
          </Grid>
          <Grid>
            <Box m={3}>
              <TextareaAutosize
                className={classes.area}
                onChange={handleDescriptionChange}
                value={description}
                aria-label="minimum height"
                rowsMin={5}
                placeholder="Добавьте дополнительную информацию"
              />
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
          <Button variant="contained" onClick={addNewOrderHandler}>
            Оформить заказ
          </Button>
        </Box>
        {error?.status ? <div>{error.text}</div> : ""}
      </Container>
    </div>
  );
}

export default OrderForm;
