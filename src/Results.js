import { useContext, useEffect, useState } from "react";
import Pet from "./Pet";
import ThemeContext from "./ThemeContext";

const Results = ({ animal, location, breed, submit }) => {
   const [page, setPage] = useState(0);
   const [hasNext, setHasNext] = useState(false);
   const [pets, setPets] = useState([]);
   const [loading, setLoading] = useState(true);
   const [theme] = useContext(ThemeContext);

   useEffect(() => {
      setLoading(true);
      requestPets();
   }, [submit, page]); // eslint-disable-line react-hooks/exhaustive-deps

   async function requestPets() {
      const json = await fetch(
         `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}&page=${page}`
      ).then((res) => res.json());

      setHasNext(json.hasNext);
      setPets(json.pets);
      setLoading(false);
   }

   return (
      <div className="search">
         {loading ? (
            <h2>Loading...</h2>
         ) : !pets.length ? (
            <h2>No Pets Found</h2>
         ) : (
            pets.map((pet) => (
               <Pet
                  animal={pet.animal}
                  key={pet.id}
                  name={pet.name}
                  breed={pet.breed}
                  images={pet.images}
                  location={`${pet.city}, ${pet.state}`}
                  id={pet.id}
               />
            ))
         )}
         <div className="navigation">
            <button
               style={{ backgroundColor: theme }}
               disabled={page === 0}
               onClick={() => setPage(page - 1)}
            >
               &#8592;
            </button>
            <h2>{page + 1}</h2>
            <button
               style={{ backgroundColor: theme }}
               disabled={!hasNext}
               onClick={() => setPage(page + 1)}
            >
               &#8594;
            </button>
         </div>
      </div>
   );
};

export default Results;
