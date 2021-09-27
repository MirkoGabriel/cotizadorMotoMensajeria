import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import scriptLoader from 'react-async-script-loader';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from 'sweetalert';
import img from '../img/imagen1.jpg'

function RouteDistance({isScriptLoaded, isScriptLoadSucceed }) {

  const [origin, setOrigin] = React.useState("");

  const [destination, setDestination] = React.useState("");

  const [distance, setDistance] = React.useState("");
  
  const originChange = (value) => {
    setOrigin(value);
  }

  const originSelect = (value) => {
    setOrigin(value);
  }
  const destinationChange = (value) => {
    setDestination(value);
    console.log(value)
  }

  const destinationSelect = (value) => {
    setDestination(value);
  }
   
  async function distanceResponse () {
    const newRoute = {
      origin: origin,
      destination: destination
  };
  console.log(newRoute)
  await axios.post('http://localhost:4000/api/route/',newRoute).then(res => {
    // do stuff
    setDistance(res.data.distance);
}).catch(err => {
        // what now?
        console.log(err)
        swal({
          text: 'Location invalid',
          icon: 'error'
      })
    })
  }

  function autocompletePlaces(location, handleChange, handleSelect, placeholder) {
    return(
      <PlacesAutocomplete value={location} onChange={handleChange} onSelect={handleSelect} key={placeholder}>
        {({ getInputProps, suggestions, getSuggestionItemProps,loading}) => (
              <div>
                <input className="form-control" {...getInputProps({ placeholder: placeholder})}/>
                <div>
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion, pos) => {
                  const style = suggestion.active 
                    ? { backgroundColor: "#8ba4cc", cursor: "pointer"} 
                    : { backgroundColor: "#ffffff", cursor: "pointer"};
                  return (
                    <div {...getSuggestionItemProps(suggestion, {style})} key={pos}>
                      {suggestion.description}
                    </div>
                  );
                })}
                </div>
              </div>
          )}
      </PlacesAutocomplete>
    );
  }

  if(isScriptLoaded && isScriptLoadSucceed){
    return (
      <div className="container">
      <div className="row justify-content-center pt-5 mt-5 mr-1">
          <div className="col-md-3 formulario">
              <div className="card card-body">
                  <div className="form-group text-center">
                      <h4>Moto Mensajería</h4>
                  </div>
                  <div className="form-group mb-3">
                    {autocompletePlaces(origin, originChange, originSelect,"Origin")}
                  </div>
                  <div className="form-group mb-3">
                    {autocompletePlaces(destination, destinationChange, destinationSelect,"Destination")}
                  </div>
                  <div>
                    <div className="form-group mb-3">
                          {distance}
                    </div>
                  </div>
                  <button className="btn btn-primary btn-block" onClick={() => distanceResponse()}>Get Distance</button>
              </div>
          </div>
          <div class="col-sm-6">
            <div class="card">
                <div class="card-body">
                  <img src={img} alt="" id="logo"/>
                </div>
            </div> 
          </div>                
      </div>
  </div>
    );
  }else{
    return (<div></div>);
  }
}

export default scriptLoader([
  `https://maps.googleapis.com/maps/api/js?key=&libraries=places`
])(RouteDistance);
