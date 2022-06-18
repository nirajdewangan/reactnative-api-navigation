import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  View,
  Button,
} from 'react-native';
// import {Fab, Icon} from 'native-base'
import {NativeBaseProvider} from 'native-base';
import FAB from 'react-native-fab';
import Icon from 'react-native-vector-icons/FontAwesome';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {useIsFocused} from '@react-navigation/native';

import axios from 'axios';

const Home = ({navigation, route}) => {
  const [userfromapi, setUserfromapi] = useState(null);

  const fetchDetails = async () => {
    try {
      console.log('inside fetch effect');
      const {data} = await axios.get('https://randomuser.me/api');
      setUserfromapi(data.results[0]);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    }
  };

  const [listofUser, setListofUser] = useState(['title']);

  const isFocused = useIsFocused();
  const getList = async () => {
    //
    const allData = await AsyncStorage.getItem('@data_list');
    if (!allData) {
      setListofUser([]);
    }

    const list = JSON.parse(allData);
    setListofUser(list);
  };

  const deleteUser = async () => {
    //
  };

  useEffect(() => {
    getList();
  }, [isFocused]);

  useEffect(() => {
    fetchDetails();
  }, []);

  if (!userfromapi) {
    return (
      <View>
        <Text> Loading ...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Text>Please login</Text>

      <Icon
        name="plus"
        size={45}
        color="#10A881"
        onPress={() => navigation.navigate('Add')}
      />

      {listofUser?.length == 0 ? (
        <Text>User list is empty</Text>
      ) : (
        <View>
          {listofUser?.map(user => (
            <Text key={user.id}> {user.name}</Text>
          ))}
        </View>
      )}

      {/* <User details={details} /> */}
      <Button
        onPress={() => fetchDetails()}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  emptyContainer: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
  },
  heading: {
    textAlign: 'center',
    color: '#00b7c2',
    marginVertical: 15,
    marginHorizontal: 5,
  },
  actionButton: {
    marginLeft: 5,
  },
  seasonName: {
    color: '#fdcb9e',
    textAlign: 'justify',
  },
  listItem: {
    marginLeft: 0,
    marginBottom: 20,
  },
});
