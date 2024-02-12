import React, {useState} from 'react';
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify";
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
import useAuth from "../../hooks/useAuth";


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Login() {
	const { auth }: any = useAuth();
	const { setAuth }: any = useAuth()
	const navigate = useNavigate();
	const initialFormData = Object.freeze({
		email: '',
		password: '',
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

		axiosInstance.post(`token/`, {
			email: formData.email,
			password: formData.password,
		})
		.then((res: any) => {
			localStorage.setItem('access_token', res.data.access);
			localStorage.setItem('refresh_token', res.data.refresh);
			axiosInstance.defaults.headers['Authorization'] = 'JWT ' + localStorage.getItem('access_token');
			console.log(res.data);

			return axiosInstance.post('user/details/', {
				email: formData.email
			});
		})
		.then((res: any) => {
			setAuth({
				user: res.data?.email,
				edentoken: res.data?.edentoken,
				id: res.data?.id
			});
			navigate('/');
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
						Sign in!
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
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}>
							Sign In
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link href="/register" variant="body2">
									Don't have an account? Sign Up
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}

