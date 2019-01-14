import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import ajax from './../ajax'
import DealList from './DealList'
import DealDetail from "./DealDetail"
import SearchBar from "./SearchBar"

class App extends React.Component {
  state = {
    deals: [],
    currentDealId: null,
    dealsFromSearch: []
  }

  async componentDidMount(){
    const deals = await ajax.fetchInitialDeals();
    this.setState({ deals })
  }

  setCurrentDeal = (dealId) => {
    this.setState({currentDealId: dealId})
  }

  unsetCurrentDeal = () => {
    this.setState({currentDealId: null})
  }

  currentDeal = () => {
    return this.state.deals.find(
      (deal) => deal.key === this.state.currentDealId
    )
  }

  searchDeals = async (searchTerm) => {
    let dealsFromSearch = [];
    
    if(searchTerm) {
      dealsFromSearch = await ajax.fetchDealSearchResult(searchTerm);
      
    }
    this.setState({dealsFromSearch});
  }

  render() {
    if(this.state.currentDealId) {
      return (
        <View style={styles.main}>
          <DealDetail 
            initialDealData={this.currentDeal()}
            onBack={this.unsetCurrentDeal}
          />
        </View>
      )
    }
    
    const dealsToDisplay = this.state.dealsFromSearch.length > 0 ?
      this.state.dealsFromSearch :
      this.state.deals

    if(dealsToDisplay.length > 0) {
      return (
        <View style={styles.main}>
          <SearchBar searchDeals={this.searchDeals}/>
          <DealList deals={dealsToDisplay} onItemPress={this.setCurrentDeal}/>
        </View>
        )
    }

    return (
      <View style={styles.container}>
          <Text style={styles.header}>Bakesale</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    marginTop: 40
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  header: {
    fontSize: 40,
  }
});

export default App;
