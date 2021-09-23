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
    setDistance(res.data.distance)
  }

  function autocompletePlaces(location, handleChange, handleSelect) {
    return(
      <PlacesAutocomplete value={location} onChange={handleChange} onSelect={handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps,loading}) => (
              <div>
                <input {...getInputProps({ placeholder: 'Enter Address ...'})}/>
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
    <div>
      {autocompletePlaces(origin, originChange, originSelect)}
      {autocompletePlaces(destination, destinationChange, destinationSelect)}
      <button onClick={() => accion()}>Enviar</button>
      <div>{distance}</div>
    </div>
    );
  }else{
    return (<div></div>);
  }
}

export default scriptLoader([
  `https://maps.googleapis.com/maps/api/js?key=AIzaSyBQLBwlf4h9gDvu_eU0v1vO0gj8PtC7lSI&libraries=places`
])(App);
