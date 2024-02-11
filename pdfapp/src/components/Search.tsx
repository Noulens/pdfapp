import React, {useState, useEffect, useRef} from 'react';
import axiosInstance from '../axios';

import CssBaseline from "@mui/material/CssBaseline";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link, useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";

const defaultTheme = createTheme();

interface Post {
	id: number;
	title: string;
	slug: string;
	author: number;
	excerpt: string;
	content: string;
	status: string;
}

interface AppState {
	search: string;
	posts: Post[];
}

const Search = () => {
	const search = 'search';
	const [appState, setAppState] = useState<AppState>({
		search: '',
		posts: [],
	});
	const effectRun = useRef(false);
	useEffect(() => {
		let isMounted: boolean = true
		if (effectRun.current || process.env.NODE_ENV !== 'development') {
			axiosInstance.get<Post[]>(`${search}/${window.location.search}`).then((res) => {
				const allPosts = res.data;
				setAppState({...appState, posts: allPosts});
				console.log(res.data);
			});
		}
		return (): void =>
		{
			isMounted = false
			effectRun.current = true
		}
	}, []);
	if (appState.posts.length > 0)
		return (
			<ThemeProvider theme={defaultTheme}>
				<CssBaseline />
				<main>
					<Box
						sx={{
							bgcolor: 'background.paper',
							pt: 8,
							pb: 6,
						}}>
						<Container maxWidth="sm">
							<Stack
								sx={{ pt: 4 }}
								direction="row"
								spacing={2}
								justifyContent="center">
								<Button variant="contained">Main call to action</Button>
								<Button variant="outlined">Secondary action</Button>
							</Stack>
						</Container>
					</Box>
					<Container sx={{ py: 8 }} maxWidth="md">
						<Grid container spacing={4}>
							{appState.posts.map((posts: any) => (
								<Grid item key={posts.id} xs={12} sm={6} md={4}>
									<Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
										<Link
											to={"/post/" + posts.slug}
											color="textPrimary">
											<CardMedia
												component="div"
												sx={{
													// 16:9
													pt: '20.25%',
												}}
												image="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg"/>
										</Link>
										<CardContent sx={{ flexGrow: 1 }}>
											<Typography gutterBottom variant="h5" component="h2">
												{posts.title}
											</Typography>
											<Typography>
												{posts.content}
											</Typography>
										</CardContent>
										<CardActions>
											<Link
												to={"/post/" + posts.slug}
												color="textPrimary">
											<Button size="small">View</Button>
											</Link>
											<Button size="small">Edit</Button>
										</CardActions>
									</Card>
								</Grid>
							))}
						</Grid>
					</Container>
				</main>
			</ThemeProvider>
		);
	else
		return (
			<div>
				<h1>No Posts Found</h1>
			</div>
		)
};
export default Search