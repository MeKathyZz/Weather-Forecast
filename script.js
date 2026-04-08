// 1. Support functions

function showAlert(message) {
    const alertBox = document.querySelector("#alert");
    if (!alertBox) return;

    if (!message) {
        alertBox.style.display = "none";
        return;
    }

    alertBox.textContent = message;
    alertBox.style.display = "flex";

    setTimeout(() => {
        alertBox.style.display = "none";
        alertBox.textContent = "";
    }, 4000);
}

function showInfo({ city, country, temp, description, tempIcon, tempMax, tempMin, humidity, windSpeed }) {
    showAlert('');
    const mediumBox = document.querySelector("#medium-box");
    mediumBox.classList.add('show');

    document.body.className = `clima-${tempIcon}`;
    console.log("Classe aplicada ao body:", document.body.className);


    document.querySelector("#title").textContent = `${city}, ${country}`;
    document.querySelector(".temp_text").textContent = description;
    document.querySelector(".temp_value").innerHTML = `${Math.round(temp)}<sup>ºC</sup>`;
    document.querySelector(".img-weather").setAttribute('src', `https://openweathermap.org/img/wn/${tempIcon}@2x.png`);
    
    document.querySelector("#temp_max").innerHTML = `${Math.round(tempMax)}<sup>ºC</sup>`;
    document.querySelector("#temp_min").innerHTML = `${Math.round(tempMin)}<sup>ºC</sup>`;
    document.querySelector('#humidity').textContent = `${humidity}%`;
    document.querySelector('#wind').textContent = `${(windSpeed * 3.6).toFixed(1)} km/h`;
}

// 2. Event listener for form submission

const searchForm = document.querySelector('#search');

if (searchForm) {
    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const cityInput = document.querySelector(".city-input");
        const city = cityInput ? cityInput.value : "";
        console.log("Minha chave lida pelo Vite:", import.meta.env.VITE_OPENWEATHER_KEY);
        if (!city) {
            return showAlert('Você precisa digitar uma cidade...');
        }

        try {
            const apikey = import.meta.env.VITE_OPENWEATHER_KEY || process.env.VITE_OPENWEATHER_KEY;
            const cityValue = cityInput.value.trim();
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityValue)}&appid=${apikey}&units=metric&lang=pt_br`;

            const results = await fetch(apiUrl);
            const json = await results.json();

            if (json.cod === 200) {
                showInfo( {
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
                showAlert(`Erro ${json.cod}: ${json.message}`);
            }
        } catch (error) {
            showAlert("Erro na conexão ou chave de API inválida.");
            console.error("Erro completo:", error);
        }
    });
}