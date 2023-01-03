import { Accordion, AccordionDetails, AccordionSummary, Card, Grid, TableRow, TableCell, ListItem, Table, TableBody, Typography, Link, IconButton } from '@mui/material'
import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios'
import { useState, useEffect } from 'react'
import {createURL} from './SanityClient.js'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const Resources = () =>{
    const [dates, setDates] = useState([]);
    const DATES_URL = createURL("importantDate");
    const [resources, setResources] = useState([]);
    const RESOURCES_URL = createURL("resourceLink");

    useEffect(() => {
        axios.get(RESOURCES_URL)
        .then((response) => {
            let temp = [];
            response.data.result.forEach((r, i) => {
                let t = {
                    id: i,
                    title: r.title,
                    url: r.url,
                    description: r.description,
                }
                temp.push(t);
            });
            setResources(temp);
        });
    }, [RESOURCES_URL]);

    useEffect(() => {
        axios.get(DATES_URL)
        .then((response) => {
            let temp = [];
            response.data.result.forEach((r, i) => {
                let t = {
                    id: i,
                    title: r.title,
                    date: r.date,
                    description: r.description
                }
                temp.push(t);
            });
            setDates(temp);
        });
    }, [DATES_URL]);



    return (
        <div>
        <Grid container justifyContent= "center"  sx = {{paddingTop: '30px'}}>
            <Grid item xs = {10} sm = {10} md = {10} lg = {8} xl = {8}  raised component = {Card} style = {{borderRadius: "10px", marginBottom: 30, boxShadow: "0 0 0 8px #002d59"}}>
                <Accordion defaultExpanded>
                    <AccordionSummary component = {ListItem} expandIcon = {<ExpandMoreIcon />}  style = {{display: "flex", justifyContent: "center"}}>
                            <Typography color='#2e201f' sx={{ fontFamily: 'monospace', marginBottom: 3, marginTop: 3, fontWeight: 550}} variant='h5'>
                                Docs & Links
                            </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Table>
                            <TableBody>
                                {resources.map((r) => {
                                    return(
                                        <TableRow>
                                            <TableCell>
                                                {r.title}
                                            </TableCell>
                                            <TableCell>
                                                {r.description}
                                            </TableCell>
                                            <TableCell>
                                                <Link href = {r.url}>
                                                    <IconButton>
                                                        <OpenInNewIcon />
                                                    </IconButton>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </AccordionDetails>
                </Accordion>
            </Grid>
            <Grid item xs = {10} sm = {10} md = {10} lg = {8} xl = {8}  raised component = {Card} style = {{borderRadius: "10px", marginBottom: 30, boxShadow: "0 0 0 8px #002d59"}}>
                <Accordion defaultExpanded>
                    <AccordionSummary component = {ListItem} expandIcon = {<ExpandMoreIcon />}  style = {{display: "flex", justifyContent: "center"}}>
                            <Typography color='#2e201f' sx={{ fontFamily: 'monospace', marginBottom: 3, marginTop: 3, fontWeight: 550}} variant='h5'>
                                Important Dates
                            </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Table>
                            <TableBody>
                            {dates.map((d) => {
                                    return(
                                        <TableRow>
                                            <TableCell>
                                                {d.title}
                                            </TableCell>
                                            <TableCell>
                                                {d.description}
                                            </TableCell>
                                            <TableCell>
                                                {d.date}
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </AccordionDetails>
                </Accordion>
            </Grid>
        </Grid>
        </div>
    )
}

export default Resources