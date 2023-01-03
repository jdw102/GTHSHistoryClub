import { Typography, Card, Grid } from '@mui/material'
import React from 'react'
import {useState, useEffect} from 'react'
import imageUrlBuilder from '@sanity/image-url'
import client from './SanityClient.js'
import {createURL} from './SanityClient.js'
import axios from 'axios'

const builder = imageUrlBuilder(client)

function urlFor(source) {
    return builder.image(source)
    }

const Mission = () => {
    const [mission, setMission] = useState({});
    const MISSION_URL = createURL("missionPage");

    useEffect(() => {
        axios.get(MISSION_URL)
        .then((response) => {
            response.data.result.forEach((r, i) => {
                let t = {
                    key: i,
                    title: r.title,
                    statement: r.statement,
                    url: urlFor(r.picture.asset)
                }
                setMission(t);
            });
        })
    }, [MISSION_URL]);

    return (
        <div style = {{marginLeft: "15px", marginRight: "-10px"}}>
            <Grid container spacing = {3} style = {{ padding: '30px'}} justifyContent = "space-evenly" alignItems = "center">
                <Grid item xs = {12} sm = {12} md ={6} lg ={6} component = {Card} raised  align = 'center' style = {{borderRadius:"10px"}}>
                    <Typography variant='h4' color='#2e201f' sx={{ fontFamily: 'monospace', marginBottom: 3, fontWeight: 550 }}>
                        {mission.title}
                    </Typography>
                    <Typography variant='body1' color='#2e201f' sx={{ fontFamily: 'monospace', fontSize: '14pt' }} align = "left">
                        {mission.statement}
                    </Typography>
                </Grid>
                <Grid item sx = {{background: "transparent", borderRadius: '10px', }} xs = {12} sm = {12} md ={6} lg ={6}>
                    <img src = {mission.url} alt ="Mission pic" style = {{width: "100%", height: "100%", borderRadius: '10px', boxShadow: "-50px -50px 0 -40px #002d59, 50px 50px 0 -40px #002d59"}}/>
                </Grid>
            </Grid>
        </div>
    )
}

export default Mission