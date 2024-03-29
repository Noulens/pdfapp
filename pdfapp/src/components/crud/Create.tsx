import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//MaterialUI
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {IconButton} from "@mui/material";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import axiosInstance from "../../axios";


interface ResponseObject {
    status: string;
    provider: string;
    items: { keyword: string; importance: number }[];
}


function extractKeywords(response: ResponseObject[]) {
    const keywordsArray = response[0].items.map((item: { keyword: string; importance: number }) => item.keyword);
    return keywordsArray.join(', ');
}

export default function Create() {
    let newpostid: number = 0
    let updated: any
    let fileurl: string = ''
    let text_to_analyze: string = ''
    const { auth }: any = useAuth();
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
    const [file, setPdf] = useState<any>(null);

    const handleChange = (e: any) => {
        if (e.target.name.includes('image')) {
            setFile({
                image: e.target.files,
            })
            setPdf(null);
        }
        if (e.target.name.includes('file')) {
            setPdf({
                file: e.target.files,
            })
            setFile(null);
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

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if ((file === null && image === null) || (file && image)) {
            alert('Please upload one file');
            return;
        }
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
        formdata.append('author', auth.id)
        formdata.append('excerpt', formData.excerpt);
        formdata.append('content', formData.content);
        if (file) {
            fileurl = file.file[0];
            formdata.append('file', file.file[0]);
        }
        if (image) {
            fileurl = image.image[0];
            formdata.append('image', image.image[0]);
        }
        axios.post(url, formdata, config)
            .then((res) => {
                console.log(res);
                newpostid = res.data.id
                updated = res.data
                window.alert('Upload successfull, and being treated')
                history('/', {replace: true});
                const options = {
                    method: 'POST',
                    url: 'https://api.edenai.run/v2/ocr/ocr',
                    headers: {
                        'content-type': 'multipart/form-data',
                        authorization: `Bearer ${auth.edentoken}`
                    },
                    data: {
                        response_as_dict: false,
                        attributes_as_list: false,
                        show_original_response: false,
                        file_url: null,
                        providers: 'amazon',
                        file: fileurl
                    }
                };
                return axios.request(options)
                .then(function (response) {
                    console.log(response.data[0].text);
                    text_to_analyze = response.data[0].text
                    return axiosInstance.put(`edit/${newpostid}`, {
                        title: updated.title,
                        slug: updated.slug,
                        excerpt: updated.excerpt,
                        content: response.data[0].text,
                        author: updated.author,
                        keywords: "temp"
                    }).then((res) => {
                        console.log(res);
                        const options = {
                            method: 'POST',
                            url: 'https://api.edenai.run/v2/text/keyword_extraction',
                            headers: {
                                accept: 'application/json',
                                'content-type': 'application/json',
                                authorization: `Bearer ${auth.edentoken}`
                            },
                            data: {
                                response_as_dict: false,
                                attributes_as_list: false,
                                show_original_response: false,
                                providers: 'openai',
                                text: text_to_analyze
                            }
                        };
                        return axios.request(options)
                            .then((res) => {
                                console.log(res.data);
                                const responseData: ResponseObject[] = res.data;
                                const extractedKeywords = extractKeywords(responseData);
                                console.log("Here ", extractedKeywords);
                                return axiosInstance.put(`edit/${newpostid}`, {
                                    title: updated.title,
                                    slug: updated.slug,
                                    excerpt: updated.excerpt,
                                    content: text_to_analyze,
                                    author: updated.author,
                                    keywords: extractedKeywords
                                }).then((res) => {
                                    console.log(res);
                                })
                            }).catch((error) => {
                                console.log(error);
                            })
                    }).catch((error) => {
                        console.log(error);
                    })
                })
                .catch(function (error) {
                    console.error(error);
                });
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
                                defaultValue={"Your excerpt will be updated after the file is uploaded"}
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
                                defaultValue={"Your content will be updated after the file is uploaded"}
                                multiline
                                minRows={4}/>
                        </Grid>
                        <br/>
                        <p>Upload an image</p>
                            <IconButton color="primary" component="span">
                                <input
                                    accept="image/*"
                                    style={{ alignItems: "center" }}
                                    id="raised-button-file"
                                    onChange={handleChange}
                                    name={"image"}
                                    type="file"/>
                            </IconButton>
                        <br/>
                        <p>or upload a pdf</p>
                            <IconButton color="primary" component="span">
                                <input
                                    accept="application/pdf"
                                    style={{ alignItems: "center" }}
                                    id="raised-button-file"
                                    onChange={handleChange}
                                    name={"file"}
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
