import { StyleSheet, Text, View } from 'react-native';

const Americano = () => {
  return (
    <View style={styles.container}>
      <Text>Americano</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Americano;
