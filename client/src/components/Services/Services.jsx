// import dogMainPage from '../../../public/assets'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, makeStyles, Typography } from "@material-ui/core";
import { useHistory } from "react-router";
import  PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled"
import LayerIcon from "@material-ui/icons/Layers"

const useStyles = makeStyles((theme) => ({

  cardMedia: {
    paddingTop: "56.25%",
  },
  cardContent: {
    flexGrow: 1
  },
  cardGrid: {
    marginTop: theme.spacing(4)
  },

}))

function Services() {

  const history = useHistory();

  const addOrderFormHandler = () => {
    history.push('/order');
  }

  const classes = useStyles();
  const cards = [
    {
      name: 'Выгул любимого питомца',
      description: 'Высокий рейтинг услуги',
      img: 'https://static.probusiness.io/n/0a/2/guiieuifg.jpg',
    },
    {
      name: 'Стрижка любимого питомца',
      description: 'Высокий рейтинг услуги',
      img: 'https://chubchik.ru/wp-content/uploads/2019/07/0d200be3156ed61b9cc7118059e6a5d4.jpg',
    },

    {
      name: 'Передержка животных',
      description: 'Высокий рейтинг услуги',
      img: 'https://f1.ds-russia.ru/u_dirs/177/177410/8f96cb058cf865f193861bc29b3c0b29.png',
    }


  ]
  return (
    // <div>
    //   <h3>Услуги</h3>
    //   {/* <img src={ dogMainPage }></img> */}
    //   <Button onClick={ addOrderFormHandler }>Заказать выгул</Button>
    // </div>
    <Box m={5}>
      <Container>
        <Typography variant="h4">Услуги</Typography>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {
              cards.map(card => (
                <Grid item key={card} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={card.img}
                      title="image title"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography variant="h5" gutterBottom>
                        {card.name}
                      </Typography>
                      <Typography>
                        {card.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size='small' color='primary' onClick={addOrderFormHandler}>
                        Заказать услугу
                      </Button>

                      <LayerIcon />
                      <PlayCircleFilledIcon />
                    </CardActions>
                  </Card>
                </Grid>
              ))
            }
          </Grid>
        </Container>
      </Container>
    </Box>
  );
}

export default Services;
