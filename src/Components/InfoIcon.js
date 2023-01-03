import { Card, CardContent, CardMedia, Typography,  Avatar, Link, Tooltip } from '@mui/material'

const InfoIcon = (props) => {
    const link = props.link;
    return (
        <>
            <Card raised style = {{justifyContent: 'center', display: 'flex', background: 'transparent', borderRadius:"10px"}}>
                <CardContent>
                    <CardMedia style = {{display: 'flex', justifyContent: 'center'}}>
                        <Avatar src = {link.icon} sx={{ width: 140, height:140, backgroundColor: '#3072ff'}} align = 'center' />
                    </CardMedia>
                    <Typography color='#2e201f' variant='h6' sx={{ fontFamily: 'monospace' }}>
                        {link.title}
                    </Typography>
                    <Typography color='#2e201f' variant = 'body1' sx={{ fontFamily: 'monospace' }}>
                        {link.copy ? 
                        <Tooltip title = "Copy">
                            <Link color = "secondary" style = {{cursor: "pointer"}}
                            onClick={() => {navigator.clipboard.writeText(link.url)}}
                            >{link.linkText}
                            </Link>
                        </Tooltip>
                        :
                        <Link href = {link.url} color = "secondary">{link.linkText}</Link>
                        }
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
}

export default InfoIcon;