import { useState, useContext, useEffect } from "react";
import ThemeContext from "./ThemeContext";
import useBreedList from "./useBreedList";
import Results from "./Results";

const ANIMALS = Object.freeze(["bird", "cat", "dog", "rabbit", "reptile"]);

const SearchParams = () => {
   const [location, setLocation] = useState("");
   const [animal, setAnimal] = useState("");
   const [breed, setBreed] = useState("");
   const [submit, setSubmit] = useState(false);
   const [breeds] = useBreedList(animal);
   const [theme, setTheme] = useContext(ThemeContext);

   useEffect(() => {
      setSubmit(false);
   }, [location, animal, breed]);

   return (
      <div className="search-params">
         <form
            onSubmit={(e) => {
               e.preventDefault();
               setSubmit(true);
            }}
         >
            <label htmlFor="location">
               Location
               <input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location"
               />
            </label>

            <label htmlFor="animal">
               Animal
               <select
                  id="animal"
                  value={animal}
                  onChange={(e) => setAnimal(e.target.value)}
                  onBlur={(e) => setAnimal(e.target.value)}
               >
                  <option />
                  {ANIMALS.map((animal) => (
                     <option value={animal} key={animal}>
                        {animal}
                     </option>
                  ))}
               </select>
            </label>

            <label htmlFor="breed">
               Breed
               <select
                  id="breed"
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                  onBlur={(e) => setBreed(e.target.value)}
               >
                  <option />
                  {breeds.map((breed) => (
                     <option value={breed} key={breed}>
                        {breed}
                     </option>
                  ))}
               </select>
            </label>

            <label htmlFor="theme">
               Theme
               <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  onBlur={(e) => setTheme(e.target.value)}
               >
                  <option value="darkblue">Dark Blue</option>
                  <option value="peru">Peru</option>
                  <option value="chartreuse">Chartreuse</option>
                  <option value="mediumorchid">Medium Orchid</option>
               </select>
            </label>

            <button style={{ backgroundColor: theme }}>Submit</button>
         </form>

         {
            <Results
               animal={animal}
               location={location}
               breed={breed}
               submit={submit}
            />
         }
      </div>
   );
};

export default SearchParams;
