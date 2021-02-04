import React, {useState, useEffect} from 'react';
import {ActivityIndicator, FlatList} from 'react-native';
import {
  Container,
  Grid,
  Row,
  Col,
  Input,
  Item,
  Button,
  Icon,
  ActionSheet,
} from 'native-base';
import axios from 'axios';
import {ListItem} from '../../src/components/ListItem';
import SplashScreen from 'react-native-splash-screen';

var BUTTONS = ['By Name', 'By Date'];
var CANCLE_INDEX = 2;
var BUTTONS_INDEX = 1;

export const Home = ({navigation}) => {
  const [data, setData] = useState([]);
  const [listData, setListData] = useState([]);
  const [loader,Setloader]=useState(true);
  const [searchText, setSearchText] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
   
      setTimeout(() => {
          SplashScreen.hide();
        }, 350);
      
  
    if (!isSearching) {
      intervalCall();
    }
  }, []);

  const intervalCall = () => {
    setInterval(() => {
      apiCall(0);
    }, 10000);
  };

  const apiCall = ({isIntervalCall}) => {
    axios
      .get(
        `http://api.tvmaze.com/shows`,
      )
      .then((res) => {
        // console.log(res.data);
        Setloader(false);
        if (isIntervalCall == 0) {
          let test = res.data;
          let test2 = [];
          if (data.length() == 0) {
       
            setData([...data, ...res.data]);
          } else {
            for (var i = 0; i < test.length(); i++) {
              for (var j = 0; j < data.length(); j++) {
                if (test[i].updated == data[i].updated) {
                  test2 = test[i];
                }
              }
            }
            console.log(test2);
            setData([...data, ...test2]);
          }
        } else {
          setData([...data, ...res.data]);
      
        }
      })
      .catch((err) => console.log(err));
  };

  const refreshData = () => {
    apiCall(0);

  };

  const handleSearch = () => {
    console.log("text searching",searchText)
    setIsSearching(true);
    if (isSearching) {
      if (searchText !== '') {
        let filterData = [...data];
        filterData = filterData.filter((item) => {
          console.log("test name",item.name)
          if (
            item.name &&
            item.name.toLowerCase().includes(searchText.toLowerCase())
          ) {
            return true;
          } else if (
            item.url &&
            item.url.toLowerCase().includes(searchText.toLowerCase())
          ) {
            return true;
          }  else {
            false;
          }
        });
        setListData(data);
        setData([]);
        setData(filterData);
      } else if (searchText == '') {
        setData(listData);
        setListData([]);
        setIsSearching(false);
      }
    }
  };

  const showActionSheet = () => {
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCLE_INDEX,
        destructiveButtonIndex: BUTTONS_INDEX,
        title: 'Sort By',
      },
      (buttonIndex) => {
        if (buttonIndex == 0) {
          sortByTitle();
        }
        if (buttonIndex == 1) {
          sortByDate();
        }
        if (buttonIndex == 2) {
          resetSort();
        }
      },
    );
  };

  const sortByTitle = () => {
    let filterData = [...data];
    filterData = filterData.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    setListData(data);
    setData([]);
    setData(filterData);
  };

  const sortByDate = () => {
    let filterData = [...data];
    filterData = filterData.sort((a, b) => {
      return new Date(b.premiered) - new Date(a.premiered);
    });
    setListData(data);
    setData([]);
    setData(filterData);
  };

  const resetSort = () => {
    if (listData.length > 0) setData(listData);
    setListData([]);
  };
  if(loader){
    return(
      <Container style={{justifyContent:'center',alignItems:'center'}}>
 <ActivityIndicator size="small" color="#0000ff" />   
    </Container>
    )
  }else{

  return (
    <Container style={{backgroundColor:'#87cefa'}} keyboardShouldPersistTaps="always">
      <Grid>
        <Row size={1} style={{marginTop: 12}}>
          <Col size={5} style={{marginHorizontal: 5}}>
            <Item rounded>
              <Input
                placeholder="Search title, url"
                onChangeText={(text) => setSearchText(text)}
                value={searchText}
                // onEndEditing={()=>handleSearch()}
                returnKeyType="search"
                onSubmitEditing={() => handleSearch()}
              />
            </Item>
          </Col>
          <Col size={1}>
            <Button danger onPress={() => handleSearch()}>
              <Icon name="search"></Icon>
            </Button>
          </Col>
          <Col size={1}>
            <Button onPress={() => showActionSheet()}>
              <Icon name="list"></Icon>
            </Button>
          </Col>
        </Row>
        <Row size={10} style={{marginHorizontal: 5}}>
          <FlatList
            data={data}
            renderItem={(item) => (
              <ListItem
                data={item}
                onPress={() =>
                  navigation.navigate('Details', {
                    data: item,
                  })
                }
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0.3}
            onEndReached={() => {
              if (!isSearching) {
                apiCall(1);
              }
            }}
            onRefresh={() => refreshData()}
            refreshing={isRefreshing}
          />
        </Row>
      </Grid>
    </Container>
  );
};
}
