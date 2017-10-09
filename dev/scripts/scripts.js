/**
 * Created by enrique.cantillo on 21.08.17.
 */

// get your data first, then functionality

// endpoint
const url = 'worldcities.json'
//let cities = []
const cities = []



fetch(url)
    .then(items => items.json())
    // ... spreads into the array
    .then(data => cities.push(...data))

// selects the input
const searches = document.querySelector('.search')
//select the list where is going to be displayed
const suggestions = document.querySelector('.suggestions')
//suggestions.innerHTML = ""


//create display queries
function findMatch(wordsMatch, cities) {

    if (wordsMatch === '') {
        return [];
    }

    return cities.filter(place => {
        //create a variable for the regex
        //arguments g for global searches thru the array i for insensitive looks for lower case and upper case
        const regex = new RegExp(wordsMatch, 'gi')
        // figure out if the city/state matches the search
        return place.name.match(regex) || place.country.match(regex)

    })

}

// regex for commas
function numbers(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// create the show matches function
function showMatchs() {

    const matchArray = findMatch(this.value, cities)

    //console.log(this.value)

    //console.log(matchArray)
    const toHTML = matchArray.map(place => {
        // create regex to highlight what the user is querying
        const regex = new RegExp(this.value, 'gi')
        const cityName = place.name.replace(regex, `<span class="highlight">${this.value}</span>`)
        const countryName = place.country.replace(regex, `<span class="highlight">${this.value}</span>`)
        return ` 
         <li>
            <span class="name">${cityName}, ${countryName}</span>
            <span class="population">${numbers(place.geonameid)}</span>
        </li>
         `
    }).join('')
    suggestions.innerHTML = toHTML
}



searches.addEventListener('change', showMatchs)
// triggers when something is being typed
searches.addEventListener('keyup', showMatchs)