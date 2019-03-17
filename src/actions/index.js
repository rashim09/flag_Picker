import SourceData from '../dataSource/content.json';
import * as UtilFunc from './dataActions';
import * as ActionTypes from './ActionTypes';

export const fetchContinents = () => dispatch => dispatch({
    type: ActionTypes.FETCH_CONTINENTS_DATA,
    payload: UtilFunc.createContinentsList(SourceData)
});

export const fetchCountries = (selectedContinent) => dispatch => dispatch({
    type: ActionTypes.FETCH_COUNTRIES_DATA,
    payload: UtilFunc.createCountriesList(SourceData, selectedContinent)
});

export const UpdateSelectedContinent = (continent, isUnSelected = false) => dispatch => dispatch({
    type: (isUnSelected)
        ? ActionTypes.UPDATE_CONTINENT_UNSELECTED
        : ActionTypes.UPDATE_CONTINENT_SELECTED,
    payload: continent || ""
});

export const UpdateCountriesToDisplayFlags = (countriesData) => dispatch => dispatch({
    type: ActionTypes.UPDATE_COUNTRIES_TO_DISPLAY_FLAGS,
    payload: countriesData
});