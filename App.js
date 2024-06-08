import * as React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts, Inconsolata } from '@expo-google-fonts/inter';


import Button from './components/Button';
import TextBox from './components/TextBox';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {


  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={[styles.text]}>Welcome to Your Cookbook</Text>
      </View>
      <View style={styles.ButtonContainer}>
        <Button label="View Recipes" onPress={() => navigation.navigate('Recipes') } style={styles.Button}  />
        <Button label="Add Recipe" onPress={() => navigation.navigate('AddRecipe')} style={styles.Button} />
      </View>
    </View>
  );
}

function RecipesScreen({navigation}) {
  const [recipes, setRecipes] = React.useState([]);

  const loadData = async () => {
    try {
      const existingRecipes = await AsyncStorage.getItem('recipes');
      if (existingRecipes !== null) {
        setRecipes(JSON.parse(existingRecipes));
      } else {
        setRecipes([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    loadData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.recipeTitle, {textAlign: 'center'}]}>--- Recipes ---</Text>
      {recipes && recipes.map((recipe, index) => (
        <View key={index}>
          <Text style={styles.textName}>{recipe.name}</Text>
          <Text style={styles.textInstructions}>{recipe.instructions}</Text>
          <Text > - - - - - - - - - - - - - - -  - - - - - - - - - - - - - - - - - - - - - - - - - </Text>
        </View>
      ))} 
    </ScrollView>
  )
}

function AddRecipeScreen({navigation}) {
  const [recipeName, setRecipeName] = React.useState('');
  const [instructions, setInstructions] = React.useState('');

  const saveData = async () => {
    try {
      const recipe = { name: recipeName, instructions };
      const existingRecipes = await AsyncStorage.getItem('recipes');
      let newRecipes = JSON.parse(existingRecipes);
      if (!newRecipes) {
        newRecipes = [];
      }
      newRecipes.push(recipe);
      await AsyncStorage.setItem('recipes', JSON.stringify(newRecipes));
      alert('Recipe saved successfully!');
    } catch (error) {
      console.log(error);
      alert('Failed to save the recipe.');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={[styles.text]}>Add Recipe Here</Text>
      </View>
      <TextBox style={styles.SmallTextbox} placeholder="Recipe Name" setValue={setRecipeName}/>
      <TextBox style={styles.BigTextbox} placeholder="Recipe Instructions" setValue={setInstructions}/>
      <Button label="Save" onPress={() => {saveData(); navigation.navigate('Home');}}
       style={styles.SaveButton} />
    </View>
  )
}

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Recipes" component={RecipesScreen} />
        <Stack.Screen name="AddRecipe" component={AddRecipeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EB9486',
  },
  headerContainer: {
    flex: 1/4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#6B4B3E',
    fontSize: 25
  },
  ButtonContainer: {
    flex: 2 / 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  SmallTextbox: {
    height: 40,
    marginTop: 10,
  },
  BigTextbox: {
    height: 340,
  },
  SaveButton: {
    height: 40,
    width: 100,
    marginVertical: 7,
    marginHorizontal: 20,
  },
  Button: {
    marginHorizontal: 20,
    width: 320,
    height: 68,
    marginVertical: 50,
  },
  textName: {
    color: '#183A37',
    fontSize: 23,
    marginBottom: 13,
  },
  textInstructions: {
    color: '#183A37',
    fontSize: 15
  },
  recipeTitle: {
    color: '#6B4B3E',
    fontSize: 28,
    marginBottom: 25,
  }
});
