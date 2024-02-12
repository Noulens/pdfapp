import React, { useState } from 'react';
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';
//MaterialUI
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {IconButton} from "@mui/material";
import {FileDownload, FileUpload, PhotoCamera} from "@mui/icons-material";
import axios from "axios";

export default function Create() {
    function slugify(string: any) {
        const a =
            'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
        const b =
            'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
        const p = new RegExp(a.split('').join('|'), 'g');

        return string
            .toString()
            .toLowerCase()
            .replace(/\s+/g, '-') // Replace spaces with -
            .replace(p, (c: string) => b.charAt(a.indexOf(c))) // Replace special characters
            .replace(/&/g, '-and-') // Replace & with 'and'
            .replace(/[^\w\-]+/g, '') // Remove all non-word characters
            .replace(/\-\-+/g, '-') // Replace multiple - with single -
            .replace(/^-+/, '') // Trim - from start of text
            .replace(/-+$/, ''); // Trim - from end of text
    }

    const history = useNavigate();
    const initialFormData = Object.freeze({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
    });

    const [formData, updateFormData] = useState(initialFormData);
    const [image, setFile] = useState<any>(null);

    const handleChange = (e: any) => {
        if (e.target.name.includes('image')) {
            setFile({
                image: e.target.files,
            })
            console.log(e.target.files);
        }
        if (e.target.name.includes('title')) {
            updateFormData({
                ...formData,
                [e.target.name]: e.target.value.trim(),
                ['slug']: slugify(e.target.value.trim()),
            });
        } else {
            updateFormData({
                ...formData,
                [e.target.name]: e.target.value.trim(),
            });
        }
    };

    // const handleSubmit = (e: any) => {
    //     e.preventDefault();
    //     let formdata = new FormData();
    //     formdata.append('title', formData.title);
    //     formdata.append('slug', formData.slug);
    //     formdata.append('author', '1');
    //     formdata.append('excerpt', formData.excerpt);
    //     formdata.append('content', formData.content);
    //     formdata.append('image', image.image[0]);
    //     axiosInstance
    //         .post(`create/`, formdata)
    //         .then((res) => {
    //             history('/', { replace: true });
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const config = {
            headers: {
                Authorization: localStorage.getItem('access_token')
                    ? 'JWT ' + localStorage.getItem('access_token')
                    : null,
                'content-type': 'multipart/form-data'
            }
        };
        const url = 'http://127.0.0.1:8000/api/create/';
        let formdata = new FormData();
        formdata.append('title', formData.title);
        formdata.append('slug', formData.slug);
        formdata.append('author', '1');
        formdata.append('excerpt', formData.excerpt);
        formdata.append('content', formData.content);
        formdata.append('image', image.image[0]);

        axios.post(url, formdata, config)
            .then((res) => {
                history('/', {replace: true});
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div>
                <br/>
                <Typography component="h1" variant="h5">
                    Upload new file
                </Typography>
                <br/>
                <form noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="title"
                                label="Upload Title"
                                name="title"
                                autoComplete="title"
                                onChange={handleChange}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="excerpt"
                                label="Post Excerpt"
                                name="excerpt"
                                autoComplete="excerpt"
                                onChange={handleChange}
                                multiline
                                minRows={4}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="slug"
                                label="slug"
                                name="slug"
                                autoComplete="slug"
                                value={formData.slug}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="content"
                                label="content"
                                name="content"
                                autoComplete="content"
                                onChange={handleChange}
                                multiline
                                minRows={4}/>
                        </Grid>
                            <IconButton color="primary" component="span">
                                <input
                                    accept="image/*"
                                    style={{ alignItems: "center" }}
                                    id="raised-button-file"
                                    onChange={handleChange}
                                    name={"image"}
                                    type="file"/>
                            </IconButton>
                    </Grid>
                    <br/>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}>
                        Upload new
                    </Button>
                </form>
            </div>
        </Container>
    );
}