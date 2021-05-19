import { useState, useEffect } from "react";

const localCache = {};

export default function useBreedList(animal) {
   const [breedList, setBreedList] = useState([]);
   const [status, setStatus] = useState("unloaded");

   useEffect(() => {
      if (!animal) {
         setBreedList([]);
      } else if (localCache[animal]) {
         setBreedList(localCache[animal]);
      } else {
         requestBreedList();
      }

      async function requestBreedList() {
         setBreedList([]);
         setStatus("loading");

         const json = await fetch(
            `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
         ).then((res) => res.json());

         localCache[animal] = json.breeds || [];
         setBreedList(localCache[animal]);
      }
   }, [animal]);

   return [breedList, status];
}
