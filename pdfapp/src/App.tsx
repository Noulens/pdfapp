import React, {useEffect, useRef, useState} from 'react';
import './App.css';
// import Posts from './components/posts/Posts';
import PostLoadingComponent from './components/posts/PostLoading';
import axiosInstance from "./axios";
import PostsTab from "./components/posts/PostTab";
import Create from "./components/crud/Create";
import Button from "@material-ui/core/Button";
import {Link, Navigate, Outlet, useLocation} from "react-router-dom";
import useAuth from "./hooks/useAuth";

const App = () => {
	const { auth }: any = useAuth();
	const PostLoading = PostLoadingComponent(PostsTab);
	const location = useLocation()
	const from = location.state?.from?.pathname || "/"
	const [appState, setAppState] = useState({
		loading: false,
		posts: null,
	});
	const effectRun = useRef(false);

	useEffect(() => {
		let isMounted: boolean = true
		if (effectRun.current || process.env.NODE_ENV !== 'development')
		{
			setAppState({ loading: true, posts: null})
			const apiUrl = `http://127.0.0.1:8000/api`

			axiosInstance.get(apiUrl)
				.then((res) => {
					setAppState({ loading: false, posts: res.data});
					console.log(res.data);
				})
				.catch((error) => console.error(error));
		}
		return (): void =>
		{
			isMounted = false
			effectRun.current = true
		}
	}, [])
	if (appState.posts === null)
	{
		return (
			<div className="App">
				<h1>All Uploads</h1>
				No posts available
				<Link to={'/create'}>
					<Button
						variant="contained"
						color="primary">
						Upload new
					</Button>
				</Link>
			</div>
		);
	}
	return (
		<div className="App">
			<h1>All Uploads</h1>
			<PostLoading isLoading={appState.loading} posts={appState.posts} />
		</div>
	);
}

export default App;
