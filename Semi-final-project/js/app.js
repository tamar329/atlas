import { getCountries,createAllCountries } from "./countryManagment.js";
import { declareEvent } from "./declareEvents.js";
import { declareBtns } from "./burger.js";

// let countries = [];

const init = () => {
    doApi();
    declareEvent();
    declareBtns();
    AOS.init();
}

const doApi = async () => {
    let url = "https://restcountries.com/v3.1/all";

    let resp = await fetch(url);
    console.log("resp");
    let data = await resp.json();
    console.log(data);
    // countries = data;
    getCountries(data);
    createAllCountries(data);
}

init();