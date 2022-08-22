import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import { Text } from 'react-native';
import t from 'tcomb-form-native';
import {Auth, API, graphqlOperation } from 'aws-amplify';
import {createProduct} from '../../src/graphql/mutations';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Form = t.form.Form;
const User = t.struct({
  name: t.String,
  price: t.Number,
  description: t.String,
});
const AddProductScreen = ({navigation}) => {
  const [form, setForm] = useState(null); 
  const [initialValues, setInitialValues] = useState({});

  const options = {
    auto: 'placeholders',
    fields: {
      description: {
        multiLine: true,
        stylesheet: {
          ...Form.stylesheet,
          textbox: {
            ...Form.stylesheet.textbox,
            normal: {
              ...Form.stylesheet.textbox.normal,
              height: 100,
              textAlignVertical: 'top',
            },
          },
        },
      },
    },
  };
const handleSubmit = async () => {
    // Saving product details
    
    try {
      const value = await form.getValue();
      const user = await Auth.currentAuthenticatedUser();
      const response = await API.graphql(graphqlOperation(createProduct,{
        input: {
          name: value.name,
          price: value.price,
          description: value.description,
          userId: user.attributes.sub,
          userName:user.username,
        },

      })
    );
    console.log('response: \n');
    console.log(response);
    } catch (error) {
      console.log(error)
    }
  };
return (
    <>
      <SafeAreaView style={styles.addProductView}>
        <ScrollView>
          <Form
            ref={(c) => setForm(c)}
            value={initialValues}
            type={User}
            options={options}
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}><Text style={styles.bntText}>SAVE</Text></TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  addProductView: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: 15,
    height: 'auto',
  },
  button:{
    width:100,
    height:50,
    backgroundColor:'#363688',


  },

  bntText:{
    fontSize:20,
    color:'#fff',
  },
});
export default AddProductScreen;