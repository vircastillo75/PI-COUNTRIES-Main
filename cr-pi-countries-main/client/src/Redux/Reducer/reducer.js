import { ActionTypes } from '../Actions/actionTypes';

const initialState = {
  allCountries: [],
  allCountriesCopy: [],
  countryDetail: {},
  allActivities: [],
  numPage: 1,
  filter: '',
  sortOption: ''
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_ALL_COUNTRIES:
      return {
        ...state,
        allCountries: payload,
        allCountriesCopy: payload
      };
    case ActionTypes.GET_COUNTRY_DETAIL:
      return {
        ...state,
        countryDetail: payload
      };
    case ActionTypes.DISASSEMBLE_DETAIL:
      return {
        ...state,
        countryDetail: {}
      };
    case ActionTypes.DISASSEMBLE_COUNTRIES:
      return {
        ...state,
        allCountries: []
      };
    case ActionTypes.GET_COUNTRIES_BY_NAME:
      return {
        ...state,
        allCountriesCopy: payload,
        numPage: 1 // Resetear la página a 1 después de una búsqueda
      };
    case ActionTypes.NEXT_PAGE:
      return {
        ...state,
        numPage: state.numPage + 1
      };
    case ActionTypes.PREV_PAGE:
      return {
        ...state,
        numPage: state.numPage - 1
      };
    case ActionTypes.POST_ACTIVITIES:
      return {
        ...state,
        allActivities: payload
      };
    case ActionTypes.GET_ALL_ACTIVITIES:
      return {
        ...state,
        allActivities: payload
      };
    case ActionTypes.SET_FILTERED_COUNTRIES:
      return {
        ...state,
        allCountriesCopy: payload
      };
    case ActionTypes.SET_SORT_OPTION:
      return {
        ...state,
        sortOption: payload
      };
    case ActionTypes.GET_ALL_COUNTRIES_WITH_ACTIVITIES:
      return {
        ...state,
        allCountriesCopy: payload,
        numPage: 1 // Resetear la página a 1 después de filtrar
      };
    case ActionTypes.SET_NUM_PAGE:
      return {
        ...state,
        numPage: payload
      };
    case ActionTypes.RELATE_ACTIVITY_TO_COUNTRY:
      return {
        ...state,
        allCountriesCopy: state.allCountriesCopy.map(country => {
          if (country.id === payload.countryId) {
            if (!country.Activities) {
              country.Activities = [];
            }
            country.Activities.push(payload.activityId);
          }
          return country;
        })
      };
    case ActionTypes.RESET_FILTERS:
      return {
        ...state,
        allCountriesCopy: state.allCountries,
        numPage: 1,
        filter: '',
        sortOption: ''
      };
    default:
      return state;
  }
};

export default reducer;
