import { Box, Container, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import EmailIcon from "@material-ui/icons/Email";
import InputAdornment from "@material-ui/core/InputAdornment";
import LockIcon from "@material-ui/icons/Lock";
import Button from "@material-ui/core/Button";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { SagaSignInAC } from "../../redux/actionCreators/userAC";
import { useHistory } from "react-router-dom";
import GoogleButton from 'react-google-button'

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "35ch",
    },
  },
  // img:{
  //   backgroundImage: `url('https://img-authors.flaticon.com/google.jpg')`,
  //   backgroundRepeat: 'no-repeat',
  //   width: '30px'
  // }
}));

const CustomerLogin = () => {
  const classes = useStyles();
  const formRef = useRef(null);
  const dispatch = useDispatch();
  let history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();

    const valuesOfFields = Object.fromEntries(
      new FormData(formRef.current).entries()
    );
    if (
      Object.keys(valuesOfFields).every((key) => valuesOfFields[key].trim())
    ) {
      dispatch(SagaSignInAC(valuesOfFields));
      formRef.current.reset();
      history.push("/");
    }
  };

  const HandleClick = () => {
    history.push('/customer')
  }
  // const googleClickHandle = () => {
  //   history.push('/customer')
  // }
  return (
    <Box m={5}>
      <Container>
        <Typography variant="h4">Вход</Typography>
        <Box m={3}>
          <form
            className={classes.root}
            validate="true"
            autoComplete="off"
            ref={formRef}
            onSubmit={submitHandler}
          >
            <Grid>
              <TextField
                name="email"
                required
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
                required
                name="password"
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
              <Box m={5}>
                <Grid container spacing={1} justify="center">
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="large"
                      onClick={HandleClick}
                    >Регистрация
                      </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      size="large"
                      color="primary"
                      type="submit"
                    >
                      Войти
                  </Button>
                  </Grid>


                  <Grid item>
                    <Button className={classes.img} variant="contained" size="large" color="secondary">
                    <a href="http://localhost:3001/auth/google">Google</a>
                    </Button>
                    {/* <GoogleButton
  onClick={googleClickHandle}
                    >

                    </GoogleButton> */}
                  </Grid>
                  
                </Grid>
              </Box>
            </Grid>
          </form>
        </Box>
      </Container>
    </Box >
  );
};

export default CustomerLogin;
