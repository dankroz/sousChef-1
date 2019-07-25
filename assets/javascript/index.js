var x = 0
function randomIntFromInterval() {
    x = Math.floor(Math.random() * (80 - 2) + 1);
    console.log(x)
}



$(document).ready(function () {
    var queryURL = "https://www.themealdb.com/api/json/v1/1/filter.php?i="
    getResponse(queryURL)
    console.log(queryURL)
})
function getResponse(queryURL) {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // console.log(queryURL)
        firstResponse = response.meals.length
        for (i = 0; i < 5; i++) {
            randomIntFromInterval()
            let id = response.meals[x].idMeal
            console.log("id: " + id)
            let id_url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
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

function getDetails(id_url) {
    $.ajax({
        url: id_url,
        method: "GET"
    }).then(function (response) {
        var secondResponse = response.meals[0]
        console.log("secondResponse: ")
        console.log(secondResponse)
        var recipeName = secondResponse.strMeal
        console.log("recipeName: " + recipeName)
        var recipeCategory = secondResponse.strCategory
        console.log("recipeCatagory" + recipeCategory)
        var recipeArea = secondResponse.strArea
        console.log("recipeArea:" + recipeArea)
        var recipeImg = secondResponse.strMealThumb
        console.log("recipeImg: " + recipeImg)
        var recipeInstructions = secondResponse.strInstructions
        console.log("recipeInstructions: " + recipeInstructions)

        //RENDER OPTIONS//

        var row = $("<div class='row mx-0 favorite mb-4 roundedcorners my-3 py-3 pl-3 pr-1 bg-light secondarycolor'></div>")
        var col = $("<div class='col-5 col-sm-6 pl-0 favorite'></div>")
        row.append(col)
        col.append("<img class='favoriteImg roundedcorners2' src=" + recipeImg + ">")
        var col2 = $("<div class='col-7 col-sm-6'></div>")
        col2.append("<div class='row'><div class='col-12 secondarycolor buttonfont recipename mt-1 muli'>" + recipeName + "</div></div>")
        col2.append("<div class='row'><div class='col-12 secondarycolor buttonfont mt-1 muli recipename fit'>" + recipeArea + " • " + recipeCategory + "</div></div>")
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

function renderFavorite() {

}



var config = {
    apiKey: "AIzaSyAxtAWMHjPjjEdZ1gVoGVeSF8i-mdEN9IE",
    authDomain: "project-one-74297.firebaseapp.com",
    databaseURL: "https://project-one-74297.firebaseio.com",
    projectId: "project-one-74297",
    storageBucket: "project-one-74297.appspot.com",
    messagingSenderId: "1057793714147"
};
firebase.initializeApp(config);

var auth = firebase.auth();
var db = firebase.firestore();

$("#closeBtn").on("click", (e) => {
    $(".modal").hide();
})

//hides & shows log in & log buttons depending on if user is logged in or out


//setup guides from firebase, pulling information
var setupGuides = (data) => {

    if (data.length) {
        data.forEach(doc => {
            const favorites = $("<div>").text(doc.data().name);
            console.log(favorites);
            $("#please").append(favorites);
        });
    } else {
        $("#connect").empty();
        $("#connect").append("login to review guides")
    }
}

//click on username when logged in, go to account page
$("#accountBtn").on("click", (e) => {
    window.open("html/userAccount.html");
});

$("#logo").on("click", (e) => {
    window.open("../index.html");
})



$("DOMContentLoaded", function () {
    console.log("hi")
    var modals = $(".modal");
    //initialize the modals
    M.Modal.init(modals);

    const setupUI = (user) => {
        if (user) {
            db.collection("users").doc(user.uid).get().then(res => {
                $("#accountBtn").append("Welcome Back " + res.data().name);
            })

            $(".logged-in").show();
            $(".logged-out").hide();
        } else { 
            $(".logged-in").hide();
            $(".logged-out").show();
        }
    }

    //checking to see if the user is logged in or not then displaying guides if they are
    auth.onAuthStateChanged(user => {
        if (user) {
            db.collection("favorites").onSnapshot(snapshot => {
                setupGuides(snapshot.docs)
                setupUI(user);
            })
        } else {
            setupUI()
            setupGuides([]);
        }
    });

    //creating a user
    $("#signup-button").on("click", (e) => {
        function registrationPage() {
            window.open("html/Registration.html")
        }

        registrationPage();
    });

    $("#submitBtn").on("click", (e) => {
        e.preventDefault();

        var email = $("#signup-email").val()
        var password = $("#signup-password").val();

        console.log(email);
        console.log(password);

        auth.createUserWithEmailAndPassword(email, password).then(cred => {
            return db.collection("users").doc(cred.user.uid).set({
                name: $("#name").val(),
                foods: $("#favFoods").val(),
                favorites: ""
            });
        }).then(() => {
            userAccount();
        })
        function userAccount() {
            window.open("../index.html")
        }
    });

    // logout
    $("#logout-button").on("click", (e) => {
        e.preventDefault();
        firebase.auth().signOut().then(() => {
            console.log("user signed out");
        });
    });

    // login
    $("#button-login").on("click", (e) => {
        e.preventDefault();

        //get user info
        var email = $("#login-email").val();
        var password = $("#login-password").val();

        auth.signInWithEmailAndPassword(email, password).then(cred => {
            console.log(cred.user);

            //close the login modal and reset the form
            var modal = $("#modal-login");
            M.Modal.getInstance(modal).close();
            // loginForm.reset();

            function myFunction() {
                window.open("html/userAccount.html");
            }

            myFunction()
        });
    });

});
