import { useState } from 'react'
import './App.css'
import PDFGenerator from './PDFGenerator';
import { Box, Grid, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white', // White border when not focused
    },
    '&:hover fieldset': {
      borderColor: 'white', // White border on hover
    },
    '&.Mui-focused fieldset': {
      borderColor: '#2196F3', // Default focused color (you can change this)
    },
    '& input': {
      color: 'white', // Text color inside the TextField (white)
    },
  },
}));

function App() {
  const [data, setData] = useState()
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState('');

  function makePrediction() {
    const textData = "Oyaaaaa staki shobo kijana";  // Replace with the actual text data you want to send
    console.log(textData);
  
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text: textData })
    };
  
    fetch('http://localhost:8000/predict-sentence', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log('Prediction:', data);
        // Handle the prediction response here
      })
      .catch(error => console.error('Error:', error));
  }
  
  async function trial() {
    try {
      const response = await fetch('http://localhost:8000/predict');
  
      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        // Process and use the data as needed
        setData(data)
        return data;
      } else {
        throw new Error('Error: Failed to retrieve data from the API');
      }
    } catch (error) {
      console.error(error);
    }
  }


  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/test_prediction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: inputText })
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data.prediction);
      } else {
        throw new Error('Error: Failed to retrieve data from the API');
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  async function home() {
    try {
      const response = await fetch('http://localhost:8000/');
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Process and use the data as needed
        return data;
      } else {
        throw new Error('Error: Failed to retrieve data from the API');
      }
    } catch (error) {
      console.error(error);
    }
  }  

  return (
    <>
<Typography variant='h2' gutterBottom>Chat Analyser</Typography>

      <button onClick={trial}>Scan Chats</button>
      
      {/* <Grid my={4} container justifyContent="space-around" alignItems="center">
      <Grid item xs={8}> 
        <CustomTextField
          id="outlined-basic"
          variant="outlined"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          mx={2} // Add horizontal margin
        />
      </Grid>
      <Grid item xs={4}>
      <button onClick={handleSubmit}>Submit</button>
      </Grid>
      <Grid item mt={3}>
        <p style={{ margin: 0 }}>Result: {result}</p>
      </Grid>
    </Grid> */}

        

      {data && <PDFGenerator theData={data}/>}
    </>
  )
}

export default App
