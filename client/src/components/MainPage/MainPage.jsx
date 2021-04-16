import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Paper, Typography } from "@material-ui/core";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled"
import LayerIcon from "@material-ui/icons/Layers"
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  mainFeaturesPost: {
    position: "relative",
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),

    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  },

  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundOverlay: "rgba(0,0,0,.3)"
  },

  mainFeaturesPostContent: {
    position: "relative",
    padding: theme.spacing(6),
    marginTop: theme.spacing(8),
    textShadow: '1px 1px 3px #000000, 1px 1px 3px #000000'
  },
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

function MainPage() {
  const classes = useStyles();
  const history = useHistory()

  const cards = [
    {
      name: 'Выгул что надо',
      description: 'Отличные выгульщики, любят животных',
      img: 'https://static.tildacdn.com/tild3339-6661-4334-a261-393339663332/progulka-s-sobakami-.jpg',
    },
    {
      name: 'Собаки довольны',
      description: 'Все отлично, спасибо вашему сервису',
      img: 'https://www.belanta.vet/vet-blog/wp-content/uploads/2019/02/%D0%BF%D1%80%D0%BE%D0%B3%D1%83%D0%BB%D0%BA%D0%B0-%D1%81-%D1%81%D0%BE%D0%B1%D0%B0%D0%BA%D0%B0%D0%BC%D0%B8.jpg',
    },

    {
      name: 'Супер сервис',
      description: 'Спасибо, что выгуляли собаку, в 6 утра в дождь',
      img: 'https://cs8.pikabu.ru/post_img/big/2017/05/16/6/149492691719887715.jpg',
    },
    {
      name: 'В минус 20',
      description: 'Собаке хорошо, а я дома и мне тоже хорошо',
      img: 'https://zooclub.ru/attach/2009.jpg',
    },
    {
      name: 'Большой размер',
      description: 'Наконец-то мы нашли выгульщика',
      img: 'https://i.ytimg.com/vi/E9Ud1wr-ENc/maxresdefault.jpg',
    },

    {
      name: 'Довольный пёсель',
      description: 'Отличный сервис, всем рекомендую',
      img: 'https://kot-pes.com/wp-content/uploads/2018/07/dovolnaya-sobaka.jpg',
    }
  ]
  const servisHandle = () => {
    history.push('/services')
  }
  return (
    <>
      < main >
        <Paper className={classes.mainFeaturesPost}
          style={{ backgroundImage: `url(http://sun9-34.userapi.com/c840433/v840433167/25d5f/DzhWLhvmOvc.jpg)` }}>
          <Container fixed>
            <div className={classes.overlay} />
            <Grid container>
              <Grid item md={6}>
                <div className={classes.mainFeaturesPostContent}>
                  <Typography
                    component="h1"
                    variant="h3"
                    color="inherit"
                    gutterBottom
                  >
                    DOGGY WALKER
              </Typography>
                  <Typography
                    component="h5"
                    color="black"
                    paragraph
                  >
                    Выгуляй питомца не выходя на улицу
              </Typography>
                </div>
              </Grid>
            </Grid>
          </Container>
        </Paper>
      </ main >

      <div className={classes.mainContent}>
        <Container maxWidth="md">
          <Typography variant="h2" color="textPrimary" aling="center" gutterBottom>Все для собак</Typography>
          <Typography variant="h5" color="textSecondary" aling="center" paragraph>
            Ищите сервис выгула и передержки для вашей собаки в Москве?
            Профессиональная забота о вашем питомце!

          </Typography>

          <div className={classes.MainButtons}>
            <Grid container spacing={5} justify="center">
              <Grid item>
                <Button onClick={servisHandle} variant="contained" color="primary">К Услугам</Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="primary">Подробнее</Button>
              </Grid>
            </Grid>
          </div>
        </Container>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {
              cards.map(card => (
                <Grid item key={card} xs={12} sm={6} md={4}>
                  <Card className={classes.card} elevation={5}>
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
                      {/* <Button size='small' color='primary'>
                        Подробнее
                      </Button> */}

                      {/* <LayerIcon />
                      <PlayCircleFilledIcon /> */}
                    </CardActions>
                  </Card>
                </Grid>
              ))
            }
          </Grid>
        </Container>
      </div>
    </>
  );
}

export default MainPage;
