import CountryClass from "./countryClass.js";

let countries = [];
let countries_search = [];

export const showLoading = () => {
    document.querySelector("#id_loading").style.display = "block";
    document.querySelector("#id_row").style.display = "none";
}

export const hideLoading = () => {
    document.querySelector("#id_loading").style.display = "none";
    document.querySelector("#id_row").style.display = "flex";
}

export const getCountries = (data) => {
    countries = data;
}

export const createAllCountries = (_ar) => {
    hideLoading();
    // countries_search = [];
    document.querySelector("#id_row").innerHTML = "";
    _ar.forEach(item => {
        let country = new CountryClass("#id_row", item);
        country.previousRender();
    });
}

export const search = (_input) => {
    document.querySelector("#id_row").innerHTML = "";
    
    countries_search = countries.filter(item => (item.name.common).toLowerCase().includes(_input.toLowerCase()));
    if(countries_search.length != 0) {
        console.log(countries_search);
        createAllCountries(countries_search);
    } else {
        document.querySelector("#id_row").innerHTML = `
        <h2 class="text-center my-5 display-4" style="color:black;">No results have been found</h2>
        `
    }
    console.log(countries_search);
}

export const getCountryByCode = async (_code) => {
    let url = `https://restcountries.com/v3.1/alpha/${_code}`;
    let resp = await fetch(url);
    let data = await resp.json();
    return data[0];
}

export const getCountryNameByCode = async (_code) => {
    let item = await getCountryByCode(_code);
    return item.name.common;
}

export const createCountery = (_code) => {
    document.querySelector("#id_row").innerHTML = "";
    let country_ar = countries.filter(item => item.cca3 == _code);
    country_ar.forEach(item => {
        let country = new CountryClass("#id_row", item);
        country.render();
    })
}

export const sort = (_select) => {
    let sort_ar = [];
    console.log(_select,countries_search);
    if(_select == "population-rev") {
        if(countries_search.length == 0) {
            sort_ar = _.sortBy(countries, "population").reverse();
        } else {
            sort_ar = _.sortBy(countries_search, "population").reverse();
        }
    } else {
        console.log(countries_search);
        if(countries_search.length == 0) {
            sort_ar = _.sortBy(countries, _select);
        } else {
            sort_ar = _.sortBy(countries_search, _select);
        }
    }
    console.log(sort_ar);
    createAllCountries(sort_ar);
}