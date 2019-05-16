function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
$(document).ready(function(){
    var queryURL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + getUrlParameter("Id") 
    console.log(queryURL)
    getResponse(queryURL)
})
function getResponse(queryURL){
    $.ajax({
        url: queryURL
        ,
        method: "GET" 
      }).then(function(response) {
        console.log(queryURL)
        console.log(response)
        var meal = response.meals[0]
        var recipeImg = response.strMealThumb
        var recipeName = response.meals[0].strMeal
        console.log(response.meals[0].strMeal)
        $("#recipeName").append(recipeName)
        var ingredientbox = $("<button class='buttoncolor secondarycolor roundedcorners px-3 py-1 border-0 m-1'>" +  + "</button>")
        console.log("ingredientbox: " + ingredientbox)
        var recipebox = $("<div class='mt-2 mb-4 roundedcorners tittlefont'>")
        // recipebox.append(`<div>${meal.strInstructions.split(",")}`)
        console.log(recipebox)
        console.log(recipebox.html())
        var Instructions = meal.strInstructions
        console.log(Instructions.split("."))
        var selectedrecipe = Instructions.split(".")
        // console.log(InstructionsArray)
        
        var ingredients = []
        var measure = []
        for (i=1;i<20;i++){
            if (meal["strIngredient" + i]){
                ingredients.push(meal["strIngredient" + i])
            }
        }
        for (i=1;i<15;i++){
            if (meal["strMeasure" + i]){
                measure.push(meal["strMeasure" + i])
            }
        }
         for (i=0;i<ingredients.length;i++){
            $("#ingredientsList").append(`<button id="ing" class=" buttonfont secondarycolor buttoncolor border-0 roundedcorners px-3 mt-2 mx-2 ">${measure[i]}<label class="text-muted mb-0 ml-2">${ingredients[i]}</label></button>`)
        }
        // $("#ing").addClass("font-weight-bold")
        $("#recipeList").append(recipebox)
        $("#recipeImage").attr("src",meal.strMealThumb)
        $(".finishedBtn").on("click",function(){
        $("#finishedLink").attr("href",`../html/Congratulations.html?name=${meal.strMeal}`)
        })

        for(var i=0; i< selectedrecipe.length-1; i++){
            // recipebox = add.("<div class='my-4'>")
            var topbox =$("<div>")
            var stepnumber = i+1
            topbox.append("<div class='step" + stepnumber + " leftfloat secondarycolor subtitlefont'> STEP " + stepnumber +"</div>")
            topbox.append("<div class='checkbttn' data-value='"+ stepnumber + "'><i class='far rightfloat fa-square secondarycolor'></i></div>")
            recipebox.append(topbox)
            recipebox.append("<br>")
            recipebox.append("<div class='step"+stepnumber+" secondarycolor mb-3 lineheight my-1 textfont'>" + selectedrecipe[i] + "</div>")
            $("#recipelist").append(recipebox)
        }

        $(".checkbttn").on("click", function () {
                var number = parseInt(($(this).attr("data-value")))
                console.log (number)
                console.log (selectedrecipe.length-1)
                if (number === selectedrecipe.length-1){
                    console.log("you did it")
                    window.location.replace("congratulations.html")
                }
                else{
                    var graymachine = "step"+ ($(this).attr("data-value"))
                    console.log(graymachine)
                    $("."+graymachine).removeClass("secondarycolor")
                    $("."+graymachine).addClass("fadedcolor")
                    $(this).empty()
                    $(this).html("<i class='far fa-check-square rightfloat fadedcolor'></i>")
                }
        });
    });
};