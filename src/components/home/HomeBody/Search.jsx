import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import './Search.css';

const searchOptions = {
  types: ['(cities)']
}

export default class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        address: this.props.address
    }
  }

  handleChange = address => {
    this.setState({
        address: address
    })
  };
  applySelectedValue(index, address){
    this.props.changeCity(index, address);
    this.setState({
        address:address
    })
  }
  handleSelect = address => {
    
    geocodeByAddress(address)
      .then(results => {console.log(results);getLatLng(results[0])})
      .then(latLng => {/*console.log('Success', latLng); console.log(address); */this.applySelectedValue(this.props.index,address)})
      .catch(error => console.error('Error', error));
  };

  render() {
    console.log("LocationSearchInput render");
    console.log(this.state.address);
    console.log(this.props.address);
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => 
        (
          <React.Fragment>
            <input id={this.props.id}
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: ''+this.props.classInput,
              })}
            />
            <div className={"autocomplete-dropdown-container " +this.props.classDropdown }>
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item--active';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
            </React.Fragment>
        )}
    
      </PlacesAutocomplete>
    );
  }
}