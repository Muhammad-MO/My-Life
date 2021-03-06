const ingredients = document.getElementById('ingredients')
const submitBtn = document.getElementById('submit')
const recipeImg = document.createElement('img')
const recipeTitle = document.createElement('h4')
const recipeDiv = document.createElement('div')
let results;
// let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
// let userRecipes = JSON.parse(localStorage.getItem('recipes')) || []


// EVENT LISTENERS
submitBtn.addEventListener('click', e => {
    e.preventDefault();
    // Call spoonacular API and map results 
    findRecipesByIngredients(ingredients.value)
   
    //if(e.target.value === ""){

       // alert("You cannot leave this field empty. Please key in an ingredient")
    //}
    
    
})

document.body.addEventListener('click', e => {
 
    if (e.target.className === 'viewBtn') {
        console.log(e.target.id)
        e.preventDefault();
        findRecipe(e.target.id)
    }

  
})

ingredients.addEventListener('click', e => {
    // e.preventDefault();
    if (e.target.value === "") {
        ingredients.value = ""

        alert(" There will be no results unless you key in a valid ingredient before searching.")
    }
})







// FUNCTIONS

// map results to flat object
function mapResults(data) {
    results = data.map(x => ({
        title: x.title,
        image: x.image,
        id: x.id,

    }))

    // recipes.push(results)
    // localStorageSet("recipes", recipes)
}

function displayResults(data) {

    
    const section = document.querySelector("section")
    section.innerHTML = ''

    for (let i = 1; i < data.length; i++) {
            console.log("data[i]: ", data[i])
            // recipe title
            const title = recipeTitle.textContent = data[i].title
                // recipe title h4 tag
            const h2 = document.createElement('h2')
                // image
            const img = document.createElement('img')
                // section tag from HTML
                
            img.setAttribute('src', data[i].image)
            img.setAttribute('alt', data[i].title)
            h2.append(title)
            const button = document.createElement('button')
            button.textContent = 'Recipe'
            button.classList = "viewBtn"
            button.id = data[i].id
            section.append(h2)
            section.append(img)
            img.after(button)   

    }
}

function displayRecipe(obj, id) {

    const recipeRes = document.getElementsByClassName(id)
        // prevents recipe from being rendered more than once
    if (recipeRes.length) return

    const directions = obj.analyzedInstructions[0].steps.map(x => ({
            number: x.number,
            instruction: x.step,
            ingredients: x.ingredients,
            
        }))
        // console.log(directions)

    const title = obj.title;
    const div = document.createElement('div')
    div.classList = id
    const h2 = document.createElement('h2');

    const currentRec = document.getElementById(id)
    let p;

    h2.textContent = title;
    h2.textContent ="Ingredients:"
   
    
    
    div.append(h2)
     

    for (let i = 0; i < directions.length; i++) {

        p = document.createElement('p')

        const h3 = document.createElement('h3')
        const h4 = document.createElement('h4')

        console.log(directions[i])

        //const stepNumber = directions[i].number;
        //const instructions = directions[i].instruction;
        const ingredients = directions[i].ingredients;
        

        ingredients.forEach(x => h3.textContent =  x.name)
        

        //p.textContent = stepNumber + " . " + instructions
      
        div.append(h3, h4, p)
        
    }
    
       
    p.textContent = "Steps:"

   
    for (let i = 0; i < directions.length; i++) {

        p = document.createElement('p')

        const h3 = document.createElement('h3')
        const h4 = document.createElement('h4')

        console.log(directions[i])

        const stepNumber = directions[i].number;
        const instructions = directions[i].instruction;
        

    
        //const ingredients = directions[i].ingredients;
        

        //ingredients.forEach(x => h3.textContent = "Ingredients: " + x.name)
        
       
        p.textContent = stepNumber + " . " + instructions
      
        div.append(h3, h4, p)
    }





    currentRec.after(div)

}

// this is for testing only to be deleted after dploy//

// this is for testing only to be deleted after dploy//