import { Box, Container, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import EmailIcon from "@material-ui/icons/Email";
import InputAdornment from "@material-ui/core/InputAdornment";
import LockIcon from "@material-ui/icons/Lock";
import Button from "@material-ui/core/Button";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import {
  registerWithGoogleThunk,
  sagaSignupAC,
} from "../../redux/actionCreators/userAC";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "35ch",
    },
  },
}));

const currencies = [
  {
    value: "Заказчик",
    label: "Заказчик",
  },
];

const CustomerSelect = () => {
  const classes = useStyles();
  const [kind, setKind] = React.useState("");
  let history = useHistory();

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
    if (
      Object.keys(valuesOfFields).every((key) => valuesOfFields[key].trim())
    ) {
      dispatch(sagaSignupAC(valuesOfFields));
      history.push("/");

      formRef.current.reset();
    }
  };

  const handlerClickLoginCustomer = () => {
    history.push("/customerLogin");
  };

  return (
    <Box m={3}>
      <Container>
        <Typography variant="h4">Регистрация</Typography>
        <Box m={3}>
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
            <Grid container spacing={3} justify="center">
              <Box m={3}>
                <Grid item>
                  <Button
                    variant="outlined"
                    size="large"
                    color="primary"
                    onClick={handlerClickLoginCustomer}
                  >
                    Войти
                  </Button>
                </Grid>
              </Box>
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


              
            
            <Grid>
              <Box m={3}>
                <Button variant="outlined" color="primary" size="large">
                  <a href="http://localhost:3001/auth/google">Google</a>
                </Button>
              </Box>
            </Grid>
          </form>
        </Box>

        <Grid></Grid>
      </Container>
      
  </Box>
  
  );
};

export default CustomerSelect;
