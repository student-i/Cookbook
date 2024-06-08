import { StyleSheet, View, Pressable, Text } from 'react-native';

export default function Button({ label, onPress, style }) {
  return (
    <View style={[styles.buttonContainer, style]}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
},
button: {
    borderRadius: 10,
    backgroundColor: '#183A37',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonLabel: {
    color: '#A9C6C1',
    fontSize: 16,
  },
});
