document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const city = document.querySelector(".city-input").value
    if (!city) {
        return showAlert('Você precisa digitar uma cidade...');
    }

    const apikey = "e267388d6b6fd36d2ea67ab741fccb38"
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(city)}&appid=${apikey}&units=metric&lang=pt_br`

    const results = await fetch(apiUrl);
    const json = await results.json();

        if (json.cod === 200) {
            showInfo({
                city: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempMax: json.main.temp_max,
                tempMin: json.main.temp_min,
                description: json.weather[0].description,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                humidity: json.main.humidity,
            });
        } else {
            showAlert('Não foi possível localizar...')
        }

});

function showInfo(json) {
    showAlert('');
    document.querySelector("#medium-box").classList.add('show');

    document.querySelector("#title").innerHTML = `${json.city}, ${json.country}`;

    document.querySelector(".temp_value").innerHTML = Math.floor(json.temp) + "<sup>ºC</sup>";
    document.querySelector(".temp_text").innerHTML = `${json.description}`
    document.querySelector(".img-weather").setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
    
    document.querySelector("#temp_max").innerHTML = Math.floor(json.tempMax) + "<sup>ºC</sup>";
    document.querySelector("#temp_min").innerHTML = Math.floor(json.tempMin) + "<sup>ºC</sup>";
    document.querySelector('#humidity').innerHTML = `${json.humidity}%`;
    document.querySelector('#wind').innerHTML = `${json.windSpeed.toFixed(1)}km/h`;
    
    
}

function showAlert(message) {
    const alertBox = document.querySelector("#alert");

    if (!message) {
        alertBox.style.display = "none";
        return;
    }

    alertBox.textContent = message;
    alertBox.style.display = "flex";

    setTimeout(() => {
        alertBox.style.display = "none";
        alertBox.textContent = ""; // limpa o conteúdo
    }, 4000);
}
