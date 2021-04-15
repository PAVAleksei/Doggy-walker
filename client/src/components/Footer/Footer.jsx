import { BottomNavigation, BottomNavigationAction, Box, makeStyles, Typography } from "@material-ui/core/"
import { useState } from "react"

import FolderIcon from "@material-ui/icons/Folder"
import RestoreIcon from "@material-ui/icons/Restore"
import FavoriteIcon from "@material-ui/icons/Favorite"
import LocationOnIcon from "@material-ui/icons/LocationOn"




const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  footer: {
    marginTop: 'auto'
  }
}));

export const Footer = () => {

  const classes = useStyles();
  const [value, setValue] = useState("recents")

  const handleChange = (event, newWalue) => {
    setValue(newWalue)
  }

  return (
    // <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', }}>
    <Box className={classes.footer} m={2}>
      <Box m={1}>

        <Typography variant="h6" aling="center" gutterBottom>

        </Typography>
      </Box>
      <BottomNavigation
        value={value}
        onChange={handleChange}
        className={classes.root}
      >
        <BottomNavigationAction
          label="Recents"
          value="recents"
          icon={<RestoreIcon />}
        />
        <BottomNavigationAction
          label="Favorites"
          value="favorites"
          icon={<FavoriteIcon />}
        />
        <BottomNavigationAction
          label="Nearby"
          value="nearby"
          icon={<LocationOnIcon />}
        />
        <BottomNavigationAction
          label="Folder"
          value="folder"
          icon={<FolderIcon />}
        />
      </BottomNavigation>
      <Typography
        aling="center"
        color="textSecondary"
        component="p"
        variant="subtitle1"
      >
        Product by "Doggy walker community" 2021, все права защищены!
        </Typography>
    </Box>
    // </div>
  )
}
