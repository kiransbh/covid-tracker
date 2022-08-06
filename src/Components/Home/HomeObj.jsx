import React,{ useState, useEffect } from 'react';

// API end point
import { DATA_MIN_URL } from '../Config/Config';

// Component
import StateComponent from '../State/State';

// Stylesheet
import './Home.css';

// Image file
import arrow from '../Assests/Image/arrow-up.png';

function HomeObj() {

  // API get data state
  const[ stateName, setstateName ] = useState([]);

  // filter state
  const[ search, setSearch ] = useState('');
  const[ filter, setFilter ] = useState([]);
    
  // Fetch data
  const fetchData = async () => {
    await fetch(DATA_MIN_URL,{
      method: 'GET'
    })
    .then((response) => response.json())
    .then((json) => setstateName(json))
    .catch((error) => console.log(error))
  }
  const State = Object.entries(stateName);
  localStorage.setItem('data', State);

  useEffect(() => {
    fetchData();
  }, []);

  // Search filter
  useEffect(() => {
    const filterState = State.filter((element) => {
      return element[0].toLowerCase().includes(search.toLowerCase());
    }) 
    setFilter(filterState);
  }, [stateName, search]);

  // Ascending order
  const sortAscConfirm = () => {
    let sorted = State.sort((a, b) => {
      return a[1].total.confirmed - b[1].total.confirmed
    })
    setFilter(sorted);
  }

  const sortAscDecreased = () => {
    let sorted = State.sort((a, b) => {
      return a[1].total.deceased - b[1].total.deceased
    })
    setFilter(sorted);
  }

  const sortAscVaccinated = () => {
    let sorted = State.sort((a, b) => {
      return a[1].total.confirmed - b[1].total.confirmed
    })
    setFilter(sorted);
  }

  // Descending order
  const sortDescConfirm = () => {
    let sorted = State.sort((a, b) => {
      return b[1].total.confirmed - a[1].total.confirmed
    })
    setFilter(sorted);
  }

  const sortDescDecreased = () => {
    let sorted = State.sort((a, b) => {
      return b[1].total.deceased - a[1].total.deceased
    })
    setFilter(sorted);
  }

  const sortDescVaccinated = () => {
    let sorted = State.sort((a, b) => {
      return b[1].total.confirmed - a[1].total.confirmed
    })
    setFilter(sorted);
  }

  return (
    <div className='home-container'>
        <div className='home-filter'>
          <div className='search-filter'>
            <input type='text' placeholder='search by state name...' onChange={(event) => setSearch(event.target.value)} />
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
            <p>Decreased</p>
            <div className='up' onClick={sortAscDecreased}>
              <img src={arrow} alt='arrow' />
            </div>
            <div className='down' onClick={sortDescDecreased}>
              <img src={arrow} alt='arrow' />
            </div>
          </div>
          <div className='sort-filter'>
            <p>Vaccinated</p>
            <div className='up' onClick={sortAscVaccinated}>
              <img src={arrow} alt='arrow' />
            </div>
            <div className='down' onClick={sortDescVaccinated}>
              <img src={arrow} alt='arrow' />
            </div>
          </div>
        </div>
        <div className='home-grid-content'>
        {
            filter.length === 0
            ?
            <p className='alert'>Oops! no data is present</p>
            :
            filter.map(([key, value], index) => {
                return(
                  <StateComponent
                  key={ index }
                  state={ key } 
                  tConfirmed={ value.total.confirmed??"No Result" }
                  tDecreased={ value.total.deceased??"No Result" }
                  tRecovered={ value.total.recovered??"No Result" }
                  tVaccinated={ value.total.vaccinated1??"No Result" }
                  dConfirmed={ value.delta.confirmed??"No Result" }
                  dRecovered={ value.delta.recovered??"No Result" }
                  dDecreased={ value.delta.deceased??"No Result" }
                  d7Confirmed={ value.delta7.confirmed??"No Result" }
                  d7Recovered={ value.delta7.recovered??"No Result" }
                  d7Decreased={ value.delta7.deceased??"No Result" }
                  district={ value }
                  />
              )
          })
        }
        </div>
    </div>
  )
}

export default HomeObj