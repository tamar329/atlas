import { getCountryByCode, getCountryNameByCode, createCountery } from "./countryManagment.js";

export default class CountryClass {
    constructor(_parent, _item) {
        this.parent = _parent;
        this.code = _item.cca3  ? _item.cca3 : "";
        this.name = _item.name.common;
        this.population = Number(_item.population).toLocaleString();
        this.region = _item.continents;
        this.languages = _item.languages ? Object.values(_item.languages).join() : "no information";
        this.coin = _item.currencies ? Object.keys(_item.currencies).join() : "no information";
        this.capital = _item.capital ? _item.capital : "No information";
        this.flag = _item.flags.png;
        this.borders = _item.borders? _item.borders : "No information" ;
        this.map = _item.latlng;
    }

    render() {
        let div = document.createElement("div");
        document.querySelector(this.parent).append(div);
        div.className = "card_single_country_one card my-3 p-0 col-lg-10 col-md-12 col-10";
        div.innerHTML = `
        <div class="card_single_country d-md-flex">
            <div class="col-md-6 col-12 pt-2 pe-md-0 pe-2 d-flex align-items-start d-md-block" id="details">
                <div class="ps-2 col-md-12 col-7"> 
                    <h1>${this.name}</h1>
                    <h5>Population: ${this.population}</h5>
                    <h5>Region: ${this.region}</h5>
                    <h5>Languages: ${this.languages}</h5>
                    <h5 id="id_borders">Borders: </h5>
                </div>
                <div class="flag col-md-10 col-5 mx-md-auto me-2 overflow-hidden shadow">
                    <img class="col-12" src="${this.flag}" alt="${this.name} flag">
                </div>
            </div>
            <div class="maps col-md-6 col-12 p-0 m-0">
                <iframe src="https://maps.google.com/maps?q=${this.map[0]},${this.map[1]}&z=6&ie=UTF8&iwloc=&output=embed" 
                frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
            </div>
        </div>
        `
        if(this.borders != "No information") {
            this.borders.forEach(async (item) => {
                let name = await getCountryNameByCode(item);
                let link = document.createElement("a");
                document.querySelector("#id_borders").append(link);
                link.style = "cursor: pointer; color:rgb(63, 207, 207); text-decoration: dashed;"
                link.innerHTML = name + " ";
                console.log(name);
                link.addEventListener("click", () => {
                    createCountery(item)
                });
            })
        } else {
            document.querySelector("#id_borders").innerHTML = `Borders: ${this.borders}`
        }
    }

    previousRender() {
        let div = document.createElement("div");
        document.querySelector(this.parent).append(div);
        div.className = "col-lg-4 col-md-6 col-10 my-4";
        div.innerHTML =
            `<div class="card_of_home card mx-0" data-aos="fade-up"data-aos-duration="1000">
            <img src=${this.flag} style="height:200px; border-radius:8px;">
            <h3 id="name" class="text-center m-2">${this.name}</h3>
            <div class="overlay">
                <div class="text col-12">
                    <h2 style="font-size: 45px;">${this.name} </h2>
                    <h4>Region: <span style="font-weight: lighter;">${this.region}</span></h4>
                    <h4>Population: <span style="font-weight: lighter;">${this.population}</span></h4>
                </div>
            </div>             
            </div>
        `

        div.addEventListener("click", function () {
            document.querySelector(this.parent).innerHTML = "";
            document.querySelector("#id_select").style.display = "none";
            this.render();
        }.bind(this))
    }
}