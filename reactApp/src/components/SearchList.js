import { memo } from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import PropTypes from 'prop-types';

const SearchList = memo(({ item }) => {
  return (
    <SafeAreaView>
      {item.map((innerItem, id) => (
        <SafeAreaView key={id} style={styles.container}>
          <Text>{innerItem.카페명}</Text>
        </SafeAreaView>
      ))}
    </SafeAreaView>
  );
});

SearchList.displayName = 'SearchList';

SearchList.propTypes = {
  item: PropTypes.arrayOf(
    PropTypes.shape({
      카페명: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderRadius: 8,
    //flexWrap: 'wrap',
    //flexDirection: 'row',
    marginBottom: 3,
    borderColor: '#FF9F04',
  },
});

export default SearchList;