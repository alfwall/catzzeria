
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
    var saveData = JSON.parse(localStorage.getItem("saveData"));
    console.log("saveData: ");
    console.log(saveData);
    // TODO: If none, create empty save data
    if (saveData == null) {
        console.log("empty!")
        // Make new save data
        $("#hireACat").hide();
        $("#catCountLabel").hide();
    }

    // TODO: Create pizza button listener
    $("#pizzaButton").click(function(){
        pizzaSliceCount += 1;
        $("#pizzaSliceCount").text(pizzaSliceCount);
        if (pizzaSliceCount >= 10) {
            $("#hireACat").show();
        }
    });

    // TODO: Create hire cat button listener
    // Don't hire a cat if you can't afford one
    $("#hireACat").click(function() {
        if (pizzaSliceCount < priceToHireACat) {
            return;
        }
        pizzaSliceCount -= priceToHireACat;
        $("#pizzaSliceCount").text(pizzaSliceCount);
        catCount += 1;
        $("#catCount").text(catCount);
        $("#catCountLabel").show();
        priceToHireACat *= 1.5;
        priceToHireACat = Math.floor(priceToHireACat);
        $("#hireACatCost").text(priceToHireACat);
    });


    // TODO: Create event that happens every second
    if (pizzaSliceCount >= 10) {
        // Reveal "hire a cat" button
        
    }
});
