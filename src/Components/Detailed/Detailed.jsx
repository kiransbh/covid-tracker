import React,{ useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// API endpoint
import { TIMESERIES_MIN_URL } from '../Config/Config';

// Stylesheet
import './Detailed.css';

// Image files
import arrow from '../Assests/Image/arrow-up.png';

function Detailed() {

  // Router parameter
  const { id } = useParams();

  // API data get state
  const[ particularState, setparticularState ] = useState([]);
    
  // Fetch data
  // TIMESERIES API - There is no comman point for merging both API's
  const fetchData = () => {
    return fetch(TIMESERIES_MIN_URL,{
      method: 'GET'
    })
    .then((response) => response.json())
    .then((json) => {return(json[id].dates)})
    .catch((error) => console.log(error))
  }

  Object.entries(particularState);
  localStorage.setItem('date', Object.entries(particularState));

  useEffect(() => {
    if(!particularState.length)
    (async () => {
      const fetchState = await fetchData()
      const formattedData = Object.keys(fetchState).map((date) => {
        return {
          date,
          ...fetchState[date]
        }
      })
      setparticularState(formattedData);
    })()
  }, []);

  // Ascending sort
  const sortAscConfirm = () => {
    const sorted = [...particularState].sort((a, b) => {
      return a.total?.confirmed - b.total?.confirmed
    })
    setparticularState(sorted);
  }

  const sortAscRecovered = () => {
    const sorted = [...particularState].sort((a, b) => {
      return a.total?.recovered - b.total?.recovered
    })
    setparticularState(sorted);
  }

  const sortAscDecreased = () => {
    const sorted = [...particularState].sort((a, b) => {
      return a.total?.deceased - b.total?.deceased
    })
    setparticularState(sorted);
  }

  // Descending sort
  const sortDescConfirm = () => {
    const sorted = [...particularState].sort((a, b) => {
      return b.total?.confirmed - a.total?.confirmed
    })
    setparticularState(sorted);
  }

  const sortDescRecovered = () => {
    const sorted = [...particularState].sort((a, b) => {
      return b.total?.recovered - a.total?.recovered
    })
    setparticularState(sorted);
  }

  const sortDescDecreased = () => {
    const sorted = [...particularState].sort((a, b) => {
      return b.total?.deceased - a.total?.deceased
    })
    setparticularState(sorted);
  }

  // Search filter
  const[ search, setSearch ] = useState('');
  const[ filteredDate, setfilteredDate ] = useState([]);
  useEffect(() => {
    if(search != ''){
      const searchedDate = [...particularState].filter((data) => {
        return data.date.includes(search)
      })
      setfilteredDate(searchedDate);
    } else {
      setfilteredDate([]);
    }
  }, [search]);

  return (
    <>
        {/* filter */}
        <div className='state-filter'>
          <div>
            <h2>{ id }</h2>
          </div>
          <div>
            <input type='text' placeholder='Search by date...' onChange={(event) => setSearch(event.target.value)} />
          </div>
          <div className='sort-filter'>
            <p>Confirmed</p>
            <div className='up' onClick={sortAscConfirm}>
              <img src={arrow} alt='arrow' />
            </div>
            <div className='down' onClick={sortDescConfirm}>
              <img src={arrow} alt='arrow' />
            </div>
          </div>
          <div className='sort-filter'>
            <p>Recovered</p>
            <div className='up' onClick={sortAscRecovered}>
              <img src={arrow} alt='arrow' />
            </div>
            <div className='down' onClick={sortDescRecovered}>
              <img src={arrow} alt='arrow' />
            </div>
          </div>
          <div className='sort-filter'>
            <p>Decreased</p>
            <div className='up' onClick={sortAscDecreased}>
              <img src={arrow} alt='arrow' />
            </div>
            <div className='down' onClick={sortDescDecreased}>
              <img src={arrow} alt='arrow' />
            </div>
          </div>
        </div>

        {/* table */}
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Confirmed</th>
              <th>Decreased</th>
              <th>Recovered</th>
              <th>Delta</th>
              <th>Delta7</th>
            </tr>
          </thead>
          <tbody>
              {
                particularState.length === 0
                ? 
                <p className='alert'>Oops! No results to show</p>
                :
                (filteredDate.length ? filteredDate : particularState).map(({ date, delta, delta7, total }) => {
                    return(
                          <tr>
                            <td>{ date }</td>
                            <td>{ total?.confirmed??"No Result" }</td>
                            <td>{ total?.deceased??"No Result" }</td>
                            <td>{ total?.recovered??"No Result" }</td>
                            <td>
                              <div className='delta'>
                                <p>Confirmed: <span>{ delta?.confirmed??"No Result" }</span></p>
                                <p>Decreased: <span>{ delta?.deceased??"No Result" }</span></p>
                                <p>Recovered: <span>{ delta?.recovered??"No Result" }</span></p>
                              </div>
                            </td>
                            <td>
                              <div className='delta7'>
                                <p>Confirmed: <span>{ delta7?.confirmed??"No Result" }</span></p>
                                <p>Decreased: <span>{ delta7?.deceased??"No Result" }</span></p>
                                <p>Recovered: <span>{ delta7?.recovered??"No Result" }</span></p>
                              </div>
                            </td>
                          </tr>
                        )
                      })
                  }
          </tbody>
        </table>
    </>
  )
}

export default Detailed