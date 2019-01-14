import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import DealItem from "./DealItem"

class DealList extends React.Component {
  state = {

  }

  render() {
    return (
      <View style={styles.list}>
        <FlatList
          data={this.props.deals}
          renderItem={({item}) => (
            <DealItem deal={item} onPress={this.props.onItemPress}/>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
  }, 

  list: {
    backgroundColor: "#eee",
    flex: 1,
    width: '100%',
    paddingTop: 50,
  }
});

export default DealList;