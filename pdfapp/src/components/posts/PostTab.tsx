import React from 'react';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Button from '@material-ui/core/Button';
import CssBaseline from "@mui/material/CssBaseline";
import {createTheme, ThemeProvider} from "@mui/material/styles";

const defaultTheme = createTheme();

const PostsTab = (props: { posts: any; }) => {
    const { posts } = props;
    if (!posts || posts.length === 0) return <p>Can not find any posts, sorry</p>;
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
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
                                {posts.map((post: any) => {
                                    return (
                                        <TableRow key={post.id}>
                                            <TableCell component="th" scope="row">
                                                {post.id}
                                            </TableCell>

                                            <TableCell align="left">
                                                <Link
                                                    color="textPrimary"
                                                    href={'/post/' + post.slug}>
                                                    {post.title}
                                                </Link>
                                            </TableCell>

                                            <TableCell align="left">
                                                <Link
                                                    href={'/delete/' + post.id}>
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
};
export default PostsTab;