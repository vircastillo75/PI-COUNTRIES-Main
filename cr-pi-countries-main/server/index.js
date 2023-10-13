const axios = require("axios"); 

const server = require("./src/app"); 

const { conn, Country } = require("./src/db.js"); 

const PORT = 3001; 

 
 

conn 

  .sync({ force: true }) 

  .then(async () => { 

    server.listen(PORT, async () => { 

      const allCountries = await Country.findAll(); 

      if (allCountries.length === 0) { // Verifica si la base de datos está vacía 

        const { data } = await axios.get("http://localhost:5000/countries"); 

        const countries = data.map((country) => {  

          return { 

            id: country.cca3, 

            name: country.name.common ? country.name.common : country.name.official, 

            flag: country.flags.svg, 

            continent: country.continents && country.continents.length > 0 ? country.continents[0] : 'No proporcionado', 

            capital: country.capital ? country.capital[0] : 'Capital doesnt exist', 

            subregion: country.subregion, 

            area: country.area, 

            population: country.population, 

          }; 

        }); 

         

        await Country.bulkCreate(countries); 

        console.log("Base de datos llena"); 

      } 

      console.log(`Server listening on port ${PORT}`); 

    }); 

  }) 

  .catch((error) => console.error(error)); 