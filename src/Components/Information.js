import { Grid, Typography } from '@mui/material'
import React from 'react'
import InfoIcon from './InfoIcon';
import { useState, useEffect } from 'react'
import imageUrlBuilder from '@sanity/image-url'
import client from './SanityClient.js'
import {createURL} from './SanityClient.js'
import axios from 'axios';

const builder = imageUrlBuilder(client);
function urlFor(source) {
return builder.image(source)
};

const Information = () =>{
    const [infoHeader, setInfoHeader] = useState({
        title: "",
        subtitle: ""
    });
    const HEADER_URL = createURL("infoPage");
    const [links, setLinks] = useState({});
    const LINKS_URL = createURL("infoLink");

    useEffect(() => {
        axios.get(HEADER_URL)
        .then((response) => {
            response.data.result.forEach((r, i) => {
                let t = {
                    title: r.title,
                    subtitle: r.subtitle,
                    key: i
                }
                setInfoHeader(t);
            });
        });
    }, [HEADER_URL]);

    useEffect(() => {
        axios.get(LINKS_URL)
        .then((response) => {
            let temp = [];
            response.data.result.forEach((r, i) => {
                let t = {
                    key: i,
                    title: r.title,
                    url: r.url,
                    icon: urlFor(r.icon.asset),
                    copy: r.copy,
                    linkText: r.linkText
                }
                temp.push(t);
            });
            setLinks(temp);
        });
    }, [LINKS_URL]);

    return (
        <div>
            <Grid container sx = {{paddingTop: '40px'}} spacing = {10} justifyContent = 'center'>
                <Grid item xs = {12}>
                    <Typography variant='h1' color = "main" sx={{ fontWeight: 550, fontFamily: 'monospace' }}>
                        {infoHeader.title}
                    </Typography>
                    <Typography variant = 'subtitle1' color = "info" sx={{ fontFamily: 'monospace' }}>
                        {infoHeader.subtitle}
                    </Typography>
                </Grid>
                {links.length > 0 && links.map((link) => {
                    return (
                        <Grid item xs = {12} sm = {6} md = {4} lg = {3}>
                            <InfoIcon link = {link} />
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    )
}

export default Information