import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import debounce from 'lodash.debounce';

class SearchBar extends React.Component {
  state = {
    searchTerm: '',
  }

  debouncedSearchDeals = debounce(this.props.searchDeals, 300)

  handleChange = (searchTerm) => {

    this.setState({ searchTerm }, () => {
      this.debouncedSearchDeals(this.state.searchTerm)
    })
  }

  render() {
    return(
      <TextInput 
        placeholder='Search All Deals'
        style={styles.input}
        onChangeText={this.handleChange}
      />
    )
  }
}

const styles = StyleSheet.create({
  input:{
    height: 40,
    marginHorizontal: 12,
  }
});

export default SearchBar;
