import React, {useState} from 'react';
import {Text, StyleSheet, ScrollView, TextInput, Button} from 'react-native';

import {
  NativeBaseProvider
} from 'native-base';
import shortid from 'shortid';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Add = ({navigation}) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('')

  const addToList = async() => {
      try{
        if(!name || ! password){
            return alert('Please assign')
            //TODO: Snackbar
        }  

        const allData = {
            id: shortid.generate(),
            name: name,
            password:password
        }

        const storedValue = await AsyncStorage.getItem('@data_list')
        const prevList = await JSON.parse(storedValue)

        if(!prevList){
            const newList = [allData]
            await AsyncStorage.setItem('@data_list', JSON.stringify(newList))
        } else {
            prevList.push(allData)
            await AsyncStorage.setItem('@data_list', JSON.stringify(prevList))
        }

        navigation.navigate('Home')
        // const setPassword = ÷
      } catch (error){
          console.log(error)
      }
  }

  return (
    
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Text style={styles.heading}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          keyboardType="default"
          value= {name}
          onChangeText={(text) => setName(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="useless placeholder"
          keyboardType="default"
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}

        />

        <Button
          title="Login"
          style={styles.input}
          accessibilityLabel="Learn more about this purple button"
          onPress={addToList}
        />
      </ScrollView>
    
  );
};

export default Add;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'flex-start',
  },
  heading: {
    textAlign: 'center',
    color: '#00b7c2',
    marginHorizontal: 5,
    marginTop: 50,
    marginBottom: 20,
  },
  formItem: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10
  },
});
