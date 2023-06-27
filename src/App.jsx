import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [data, setData] = useState()
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
        console.log(data);
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
      <button onClick={home}>Home</button>
      <button onClick={trial}>Trial</button>
      {data && data.map((obj) => (
        <div>
          <h4>{obj.text}</h4> <span>{obj.prediction}</span>
        </div>
      ))}
    </>
  )
}

export default App
