$(document).ready(function () {
    // TODO: make all important variables
    var pizzaSliceCount = 0;
    var catCount = 0;
    var priceToHireACat = 10;
    var weatherID = $("#api-cat")

    // Helper function that 
    function SaveData(newPizzaCount = 0, newCatCount = 0, newCatPrice = 10) {
        // Make new save data
        var newSave = {
            "pizzas": newPizzaCount,
            "cat_count": newCatCount,
            "hire_a_cat_price": newCatPrice
        }
        console.log(newSave)
        localStorage.setItem("defaultSave", JSON.stringify(newSave))

        pizzaSliceCount = newPizzaCount;
        $("#pizzaSliceCount").text(pizzaSliceCount);
        catCount = newCatCount;
        $("#catCount").text(catCount);
        priceToHireACat = newCatPrice;
        $("#hireACatCost").text(priceToHireACat);
    }


    // Check for saved data
    var saveData = JSON.parse(localStorage.getItem("defaultSave"));
    console.log("saveData: ");
    console.log(saveData);

    // If none, create empty save data
    if (saveData == null) {
        console.log("empty!")
        // Make new save data
        SaveData();
    }

    $("#saveBtn").click(function () {
        SaveData(pizzaSliceCount, catCount, priceToHireACat);
    })

    // TODO: make Reset button event listener
    $("#resetBtn").click(function () {
        SaveData();
    })

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
    const APIkey = "43d3ce9a4d6be02e5f3dbc9ba49a17b0"
    var apiURL = 'http://api.openweathermap.org/geo/1.0/direct?q={cityName}&limit=5&units=imperial&appid=' + APIkey;
    var weatherAPI = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=imperial&appid=" + APIkey;

    function showWeather(weatherID) {
        var validURL = apiURL.replace("{cityName}", weatherID);

        $.ajax({
            url: validURL,
            method: 'GET',
            success: function (response) {
                // Handle the API response here
                console.log(response);
                var json = JSON.parse(JSON.stringify(response));
                getWeather(json[0].lat, json[0].lon)
            },
            error: function (xhr, status, error) {
                // Handle errors here
                // console.error(status, error);
            }
        })
    }
    function getWeather(lat, lon) {
        var currentAPI = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=imperial&appid=" + APIkey;
        var currentURL = currentAPI.replace("{lat}", lat);
        var currentURL = currentURL.replace("{lon}", lon);
        $.ajax({
            url: currentURL,
            method: 'GET',
            success: function (response) {
                console.log(response)
            },
            error: function (xhr, status, error) {
                // Handle errors here
                console.error(status, error);
            }
        });
    }
    showWeather(weatherID)
});

//Every 1 second, pizza slices should increase based on # of cats (Adjoa)
//Every 1 minute (arbitrarily longer amount of time), check the value of [Pizza Company] stocks, print that number somewhere beneath the Pizza button
//Every 1 minute (arbitrarily longer amount of time) check the weather in Italy or something, print the current temperature somewhere beneath the Pizza button
//Reset button should create a modal that asks if you're REALLY sure you wanna lose your save data (pizza count and cat-count)