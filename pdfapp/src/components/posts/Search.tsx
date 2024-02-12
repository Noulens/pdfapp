import React, {useState, useEffect, useRef} from 'react';
import axiosInstance from '../../axios';

import CssBaseline from "@mui/material/CssBaseline";
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link, Navigate, useLocation} from "react-router-dom";
import Button from "@mui/material/Button";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import useAuth from "../../hooks/useAuth";

const defaultTheme = createTheme();

interface Post {
	id: number;
	title: string;
	file: string;
	image: string;
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
	const { auth }: any = useAuth();
	const location = useLocation()
	const from = location.state?.from?.pathname || "/"
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
				<h1 style={{ textAlign: 'center' }}>Search results</h1>
				<Container maxWidth="md" component="main">
					<Paper >
						<TableContainer >
							<Table stickyHeader aria-label="sticky table">
								<TableHead>
									<TableRow>
										<TableCell>Id</TableCell>
										<TableCell align="left">Title</TableCell>
										<TableCell align="left">Action</TableCell>
										<TableCell align="left">Status</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{appState.posts.map((post: any) => {
										return (
											<TableRow key={post.id}>
												<TableCell component="th" scope="row">
													{post.id}
												</TableCell>

												<TableCell align="left">
													<Link
														color="textPrimary"
														to={'/post/' + post.slug}>
														{post.title}
													</Link>
												</TableCell>

												<TableCell align="left">
													<Link
														to={'/delete/' + post.id}>
														<DeleteForeverIcon></DeleteForeverIcon>
													</Link>
												</TableCell>

												<TableCell align="left">
													{post.status}
												</TableCell>
											</TableRow>
										);
									})}
									<TableRow>
										<TableCell colSpan={4} align="right">
											<Button
												href={'/create'}
												variant="contained"
												color="primary">
												Upload new
											</Button>
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableContainer>
					</Paper>
				</Container>
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