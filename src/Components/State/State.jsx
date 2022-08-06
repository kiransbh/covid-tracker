import React,{ useState } from 'react';

// Route
import { Link } from 'react-router-dom';

// Stylesheet
import './State.css';

// Image
import arrow from '../Assests/Image/arrow-up.png';

function State({ 
    state, district,
     tConfirmed, tRecovered, tDecreased, tVaccinated,
    dConfirmed, dRecovered, dDecreased,
    d7Confirmed, d7Recovered, d7Decreased,
}) {

  // State change value for dropdown
  const[dist, setDist] = useState();

  // Slider carousel
  const[ current, setCurrent ] = useState(1);
  const prevSlide = () => {
      setCurrent(current <= 1 ? 4 : current - 1)
  }
  const nextSlide = () => {
      setCurrent(current === 4 ? 1 : current + 1)
  }

  // Remove null or undefined values and return the data  
  const d = Object.entries(district?.districts || {});

  let distConfirmed, distDecreased, distRecovered;
  Object.values(d).map((element) => {
    if( dist === element[0] ) {
        distConfirmed = element[1].total?.confirmed??"No Result"
        distRecovered = element[1].total?.recovered??"No Result"
        distDecreased = element[1].total?.deceased??"No Result"
    }
  })

  return (
    <div className='state-container'>
        <div className='prev-slide' onClick={prevSlide}>
            <img src={arrow} alt='arrow' />
        </div>
        <div className='next-slide' onClick={nextSlide}>
            <img src={arrow} alt='arrow' />
        </div>
        <div className={ current === 1 ? 'box-a' : 'not-active'}>
            <div className='stateanddistrict'>
            <h1>{ state }</h1>
            </div>
            <h2>Total</h2>
            <p className='confirm'>Confirmed: <span>{ tConfirmed }</span></p>
            <p className='recovered'>Recovered: <span>{ tRecovered }</span></p>
            <p>Decreased: <span>{ tDecreased }</span></p>
            <p>Vaccinated: <span>{ tVaccinated }</span></p>
            <button type='submit'><Link to={`/detailed/${ state }`}>View Details</Link></button>
        </div>
        <div className={ current === 2 ? 'box-b' : 'not-active'}>
            <h2>Delta</h2>
            <p className='confirm'>Confirmed: <span>{ dConfirmed }</span></p>
            <p className='recovered'>Recovered: <span>{ dRecovered }</span></p>
            <p>Decreased: <span>{ dDecreased }</span></p>
        </div>
        <div className={ current === 3 ? 'box-c' : 'not-active'}>
            <h2>Delta 7</h2>
            <p className='confirm'>Confirmed: <span>{ d7Confirmed }</span></p>
            <p className='recovered'>Recovered: <span>{ d7Recovered }</span></p>
            <p>Decreased: <span>{ d7Decreased }</span></p>
        </div>
        <div className={ current === 4 ? 'box-d' : 'not-active'}>
            <h2>District</h2>
            <select onChange={(event) => setDist(event.target.value)}>
                <option> -- select district -- </option>
                {
                    d.map((element, index) => {
                        return <option key={index} value={element[0]}>{ element[0] }</option>
                    })
                }
            </select>
            <p className='confirm'>Confirmed: <span>{ distConfirmed }</span></p>
            <p className='recovered'>Recovered: <span>{ distRecovered }</span></p>
            <p>Decreased: <span>{ distDecreased }</span></p>
        </div>
    </div>
  )
}

export default State