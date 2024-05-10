import React, {useState, useEffect } from 'react'
import Plot from 'react-plotly.js';
import { Triangle } from 'react-loader-spinner'
import './App.css';

function App() {
  const [data, setData] = useState([{}]);
  const [loader, setLoader] = useState(true);
  const [closePrice, setClosePrice] = useState();
  const [closeTime, setCloseTime] = useState();
  const [time, setTime] = useState(60);




  const fetchData = (()=>{
    fetch("/meta").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
        setLoader(false)
        setClosePrice(data.data[0].y[data.data[0].y.length-1])
        setCloseTime(data.data[0].x[data.data[0].y.length-1].replace("T", " ").substring(0, data.data[0].x[data.data[0].y.length-1].length-9))
      }
    ).catch(function(error) {
      setLoader(true)
      console.log(error)
   })
  })


  useEffect(() => {
    
    const timer = setInterval(() => {
      setTime((time) => {
        if (time === 0) {
          console.log("1")
          fetchData()
          return 60;
        } else return time - 1;
      });
    }, 1000)
    return () => clearInterval(timer); //This is important
    
  }, [loader]);

  useEffect(() => {
    fetchData()
    
  },[])
  /*useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("1")
      fetchData()
    }, 60000)
    return () => clearInterval(intervalId); //This is important
  },[])*/
  

  return (
    <div className="App-header">
      {
          (loader) ? (
          
            <Triangle
              visible={true}
              height="240"
              width="240"
              color="#4fa94d"
              ariaLabel="triangle-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          
          ) : (
                <div>
                  <h3 className='Title'>Meta Platforms, Inc. (META)</h3>
                  <div className='price'>
                    <p>${closePrice}</p>
                    <p>close Price :{closeTime}</p>
                    <p>
                      Next update: {`${time % 60}`.padStart(2, 0)}s 
                    </p>

                  </div>
                  <Plot  data={data.data} layout={data.layout}/>
                </div>

              )
      }
    </div>
  )
}

export default App;
