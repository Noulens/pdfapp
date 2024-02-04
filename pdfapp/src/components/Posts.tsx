import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Posts(props: any) {
	const { posts }: any = props;
	if (posts)
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
						{/*<Typography*/}
						{/*	component="h1"*/}
						{/*variant="h2"*/}
						{/*align="center"*/}
						{/*color="text.primary"*/}
						{/*gutterBottom*/}
						{/*>*/}
						{/*Album layout*/}
						{/*</Typography>*/}
						{/*<Typography variant="h5" align="center" color="text.secondary" paragraph>*/}
						{/*Something short and leading about the collection below—its contents,*/}
						{/*	the creator, etc. Make it short and sweet, but not too short so folks*/}
						{/*don&apos;t simply skip over it entirely.*/}
						{/*</Typography>*/}
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
						{posts.map((posts: any) => (
							<Grid item key={posts.id} xs={12} sm={6} md={4}>
								<Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
								<CardMedia
									component="div"
									sx={{
										// 16:9
										pt: '20.25%',
									}}
									image="https://source.unsplash.com/random?wallpapers"
								/>
								<CardContent sx={{ flexGrow: 1 }}>
									<Typography gutterBottom variant="h5" component="h2">
										{posts.title}
									</Typography>
									<Typography>
										{posts.content}
									</Typography>
								</CardContent>
								<CardActions>
									<Button size="small">View</Button>
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
}