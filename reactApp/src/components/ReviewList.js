import { memo } from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import PropTypes from 'prop-types';

const ReviewList = memo(({ item }) => {
  return (
    <SafeAreaView style={styles.container}>
      {item.map((innerItem, id) => (
        <SafeAreaView key={id} style={styles.item}>
          <Text style={{ fontWeight: 700, marginBottom: 15 }}>{innerItem.username}</Text>
          <Text>{innerItem.review_text}</Text>
        </SafeAreaView>
      ))}
    </SafeAreaView>
  );
});

ReviewList.displayName = 'ReviewList';

ReviewList.propTypes = {
  item: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string.isRequired,
      review_text: PropTypes.string.isRequired,
      datacid: PropTypes.number.isRequired,
    })
  ).isRequired,
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    // borderWidth: 1,
    // borderRadius: 8,
    borderBottomWidth: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginBottom: 1,
    borderColor: '#FF9F04',
  },
  userName: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ReviewList;
