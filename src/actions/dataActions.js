

export const createContinentsList = (sourceData) => 
    sourceData.map(data => ({ "name":data.continent , "isSelected": false}));


export const createCountriesList = (sourceData,selectedContinent) => {
    return (
        sourceData.filter(data => data.continent === selectedContinent)
        .map(values => values.countries
            .map((c)=>{c.isSelected = false ; return c;})
            )[0]
        )
}


