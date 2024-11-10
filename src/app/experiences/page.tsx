import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';

function srcset(image: string, width: number, height: number, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${width * cols}&h=${height * rows
            }&fit=fill&auto=format&dpr=2 2x`,
    };
}

const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
        author: '@bkristastucchio',
        featured: true,
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
        author: '@rollelflex_graphy726',
    },
    {
        img: 'https://images.unsplash.com/photo-1642231877874-ce3e205f39c0?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Camera',
        author: '@helloimnik',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
        author: '@nolanissac',
    },
    {
        img: 'https://plus.unsplash.com/premium_photo-1670984940113-f3aa1cd1309a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Lorem',
        author: '@hjrc33',
    },
    {
        img: 'https://plus.unsplash.com/premium_photo-1671394138398-fe1ce5e5b03b?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Ipsum',
        author: '@arwinneil',
        featured: true,
    },
    {
        img: 'https://plus.unsplash.com/premium_photo-1676310055316-d73c9d5eeb51?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Dolor',
        author: '@tjdragotta',
    },
    {
        img: 'https://images.unsplash.com/photo-1621871908119-295c8ce5cee4?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Asian Cuisine',
        author: '@katie_wasserman',
    },
    {
        img: 'https://images.unsplash.com/photo-1651750369170-8e89e9e05477?q=80&w=2727&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Lorem Ipsum',
        author: '@silverdalex',
    },
    {
        img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
        title: 'Vegan',
        author: '@shelleypauls',
    },
    {
        img: 'https://plus.unsplash.com/premium_photo-1680172800885-61c5f1fc188e?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Bakery',
        author: '@peterlaster',
    },
    {
        img: 'https://images.unsplash.com/photo-1501747188-61c00b3d8ba0?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Pastry',
        author: '@southside_customs',
    },
];

const Experiences = () => {
    const firstName = "Felix";

    return (
        <Box bgcolor={"white"}>
            <Typography variant='h4' color='text.primary' padding={'20px 10px'}>Hey, {firstName}!</Typography>
            <Typography variant='h6' color='text.primary' padding={'10px 20px'} textAlign={'center'} fontSize={'2rem'}>Transform your trips into <br /> enchanting adventures!</Typography>
            <Divider textAlign="left" style={{ margin: "20px 0" }}><Typography color='text.primary' variant='overline'>Restaurants & Cafes</Typography></Divider>
            <ImageList
                sx={{
                    width: '100%',
                    height: 450,
                    transform: 'translateZ(0)',
                }}
                rowHeight={200}
                gap={1}
            >
                {itemData.map((item) => {
                    const cols = item.featured ? 2 : 1;
                    const rows = item.featured ? 2 : 1;

                    return (
                        <ImageListItem key={item.img} cols={cols} rows={rows}>
                            <img
                                {...srcset(item.img, 250, 200, rows, cols)}
                                alt={item.title}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                sx={{
                                    background:
                                        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                }}
                                title={item.title}
                                position="top"
                                actionIcon={
                                    <IconButton
                                        sx={{ color: 'white' }}
                                        aria-label={`star ${item.title}`}
                                    >
                                        <StarBorderIcon />
                                    </IconButton>
                                }
                                actionPosition="left"
                            />
                        </ImageListItem>
                    );
                })}
            </ImageList>
            <Divider textAlign="left" style={{ margin: "20px 0" }}><Typography color='text.primary' variant='overline'>REVIEWS</Typography></Divider>
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
            <Divider textAlign="left" style={{ margin: "20px 0" }}><Typography color='text.primary' variant='overline'>Based on your preferences</Typography></Divider>
        </Box >
    )
}

export default Experiences;