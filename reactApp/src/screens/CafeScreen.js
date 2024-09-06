import {
  Alert,
  StyleSheet,
  Text,
  FlatList,
  SectionList,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  LogBox,
  VirtualizedList,
  VirtualizedView,
} from 'react-native';
//import { MaterialCommunityIcons } from '@expo/vector-icons';
//import { FontAwesome5 } from '@expo/vector-icons';
//import { Entypo } from '@expo/vector-icons';
//import { MaterialIcons } from '@expo/vector-icons';
import {
  MaterialCommunityIcons,
  FontAwesome5,
  FontAwesome,
  Entypo,
  MaterialIcons,
} from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import ReviewList from '../components/ReviewList';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { YellowBox } from 'react-native';
// YellowBox.ignoreWarnings([
//   'VirtualizedLists should never be nested',
//   'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
//   'Warning: Failed prop type: Invalid prop `item[0].datacid` of type `number` supplied to `ReviewList`, expected `string`.',
//   'Non-serializable values were found in the navigation state.',
//   'Require cycle:',
//   'Warning: Failed prop type: Invalid prop `initial` of type `string` supplied to `SwitchSelector`, expected `number`.',
// ])
LogBox.ignoreLogs([
  'VirtualizedLists should never be nested',
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
  'Non-serializable values were found in the navigation state.',
  'Require cycle:',
]);
//import terrace from '../assets/terrace.png';

const CafeScreen = ({ route }) => {
  const navigation = useNavigation();

  const { cafe } = route.params;
  let datacid = cafe.datacid;

  const isFocused = useIsFocused();
  const [isLogin, setIsLogin] = useState(false);
  const [nickname, setNickname] = useState('');
  const [like, setLike] = useState(false);
  const [serviceRating, setServiceRating] = useState(0);
  const [tasteRating, setTasteRating] = useState(0);
  const [priceRating, setPriceRating] = useState(0);
  const [reviewData, setReviewData] = useState([]);

  const menu = cafe.naver_menu.split('#').filter((item) => item !== '');

  const formattedMenus = menu.map((menu) => {
    const [menuName, menuPrice] = menu.split(': ');
    return { name: menuName, price: menuPrice };
  });

  useEffect(() => {
    fetch('http://localhost:3000/authcheck')
      .then((res) => res.json())
      .then((json) => {
        if (json.isLogin === "True") {
          console.log("true!")
          setIsLogin(true);
          setNickname(json.username);
          LikeCheck();
        } else {
          console.log("false!")
          setIsLogin(false);
        }
      });
  }, [isFocused])

  useEffect(() => {
    console.log(datacid);
    fetchReview();
  }, [isFocused])
  // console.log(ReviewList);

  async function fetchReview(){
    let ReviewText = [];
    var taste_score = 0;
    var price_score = 0;
    var service_score = 0;
    var review_count = 0;
    const response = await fetch(`http://localhost:3000/review`);
    if (response.ok) {
      console.log('Button States sent successfully!');
      const ReviewRaw = await response.json();
      for (let i=0; i<ReviewRaw.length; i++){
        // if (ReviewRaw[i].datacid == datacid){
        if (ReviewRaw[i].datacid == datacid){
          ReviewText.push(ReviewRaw[i]);
          taste_score += ReviewRaw[i].taste_score;
          price_score += ReviewRaw[i].price_score;
          service_score += ReviewRaw[i].service_score;
          review_count += 1;
        }
      }
    } else {
      console.warn('서버 응답에 실패했습니다.');
    }
    if (review_count > 0) {
      let srating = service_score / review_count;
      let trating = taste_score / review_count;
      let prating = price_score / review_count;
      setServiceRating(Math.round(srating * 100) / 100);
      setTasteRating(Math.round(trating * 100) / 100);
      setPriceRating(Math.round(prating * 100) / 100);
      setReviewData(ReviewText);
    }
    setReviewData(ReviewText);

    return ReviewText;
  }

  const toggleLike = async () => {
    if (like == false) {
        if (isLogin == false) {
            Alert.alert('찜을 하려면 로그인 해주세요!');
            return;
        } else {
            setLike(!like);
            try {
                const response = await fetch('http://localhost:3000/like/save', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        datacid: datacid,
                        //cafeName: cafeName,
                    }),
                });
                if (response.ok) {
                    console.log('서버 응답에 성공했습니다');
                    console.log('datacid : ', datacid);
                    // console.log('res: ', response)
                    Alert.alert('찜한카페에 저장되었습니다.')
                    const haha = await response.text()
                    console.log('res: ', haha);
                } else {
                    console.warn('서버 응답에 실패했습니다.');
                }

            } catch (error) {
                console.error(error);
            }
        }
    } else {
        setLike(!like);
        try {
            const response = await fetch('http://localhost:3000/like/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    datacid: datacid,
                    //cafeName: cafeName,
                }),
            });
            if (response.ok) {
                console.log('서버 응답에 성공했습니다');
                console.log('datacid : ', datacid);
                const haha = await response.text()
                console.log('res: ', haha);
                Alert.alert('찜한카페에서 삭제 되었습니다.')
            } else {
                console.warn('서버 응답에 실패했습니다.');
            }
        } catch (error) {
            console.error(error);
        }

    }
  };

  async function LikeCheck() {
    try {
        const response = await fetch('http://localhost:3000/like/check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                datacid: datacid,
            }),
        });
        if (response.ok) {
            const res = await response.json();
            // console.log("@@@@@")
            // console.log('res: ', res);
            if (res.isLike == "True") {
                setLike(true);
                // console.log("진짜다~")
            }
        } else {
            // console.log('내가 쓴 리뷰를 불러올 수 없습니다.')
            console.error(error);
        }
    } catch (error) {
        console.error(error);
    }
}

  const tags = [
    {
      tag: cafe.group_table,

      text: '단체석',
      iconComponent: MaterialCommunityIcons,
      iconName: 'table-furniture',
    },
    {
      tag: cafe.parking,

      text: '주차',
      iconComponent: FontAwesome5,
      iconName: 'parking',
    },
    {
      tag: cafe.takeout,
      text: '포장',
      iconComponent: Entypo,
      iconName: 'cup',
    },
    {
      tag: cafe.reserv,
      text: '예약',
      iconComponent: MaterialIcons,
      iconName: 'book-online',
    },
    {
      tag: cafe.delivery,
      text: '배달',
      iconComponent: MaterialIcons,
      iconName: 'delivery-dining',
    },
    {
      tag: cafe.wifi,
      text: 'WIFI',
      iconComponent: MaterialIcons,
      iconName: 'wifi',
    },
    {
      tag: cafe.animal,
      text: '반려동물 동반',
      iconComponent: MaterialCommunityIcons,
      iconName: 'dog-service',
    },
    {
      tag: cafe.bathroom,
      text: '화장실',
      iconComponent: FontAwesome5,
      iconName: 'toilet',
    },
    {
      tag: cafe.wheelchair,
      text: '장애인 편의시설',
      iconComponent: FontAwesome,
      iconName: 'wheelchair',
    },
    {
      tag: cafe.charger,
      text: '콘센트',
      iconComponent: FontAwesome5,
      iconName: 'plug',
    },
    {
      tag: cafe.terrace,
      text: '테라스',
      imageSource: require('../assets/terrace.png'),
    },
  ];

  const renderIcon = (cafe) => {
    const {
      tag,
      text,
      iconComponent: IconComponent,
      iconName,
      imageSource,
    } = cafe;

    if (tag === 1) {
      if (IconComponent) {
        return (
          <SafeAreaView style={styles.iconContainer}>
            <IconComponent name={iconName} size={24} color="black" />
            <Text style={styles.iconText}>{text}</Text>
          </SafeAreaView>
        );
      } else if (imageSource) {
        return (
          <SafeAreaView style={styles.iconContainer}>
            <Image source={imageSource} style={styles.iconImage} />
            <Text style={styles.iconText}>{text}</Text>
          </SafeAreaView>
        );
      }
    }
    return null;
  };

  const renderStars = (rating) => {
    const maxRating = 5;
    const starSize = 20;

    const integerPart = Math.floor(rating);
    const decimalPart = rating - integerPart;
    const filledStarsCount = integerPart;
    const showHalfStar = decimalPart >= 0.5;

    const stars = [];

    for (let i = 0; i < maxRating; i++) {
      let starName, starColor;

      if (i < filledStarsCount) {
        starName = 'star';
        starColor = '#FFD700';
      } else if (i === filledStarsCount && showHalfStar) {
        starName = 'star-half-empty';
        starColor = '#FFD700';
      } else {
        starName = 'star-o';
        starColor = '#C0C0C0';
      }

      stars.push(
        <SafeAreaView key={i} style={styles.starContainer}>
          <FontAwesome name={starName} size={starSize} color={starColor} />
        </SafeAreaView>
      );
    }

    return stars;
  };

  const serviceStar = renderStars(serviceRating);
  const tasteStar = renderStars(tasteRating);
  const priceStar = renderStars(priceRating);

  const handleReview = async () => {
    if (isLogin == true){
      try {
          const response = await fetch('http://localhost:3000/review/my', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({review : 0}),
          });
          if (response.ok) {
              const MyReviewRaw = await response.json();
              let reviewdatacid = [];
              for (let i=0; i<MyReviewRaw.length; i++){
                reviewdatacid.push(MyReviewRaw[i].datacid)
              }
              if (reviewdatacid.includes(datacid)){
                Alert.alert('이미 남긴 후기가 있습니다.')
              } else {
                navigation.navigate('ReviewScreen', { cafe: cafe });
              }
          }
        } catch (error) {
          console.error(error);
        }
      // if (nickname && cafe.datacid)
      // navigation.navigate('ReviewScreen', { cafe: cafe });
    } else Alert.alert('후기를 남기려면 로그인 해주세요!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <SafeAreaView style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: cafe.imgsrc }} />
        </SafeAreaView>
        <SafeAreaView style={styles.namelike}>
          <Text style={styles.cafename}>{cafe.카페명}</Text>
          <TouchableOpacity style={styles.likeContainer} onPress={toggleLike}>
            {like ? (
              <MaterialCommunityIcons
                name="cards-heart"
                size={24}
                color="red"
              />
            ) : (
              <MaterialCommunityIcons
                name="cards-heart-outline"
                size={24}
                color="black"
              />
            )}
          </TouchableOpacity>
        </SafeAreaView>
        <Text style={styles.address}>{cafe.네이버주소}</Text>
        <SafeAreaView style={styles.line}></SafeAreaView>
        <Text style={{ fontSize: 18, fontWeight: 600, margin: 10 }}>
          시설정보
        </Text>
        <ScrollView horizontal style={styles.tagContainer}>
          {tags.map((tag, index) => (
            <SafeAreaView key={index}>{renderIcon(tag)}</SafeAreaView>
          ))}
        </ScrollView>
        <SafeAreaView style={styles.line}></SafeAreaView>
        <Text style={{ fontSize: 18, fontWeight: 600, margin: 10 }}>
          대표 키워드
        </Text>
        <ScrollView horizontal contentContainerStyle={styles.keywordContainer}>
          <Text style={cafe.TOP1 ? styles.keyword : styles.hiddenKeyword}>
            #{cafe.TOP1}
          </Text>
          <Text style={cafe.TOP2 ? styles.keyword : styles.hiddenKeyword}>
            #{cafe.TOP2}
          </Text>
          <Text style={cafe.TOP3 ? styles.keyword : styles.hiddenKeyword}>
            #{cafe.TOP3}
          </Text>
          <Text style={cafe.TOP4 ? styles.keyword : styles.hiddenKeyword}>
            #{cafe.TOP4}
          </Text>
          <Text style={cafe.TOP5 ? styles.keyword : styles.hiddenKeyword}>
            #{cafe.TOP5}
          </Text>
        </ScrollView>

        <SafeAreaView style={styles.line}></SafeAreaView>
        <Text style={{ fontSize: 18, fontWeight: 600, margin: 10 }}>메뉴</Text>
        <ScrollView
          style={styles.menuContainer}
          contentContainerStyle={styles.contentContainer}
        >
          {formattedMenus.map((menu, id) => (
            <SafeAreaView style={styles.menuline} key={id}>
              <Text style={styles.menuName}>{menu.name}</Text>
              <Text style={styles.menuPrice}>{menu.price}</Text>
            </SafeAreaView>
          ))}
        </ScrollView>
        <SafeAreaView style={styles.line}></SafeAreaView>
        <Text style={{ fontSize: 18, fontWeight: 600, margin: 10 }}>평점</Text>
        <SafeAreaView style={styles.starContainer}>
          <Text style={styles.starText}>서비스</Text>
          <SafeAreaView style={styles.star}>{serviceStar}
          <Text>   {serviceRating}</Text></SafeAreaView>
        </SafeAreaView>
        <SafeAreaView style={styles.starContainer}>
          <Text style={styles.starText}>맛</Text>
          <SafeAreaView style={styles.star}>{tasteStar}
          <Text>   {tasteRating}</Text></SafeAreaView>
        </SafeAreaView>
        <SafeAreaView style={styles.starContainer}>
          <Text style={styles.starText}>가격</Text>
          <SafeAreaView style={styles.star}>{priceStar}
          <Text>   {priceRating}</Text></SafeAreaView>
        </SafeAreaView>
        <SafeAreaView style={styles.line}></SafeAreaView>
        <Text style={{ fontSize: 18, fontWeight: 600, margin: 10 }}>
        한줄평
        </Text>
        <FlatList
        data={reviewData}
        //extraData={this.cafeData}
        renderItem={({ item }) => (<ReviewList item={[item]} />)}
        keyExtractor={(item, datacid) => datacid.toString()}
        />
      </ScrollView>
      <SafeAreaView style={styles.btn_content}>
        <TouchableOpacity style={styles.reviewbtn}>
          <Text style={{ fontSize: 24, fontWeight: 700 }} onPress={handleReview}>후기 남기기</Text>
        </TouchableOpacity>
      </SafeAreaView>
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
  imageContainer: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    margin: 10,
  },
  line: {
    borderWidth: 0.5,
    borderColor: '#BFBDC0',
  },
  namelike: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 10,
  },
  cafename: {
    marginRight: 10,
    fontSize: 20,
    fontWeight: 700,
  },
  likeContainer: {
    marginLeft: 'auto',
  },
  address: {
    fontSize: 15,
    margin: 10,
    marginLeft: 13,
  },
  tagContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  iconContainer: {
    alignItems: 'center',
    marginRight: 30,
  },
  iconText: {
    marginTop: 5,
    fontSize: 12,
  },
  iconImage: {
    height: 24,
    width: 24,
  },
  keywordContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  keyword: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 7,
    marginRight: 20,
    borderColor: '#FF9F04',
  },
  hiddenKeyword: {
    display: 'none',
  },
  menuContainer: {
    paddingHorizontal: 50,
    marginTop: 10,
    maxHeight: 200,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  menuline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuName: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  menuPrice: {
    fontSize: 15,
  },
  starContainer: {
    //marginRight: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 3,
  },
  starText: {
    fontSize: 15,
    alignItems: 'center',
    //flex: 1,
    marginLeft: 15,
  },
  star: {
    marginLeft: 15,
    flexDirection: 'row',
    padding: 5,
    marginRight: 220,
  },
  btn_content: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewbtn: {
    borderWidth: 3,
    borderColor: '#FF9F04',
    borderRadius: 5,
    padding: 10,
    textAlign: 'center',
  },
});

export default CafeScreen;
