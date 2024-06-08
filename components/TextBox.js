import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useState } from 'react';

export default function TextBox({ style, placeholder, setValue }) {
    const [value, setLocalValue] = useState('');

    const handleTextChange = (text) => {
        setLocalValue(text);
        setValue(text);
    }

    return (
      <View style={[styles.container, style]}>
          <TextInput
          style={styles.input}
          onChangeText={handleTextChange}
          value={value}
          placeholder={placeholder}
          multiline={true}
        />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#F8F4E3',
      marginBottom: 50,
      marginHorizontal: 20,
      borderRadius: 10,
    },
    input: {
        borderColor: '#F8F4E3',
        borderWidth: 1,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center',
      },
});
