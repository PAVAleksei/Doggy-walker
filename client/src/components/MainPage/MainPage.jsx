import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Paper, Typography } from "@material-ui/core";
import  PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled"
import LayerIcon from "@material-ui/icons/Layers"
import { makeStyles } from "@material-ui/core/styles";

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
    textShadow: '1px 1px 3px #000000, 1px 1px 3px #000000',
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
  const cards = [1, 2, 3, 4, 5, 6]
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
                    color="inherit"
                    paragraph
                  >
                    Ищите сервис выгула и передержки для вашей собаки в Москве?
              </Typography>
                </div>
              </Grid>
            </Grid>
          </Container>
        </Paper>
      </ main >

      <div className={classes.mainContent}>
        <Container maxWidth="md">
          <Typography variant="h2" color="textPrimary" aling="center" gutterBottom>Doggy Walker</Typography>
          <Typography variant="h5" color="textSecondary" aling="center" paragraph>
          Ищите сервис выгула и передержки для вашей собаки в Москве?
          Профессиональная забота о вашем питомце!

          </Typography>

          <div className={classes.MainButtons}>
            <Grid container spacing={5} justify="center">
              <Grid item>
                <Button variant="contained" color="primary">Donations</Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="primary">Learn more</Button>
              </Grid>
            </Grid>
          </div>
        </Container>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {
              cards.map(card => (
                <Grid item key={card} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image="https://cdn21.img.ria.ru/images/156270/94/1562709428_0:160:3072:1888_600x0_80_0_0_df31909c22a728716eec73fa49b6e13d.jpg"
                      title="image title"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography variant="h5" gutterBottom>
                        Приют собак
                        </Typography>
                      <Typography>
                        Приют собак вбо м ылимлочатмлодлчтм амичмиаолчита
                        </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size='small' color='primary'>
                       Подробнее
                      </Button>

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
