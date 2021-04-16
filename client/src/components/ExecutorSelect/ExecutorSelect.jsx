import { Box, Container, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import EmailIcon from "@material-ui/icons/Email";
import InputAdornment from "@material-ui/core/InputAdornment";
import LockIcon from "@material-ui/icons/Lock";
import Button from "@material-ui/core/Button";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import {
  registerWithGoogleThunk,
  sagaSignupAC,
} from "../../redux/actionCreators/userAC";
import HomeIcon from "@material-ui/icons/Home";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import { AddressSuggestions } from 'react-dadata';
// import 'react-dadata/dist/react-dadata.css'
import TelegramIcon from '@material-ui/icons/Telegram';

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const currencies = [
  {
    value: "Исполнитель",
    label: "Исполнитель",
  },
];

const ExecutorSelect = () => {
  const classes = useStyles();
  const [kind, setKind] = React.useState("");
  const [district, setDistrict] = useState({});
  let history = useHistory();
  let location = useLocation();

  const handleChange = (event) => {
    setKind(event.target.value);
  };

  const formRef = useRef(null);
  const dispatch = useDispatch();

  const submitHandler = (e) => {

    e.preventDefault();
    const valuesOfFields = Object.fromEntries(
      new FormData(formRef.current).entries()
    );
   //  console.log(valuesOfFields, 'valuesOfFields');
    if (
      Object.keys(valuesOfFields).every((key) => valuesOfFields[key].trim())
    ) {
      dispatch(sagaSignupAC(valuesOfFields));
      history.push("/");

      formRef.current.reset();
    }
  };

  // const handlerClickLoginExecutor = () => {
  //   history.push("/executorLogin");
  // };

  const HandleClick = () => {
    history.push('/executorLogin')
  }

  return (
    <Box m={3}>
      <Container>
        <Typography variant="h4">Регистрация</Typography>
        {/* <Box m={3}>
          <form
            className={classes.root}
            validate="true"
            autoComplete="off"
            ref={formRef}
            onSubmit={submitHandler}
          >
            <Grid item>
              <TextField
                name="firstname"
                required
                id="outlined-required"
                label="Имя"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid>
              <TextField
                name="lastname"
                required
                label="Фамилия"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid>
              <TextField
                name="email"
                required
                id="outlined-email-input"
                label="Email"
                type="email"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid>
              <TextField
                id="outlined-select-currency-native"
                name="kind"
                select
                label="Категория"
                value={kind}
                onChange={handleChange}
                SelectProps={{
                  native: true,
                }}
                helperText="Выберите вашу роль"
                variant="outlined"
              >
                {currencies.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>

            <Grid>
              <TextField
                name="district"
                // required
                // value={district.value}
                value={[district?.data?.geo_lat, district?.data?.geo_lon]}
                label="Адрес"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <>
                      <HomeIcon />
                      <AddressSuggestions class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-formControl MuiInputBase-adornedStart MuiOutlinedInput-adornedStart" token="8536f85322589081ac698e1b9d9f1979cbd98e52" value={district} onChange={setDistrict} />
                    </>
                  ),
                }}
              />
            </Grid>

            <Grid>
              <TextField
                name="passport"
                type="number"
                required
                label="Паспортные данные"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AssignmentIndIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid>
              <TextField
                name="password"
                required
                label="Пароль"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid>
              <Box m={3}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  color="primary"
                >
                  Регистрация
                </Button>
              </Box>
            </Grid>
          </form>
        </Box>
        <Grid>
          <Box m={3}>
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={handlerClickLoginExecutor}
            >
              У меня уже сть аккаунт, Войти
            </Button>
          </Box>
        </Grid>
        <Grid></Grid> */}

<Box m={1}>
          <form
            className={classes.root}
            validate="true"
            autoComplete="off"
            ref={formRef}
            onSubmit={submitHandler}    >
            <Box m={3}>
              <div>

                <TextField
                  name="firstname"
                  required
                  id="outlined-required"
                  label="Имя"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  name="lastname"
                  required
                  label="Фамилия"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                name="email"
                required
                id="outlined-email-input"
                label="Email"
                type="email"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
              </div>
            </Box>
            <Box m={3}>
              <div>
              <TextField
                id="outlined-select-currency-native"
                name="kind"
                select
                label="Категория"
                value={kind}
                onChange={handleChange}
                SelectProps={{
                  native: true,
                }}
                helperText="Выберите вашу роль"
                variant="outlined"
              >
                {currencies.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
              <TextField
                name="district"
                // required
                // value={district.value}
                value={[district?.data?.geo_lat, district?.data?.geo_lon]}
                label="Адрес"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <>
                      <HomeIcon />
                      <AddressSuggestions class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-formControl MuiInputBase-adornedStart MuiOutlinedInput-adornedStart" token="8536f85322589081ac698e1b9d9f1979cbd98e52" value={district} onChange={setDistrict} />
                    </>
                  )
                }}
              />
                <TextField
                  id="outlined-textarea"
                  label="Аккаунт телеграм"
                  name="telegram"
                  multiline
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <TelegramIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </Box>
            <Box m={3}>
              <div>
                <TextField
                  name="passportSeries"
                  type="text"
                  required
                  label="Серия паспорта"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AssignmentIndIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  name="passportNumber"
                  type="text"
                  required
                  label="Номер паспорта"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AssignmentIndIcon />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  name="password"
                  required
                  label="Пароль"
                  type="password"
                  autoComplete="current-password"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                />

              </div>
            </Box>
            <Box m={3}>
              <Grid container spacing={5} justify="center">
                <Grid item>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    onClick={HandleClick}
                  >Войти
                      </Button>
                </Grid>
                <Grid item>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    color="primary"
                  >
                    Регистрация
                </Button>
                </Grid>
              </Grid>
            </Box>
          </form>
        </Box>
      </Container >
    </Box >
  );
};

export default ExecutorSelect;
