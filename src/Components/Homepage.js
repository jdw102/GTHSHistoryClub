import React from 'react'
import { Grid, Typography, CardContent, Card, Avatar, CardMedia, Paper, Button, Link, Tooltip } from '@mui/material'
import axios from 'axios'
import { useState, useEffect } from 'react'
import imageUrlBuilder from '@sanity/image-url'
import client from './SanityClient.js'
import {createURL} from './SanityClient.js'
import './css/header.css'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const builder = imageUrlBuilder(client)

function urlFor(source) {
return builder.image(source)
}

const Homepage = () =>{
    const [images, setImages] = useState([]);
    const [quoteIcon, setQuoteIcon] = useState({});
    const HOME_IMAGES_URL = createURL("homepageImage");
    const QUOTE_ICON_URL = createURL("historyIcon");



    useEffect(() => {
        axios.get(HOME_IMAGES_URL)
        .then((response) => {
            let temp = [];
            response.data.result.forEach((r, i) => {
                let t = {
                    url: urlFor(r.picture.asset),
                    title: r.name,
                    key: i
                }
                temp.push(t);
            });
            setImages(temp);
        });
    }, [HOME_IMAGES_URL]);

    useEffect(() => {
        axios.get(QUOTE_ICON_URL)
        .then((response) => {
            response.data.result.forEach((r, i) => {
                let temp = {
                    img: urlFor(r.picture.asset),
                    title: r.title,
                    description: r.description,
                    url: r.url,
                    key: i
                }
                setQuoteIcon(temp);
            })
        })
    }, [QUOTE_ICON_URL])

    return (
        <div>
            <Grid container spacing = {3} style = {{padding: 30}} justifyContent = "space-evenly">
                <Grid item xs = {12} md = {6}>
                    <Link target = "_blank" href = {quoteIcon.url} style={{ textDecoration: 'none' }}>
                        <Tooltip title = "Learn more">
                            <Button component = {Card} raised sx = {{ diplay: "flex", height: "500px", backgroundColor: '#002d59', borderRadius: "10px", padding: 2}}>
                                <CardContent>
                                        <h1 className='header'>
                                            GTHS History Club
                                        </h1>
                                    <CardMedia style ={{display: "flex", justifyContent: "center"}}>
                                        <Avatar src = {quoteIcon.img != null ? quoteIcon.img.toString() : null}  sx = {{width: 200, height: 200, border: "5px solid #f5f3f2"}}/>
                                    </CardMedia>
                                    <Typography variant='h6' color= "#f5f3f2" sx={{ fontFamily: 'monospace', align: "center" }}>
                                        {quoteIcon.title}
                                    </Typography>
                                    <Typography component = {Paper} variant='subtitle1' color= "primary" sx={{ fontFamily: 'monospace', align: "center", backgroundColor: "#f5f3f2"  }}>
                                        {quoteIcon.description}
                                    </Typography>
                                </CardContent>
                            </Button>
                        </Tooltip>
                    </Link>
                </Grid>
                <Grid item xs = {12} md = {6} >
                    <Carousel autoPlay = {true} infiniteLoop = {true}>
                        {images.map((img, key) => {
                            return(
                                <div style = {{height: "500px"}} key = {key}>
                                    <img alt = {img.title} src = {img.url.toString()}/>
                                </div>  
                            )
                        })}
                    </Carousel>
                </Grid>
            </Grid>
        </div>
    )
}

export default Homepage