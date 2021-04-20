import {
  Box,
  Button,
  Container,
  Grid,
  TextareaAutosize,
  TextField,
  Typography,
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
import { setError } from "../../redux/actionCreators/errorAC";
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css'
import { useHistory } from "react-router-dom";
import { addOrderCustomer } from "../../redux/actionCreators/userAC";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: '45ch',
      // align: 'center'
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "45ch",
  },
  select:{
    width: "40ch",
  },
  area: {
    width: "45ch",
  },
  address: {
    width: "50ch",
  },
  input:{
    maxWidth: '50px',
    minWidth: '50px'
  },
  container:{
    width: '45ch',
  }
}));
function OrderForm() {
  const dogs = useSelector(state => state.user.animal)?.map(dog => ({ value: dog._id, label: dog.nickname}));
  const classes = useStyles();
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const error = useSelector((state) => state.error);
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(300);
  const [curDog, setCurDog] = useState(dogs?.length ? dogs[0]?.value : '');
  const history = useHistory();
  const dogSelectHandler = (event) => {
    setCurDog(event.target.value);
  };
  const handleDateChange = (date) => {
    // const dateRu = date.toLocaleString('ru-RU');
    const newDate = (new Date(date));
    setSelectedDate(newDate);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  }
  const addNewOrderHandler = () => {
    setError({ status: false, text: "" });
    if (selectedDate >= Date.now() + 1 * 2 * 60 * 60 * 1000){
      if (description.trim() && address && curDog && price) {
       setError({ status: false, text: "" });
        const addressToServer = { 
          name: address.value,
          coordinates: [Number(address.data.geo_lat), Number(address.data.geo_lon)]
        }
       try {
         dispatch(addOrderCustomer({ selectedDate, description, addressToServer, curDog, price }))
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
          setError({ status: true, text: "Необходимо заполнить все поля." })
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
    <Box mt={5}>
    <Container className={classes.container}>
    {/* <div className={classes.root}> */}
      <Typography variant="h4">Вход</Typography>
        <Box mt={3}>
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
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date picker inline"
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
                  "aria-label": "change time",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <Box m={3}>
            <Grid>
              <TextField
                  // className={classes.select}
                  // required
                  id="outlined-select-currency-native"
                  name="curDog"
                  select
                  label="Выберите питомца"
                  value={curDog}
                  onChange={dogSelectHandler}
                  SelectProps={{
                    native: true,
                  }}
                  helperText="Выберите вашего питомца"
                  variant="outlined"
                >
                  {dogs?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
            </Grid>
          </Box >
					<Box m={3}>
					<TextField
						// name="district"
						// required
						// value={district.value}
						// value={[district?.data?.geo_lat, district?.data?.geo_lon]}
						label="Адрес"
						variant="outlined"
						InputProps={{
							startAdornment: (
							<>
								{/* <HomeIcon /> */}
								<AddressSuggestions className={classes.input}  class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-formControl MuiInputBase-adornedStart MuiOutlinedInput-adornedStart" token="8536f85322589081ac698e1b9d9f1979cbd98e52" value={address} onChange={setAddress} />
							</>
							)
						}}
					/>
</Box>
          <Grid>
            <Box mt={3}>
              <TextareaAutosize
                required
                className={classes.area}
                onChange={handleDescriptionChange}
                value={description}
                aria-label="minimum height"
                rowsMin={5}
                placeholder="Добавьте дополнительную информацию"
              />
            </Box>
          </Grid>
          <Grid>
            <Box mt={3}>
              <TextField
                // required
                id="standard-required"
                onChange={handlePriceChange}
                value={price}
                label="Укажите желаемую стоимость"
                defaultValue="300"
              />
            </Box>
          </Grid>
        </Box>
        <Box mt={4}>
          <Button variant="contained" onClick={addNewOrderHandler}>
            Оформить заказ
          </Button>
        </Box>
        <Box mt={4} color="warning.main">
          {error?.status ? <div>{error.text}</div> : ""}
        </Box>
    {/* </div> */}
    </Container>
    </Box>
  );
}
export default OrderForm;
