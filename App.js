import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AddProductScreen from './src/screens/add-product-screen';
import HomeScreen from './src/screens/home-screen';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {withAuthenticator} from 'aws-amplify-react-native';
import {Auth} from 'aws-amplify';

const App: () => React$Node = () => {
  const Stack = createStackNavigator();
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({navigation}) => ({
              title: 'Home',
              headerStyle: {
                backgroundColor: '#ff9300',
                
              },
              headerTintColor: '#fff',
              headerLeft:()=>(
                
                <TouchableOpacity
                style={styles.logOutBtn}
                onPress={() => {Auth.signOut()}}>
                <Icon name={'sign-out'} size={20} color="#ffff" />

                </TouchableOpacity>
                
                
              ),
              headerRight: () => (
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => navigation.navigate('AddProduct')}>
                  <Icon name={'plus'} size={20} color="#ffff" />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="AddProduct"
            buttonStyle={styles.addButton}
            component={AddProductScreen}
            options={{
              title: 'Add Product',
              headerStyle: {
                backgroundColor: '#ff9300',
              },
              headerTintColor: '#fff',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
const styles = StyleSheet.create({
  addButton: {
    marginRight: 20,
  },
  logOutBtn: {
    marginLeft: 10,
  },
});

export default withAuthenticator(App);