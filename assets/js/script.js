$(document).ready(function () {
    // TODO: make all important variables
    var pizzaSliceCount = 0;
    var catCount = 0;
    var priceToHireACat = 10;

    // Helper function that 
    function SaveData(newPizzaCount = 0, newCatCount = 0, newCatPrice = 10) {
        console.log("SAVING!!");
        // Make new save data
        var newSave = {
            "pizzas": newPizzaCount,
            "cat_count": newCatCount,
            "hire_a_cat_price": newCatPrice
        };
        console.log(newSave);
        localStorage.setItem("defaultSave", JSON.stringify(newSave));

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
    // If none, create empty save data
    if (saveData == null) {
        console.log("NEW SAVE!!")
        // Make new save data
        SaveData();
    }
    
    saveData = JSON.parse(localStorage.getItem("defaultSave"));
    pizzaSliceCount = saveData["pizzas"];
    $("#pizzaSliceCount").text(pizzaSliceCount);
    catCount = saveData["cat_count"];
    $("#catCount").text(catCount);
    priceToHireACat = saveData["hire_a_cat_price"];
    $("#hireACatCost").text(priceToHireACat);
    console.log("HIREACAT: " + $("#hireACatCost").text())


    $("#saveBtn").click(function () {
        SaveData(pizzaSliceCount, catCount, priceToHireACat);
    })

    $("#resetBtn").click(function () {
        SaveData();
    })

    $("#pizzaBtn").click(function () {
        pizzaSliceCount += 1;
        $("#pizzaSliceCount").text(pizzaSliceCount);
        if (pizzaSliceCount >= 10) {
            $("#hireACat").show();
        }
    });


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

    let intervalID;
    if (!intervalID) {
        intervalID = setInterval(getSlice, 1000);
    }

    function getSlice() {
        if (catCount > 0) {
            pizzaSliceCount += catCount;
            $("#pizzaSliceCount").text(pizzaSliceCount);
        }
    }


    // TODO: Create event that happens every second

    // API Key: "888dd05a1aa34b87aaf706b79bdff608"
    // "https://api.weatherbit.io/v2.0/current"	 
    // "https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=API_KEY&include="
    

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
                console.log(response[0]);
                var json = JSON.parse(JSON.stringify(response[0]));
                getWeather(json.lat, json.lon)
            },
            error: function (xhr, status, error) {
                // Handle errors here
                // console.error(status, error);
            }
        })
    }

    function getWeather(lat, lon) {
        const APIkey = "888dd05a1aa34b87aaf706b79bdff608"
        var currentAPI = "https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=" + APIkey;
        var currentURL = currentAPI.replace("{lat}", lat);
        var currentURL = currentURL.replace("{lon}", lon);
        $.ajax({
            url: currentURL,
            method: 'GET',
            success: function (response) {
                console.log(response)
                var json = JSON.parse(JSON.stringify(response[0]));
                // getWeather(json.lat, json.lon)
            },
            error: function (xhr, status, error) {
                // Handle errors here
                console.error(status, error);
            }
        });
    }

        getWeather()
    // showWeather(weatherID)
    // const APIkey = "43d3ce9a4d6be02e5f3dbc9ba49a17b0"
    // var apiURL = 'http://api.openweathermap.org/geo/1.0/direct?q={cityName}&limit=5&units=imperial&appid=' + APIkey;
    // var weatherAPI = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=imperial&appid=" + APIkey;
    // var weatherID = "Rome"
    // function showWeather(weatherID) {
    //     var validURL = apiURL.replace("{cityName}", weatherID);

    //     $.ajax({
    //         url: validURL,
    //         method: 'GET',
    //         success: function (response) {
    //             // Handle the API response here
    //             // console.log(response[0]);
    //             var json = JSON.parse(JSON.stringify(response[0]));
    //             getWeather(json.lat, json.lon)
    //         },
    //         error: function (xhr, status, error) {
    //             // Handle errors here
    //             // console.error(status, error);
    //         }
    //     })
    // }
    // function getWeather(lat, lon) {
    //     var currentAPI = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=imperial&appid=" + APIkey;
    //     var currentURL = currentAPI.replace("{lat}", lat);
    //     var currentURL = currentURL.replace("{lon}", lon);
    //     $.ajax({
    //         url: currentURL,
    //         method: 'GET',
    //         success: function (response) {
    //             console.log(response)
    //         },
    //         error: function (xhr, status, error) {
    //             // Handle errors here
    //             console.error(status, error);
    //         }
    //     });
    // }
    // showWeather(weatherID)
  
    showWeather(weatherID)



    //Every 1 minute (arbitrarily longer amount of time), check the value of [Pizza Company] stocks, print that number somewhere beneath the Pizza button
    function GetPizzaStockValue() {
        apiKey = "cnsaef1r01qmmmfkvm00cnsaef1r01qmmmfkvm0g";
        dominoesStockTicker = "DPZ";
        fetchURL = "https://finnhub.io/api/v1/quote?symbol=" + dominoesStockTicker + "&token=" + apiKey;
        $.ajax({
            url: fetchURL,
            method: "GET",
            success: function (response) {
                console.log("PIZZA STOCK RESPONSE");
                console.log("Dominoes change in stock value: " + response["d"]);
            },
            error: function (xhr, status, error) {
                console.error(status, error);
            }
        });
    }
    GetPizzaStockValue();
});


//Reset button should create a modal that asks if you're REALLY sure you wanna lose your save data (pizza count and cat-count)
//Every 1 second, pizza slices should increase based on # of cats (Adjoa)
//Every 1 minute (arbitrarily longer amount of time), check the value of [Pizza Company] stocks, print that number somewhere beneath the Pizza button
//Every 1 minute (arbitrarily longer amount of time) check the weather in Italy or something, print the current temperature somewhere beneath the Pizza button
//Reset button should create a modal that asks if you're REALLY sure you wanna lose your save data (pizza count and cat-count)
$(document).ready(function () {
    // Modal
    const modal = document.getElementById('modal');
    const modalClose = document.querySelector('.modal-close');
    const confirmResetBtn = document.getElementById('confirmResetBtn');

    // Function to open modal
    const openModal = () => {
        modal.showModal();
    };

    // Function to close modal
    const closeModal = () => {
        modal.close();
    };

    // Add click event listener to the reset button
    $("#resetBtn").click(openModal);


    // Add click event listener to the modal close button
    modalClose.addEventListener('click', closeModal);

    // Add click event listener to the confirm reset button
    confirmResetBtn.addEventListener('click', function () {
        var newSave = {
            "pizzas": 0,
            "cat count": 0,
        }
        console.log(newSave)
        localStorage.setItem("defaultSave", JSON.stringify(newSave))
        localStorage.clear();
        closeModal();
    });
});
