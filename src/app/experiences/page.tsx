import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Experiences = () => {
    const firstName = "Felix";
    return (
        <Box bgcolor={"white"}>
            <Typography variant='h4' color='text.primary'>Hey, {firstName}!</Typography>
            <Divider textAlign="left"><Typography color='text.primary' variant='overline'>REVIEWS</Typography></Divider>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Ali Connors" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body1"
                                    sx={{ color: 'text.primary', display: 'inline' }}
                                >
                                    "Perfect local spots!"
                                </Typography>
                            </React.Fragment>
                        }
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    sx={{ color: 'text.primary', display: 'inline' }}
                                >
                                    Ali Connors
                                </Typography>
                                {" — The hotel staff recommended the best local spots for dining…"}
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Jennifer Scott" src="/static/images/avatar/2.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body1"
                                    sx={{ color: 'text.primary', display: 'inline' }}
                                >
                                    "Great restaurant choices!"
                                </Typography>
                            </React.Fragment>
                        }
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    sx={{ color: 'text.primary', display: 'inline' }}
                                >
                                    Jennifer Scott
                                </Typography>
                                {" — Loved the restaurant suggestions from…"}
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Sandra Adams" src="/static/images/avatar/3.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body1"
                                    sx={{ color: 'text.primary', display: 'inline' }}
                                >
                                    "Hidden gem shopping areas!"
                                </Typography>
                            </React.Fragment>
                        }
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    sx={{ color: 'text.primary', display: 'inline' }}
                                >
                                    Sandra Adams
                                </Typography>
                                {' — Thanks for pointing us to unique shopping areas…'}
                            </React.Fragment>
                        }
                    />
                </ListItem>
            </List>
        </Box>
    )
}

export default Experiences;