//fetch("https://maps.googleapis.com/maps/api/directions/json?mode=transit&origin=Prague&destination=Brno&key=AIzaSyCSySYbaRWc-61f7f1GXYsqKzZVnESuNdw").then(res=>res.json()).then(res=>console.log(res)).catch(err=>console.log(err))

let currentValidSite;
let currentSelectedVehicle = 'none';

setInterval(() => {

    const url = window.location.href

    const walk = document.querySelector("#omnibox-directions > div > div:nth-child(2) > div > div > div > div:nth-child(4) > button")
    isWalkSelected = walk.getAttribute("aria-checked")
    const bike = document.querySelector("#omnibox-directions > div > div:nth-child(2) > div > div > div > div:nth-child(5) > button")
    isBikeSelected = bike.getAttribute("aria-checked")
            
    const recommended = document.querySelector("#omnibox-directions > div > div:nth-child(2) > div > div > div > div:nth-child(1) > button")
    isRecommendedSelected = recommended.getAttribute("aria-checked")
    const car = document.querySelector("#omnibox-directions > div > div:nth-child(2) > div > div > div > div:nth-child(2) > button")
    isCarSelected = car.getAttribute("aria-checked")
    const airplane = document.querySelector("#omnibox-directions > div > div:nth-child(2) > div > div > div > div:nth-child(6) > button")
    isAirplaneSelected = airplane.getAttribute("aria-checked")
    const transit = document.querySelector("#omnibox-directions > div > div:nth-child(2) > div > div > div > div:nth-child(3) > button")
    isTransitSelected = transit.getAttribute("aria-checked")

    let vehicle;
    if (isWalkSelected === "true") vehicle = "walk";
    if (isCarSelected === "true") vehicle = "car";
    if (isAirplaneSelected === "true") vehicle = "airplane";
    if (isRecommendedSelected === "true") vehicle = "recommended";
    if (isBikeSelected === "true") vehicle = "bike";
    if (isTransitSelected === "true") vehicle = "transit";

    const f = url.split("www.google")
    const c = url.split("/maps/dir")
    const g = url.split("maps/dir//")

    //const x = url.split("https://www.google.com/maps/dir")
    //const y = url.split("https://www.google.com/maps/dir//")

    //if (f.length === 2 && c.length === 2 && g.length === 1) console.log("WORKING LINK")
    //if (x.length > 1 && y.length === 1)

    if (f.length === 2 && c.length === 2 && g.length === 1) {
        //console.log("running 1")
        if (currentValidSite !== window.location.href.split('@')[0] || currentSelectedVehicle !== vehicle) {
            //console.log("running 2")
            currentValidSite = window.location.href.split('@')[0]
            currentSelectedVehicle = vehicle

            console.log("STATE: ", currentSelectedVehicle)
    
            let splitedURL = url.split('/maps/dir/')[1]
            const departure = splitedURL.split('/')[0]
            const arrival = splitedURL.split('/')[1]
    
            fetch(`https://2ccdf1c14188.eu.ngrok.io/?start_location=${departure}&end_location=${arrival}`)
                .then(res => res.json())
                .then(res => {
                    const data = res["final_list"]
                    
                    //fetch(`https://2ccdf1c14188.eu.ngrok.io/?start_location${}`)
                    
                    /*const elements = document.querySelectorAll(".m6QErb")
                    let result;
                    for(var i = 0; i < elements.length; i++) {
                        // Only if there is only single class
                        if(elements[i].className == 'm6QErb') {
                            result = elements[i]
                        }
                    }*/
                    
                 
                    console.log(data)
    
                    
            
                    let icons = document.querySelectorAll(".Os0QJc")
                    //console.log(vehicles)
            
                    //data = [[4.876352456634322,4.876386153412359,4.876353438309775],[2336886,2317844,3563274,3411513]]
            
                    let vehicles = []

                    
            
                    const iconsNames = {
                        "//maps.gstatic.com/consumer/images/icons/1x/directions_car_grey800_24dp.png": "car",
                        "//maps.gstatic.com/consumer/images/icons/1x/directions_transit_grey800_24dp.png": "transit",
                        "//maps.gstatic.com/consumer/images/icons/1x/flight_grey800_24dp.png": "airplane",
                        "//maps.gstatic.com/consumer/images/icons/1x/directions_walk_grey800_24dp.png": "walk",
                        "//maps.gstatic.com/consumer/images/icons/2x/directions_car_grey800_24dp.png": "car",
                        "//maps.gstatic.com/consumer/images/icons/2x/directions_walk_grey800_24dp.png": "walk",
                        "//maps.gstatic.com/consumer/images/icons/2x/flight_grey800_24dp.png": "airplane",
                        "//maps.gstatic.com/consumer/images/icons/2x/directions_transit_grey800_24dp.png": "transit",
                        "//maps.gstatic.com/consumer/images/icons/3x/directions_car_grey800_24dp.png": "car",
                        "//maps.gstatic.com/consumer/images/icons/3x/directions_walk_grey800_24dp.png": "walk",
                        "//maps.gstatic.com/consumer/images/icons/3x/flight_grey800_24dp.png": "airplane",
                        "//maps.gstatic.com/consumer/images/icons/3x/directions_transit_grey800_24dp.png": "transit",
                        "//maps.gstatic.com/consumer/images/icons/4x/directions_car_grey800_24dp.png": "car",
                        "//maps.gstatic.com/consumer/images/icons/4x/directions_walk_grey800_24dp.png": "walk",
                        "//maps.gstatic.com/consumer/images/icons/4x/flight_grey800_24dp.png": "airplane",
                        "//maps.gstatic.com/consumer/images/icons/4x/directions_transit_grey800_24dp.png": "transit",
                    }
            
                    for(var i = 0; i < icons.length; i++) {
                        const icon = icons[i].getAttribute("src");
                        try {
                            vehicles.push(iconsNames[icon])
                        } catch (err) {
                            vehicles.push("walk")
                        }
                    }

                    console.log(vehicles)

                    const results = ["200g eCO2", "210g eCO2", "220g eCO2", "230g eCO2", "240g eCO2", "250g eCO2"]
                    
                    let carCount = 0;
                    let transitCount = 0;
            
                    const elements = document.querySelectorAll('.Fk3sm')
                    for(var i = 0; i < elements.length; i++) {
                        if (elements[i].innerText.includes("(")) return;
                        //console.log(typeof elements[i].innerHTML)
                        try {
                            if (isWalkSelected === "true" || isBikeSelected === "true") {
                                elements[i].insertAdjacentText('beforeend', ' ' + '(Carbon Neutral)');
                            } else {
                                if (vehicles[i] === "walk") {
                                    elements[i].insertAdjacentText('beforeend', ' ' + '(Carbon Neutral)');
                                } else if (vehicles[i] === "airplane") {
                                    elements[i].insertAdjacentText('beforeend', ' ' + '(' + data[2][0] + 'kg eCO2)');
                                } else if (vehicles[i] === "car") {
                                    elements[i].insertAdjacentText('beforeend', ' ' + '(' + data[0][carCount] + 'kg eCO2)');
                                    carCount = carCount + 1
                                } else if (vehicles[i] === "transit") {
                                    elements[i].insertAdjacentText('beforeend', ' ' + '(' + data[1][transitCount] + 'kg eCO2)');
                                    transitCount = transitCount + 1
                                }
                            }
                        } catch (err) {
                            console.log(err)
                        }
                        
                    }
                })
                .catch(err => console.log(err))
        }
    }

}, 500)

/*window.addEventListener('hashchange', function(){

});*/