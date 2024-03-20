
//guide.addEventListener("click", function() {
//    window.location.replace("./Project-LANTA/guide.html");
//});

// add return button event?
// add reset button function + event

$(document).ready(function () {
    // TODO: make all important variables
    var pizzaSliceCount = 0;
    var catCount = 0;
    var priceToHireACat = 10;

    var defaultSave = {
        "pizzaSliceCount": 0,
        "catsHiredCount": 0
    }
    localStorage.setItem("defaultSave", JSON.stringify(defaultSave));

    // TODO: make Reset button event listener
    $("#resetButton").click(function () {
        var reset = defaultSave
        localStorage.setItem("defaultSave", JSON.stringify(defaultSave));

    })

    $("#savebtn").click(function () {
        var newSave = {
            "pizzas": pizzaSliceCount,
            "cat count": catCount,
        }
        console.log(newSave)
        localStorage.setItem("defaultSave", JSON.stringify(newSave))
        // defaultSave = pizzaSliceCount
        // catsHiredCount
    })
    // TODO: Check for saved data
    var saveData = JSON.parse(localStorage.getItem("defaultSave"));
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
    $("#pizzaButton").click(function () {
        pizzaSliceCount += 1;
        $("#pizzaSliceCount").text(pizzaSliceCount);
        if (pizzaSliceCount >= 10) {
            $("#hireACat").show();
        }
    });

    // TODO: Create hire cat button listener
    // Don't hire a cat if you can't afford one
    $("#hireACat").click(function () {
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
