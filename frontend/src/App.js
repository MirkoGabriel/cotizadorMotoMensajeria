import './App.css';
import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import scriptLoader from 'react-async-script-loader';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App({isScriptLoaded, isScriptLoadSucceed }) {

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
  }

  const destinationSelect = (value) => {
    setDestination(value);
  }
   
  async function accion () {
    console.log(origin)
    console.log(destination)
    const res = await axios.get('http://localhost:4000/api/recorrido?origen='+origin+'&destino='+destination);
    console.log(res.data.distance)
    setDistance(res.data.distance )
  }

  function autocompletePlaces(location, handleChange, handleSelect, placeholder) {
    return(
      <PlacesAutocomplete value={location} onChange={handleChange} onSelect={handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps,loading}) => (
              <div>
                <input className="form-control" {...getInputProps({ placeholder: placeholder})}/>
                <div>
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const style = suggestion.active 
                    ? { backgroundColor: "#8ba4cc", cursor: "pointer"} 
                    : { backgroundColor: "#ffffff", cursor: "pointer"};
                  return (
                    <div {...getSuggestionItemProps(suggestion, {style})} >
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
                      <h4>Cotizador Motos</h4>
                  </div>
                  <div className="form-group mb-3">
                    {autocompletePlaces(origin, originChange, originSelect,"Origin")}
                  </div>
                  <div className="form-group mb-3">
                    {autocompletePlaces(destination, destinationChange, destinationSelect,"Destination")}
                  </div>
                  <div>
                    <div className="form-group mb-3">
                          <input
                              type="text"
                              className="form-control"
                              placeholder="Distance"
                              readOnly="readOnly"
                              value={distance} 
                          />
                    </div>
                  </div>
                  <button className="btn btn-primary btn-block" onClick={() => accion()}>Get Distance</button>
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
])(App);
