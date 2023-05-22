import { createCountery, search, getCountryByCode, sort} from "./countryManagment.js";

export const declareEvent = () => {
    let searchLine = document.querySelector("#search");

    searchLine.addEventListener("input", () => {
        document.querySelector("#id_select").style.display = "block";
        search(searchLine.value);
    })

    let select = document.querySelector("#id_select");
    select.addEventListener("change", () => {
        let select_val = select.value;
        sort(select_val);
    })

    const links = document.querySelectorAll("nav #link a");

    links.forEach(item => {
        item.addEventListener("click", () => {
            let id = item.id;
            createCountery(id);
        })
    })
}
