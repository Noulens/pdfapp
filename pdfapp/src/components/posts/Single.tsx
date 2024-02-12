import React, {useRef} from 'react';
import {Navigate, useLocation, useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from "../../axios";
import Typography from "@mui/material/Typography";
import {Container} from "@mui/system";
import CssBaseline from "@mui/material/CssBaseline";
import useAuth from "../../hooks/useAuth";

interface Post {
	id: number;
	title: string;
	slug: string;
	author: number;
	excerpt: string;
	content: string;
	status: string;
}

const Single = () => {
	const { slug } = useParams();
	const { auth }: any = useAuth();
	const location = useLocation()
	const from = location.state?.from?.pathname || "/"
	const [data, setData] = useState<{ posts: Post | null }>({ posts: null });
	const effectRun = useRef(false);

	useEffect(() => {
		let isMounted: boolean = true
		if (effectRun.current || process.env.NODE_ENV !== 'development')
		{
			if (slug != null) {
				axiosInstance.get("/post/" + slug)
					.then((res) => {
						setData({posts: res.data});
						console.log(res.data);
					}).catch((error) => {
						console.log(error)
				})
			}
		}
		return (): void =>
		{
			isMounted = false
			effectRun.current = true
		}
	}, [setData]);

	if (data.posts)
		return (
		<Container component="main" maxWidth="md">
			<CssBaseline />
			<div></div>
			<div >
				<Container maxWidth="sm">
					<Typography
						component="h1"
						variant="h2"
						align="center"
						color="textPrimary"
						gutterBottom>
						{data.posts.title}
					</Typography>
					<Typography
						variant="h5"
						align="center"
						color="textSecondary"
						paragraph>
						{data.posts.excerpt}
					</Typography>
				</Container>
			</div>
		</Container>
		)
	else
		return (
			<div>
				<p>Loading...</p>
			</div>
		)
};

export default Single;
