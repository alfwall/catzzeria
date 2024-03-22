$(document).ready(function () {
    // Make all important variables
    var pizzaSliceCount = 0;
    var catCount = 0;
    var priceToHireACat = 10;

    // Helper function that updates the save data. If no values are provided,
    // it assumes that you're resetting the game.
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
        // Update the values
        pizzaSliceCount = newPizzaCount;
        catCount = newCatCount;
        priceToHireACat = newCatPrice;
        // Update the displayed values
        $("#pizzaSliceCount").text(pizzaSliceCount);
        $("#catCount").text(catCount);
        $("#hireACatCost").text(priceToHireACat);
    }


    // Check for saved data
    var saveData = JSON.parse(localStorage.getItem("defaultSave"));
    //console.log("saveData: ");
    // If none, create empty save data
    if (saveData == null) {
        console.log("NEW SAVE!!")
        // Make new save data
        SaveData();
    }

    // 
    saveData = JSON.parse(localStorage.getItem("defaultSave"));
    pizzaSliceCount = saveData["pizzas"];
    $("#pizzaSliceCount").text(pizzaSliceCount);
    catCount = saveData["cat_count"];
    $("#catCount").text(catCount);
    priceToHireACat = saveData["hire_a_cat_price"];
    $("#hireACatCost").text(priceToHireACat);
    //console.log("HIREACAT: " + $("#hireACatCost").text())


    // On save, save current counts and values
    $("#saveBtn").click(function () {
        SaveData(pizzaSliceCount, catCount, priceToHireACat);
    })

    // On reset, save with default starting values
    $("#confirmResetBtn").click(function () {
        SaveData();
    })

    // On pizza button click, increase pizza slice count by 1
    $("#pizzaBtn").click(function () {
        pizzaSliceCount += 1;
        $("#pizzaSliceCount").text(pizzaSliceCount);
        // TODO: On fresh save, having more than the initial pizza slice count
        // needed to hire a cat reveals the cat section.
        if (pizzaSliceCount >= 10) {
            $("#hireACat").show();
        }
    });

    // On hire, increase the cat count
    $("#hireACat").click(function () {
        // Don't hire a cat if you can't afford one
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

    // Every second, increaes pizza slice count by cat count
    let intervalID;
    if (!intervalID) {
        intervalID = setInterval(getSlice, 1000);
    }

    // As long as cat count is > 0, increase pizza slice count by cat count
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


    // Uses WEATHERBIT
    function getWeather(lat, lon) {
        const APIkey = "888dd05a1aa34b87aaf706b79bdff608"
        var currentAPI = "https://api.weatherbit.io/v2.0/current?units=I&lat=35.7796&lon=-78.6382&key=" + APIkey;
        var currentURL = currentAPI.replace("{lat}", lat);
        var currentURL = currentURL.replace("{lon}", lon);
        $.ajax({
            url: currentURL,
            method: 'GET',
            success: function (response) {
                //console.log("Response from getWeather(): ")
                //console.log(response["data"][0])
                data = response["data"][0];
                temperature = data["temp"];
                console.log("Current temp: " + temperature + " F")
            },
            error: function (xhr, status, error) {
                // Handle errors here
                console.error(status, error);
            }
        });
    }

    getWeather()
    

    // Every 1 minute (arbitrarily longer amount of time), check the value of [Pizza Company] stocks, 
    // print that number somewhere beneath the Pizza button
    function GetPizzaStockValue() {
        apiKey = "cnsaef1r01qmmmfkvm00cnsaef1r01qmmmfkvm0g";
        dominoesStockTicker = "DPZ";
        fetchURL = "https://finnhub.io/api/v1/quote?symbol=" + dominoesStockTicker + "&token=" + apiKey;
        $.ajax({
            url: fetchURL,
            method: "GET",
            success: function (response) {
                //console.log("PIZZA STOCK RESPONSE");
                console.log("Dominoes change in stock value: " + response["d"]);
            },
            error: function (xhr, status, error) {
                console.error(status, error);
            }
        });
    }
    GetPizzaStockValue();



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
        localStorage.clear();
        SaveData();
        closeModal();
    });
});
