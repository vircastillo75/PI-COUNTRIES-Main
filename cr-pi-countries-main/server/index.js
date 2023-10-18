const axios = require("axios");
const server = require("./src/server");
const { conn, Country } = require('./src/db.js');
const { cleanerApiInfo } = require("./src/utils/index");
const API = "http://localhost:5000/countries";
const PORT = 3001;

conn.sync({ force: false }).then(async () => {
  try {
    server.listen(PORT, async () => {
      try {
        const countriesFromDB = await Country.findAll();
        if (!countriesFromDB.length) {
          const response = await axios.get(API);
          const cleanResponse = cleanerApiInfo(response.data);
          await Country.bulkCreate(cleanResponse);
          console.log("The API information has been dumped in the local Database.");
          
          // Agregamos el mensaje de escucha del servidor aquí
          console.log(`Server listening on port ${PORT}`);
        } else {
          console.log("The Database already contains API information.");
          
          // Agregamos el mensaje de escucha del servidor aquí
          console.log(`Server listening on port ${PORT}`);
        }
      } catch (error) {
        console.error("Error while fetching and processing API data:", error);
      }
    });
  } catch (error) {
    console.error("Error while starting the server:", error);
  }
}).catch(error => {
  console.error("Error while syncing the database:", error);
});
