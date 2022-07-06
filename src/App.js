import './App.css';
import React, {useState, useEffect} from 'react'
import BarChat from './BarChar';
import Selectors from './Components/Selectors/Selectors';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [receivedData, setReceivedData] = useState({});
  const [error, setError] = useState(null);
  const [requestBody, setRequestBody] = useState({});

  const fetchData = async (body) => {
    setIsLoading(true);
    setError(null);
    let controller = new AbortController();
    setTimeout(() => controller.abort(), 5000);
    try {
      const response = await fetch(
        "https://appmat-sst-radiocounter-radiocounter-backend.appmat.org/api/get",
        {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(body),
          signal: controller.signal

      }
      );

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();
      setReceivedData(prev => { return {data: data.data, mode: body['mod']}});
      
    } catch (err) {
       setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
    setRequestBody(body);
  }
  useEffect(() => {
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      timezone: 'UTC'
    };
    let newDate = new Date();
    let d = newDate.toLocaleString("ru", options).split('.').reverse().join('-');
    let body = {"start":`${d}`, "mod":"day"}
    setRequestBody(body);
    fetchData(body)
  },[])

  return (
    <div className="App">
      <Selectors onFetch={fetchData}/>
      <BarChat 
        error={error}
        isLoading={isLoading}
        chartData={receivedData}  
        onFetch={fetchData}
        requestBody={requestBody}
      />
    </div>
  );
}

export default App;
