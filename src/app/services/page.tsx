'use client';

import React, { useState } from 'react';
import { Box, Typography, Rating, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import WifiIcon from '@mui/icons-material/Wifi';
import PoolIcon from '@mui/icons-material/Pool';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SpaIcon from '@mui/icons-material/Spa';
import BedIcon from '@mui/icons-material/Bed';
import Divider from '@mui/material/Divider';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import LuggageIcon from '@mui/icons-material/Luggage';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle'; // Import icon for the new service

type Amenity = {
    name: string;
    icon: React.ReactNode;
};

const amenities: Amenity[] = [
    { name: 'Free Wi-Fi', icon: <WifiIcon /> },
    { name: 'Swimming Pool', icon: <PoolIcon /> },
    { name: 'Parking', icon: <LocalParkingIcon /> },
    { name: 'Fitness Center', icon: <FitnessCenterIcon /> },
    { name: 'Spa', icon: <SpaIcon /> },
    { name: 'Bedcover', icon: <BedIcon /> }
];

type Service = {
    name: string;
    icon: React.ReactNode;
};

const extraServices: Service[] = [
    { name: 'Early Check-In', icon: <AccessTimeIcon /> },
    { name: 'Late Checkout', icon: <WatchLaterIcon /> },
    { name: 'Luggage Storage', icon: <LuggageIcon /> },
    { name: 'Airport Shuttle', icon: <AirportShuttleIcon /> },
];

const Services = () => {
    const [selectedServices, setSelectedServices] = useState<string[]>([]);

    const toggleService = (name: string) => {
        setSelectedServices((prevSelected) =>
            prevSelected.includes(name)
                ? prevSelected.filter((item) => item !== name)
                : [...prevSelected, name]
        );
    };

    return (
        <Box>
            <Box bgcolor={'#f7f7f8'} margin={'20px'} textAlign={'center'} padding={'20px'} border={'1px solid #ccc'} borderRadius={'20px'} alignItems={'center'}>
                <Typography component="legend" variant='overline' color='black'>5.0 (1,092 Reviews)</Typography>
                <Rating name="size-medium" defaultValue={5} />
                <Typography component="legend" variant="caption" color='grey'>Outstanding: Rated 5.0 with 1,092 reviews.</Typography>
            </Box>
            <Divider textAlign="left" style={{ margin: "20px 0" }}><Typography color='text.primary' variant='overline'>Amenities</Typography></Divider>
            <Grid container spacing={2} bgcolor={'#f7f7f8'} color={'black'} margin={'20px'} padding={'20px'} border={'1px solid #ccc'} borderRadius={'20px'} width={'90%'}>
                {amenities.map((amenity, index) => (
                    <Grid item xs={6} sm={4} md={3} key={index}>
                        <div style={{ textAlign: 'center' }}>
                            {amenity.icon}
                            <Typography variant="subtitle1">{amenity.name}</Typography>
                        </div>
                    </Grid>
                ))}
                <Typography component="legend" variant="caption" color='grey' margin={'20px auto 0 auto'}>View All</Typography>
            </Grid>
            <Divider textAlign="left" style={{ margin: "20px 0" }}><Typography color='text.primary' variant='overline'>Extra Services</Typography></Divider>
            <Grid container spacing={2}>
                {extraServices.map((service, index) => (
                    <Grid item xs={6} sm={4} md={3} key={index}>
                        <Button
                            variant={selectedServices.includes(service.name) ? 'contained' : 'outlined'}
                            onClick={() => toggleService(service.name)}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textTransform: 'none',
                                margin: 'auto'
                            }}
                            sx={{
                                marginTop: 20,
                                marginBottom: 20,
                                backgroundColor: '#fff', // White background for button
                                border: '2px solid red', // Red border color
                                color: 'red', // Text color to match the border
                                borderRadius: '25px', // More rounded corners
                                padding: '10px 20px',
                                fontSize: '14px',
                                '&:hover': {
                                  backgroundColor: '#f8d7da', // Light red background on hover
                                  borderColor: '#c62828', // Darker border color on hover
                                  color: '#c62828', // Text color on hover
                                },
                              }}
                        >
                            {service.icon}
                            <Typography variant="subtitle1">{service.name}</Typography>
                        </Button>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default Services;
