import { Box, Container, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
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

  return (
    <div className={classes.root}>
      <Container>
        <h3>Оформить заказ</h3>
        <Box>
          <TextField required id="standard-required" label="Required" defaultValue="" placeholder="Введите номер телефона"/>
          <TextField required id="standard-required" label="Required" defaultValue="" placeholder="Введите номер телефона"/>
          <TextField required id="standard-required" label="Required" defaultValue="" placeholder="Введите номер телефона"/>
        </Box>

      </Container>


    </div>

  )
  
}

export default Order;
