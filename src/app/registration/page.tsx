"use client"
import React, { useState } from 'react';
import { TextField, Button, Box, Divider, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useRouter } from 'next/navigation';

const InterestButton = styled(Button)<{ selected: boolean }>(({ selected }) => ({
  margin: '5px',
  borderRadius: '20px',
  border: `2px solid ${selected ? '#d32f2f' : '#e0e0e0'}`,
  color: selected ? '#d32f2f' : '#d32f2f',
  padding: '10px 20px',
  fontSize: '14px',
  backgroundColor: 'transparent',
  '&:hover': {
    border: `2px solid ${selected ? '#c62828' : '#bdbdbd'}`,
    backgroundColor: '#f5f5f5',
  },
}));

const RegistrationPage = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [nationality, setNationality] = useState('');
  const [passport, setPassport] = useState('');
  const router = useRouter();

  const handleInterestClick = (interest: string) => {
    setInterests((prevInterests) =>
      prevInterests.includes(interest)
        ? prevInterests.filter((item) => item !== interest)
        : [...prevInterests, interest]
    );
  };

  const handleCreateAccount = () => {
    const profile = {
      name,
      lastName,
      interests
    };
    // Save profile to localStorage
    localStorage.setItem('userProfile', JSON.stringify(profile));
    console.log('Profile saved to localStorage:', profile);
    router.push('/');
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: '20px' }}>
        <Typography variant="h6" gutterBottom color='#505050'>
        Create a new account
        </Typography>
      <Divider style={{ margin: '20px 0', backgroundColor: '#BDBDBD' }} />

    <Box style={{ margin: '20px 0' }}>
    <Typography variant="h6" gutterBottom color='#BABABA'>
        Personal Information
        </Typography>
      <TextField
        label="First Name"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Last Name"
        fullWidth
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        margin="normal"
      />
        <TextField
            label="Nationality"
            fullWidth
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            margin="normal"
        />
        <TextField
            label="Passport Number"
            fullWidth
            value={passport}
            onChange={(e) => setPassport(e.target.value)}
            margin="normal"
        />
    </Box>

      <div>
      <Divider style={{ margin: '20px 0', backgroundColor: '#BDBDBD' }} />

      <Box style={{ margin: '20px 0' }}>

        <Typography variant="h6" gutterBottom color='#BABABA'>
          Select your interests:
        </Typography>
        <div style={{ display: 'flex', flexWrap: 'wrap', color: 'black' }}>
          <InterestButton
            selected={interests.includes('Technology')}
            onClick={() => handleInterestClick('Technology')}
          >
            📱 Technology
          </InterestButton>
          <InterestButton
            selected={interests.includes('Sports')}
            onClick={() => handleInterestClick('Sports')}
          >
            🏅 Sports
          </InterestButton>
          <InterestButton
            selected={interests.includes('Music')}
            onClick={() => handleInterestClick('Music')}
          >
            🎶 Music
          </InterestButton>
          <InterestButton
            selected={interests.includes('Art')}
            onClick={() => handleInterestClick('Art')}
          >
            🎨 Art
          </InterestButton>
        </div>
        </Box>

      </div>

      <Divider style={{ margin: '20px 0', backgroundColor: '#BDBDBD' }} />

      <Box style={{ margin: '20px 0' }}>
        <Typography variant="h6" gutterBottom color='#BABABA'>
          Add Payment Option
        </Typography>
        <Button variant="contained" fullWidth style={{ marginTop: 10}}
        sx={{
            marginTop: 20,
            marginBottom: 20,
            backgroundColor: '#fff', // White background for button
            border: '2px solid #d32f2f', // Red border color
            color: '#d32f2f', // Text color to match the border
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
          Add Debit or Credit Card
        </Button>
      </Box>
      <Divider style={{ margin: '20px 0', backgroundColor: '#BDBDBD' }} />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginTop: 20, marginBottom: 20 }}
        onClick={handleCreateAccount}
        sx={{
            marginTop: 20,
            marginBottom: 20,
            backgroundColor: '#fff', // White background for button
            border: '2px solid #d32f2f', // Red border color
            color: '#d32f2f', // Text color to match the border
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
        Create Account
      </Button>
    </div>
  );
};

export default RegistrationPage;
