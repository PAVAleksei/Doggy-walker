import { Box, Container, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import EmailIcon from "@material-ui/icons/Email";
import InputAdornment from "@material-ui/core/InputAdornment";
import LockIcon from "@material-ui/icons/Lock";
import HomeIcon from "@material-ui/icons/Home";
import Button from "@material-ui/core/Button";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { sagaSignupAC } from "../../redux/actionCreators/userAC";
import { verificationUserThunk } from "../../redux/actionCreators/verificationAC";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "34ch",
    },
    "& .MuiInputBase-input": {
      height: "0.6ch",
    },
  },
}));

function Verification() {
  const classes = useStyles();
  const formRef = useRef(null);
  const dispatch = useDispatch();
  let history = useHistory();
  let location = useLocation();

  const submitHandler = (e) => {
    e.preventDefault();

    const valuesOfFields = Object.fromEntries(
      new FormData(formRef.current).entries()
    );

    if (
      Object.keys(valuesOfFields).every((key) => valuesOfFields[key].trim())
    ) {
      dispatch(verificationUserThunk(valuesOfFields));
      history.push("/account");
      formRef.current.reset();
    }
  };

  return (
    <Box m={3}>
      <Container>
        <Typography variant="h4">Верификация пользователя</Typography>
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
                name="district"
                required
                label="Метро"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HomeIcon />
                    </InputAdornment>
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
              <Box m={3}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  color="primary"
                >
                  Подтвердить
                </Button>
              </Box>
            </Grid>
          </form>
        </Box>
      </Container>
    </Box>
  );
}

export default Verification;
