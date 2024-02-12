import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from "@mui/material/Link";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import SearchBar from "material-ui-search-bar";


const Header = () => {
	let history = useNavigate();
	const [data, setData] = useState({ search: '' });
	const goSearch = (e: any) => {
		history('/search/?search=' + data.search);
	}

	return (
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					<Link
						component={NavLink}
						to="/"
						underline="none"
						color="inherit">
						Uppy - a basic PDF App
					</Link>
				</Typography>
				<SearchBar
					value={data.search}
					onChange={(newValue) => setData({ search: newValue })}
					onRequestSearch={() => goSearch(data.search)}
				/>
				<Box>
					<Link
						color="textPrimary"
						component={NavLink}
						to="/register"
						sx={{ marginRight: 2 }}>
						Register
					</Link>
					<Button
						sx={{ marginRight: 1, backgroundColor: '#4caf50', color: 'white',
							'&:hover': {
								backgroundColor: '#388e3c', // Hover color for the "Login" button
							},
						}}
						variant="outlined"
						component={NavLink}
						to="/login">
						Login
					</Button>
					<Button
						sx={{ marginRight: 1, backgroundColor: '#af4c6f', color: 'white',
							'&:hover': {
								backgroundColor: '#721212', // Hover color for the "Login" button
							},
						}}
						variant="outlined"
						component={NavLink}
						to="/logout">
						Logout
					</Button>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
