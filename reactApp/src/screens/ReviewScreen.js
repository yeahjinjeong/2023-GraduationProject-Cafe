import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
  } from 'react-native';
  import { FontAwesome } from '@expo/vector-icons';
  import { useState } from 'react';
  import { useNavigation } from '@react-navigation/native';
  
  const ReviewScreen = ({ route }) => {
    const { cafe } = route.params;
    const navigation = useNavigation();
  
    let datacid = cafe.datacid;
    let cafeName = cafe.카페명;
    //console.log(datacid);
  
    const [service, setService] = useState(0);
    const [taste, setTaste] = useState(0);
    const [price, setPrice] = useState(0);
  
    const [textReview, setTextReview] = useState('');
  
    const [tagList, setTagList] = useState({
      brunch: 0,
      coffee: 0,
      tea: 0,
      dessert: 0,
      vegan: 0,
      study: 0,
      team: 0,
      large: 0,
      chat: 0,
      child: 0,
      senior: 0,
      party: 0,
      rest: 0,
      sns: 0,
      theme: 0,
    });
  
    const handleTagPress = (tagKey) => {
      const updateTagList = { ...tagList };
      updateTagList[tagKey] = updateTagList[tagKey] === 0 ? 1 : 0;
      setTagList(updateTagList);
      //console.log(typeof tagList);
    };
  
    const handleStarPress = (setRating, starIndex) => {
      setRating(starIndex);
    };
  
    const renderStars = (rating, setRating) => {
      const maxRating = 5;
      const starSize = 20;
  
      return Array(maxRating)
        .fill(0)
        .map(
          (
            _,
            index //_는 현재 요소의 값이며, index는 현재 요소의 인덱스이다.
          ) => (
            <TouchableOpacity
              key={index}
              style={styles.starContainer}
              onPress={() => handleStarPress(setRating, index + 1)}
            >
              <FontAwesome
                name={index < rating ? 'star' : 'star-o'}
                size={starSize}
                color="#FFD700"
              />
            </TouchableOpacity>
          )
        );
    };
  
    const handlePostReview = async () => {
      const selectedItems = Object.keys(tagList).filter(
        (tagKey) => tagList[tagKey] === 1
      );
      if (selectedItems.length > 3) {
        Alert.alert('최대 3개의 목적을 선택할 수 있습니다.');
        return;
      }
      if (service === 0) {
        Alert.alert('서비스 별점을 선택해주세요');
        return;
      }
  
      if (taste === 0) {
        Alert.alert('맛 별점을 선택해주세요');
        return;
      }
      if (price === 0) {
        Alert.alert('가격 별점을 선택해주세요');
        return;
      }
      try {
        const response = await fetch('http://localhost:3000/review/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cafename: cafeName,
            datacid: datacid,
            service_score: service,
            taste_score: taste,
            price_score: price,
            purpose: selectedItems,
            review_text: textReview,
          }),
        });
        if (response.ok) {
            console.log('서버 응답에 성공했습니다');
            console.log('datacid : ', datacid);
            console.log('cafename : ', cafeName);
            // console.log('service_score : ', service);
            // console.log('taste_score : ', taste);
            // console.log('price_score : ', price);
            // console.log('purpose : ', selectedItems);
            // console.log('review_text: ', textReview);
            Alert.alert('후기가 저장되었습니다.')
        } else {
          console.warn('서버 응답에 실패했습니다.');
        }
      } catch (error) {
        console.error(error);
      }
      navigation.goBack();
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.name}>'{cafe.카페명}' 평가하기</Text>
        <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', android: undefined })}
        style={styles.avoid}>
        <SafeAreaView style={styles.line}></SafeAreaView>
        <ScrollView>
          <Text style={styles.title}>
            카페에 맞는 <Text style={styles.boldTitle}>목적</Text>을 선택해주세요.
            (복수 선택 가능)
          </Text>
          <Text style={styles.selectText}>식도락</Text>
          <SafeAreaView style={styles.selectContainer}>
            <SafeAreaView style={styles.selects}>
              <TouchableOpacity
                key="brunch"
                style={[
                  styles.select,
                  tagList['brunch'] === 1 && styles.selectedTag,
                ]}
                onPress={() => handleTagPress('brunch')}
              >
                <Text style={{ fontSize: 13, fontWeight: 600 }}>
                  브런치, 식사
                </Text>
              </TouchableOpacity>
            </SafeAreaView>
            <SafeAreaView style={styles.selects}>
              <TouchableOpacity
                key="coffee"
                style={[
                  styles.select,
                  tagList['coffee'] === 1 && styles.selectedTag,
                ]}
                onPress={() => handleTagPress('coffee')}
              >
                <Text style={{ fontSize: 13, fontWeight: 600 }}>커피 전문점</Text>
              </TouchableOpacity>
            </SafeAreaView>
            <SafeAreaView style={styles.selects}>
              <TouchableOpacity
                key="tea"
                style={[
                  styles.select,
                  tagList['tea'] === 1 && styles.selectedTag,
                ]}
                onPress={() => handleTagPress('tea')}
              >
                <Text style={{ fontSize: 13, fontWeight: 600 }}>차</Text>
              </TouchableOpacity>
            </SafeAreaView>
            <SafeAreaView style={styles.selects}>
              <TouchableOpacity
                key="dessert"
                style={[
                  styles.select,
                  tagList['dessert'] === 1 && styles.selectedTag,
                ]}
                onPress={() => handleTagPress('dessert')}
              >
                <Text style={{ fontSize: 13, fontWeight: 600 }}>디저트</Text>
              </TouchableOpacity>
            </SafeAreaView>
            <SafeAreaView style={styles.selects}>
              <TouchableOpacity
                key="vegan"
                style={[
                  styles.select,
                  tagList['vegan'] === 1 && styles.selectedTag,
                ]}
                onPress={() => handleTagPress('vegan')}
              >
                <Text style={{ fontSize: 13, fontWeight: 600 }}>비건</Text>
              </TouchableOpacity>
            </SafeAreaView>
          </SafeAreaView>
          <Text style={styles.selectText}>공부, 업무</Text>
          <SafeAreaView style={styles.selectContainer}>
            <SafeAreaView style={styles.selects}>
              <TouchableOpacity
                key="study"
                style={[
                  styles.select,
                  tagList['study'] === 1 && styles.selectedTag,
                ]}
                onPress={() => handleTagPress('study')}
              >
                <Text style={{ fontSize: 13, fontWeight: 600 }}>1인 공부</Text>
              </TouchableOpacity>
            </SafeAreaView>
            <SafeAreaView style={styles.selects}>
              <TouchableOpacity
                key="team"
                style={[
                  styles.select,
                  tagList['team'] === 1 && styles.selectedTag,
                ]}
                onPress={() => handleTagPress('team')}
              >
                <Text style={{ fontSize: 13, fontWeight: 600 }}>
                  팀플, 스터디
                </Text>
              </TouchableOpacity>
            </SafeAreaView>
          </SafeAreaView>
          <Text style={styles.selectText}>친목</Text>
          <SafeAreaView style={styles.selectContainer}>
            <SafeAreaView style={styles.selects}>
              <TouchableOpacity
                key="large"
                style={[
                  styles.select,
                  tagList['large'] === 1 && styles.selectedTag,
                ]}
                onPress={() => handleTagPress('large')}
              >
                <Text style={{ fontSize: 13, fontWeight: 600 }}>대모임</Text>
              </TouchableOpacity>
            </SafeAreaView>
            <SafeAreaView style={styles.selects}>
              <TouchableOpacity
                key="chat"
                style={[
                  styles.select,
                  tagList['chat'] === 1 && styles.selectedTag,
                ]}
                onPress={() => handleTagPress('chat')}
              >
                <Text style={{ fontSize: 13, fontWeight: 600 }}>대화, 수다</Text>
              </TouchableOpacity>
            </SafeAreaView>
            <SafeAreaView style={styles.selects}>
              <TouchableOpacity
                key="child"
                style={[
                  styles.select,
                  tagList['child'] === 1 && styles.selectedTag,
                ]}
                onPress={() => handleTagPress('child')}
              >
                <Text style={{ fontSize: 13, fontWeight: 600 }}>아이와</Text>
              </TouchableOpacity>
            </SafeAreaView>
            <SafeAreaView style={styles.selects}>
              <TouchableOpacity
                key="senior"
                style={[
                  styles.select,
                  tagList['senior'] === 1 && styles.selectedTag,
                ]}
                onPress={() => handleTagPress('senior')}
              >
                <Text style={{ fontSize: 13, fontWeight: 600 }}>노인과</Text>
              </TouchableOpacity>
            </SafeAreaView>
            <SafeAreaView style={styles.selects}>
              <TouchableOpacity
                key="party"
                style={[
                  styles.select,
                  tagList['party'] === 1 && styles.selectedTag,
                ]}
                onPress={() => handleTagPress('party')}
              >
                <Text style={{ fontSize: 13, fontWeight: 600 }}>파티</Text>
              </TouchableOpacity>
            </SafeAreaView>
          </SafeAreaView>
          <Text style={styles.selectText}>여가</Text>
          <SafeAreaView style={styles.selectContainer}>
            <SafeAreaView style={styles.selects}>
              <TouchableOpacity
                key="rest"
                style={[
                  styles.select,
                  tagList['rest'] === 1 && styles.selectedTag,
                ]}
                onPress={() => handleTagPress('rest')}
              >
                <Text style={{ fontSize: 13, fontWeight: 600 }}>휴식</Text>
              </TouchableOpacity>
            </SafeAreaView>
            <SafeAreaView style={styles.selects}>
              <TouchableOpacity
                key="sns"
                style={[
                  styles.select,
                  tagList['sns'] === 1 && styles.selectedTag,
                ]}
                onPress={() => handleTagPress('sns')}
              >
                <Text style={{ fontSize: 13, fontWeight: 600 }}>sns, 핫플</Text>
              </TouchableOpacity>
            </SafeAreaView>
            <SafeAreaView style={styles.selects}>
              <TouchableOpacity
                key="theme"
                style={[
                  styles.select,
                  tagList['theme'] === 1 && styles.selectedTag,
                ]}
                onPress={() => handleTagPress('theme')}
              >
                <Text style={{ fontSize: 13, fontWeight: 600 }}>테마카페</Text>
              </TouchableOpacity>
            </SafeAreaView>
          </SafeAreaView>
          <SafeAreaView style={styles.line}></SafeAreaView>
          <Text style={styles.title}>
            <Text style={styles.boldTitle}>평점</Text>을 입력해주세요.
          </Text>
          <SafeAreaView style={styles.starContainer}>
            <Text style={styles.starText}>서비스</Text>
            <SafeAreaView style={styles.stars}>
              {renderStars(service, setService)}
            </SafeAreaView>
          </SafeAreaView>
          <SafeAreaView style={styles.starContainer}>
            <Text style={styles.starText}>맛{'       '}</Text>
            <SafeAreaView style={styles.stars}>
              {renderStars(taste, setTaste)}
            </SafeAreaView>
          </SafeAreaView>
          <SafeAreaView style={styles.starContainer}>
            <Text style={styles.starText}>가격{'    '}</Text>
            <SafeAreaView style={styles.stars}>
              {renderStars(price, setPrice)}
            </SafeAreaView>
          </SafeAreaView>
          <SafeAreaView style={styles.line}></SafeAreaView>
          <Text style={styles.title}>
            <Text style={styles.boldTitle}>한줄평</Text>
          </Text>
          <SafeAreaView style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              value={textReview}
              onChangeText={setTextReview}
              placeholder="400byte 이하로 입력해주세요"
            />
          </SafeAreaView>
        </ScrollView>
        <SafeAreaView style={styles.btn_content}>
          <TouchableOpacity style={styles.reviewbtn}>
            <Text
              style={{ fontSize: 24, fontWeight: 700 }}
              onPress={handlePostReview}
            >
              후기 남기기
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#FF9F04',
      borderRadius: 5,
      margin: 5,
    },
    name: {
      textAlign: 'center',
      fontWeight: 700,
      fontSize: 20,
      margin: 10,
      flexDirection: 'row',
    },
    line: {
      borderWidth: 0.5,
      borderColor: '#BFBDC0',
      marginBottom: 5,
      marginTop: 5,
    },
    title: {
      margin: 5,
      fontSize: 15,
      marginLeft: 10,
      fontWeight: 500,
    },
    boldTitle: {
      fontWeight: 700,
    },
    selectText: {
      fontSize: 15,
      fontWeight: 700,
      margin: 10,
    },
    selectContainer: {
      margin: 10,
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
  
    selects: {
      flexDirection: 'row',
    },
    select: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: '#FF9F04',
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginRight: 15,
    },
    selectedTag: {
      backgroundColor: '#FF9F09',
    },
    starContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: 2,
    },
    starText: {
      margin: 10,
      fontWeight: 700,
    },
    stars: {
      flexDirection: 'row',
    },
    textInputContainer: {
      margin: 10,
    },
    textInput: {
      borderWidth: 1,
      borderColor: '#BFBDC0',
      borderRadius: 10,
      height: 30,
      paddingHorizontal: 10,
    },
    btn_content: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 15,
    },
    reviewbtn: {
      borderWidth: 3,
      borderColor: '#FF9F04',
      borderRadius: 5,
      padding: 10,
      textAlign: 'center',
    },
    avoid: {
      flex: 1,
    },
  });
  
  export default ReviewScreen;
  