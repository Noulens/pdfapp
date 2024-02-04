import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import Posts from './components/Posts';
import PostLoadingComponent from './components/PostLoading';

const App = () => {
	const PostLoading = PostLoadingComponent(Posts);
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
			fetch(apiUrl)
				.then((res) => res.json())
				.then((posts) => {
					setAppState({ loading: false, posts: posts})
				})
				.catch((error) => console.error(error));

		}
		return (): void =>
		{
			isMounted = false
			effectRun.current = true
		}
	}, [setAppState])

	return (
		<div className="App">
			<h1>All Uploads</h1>
			<PostLoading isLoading={appState.loading} posts={appState.posts} />
		</div>
	);
}

export default App;
