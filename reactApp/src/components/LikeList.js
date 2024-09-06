import { memo } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const LikeList = memo(({ item }) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        style={styles.heart}
        name="cards-heart"
        size={24}
        color="red"
      />
      {item.map((innerItem, id) => (
        <View key={id} style={styles.item}>
          <View style={styles.column1}>
            {innerItem.imgsrc ? (
              <Image
                style={styles.image}
                source={{
                  uri: innerItem.imgsrc,
                }}
              />
            ) : (
              <Image
                style={styles.imageNull}
                source={require('../assets/coffee-icon.png')}
              />
            )}
            <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
              {innerItem.카페명}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
});

LikeList.displayName = 'LikeList';

LikeList.propTypes = {
  item: PropTypes.arrayOf(
    PropTypes.shape({
      imgsrc: PropTypes.string.isRequired,
      카페명: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#FF9F04',
    marginHorizontal: 10,
    marginVertical: 5,
    width: 170,
  },

  heart: {
    textAlign: 'right',
    marginRight: 2,
  },
  column1: {
    alignItems: 'center',
  },

  image: {
    width: 130,
    height: 130,
  },

  name: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 5,
    marginTop: 5,
    textAlign: 'center',
  },

  imageNull: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

export default LikeList;