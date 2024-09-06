import { memo } from 'react';
import { StyleSheet, SafeAreaView, Text, TouchableOpacity, Alert } from 'react-native';
import PropTypes from 'prop-types';

const MyreviewList = memo(({ item }) => {
    const handleDelete = async () => {
        try {
            const response = await fetch('http://localhost:3000/review/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: item[0].username,
                    datacid: item[0].datacid,
                    review_text: item[0].review_text,
                    purpose: [item[0].purpose1, item[0].purpose2, item[0].purpose3]
                }),
            });
            if (response.ok) {
                console.log('서버 응답에 성공했습니다');
                Alert.alert('리뷰가 삭제되었습니다.');
            } else {
                console.warn('서버 응답에 실패했습니다.');
            }
        } catch (error) {
            console.error(error);
        }
  };

  return (
    <SafeAreaView style={styles.container}>
      {item.map((innerItem, id) => (
        <SafeAreaView key={id} style={styles.item}>
          <SafeAreaView style={styles.column1}>
            <Text style={styles.name}>{innerItem.cafeName}</Text>
            <Text style={styles.rating}>
              서비스 : {innerItem.service_score}
              {'  '} 맛 : {innerItem.taste_score}
              {'  '}
              가격 : {innerItem.price_score}
            </Text>
            <Text style={styles.review}>{innerItem.review_text}</Text>
          </SafeAreaView>
          <SafeAreaView style={styles.column2}>
            <TouchableOpacity style={styles.deletebtn} onPress={handleDelete}>
              <Text style={{ textAlign: 'center' }}>삭제</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </SafeAreaView>
      ))}
    </SafeAreaView>
  );
});

MyreviewList.displayName = 'MyreviewList';

MyreviewList.propTypes = {
  item: PropTypes.arrayOf(
    PropTypes.shape({
      cafeName: PropTypes.string.isRequired,
      service_score: PropTypes.number.isRequired,
      taste_score: PropTypes.number.isRequired,
      price_score: PropTypes.number.isRequired,
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
    borderBottomWidth: 1,
    borderRadius: 8,
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginBottom: 3,
    borderColor: '#FF9F04',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  column1: {
    flex: 0.8,
    alignItems: 'center',
  },
  name: {
    fontWeight: 600,
    marginBottom: 3,
    fontSize: 18,
  },
  column2: {
    flex: 0.2,
  },
  deletebtn: {
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  review: {
    marginTop: 15,
  },
});

export default MyreviewList;
