import React,{useEffect, useState} from 'react';
import Recipe from './Recipes';
import './App.css';


const App=() =>{

  const APP_ID ="78b6f4d9";
  const APP_KEYS ="c7b1a77e17be8b5efbb36b2e8333b3de";
  
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch]=useState('');
  const [query, setQuery] = useState('chicken')


  useEffect(() => {
    getRecipe();
    console.log('fetching');
  },[query]);
  

  const getRecipe = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_key=${APP_KEYS}&app_id=${APP_ID}&app_key=${APP_KEYS}`);
    const data =await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }

  const updateSearch = e=>{
    setSearch(e.target.value);

  }

  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className=" search-bar" type="text" value={search} onChange={updateSearch}></input>
        <button className=" search-buttons" type="submitt">Search</button>
      </form>
      <div className="recipes">
      {recipes.map(recipe =>(
        <Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label}
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
        ))}
      </div>
    </div>
      
  )
}

export default App;
