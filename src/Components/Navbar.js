import React from 'react'
import {AppBar, Box, Toolbar, Typography, Grid, IconButton, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from '@mui/material';
import {NavLink} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios'
import { useState, useEffect } from 'react'
import imageUrlBuilder from '@sanity/image-url'
import client from './SanityClient.js'
import {createURL} from './SanityClient.js'
import PinnedIcon from './PinnedIcon';

const menuItems = [
    {
        key: 0,
        type: 'pagelink',
        title: 'Info',
        url: '/information'
    },
    {
        key: 1,
        type: 'pagelink',
        title: 'Resources',
        url: '/resources'
    },
    {
        key: 2,
        type: 'pagelink',
        title: 'Mission',
        url: '/mission'
    }
]

const builder = imageUrlBuilder(client)

function urlFor(source) {
return builder.image(source)
}
  
const Navbar = (props) => {
    const currloc = useLocation().pathname;

    const [links, setLinks] = useState([]);

    const LINKS_URL = createURL("pinnedLink");

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
                }
                temp.push(t);
            });
            setLinks(temp);
        });
    }, [LINKS_URL]);

    return (
        <Box sx = {{flexGrow: 1}}>
            <AppBar position = "static" style = {{background: '#ed4134'}}>
                <Grid container component = {Toolbar}> 
                    <Grid xs ={1} sm ={1} md = {4} lg = {5} item justifyContent = 'left' align = 'left'>
                        <NavLink to = '/'>
                        <IconButton
                            size='large'
                            edge="start"
                        >
                            <HomeIcon style= {{color: '#ffffff'}}/>
                        </IconButton>
                        </NavLink>
                    </Grid>
                    <Grid align = "center" item xs = {12} sm = {11} md = {8} lg = {7}>
                        <Grid container justifyContent = "space-around">
                            {menuItems.filter(x => x.type === 'pagelink').map((x, key) => (
                                <Grid align = "center" xs={4} sm ={2} item key = {key} >
                                    <Link href={x.url} color="primary" style={{ textDecoration: (currloc === x.url) ? "" : 'none' }}>
                                        <Button color = 'primary' key={x.title} style={{ borderRadius: "10px", background: "primary"}}>
                                            <Typography  variant='h6' color='white' sx={{ fontWeight: 550, fontFamily: 'monospace' }}>{x.title}</Typography>
                                        </Button>
                                    </Link>
                                </Grid>

                            ))}
                    {links.map((link, key) => {
                        return (
                            <Grid xs = {1} item key = {key}>
                                <PinnedIcon link = {link} />
                            </Grid>
                        )
                    })}
                        </Grid>
                    </Grid>
                </Grid>
            </AppBar>
        </Box>
        
    )
}

export default Navbar