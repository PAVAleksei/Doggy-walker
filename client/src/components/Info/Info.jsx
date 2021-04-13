import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import {
  Button,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  root: {
    // minWidth: 175,
    // maxWidth: 175,
    margin: 10,
    paddingTop: 7,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
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
    display: "inline-block",
  },
  posi: {
    display: "inline-block",
  },
});

export default function Info() {
  const user = useSelector((state) => state.user);
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Link variant="contained" component="label">
        <input type="file" hidden />
        <Avatar className={classes.big} src={user?.photo} />
      </Link>
      <CardContent>
        <Typography variant="h6" component="h4" gutterBottom>
          {user.firstname} {user.lastname}
        </Typography>
        <Typography className={classes.title} color="textSecondary">
          {user.email}
        </Typography>
        <Typography className={classes.title} color="textSecondary">
          Тип: {user.kind}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/user/${user.firstname}${user.lastname}`}>
          <EditIcon className={classes.posi} />
        </Link>
      </CardActions>
    </Card>
  );
}
