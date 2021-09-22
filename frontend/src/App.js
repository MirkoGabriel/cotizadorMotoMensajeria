import './App.css';
import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import scriptLoader from 'react-async-script-loader';

function App({isScriptLoaded, isScriptLoadSucceed }) {
  const [address, setAddress] = React.useState("");

  const [address1, setAddress1] = React.useState("");
  
  const handleChange = (value) => {
    setAddress(value);
  }

  const handleSelect = (value) => {
    setAddress(value);
  }
  const handleChange1 = (value) => {
    setAddress1(value);
  }

  const handleSelect1 = (value) => {
    setAddress1(value);
  }

  function autocompletePlaces(address, handleChange, handleSelect) {
    return(
      <PlacesAutocomplete 
        value={address} 
        onChange={handleChange} 
        onSelect={handleSelect}
        >
        {({ 
            getInputProps, 
            suggestions, 
            getSuggestionItemProps,
            loading
          }) => (
              <div>
                <input
                {...getInputProps({
                  placeholder: 'Enter Address ...'
                })}
                />
                <div>
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const style = suggestion.active 
                    ? { backgroundColor: "#8ba4cc", cursor: "pointer"} 
                    : { backgroundColor: "#ffffff", cursor: "pointer"};
                  console.log(suggestion.description)
                  return (
                    <div {...getSuggestionItemProps(suggestion, {style})}>
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
      {autocompletePlaces(address, handleChange, handleSelect)}
      {autocompletePlaces(address1, handleChange1, handleSelect1)}
    </div>
    );
  }else{
    return (<div></div>);
  }
}

export default scriptLoader([
  `https://maps.googleapis.com/maps/api/js?key=AIzaSyBQLBwlf4h9gDvu_eU0v1vO0gj8PtC7lSI&libraries=places`
])(App);
