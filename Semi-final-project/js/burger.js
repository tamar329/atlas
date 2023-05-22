export const declareBtns = () => {
  let burger_btn = document.querySelector("#burger_btn");
  let nav_open = document.querySelector("#nav_open");
  burger_btn.addEventListener("click",function(){
    //
    (nav_open.style.display != "block") ?  nav_open.style.display = "block" :  nav_open.style.display = "none";
  })
}