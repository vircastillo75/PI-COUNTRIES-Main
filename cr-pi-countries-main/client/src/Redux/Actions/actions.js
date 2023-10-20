import axios from "axios";
import { ActionTypes } from './actionTypes';

// Acción para obtener todos los países
export const getAllCountries = () => async (dispatch) => {
   try {
      const { data } = await axios.get("http://localhost:3001/countries");
      dispatch({ type: ActionTypes.GET_ALL_COUNTRIES, payload: data });
   } catch (error) {
      console.log(error);
   }
};

// Acción para obtener los detalles de un país por su ID
export const getCountryDetail = (id) => async (dispatch) => {
   try {
      const { data } = await axios.get(`http://localhost:3001/countries/${id}`);
      dispatch({ type: ActionTypes.GET_COUNTRY_DETAIL, payload: data });
   } catch (error) {
      console.log(error);
   }
};

// Acción para limpiar la lista de países
export const disassembleCountries = () => ({ type: ActionTypes.DISASSEMBLE_COUNTRIES });

// Acción para limpiar los detalles de un país
export const disassembleDetail = () => ({ type: ActionTypes.DISASSEMBLE_DETAIL });

// Acción para avanzar a la siguiente página
export const nextPage = () => ({ type: ActionTypes.NEXT_PAGE });

// Acción para retroceder a la página anterior
export const prevPage = () => ({ type: ActionTypes.PREV_PAGE });

// Acción para establecer el número de página
export const setNumPage = (pageNumber) => ({
   type: ActionTypes.SET_NUM_PAGE,
   payload: pageNumber
});

// Acción para obtener un país por su ID
export const getCountryById = (id) => async (dispatch) => {
   try {
      const { data } = await axios.get(`http://localhost:3001/countries/${id}`);
      dispatch({ type: ActionTypes.GET_COUNTRIES_BY_ID, payload: data });
   } catch (error) {
      console.log(error);
   }
};

// Acción para obtener países por su nombre
export const getCountryByName = (name) => async (dispatch) => {
   try {
      const lowerCaseName = name.toLowerCase();
      const response = await axios.get(`http://localhost:3001/countries`);
      const filterCountry = response.data.filter(country =>
         country.name.toLowerCase().includes(lowerCaseName));
      dispatch({ type: ActionTypes.GET_COUNTRIES_BY_NAME, payload: filterCountry });
   } catch (error) {
      dispatch({ type: "ERROR_OCCURRED", payload: error.message });
   }
};

// Acción para crear una actividad
export const postActivities = (createActivity) => async (dispatch) => {
   try {
      const response = await axios.post("http://localhost:3001/activities", createActivity);
      dispatch({ type: ActionTypes.POST_ACTIVITIES, payload: response.data });
   } catch (error) {
      console.log(error);
   }
};

// Acción para obtener todas las actividades
export const getAllActivities = () => async (dispatch) => {
   try {
      const response = await axios.get("http://localhost:3001/activities");
      const allActivities = response.data;

      dispatch({ type: ActionTypes.GET_ALL_ACTIVITIES, payload: allActivities });
   } catch (error) {
      console.log(error);
   }
};

// Acción para obtener países con actividades relacionadas
export const getAllCountriesWithActivities = (activityName = null) => async (dispatch) => {
   try {
      const response = await axios.get("http://localhost:3001/countries/activities");
      const dataResponse = response.data;

      if (activityName === 'All') {
         dispatch({ type: ActionTypes.GET_ALL_COUNTRIES_WITH_ACTIVITIES, payload: dataResponse });
      } else {
         const filtered = dataResponse.filter(country => {
            return country.Activities && country.Activities.some(activity => activity.name === activityName);
         });
         dispatch({ type: ActionTypes.GET_ALL_COUNTRIES_WITH_ACTIVITIES, payload: filtered });
      }
   } catch (error) {
      console.log(error);
   }
};

// Acción para establecer países filtrados
export const setFilteredCountries = (filteredCountries) => ({
   type: ActionTypes.SET_FILTERED_COUNTRIES,
   payload: filteredCountries
});

// Acción para establecer la opción de ordenamiento
export const setSortOption = (sortOption) => ({
   type: ActionTypes.SET_SORT_OPTION,
   payload: sortOption
});

// Acción para relacionar una actividad con un país
export const relateActivityToCountry = (countryId, activityId) => async (dispatch) => {
   try {
      const response = await axios.post('http://localhost:3001/relateActivityToCountry', {
         countryId,
         activityId
      });

      if (response.status === 200) {
         // Despachar una acción de éxito con los IDs del país y la actividad
         dispatch({
            type: ActionTypes.RELATE_ACTIVITY_TO_COUNTRY,
            payload: {
               countryId,
               activityId
            }
         });
      } else {
         // Despachar una acción de error si es necesario
         dispatch({ type: ActionTypes.RELATE_ACTIVITY_ERROR, payload: 'Error en la solicitud' });
      }
   } catch (error) {
      console.log(error);
      // Manejar errores o despachar una acción de error si es necesario
      dispatch({ type: ActionTypes.RELATE_ACTIVITY_ERROR, payload: error.message });
   }
};
