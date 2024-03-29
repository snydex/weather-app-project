window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            //const proxy = "https://cors-anywhere.herokuapp.com/corsdemo";
            const api = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={406a29cb3415bef4b63012a95878abe6}';
         

        fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data =>{
                const{temperature, summary, icon} = data.currently;
                //set DOM elements
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                    // formula for celcius
                    let celsius = (temperature - 32) * (5 / 9)
                    //set icon
                    setIcons(icon, document.querySelector('.icon'));

                    //change temp (c/f)
                    temperatureSection.addEventListener('click', () =>{
                        if(temperatureSpan.textContent === "F"){
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = M.floorath;
                        }
                        else{
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    });
            })
        })

        function setIcond(icon, iconID){
            const skycons = new Skycons({color: "white"});
            const currentIcon = icon.replace(/-/g, "_").toUpperCase();
            skycons.play();
            return skycons.set(iconID, Skycons[currentIcon]);
        }
    }
})