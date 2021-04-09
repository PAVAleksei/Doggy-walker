import { Box, Container, Typography } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import InputAdornment from '@material-ui/core/InputAdornment';
import LockIcon from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '35ch',
    },
  },
}));



function Register() {
  const classes = useStyles();



  return (
    <Box m={3}>
      <Container >
        <Typography variant="h4" >
          Регистрация
      </Typography>
        <Box m={3}>
          <form className={classes.root} noValidate autoComplete="off">
            <Grid item>
              <TextField
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
                required
                id="outlined-required"
                label="Фамилия"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }} />
            </Grid>
            <Grid>
              <TextField
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
                }} />
            </Grid>
            <Grid>
              <TextField
                required
                id="outlined-password-input"
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
                }} />
            </Grid>

            <Grid>
              <Box m={3}>
                <Button variant="contained" size="large" color="primary">
                  Регистрация
              </Button>
                <a href="http://localhost:3001/auth/google">
                  google
                </a>
              </Box>

            </Grid>


          </form>

        </Box>
      </Container>
    </Box>

  );
}

export default Register;
