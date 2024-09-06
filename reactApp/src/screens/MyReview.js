// import ReviewList from '../components/ReviewList';
//import terrace from '../assets/terrace.png';

import { useEffect, isFocused, useState } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
//import RecommendList from '../components/RecommendList';
import { useNavigation,  useIsFocused } from '@react-navigation/native';
import MyreviewList from '../components/MyreviewList';


const MyReview = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [reviewList, setReviewList] = useState([]);
    const [cafeTemp, setCafeTemp] = useState([]);

    useEffect(() => {
        fetchReview();
      }, [isFocused])

    async function fetchReview(){
        try {
            const response = await fetch('http://localhost:3000/review/my', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({review : 0}),
            });
            if (response.ok) {
                getData();
                const ReviewRaw = await response.json();
                setReviewList(ReviewRaw)
            } else {
                console.log('내가 쓴 리뷰를 불러올 수 없습니다.')
            }
          } catch (error) {
            console.error(error);
          }
    }

    const getData = () => {
        fetch('http://localhost:3000/cafe')
          .then((res) => res.json())
          .then((data) => {
            setCafeTemp(data);
          });
    };

    const onCafeClick = (item) => {
        console.log(item.datacid);
        for (let j=0; j<cafeTemp.length; j++){
            if (item.datacid == cafeTemp[j].datacid){
                console.log(cafeTemp[j]);
                const cafeData = cafeTemp[j];
                navigation.navigate('CafeScreen', { cafe: cafeData });
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <SafeAreaView style={styles.flatContainer}>
            <FlatList
            data={reviewList}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => onCafeClick(item)}>
                <MyreviewList item={[item]} />
                </TouchableOpacity>
            )}
            keyExtractor={(item, datacid) => datacid.toString()}
            />
            </SafeAreaView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatContainer: {
    backgroundColor: 'white',
    marginLeft: 10,
  },
});

export default MyReview;