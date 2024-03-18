//guide.addEventListener("click", function() {
//    window.location.replace("./Project-LANTA/guide.html");
//});

// add return button event
// add start button function + event
// add reset button function + event

$(document).ready(function () {
    // TODO: make all important variables
    var pizzaSliceCount = 0;
    var catCount = 0;
    var priceToHireACat = 10;

    // TODO: make Reset button event listener

    
    // TODO: Check for saved data
    var saveData = JSON.parse(localStorage.getItem("saveData") || "[]");

    // TODO: If none, create empty save data
    if (saveData == null || saveData == []) {
        // Make new save data
    }

    // TODO: Create pizza button listener
    pizzaSliceCount += 1;

    // TODO: Create hire cat button listener
    // Don't hire a cat if you can't afford one
    if (pizzaSliceCount < priceToHireACat) {
        // return
    }
    catCount += 1;
    pizzaSliceCount -= priceToHireACat;
    priceToHireACat *= 1.5;


    // TODO: Create event that happens every second
    if (pizzaSliceCount >= 10) {
        // Reveal "hire a cat" button
        
    }
});