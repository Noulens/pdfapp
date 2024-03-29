import React, {useState} from 'react';
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';
// Material UI
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const defaultTheme = createTheme();

export default function Register() {
	const navigate = useNavigate();
	const initialFormData = Object.freeze({
		email: '',
		username: '',
		password: '',
		edentoken: '',
	});
	const [formData, updateFormData] = useState(initialFormData);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		updateFormData({
			...formData,
			// Trimming any whitespace
			[e.target.name]: e.target.value.trim(),
		});
	}
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log(formData);

		axiosInstance.post(`user/create/`, {
			email: formData.email,
			user_name: formData.username,
			password: formData.password,
			edentoken: formData.edentoken,
		})
		.then((res: any) => {
			navigate('/login');
			console.log(res);
			console.log(res.data);
		})
		.catch((error: any) => {
			console.log(error);
		});
	};

	return (
		<ThemeProvider theme={defaultTheme}>
		<Container component="main" maxWidth="xs">
		<CssBaseline />
		<Box
			sx={{
				marginTop: 8,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',}}>
			<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
				<LockOutlinedIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				Sign up
			</Typography>
			<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							onChange={handleChange}/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							autoComplete="username"
							name="username"
							required
							fullWidth
							id="username"
							label="Username"
							autoFocus
							onChange={handleChange}/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							variant='outlined'
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							onChange={handleChange}/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							autoComplete="edentoken"
							name="edentoken"
							required
							fullWidth
							id="edentoken"
							label="EdenToken"
							autoFocus
							onChange={handleChange}/>
					</Grid>
				</Grid>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}>
					Sign Up
				</Button>
				<Grid container justifyContent="flex-end">
					<Grid item>
						<Link href="/login" variant="body2">
							Already have an account? Sign in
						</Link>
					</Grid>
				</Grid>
			</Box>
		</Box>
		</Container>
		</ThemeProvider>
	);
}

