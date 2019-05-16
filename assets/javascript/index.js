var x = 0
function randomIntFromInterval(){
    x = Math.floor(Math.random()*(80-2)+1);
    console.log (x)
}



$(document).ready(function(){
    var queryURL =  "https://www.themealdb.com/api/json/v1/1/filter.php?i=" 
    getResponse(queryURL)
    console.log(queryURL)
})
function getResponse(queryURL){
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        // console.log(queryURL)
        firstResponse = response.meals.length
        for (i=0;i<5;i++){
            randomIntFromInterval()
            let id = response.meals[x].idMeal
            console.log("id: " + id)
            let id_url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i="+ id
            getDetails(id_url)
            console.log("id_url: " + id_url)
        }
      })
    //   .catch(function(){
    //       $("#searchresults").append($("<div class='roundedcorners box m-3 p-2 bg-light text-center mx-auto secondarycolor'>"))
    //       $(".box").text('Sorry, we did not find anything for that search request. Please try a different ingredient.')
    //       $(".box").append('<a href="../html/recipesearch.html"><button class="goBack secondarycolor roundedcorners  p-2 btn btn-lg text-center mt-2 p-1 mx-auto titlefont bg-light">Go back</button>')
    //     })
}

function getDetails(id_url){
    $.ajax({
        url: id_url,
        method: "GET"
    }).then(function(response){
        var secondResponse = response.meals[0]
        console.log("secondResponse: ") 
        console.log(secondResponse)
        var recipeName = secondResponse.strMeal
        console.log("recipeName: "+recipeName)
        var recipeCategory = secondResponse.strCategory
        console.log("recipeCatagory" + recipeCategory)
        var recipeArea = secondResponse.strArea
        console.log("recipeArea:" + recipeArea)
        var recipeImg = secondResponse.strMealThumb
        console.log("recipeImg: " + recipeImg)
        var recipeInstructions = secondResponse.strInstructions
        console.log("recipeInstructions: " + recipeInstructions)

    //RENDER OPTIONS//

        var row = $("<div class='row mx-0 favorite mb-4 roundedcorners my-3 p-3 bg-light secondarycolor'></div>")
        var col = $("<div class='col-6 pl-0 favorite'></div>")
        row.append(col)
        col.append("<img class='favoriteImg roundedcorners2' src=" + recipeImg +">")
        var col2 = $("<div class='col-6'></div>")
        col2.append("<div class='row'><div class='col-12 secondarycolor buttonfont recipename mt-1 muli'>" + recipeName + "</div></div>")
        col2.append("<div class='row'><div class='col-12 secondarycolor buttonfont mt-1 muli recipename'>" + recipeArea + " • " + recipeCategory + "</div></div>")
        row.append(col2)
        col2.append("<div class='row'><div class='col-12 secondarycolor buttonfont mt-1 recipetitle muli'>RECIPE</div></div>")
        row.append(col2)
        col2.append("<div class='row'><div class='col-12 secondarycolor instructions mt-1 muli'>" + recipeInstructions + "</div></div>")
        row.append(col2)
        var cookrow = $("<div class='row'></div>")
        var cookcol = $("<div class='col-12'></div>")
        cookcol.append(`<a id='cookBtn' href='html/recipe.html?Id=${secondResponse.idMeal}'> <button class='secondarycolor muli buttonfont blueline py-1 px-2 floatright mt-3 roundedcorners'>COOK</button></a>`)
        cookrow.append(cookcol)
        col2.append(cookrow)
        row.append(col2)
        $("#recentfavorites").append(row)
    })
}

function renderFavorite(){
   
}

