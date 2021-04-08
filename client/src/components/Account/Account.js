import { Button, Avatar, List, ListItem, ListItemText, Divider } from '@material-ui/core'
import React from 'react'


function Account() {

	const [dense, setDense] = React.useState(false);
	const [secondary, setSecondary] = React.useState(false);

	function generate(element) {
		return [0, 1, 2].map((value) =>
			React.cloneElement(element, {
				key: value,
			}),
		);
	}
	

	return (
		<div>
			<h3>Личный кабинет</h3>
			<Avatar />
			<Button fullWidth variant='contained' disabled={false}> my button </Button>
            <List dense={dense}>
						{generate(
                <ListItem>
                  <ListItemText
                    primary="Single-line item"
                    secondary={secondary ? 'Secondary text' : null}
                  />
                </ListItem>,
               )}
            </List>
		</div>
	);
}

export default Account;
