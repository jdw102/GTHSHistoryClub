import { IconButton, Avatar, Tooltip } from '@mui/material'

const PinnedIcon = (props) => {
    const link = props.link;
    return (
        <>
        <Tooltip title = {link.title}>
            <IconButton style = {{color: '#0072b1'}} onClick = {() => {window.open(link.url)}}>
                <Avatar src = {link.icon.toString()} sx={{ width: 30, height: 30, backgroundColor: '#0072b1' }} align='center' />
            </IconButton>
        </Tooltip>
        </>
    );
}

export default PinnedIcon;