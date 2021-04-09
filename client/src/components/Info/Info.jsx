
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import { Button, Avatar, List, ListItem, ListItemText, Divider } from '@material-ui/core'
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
		// minWidth: 175,
		// maxWidth: 175,
		margin: 10,
		paddingTop: 7,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
	},
	big: {
		height: 130,
		width: 130,
		display: 'inline-block'
	},
	posi: {
		display: 'inline-block'
	}
});

export default function Info() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
	  <Card className={classes.root}>
		  <Avatar className={classes.big} src='https://www.kinonews.ru/insimgs/poster/poster9623_1.jpg'/>
      <CardContent>
        <Typography className={classes.pos} color="textSecondary" gutterBottom>
          Иван Иванов
        </Typography>
        <Typography variant="h6" component="h4">
				Рейтинг: 4.6
        </Typography>
        <Typography className={classes.title} color="textSecondary">
          e-mail: v1@mail.ru
        </Typography>
      </CardContent>
		  <CardActions>
        <Button size="small">Редактировать</Button>
			  <Link to="/"><EditIcon className={classes.posi}/></Link>
      </CardActions>
    </Card>
  );
}
