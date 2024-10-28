// Search By Name  https://www.themealdb.com/api/json/v1/1/search.php?s=name
// Search By First Letter  https://www.themealdb.com/api/json/v1/1/search.php?f=letter
// List Categories  https://www.themealdb.com/api/json/v1/1/categories.php
// List Areas  https://www.themealdb.com/api/json/v1/1/list.php?a
// List Ingredients  https://www.themealdb.com/api/json/v1/1/list.php?i
// Filter By Category  https://www.themealdb.com/api/json/v1/1/filter.php?c=category
// Filter By Area  https://www.themealdb.com/api/json/v1/1/filter.php?a=area
// Filter By Ingredient  https://www.themealdb.com/api/json/v1/1/filter.php?i=ingredient
// Search By Id  https://www.themealdb.com/api/json/v1/1/lookup.php?i=id




var recipesLists = Array.from(document.querySelectorAll(".item img"))
var boxModel = document.getElementById("boxModal")
var innerBox = document.getElementById("innerBox")
var closeEl = document.getElementById("close")
// let zoom = document.getElementById("zoom")
let homePage = document.getElementById("Home")
let categoresPage = document.getElementById("categoryPage")
let search = document.getElementById("search")
let Area = document.getElementById("area")
let Ingredients = document.getElementById("ingredients")
let categores = document.getElementById("categores")
let categoresImg = document.getElementById("catImg")
let contact = document.getElementById("contact")
let loader = document.getElementById("loader")
var currentIndex = -1
// let recipesList = []
// let categoriesList = []



// sliderNavBard _________________________________________________________
function toggleSidebar() {
  $("#sildeBar").css("left", "-300px");
  $("#navIconOpen").css("display", "block");
  $("#navIconClose").css("display", "none");
}
$("#navList li").click(toggleSidebar)

$("#navIconOpen").click(function () {
  $("#sildeBar").css("left", "0px");
  $("#navIconOpen").css("display", "none");
  $("#navIconClose").css("display", "block");
  $(".open ul li").css("bottom", "0px");
})
$("#navIconClose").click(function () {
  $("#sildeBar").css("left", "-300px");
  $("#navIconOpen").css("display", "block");
  $("#navIconClose").css("display", "none");
  $(".open ul li").css("bottom", "-100px");
})

// ________________________________________________________________________

async function getHomeData() {

  let homeRos = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
  let Data = await homeRos.json()
  homeData(Data.meals)
$(loader).css('display', 'none')


}
getHomeData()

function homeData(recipes) {
  let temp = ""
  for (let i = 0; i < recipes.length; i++) {
    temp += `
    <div class="col-lg-3 mt-5 " id="Home">
    <div class="item position-relative overflow-hidden  rounded-3 " onclick="resDetalis(${recipes[i].idMeal})">
      <img src="${recipes[i].strMealThumb}" class="w-100" alt="">
      <div class="layer d-flex justify-content-center align-items-center">
        <ul class="list-unstyled">
          <li>
            <i class="fa-solid fa-magnifying-glass-plus fa-2x" id="zoom" onclick="zoomIn()"></i>
          </li>
          <li>
            <p id="ingredianc" class="fa-2x">${recipes[i].strMeal}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
    `

  }

  document.getElementById("myData").innerHTML = temp
}
async function resDetalis(id) {
  $(loader).css('display', 'flex')
  let data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
  let result = await data.json()
  mealsDetalis(result.meals[0])
  $(loader).css('display', 'none')
}


// search page____________________________________________________________________________________ 
function displayData() {
  document.getElementById("myData").innerHTML = "";
  let data = `      <div class="mt-3 d-flex justify-content-center align-content-center min-vh-100 w-100">
  <div class="row">
  <div class="col-lg-6"><input type="password" class="input-group input-group-text w-100 form-control"></div>
  <div class="col-lg-6"><input type="password" class="input-group input-group-text w-100 form-control"></div>
  </div>
  </div>
`
  document.getElementById("myData").innerHTML = data
}
$(search).click(function () {
  displayData()
})
//__________________________________________________________________________________________



// categoresPage _________________________________________________________________________
async function getCategoresData() {
  let CategoresRos = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
  let CategoresData = await CategoresRos.json()
  $(loader).css('display', 'none')
  return CategoresData
  
}


categores.addEventListener("click", async function () {
  let data = await getCategoresData()
  categoresData(data.categories)
  $(loader).css('display', 'none')
}
)


function categoresData(categoData) {
  let data = ""
  document.getElementById("myData").innerHTML = "";
  for (let i = 0; i < categoData.length; i++) {
    data += `
  <div class="col-lg-3 mt-5">
  <div class="item position-relative overflow-hidden  rounded-3 ">
    <img src="${categoData[i].strCategoryThumb}" class="w-100" alt="" id="catImg">
    <div class="layer d-flex justify-content-center align-items-center bg-black">
      <ul class="list-unstyled">
        <li>
          <i class="fa-solid fa-magnifying-glass-plus fa-2x text-white" id="zoom"></i>
        </li>
        <li>
          <p id="ingredianc" class="fa-2x text-white">${categoData[i].strCategory}</p>
        </li>
      </ul>
    </div>
  </div>
</div>
  `
  }
  document.getElementById("myData").innerHTML = data
}
// ________________________________________________________________________________________________
// area
async function getAreaData() {
  let areaRos = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a")
  let showAreaData = await areaRos.json()
  return showAreaData
}

Area.addEventListener("click", async function () {
  let data = await getAreaData()
  showAreaData(data.meals)
  $(loader).css('display', 'none')
})

function showAreaData(areaPra) {
  document.getElementById("myData").innerHTML = "";
  let gata = ""
  for (let i = 0; i < areaPra.length; i++) {
    gata += `    <div class="col-lg-3  text-center text-capitalize rounded-3 mt-3"> 
     <div class="item bg-black h-100 rounded-2">
    <i class="fa-solid fa-house w-100 fs-1 p-5 text-white" id="icon"></i>
    <h4 class="h1 text-white">${areaPra[i].strArea}</h4> 
    </div> 
    </div> 
    `
  }
  document.getElementById("myData").innerHTML = gata
}
// ____________________________________________________
// Ingredients
async function getIngredientsData() {
  let IngredientsRos = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i")
  let ingredientsData = await IngredientsRos.json()
  $(loader).css('display', 'none')
  return ingredientsData
}

Ingredients.addEventListener("click", async function () {
  let data = await getIngredientsData()
  ingredientsData(data.meals)
  $(loader).css('display', 'none')
})

function ingredientsData(ingData) {
  let temp = ""
  document.getElementById("myData").innerHTML = "";
  for (let i = 0; i < 20; i++) {
    temp += `      <div class="col-lg-3  text-center text-capitalize rounded-3 mt-3">
<div class="item bg-black h-100 rounded-2">  <i class="fa-solid fa-house w-100 fs-1 p-5 text-white" id="icon"></i>
<h4 class="h1 text-white">${ingData[i].strIngredient}</h4> </div>
  </div>`
  }
  document.getElementById("myData").innerHTML = temp
}

// details ________________________________________________________________
async function mealsDetalis(meals) {
  let temp = ""
  for (let i = 1; i < 20; i++) {

    if (meals[`strMeasure${i}`] != " ") {
      temp += `<span class=" bg-info badge">
      ${(meals[`strMeasure${i}`] + " " + meals[`strIngredient${i}`])}
    </span>`;
    }

  }
  console.log(meals);
  document.getElementById("myData").innerHTML = `<div class="col-5">
  <div class="p-3">
  
  <img src="${meals.strMealThumb}" class="w-100 rounded-3">
  <h2>${meals.strMeal}</h2>
</div>
</div>
<div class="col-7 ">
  <h3 class="h1">Instructions</h3>
  <p class="">${meals.strInstructions}</p>
  <h4>Area : <span>${meals.strArea}</span></h4>
  <h4>Category : <span>${meals.strCategory}</span></h4>
  <div class="d-flex gap-2 align-items-center">
    <h4>Recipes : </h4> <span>${temp}</span>
  </div>
  <div class="d-flex gap-2 align-items-center">
    <h4>Tags : </h4>
    ${((meals.strTags != null) ? meals.strTags.split(' ,').map((x) => `<span class=" bg-info-subtle badge ">${x}</span>`).join() : '')}
  </div>

  <div>
    <a href="${meals.strSource}" class="btn btn-info " target="blank">source</a>
    <a href="${meals.strYoutube}" class="btn btn-danger" target="blank">youtube</a>
  </div>
</div>`;

}


// contact page____________________________________________________________________________________ 

// vali 
let nameReg = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/
let emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
let phoneReg = /^[0]?[0-5]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{5}$/
let ageReg = /^[0-9]{2}$/
let passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
// let rePasswordReg = password
function contentUs() {
  document.getElementById("myData").innerHTML = "";
  let data = `      <div class="d-flex col-10 offset-1 justify-content-center align-items-center min-vh-100"><div class="row g-1">
  <div class="col-lg-6"><input type="text" class="input-group input-group-text text-start w-100 form-control" id="nameInput" placeholder="Enter Your Name">
    <div class="alert-danger alert mt-1 d-block"><h6>Enter valid Name</h6></div>
  </div>
  <div class="col-lg-6"><input type="email" class="input-group input-group-text text-start w-100 form-control" id="emailInput" placeholder="Enter Your Email">
  <div class="alert-danger alert mt-1 d-block"><h6>Enter valid Name</h6></div>
  </div>
  <div class="col-lg-6"><input type="text" class="input-group input-group-text text-start w-100 form-control" id="numberInput" placeholder="Enter Your Number">
    <div class="alert-danger alert mt-1 d-block"><h6>Enter valid Name</h6></div>
  </div>
  <div class="col-lg-6"><input type="number" class="input-group input-group-text text-start w-100 form-control" id="ageInput" placeholder="Enter Your Age">
    <div class="alert-danger alert mt-1 d-block"><h6>Enter valid Name</h6></div>
  </div>
  <div class="col-lg-6"><input type="password" class="input-group input-group-text text-start w-100 form-control" id="passwordInput" placeholder="Create Your Password">
    <div class="alert-danger alert mt-1 d-block"><h6>Enter valid Name</h6></div>
  </div>
  <div class="col-lg-6"><input type="password" class="input-group input-group-text text-start w-100 form-control" id="rePasswordInput" placeholder="RE-Enter Your Password">
    <div class="alert-danger alert mt-1 d-block"><h6>Enter valid Name</h6></div>
  </div>
<button type="submit" class="btn btn-light w-25 m-auto mt-3" id="btnSub">Submit</button>
</form>
</div>
</div> `
  document.getElementById("myData").innerHTML = data
  let btnSub = document.getElementById("btnSub")
  $(btnSub).click(function(){console.log(nameInput);})
  let nameInput = document.getElementById('nameInput').value
let emailInput = document.getElementById('emailInput')
let numberInput = document.getElementById('numberInput')
let ageInput = document.getElementById('ageInput')
let passwordInput = document.getElementById('passwordInput')
let rePasswordInput = document.getElementById('rePasswordInput')
 console.log(nameInput);
}

$(contact).click(function () {
  contentUs()
})



// //__________________________________________________________________________________________
