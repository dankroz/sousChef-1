// Variables to store the users choice
var areaChosen 
var categoryChosen

//Variables to keep track of clicked buttons

var area = false
var category = false
  
//Click function for ctrecipebuttons
$(".arrecipebttn").on("click", function () {
    //var to check the value of clicked
     var clicked = $(this).attr("clicked")
        // console.log(clicked)
            if (area === false){

                if (clicked === "off"){
                    // CHANGE CLICKED FROM OFF TO ON
                    $(this).attr("clicked", "on");

                    // ADD THE X
                    // Create a Div to hold the x
                    var xdiv = $("<img class='ml-2 xarbutton' src=../assets/Images/x.png>")
                    // append xdiv to html
                    $(this).append(xdiv)

                    //CHANGE THE BUTTON'S COLOR
                    //Remove current color
                    $(this).removeClass("secondarycolor buttoncolor pr-3")
                    //Add new color
                    $(this).addClass("clickedcolors")

                    area = true;

                    //Add the choice to the variable
                    areaChosen = $(this).attr("value")
                    console.log(areaChosen)
                }
            }
            else{
                if (clicked === "on"){
                    //CHANGE CLIKED FROM ON TO OFF
                    $(this).attr("clicked", "off");

                    //REMOVE THE X
                    $(".xarbutton").remove()

                    //CHANGE COLORS BACK
                    //remove current colors
                    $(this).removeClass("clickedcolors")
                    //add original colors
                    $(this).addClass("secondarycolor buttoncolor pr-3")

                    //remove from dr
                    area = false

                    //remove choice from variable
                    areaChosen = ""
                    console.log(areaChosen)
                }
            }
            userSearchInfo();

});  
          
//Click function for ctrecipebuttons
    $(".ctrecipebttn").on("click", function () {
        //var to check the value of clicked
        console.log("hello")
            var clicked = $(this).attr("clicked")
            // console.log(clicked)
            if (category === false){

                if (clicked === "off"){
                    // CHANGE CLICKED FROM OFF TO ON
                    $(this).attr("clicked", "on");

                    // ADD THE X
                    // Create a Div to hold the x
                    var xdiv = $("<img class='ml-2 xctbutton' src=../assets/Images/x.png>")
                    // append xdiv to html
                    $(this).append(xdiv)

                    //CHANGE THE BUTTON'S COLOR
                    //Remove current color
                    $(this).removeClass("secondarycolor buttoncolor pr-3")
                    //Add new color
                    $(this).addClass("clickedcolors")

                    //add to dr
                    category = true;

                    //Add the choice to the variable
                    categoryChosen = $(this).attr("value")
                      
                }
            }
            else{
                if (clicked === "on"){
                    //CHANGE CLIKED FROM ON TO OFF
                    $(this).attr("clicked", "off");

                    //REMOVE THE X
                    $(".xctbutton").remove()

                    //CHANGE COLORS BACK
                    //remove current colors
                    $(this).removeClass("clickedcolors")
                    //add original colors
                    $(this).addClass("secondarycolor buttoncolor pr-3")

                    //remove from dr
                    category = false;

                    //remove choice from variable
                    categoryChosen = ""
                }
            }
        userSearchInfo()

});
      

function userSearchInfo(){

 var userInput = $("#userInput").val();
 $("#submitURL").attr("href", `../html/SearchResult.html?Ingredient=${userInput}&Area=${areaChosen}&Category=${categoryChosen}`)
 }