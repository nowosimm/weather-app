import './style.css'
import sunnyIcon from "./images/sunnyIcon.png"

function makeWeekViewWeather() {
	var dayContainers = document.querySelectorAll('.weekView__weather')
	for(var i = 0; i < dayContainers.length; i++) {
		var dayContainer = dayContainers[i];

		var weekViewContainer = document.createElement('div')
		weekViewContainer.classList.add('weekView__container')
	
		var weekDayText = document.createElement('p');
		weekDayText.textContent = 'Monday';
	
		var weatherIcon = document.createElement('img');
		weatherIcon.src = sunnyIcon;
		weatherIcon.classList.add('weather__icon')
	
		var temperatureContainer = document.createElement('div');
		temperatureContainer.classList.add('temperature__container')
	
		var weatherHigh = document.createElement('p');
		weatherHigh.textContent = '47'
	
		var weatherSeparator = document.createElement('p');
		weatherSeparator.textContent= ' / '
	
		var weatherLow = document.createElement('p');
		weatherLow.textContent = '28'
	
		weekViewContainer.appendChild(weekDayText);
		weekViewContainer.appendChild(weatherIcon);
		weekViewContainer.appendChild(temperatureContainer)
		temperatureContainer.appendChild(weatherHigh);
		temperatureContainer.appendChild(weatherSeparator);
		temperatureContainer.appendChild(weatherLow);

		dayContainer.appendChild(weekViewContainer);
	}
}

makeWeekViewWeather();

// grabs data from api
async function getWeatherData(location) {
	const response = await fetch(
	  `http://api.weatherapi.com/v1/forecast.json?key=d629dac309b84a568f5152706240702&q=${location}&days=7`,
	  {
		mode: 'cors',
	  }
	);
	return await response.json();
};

// gets location from user
async function getLocationFromInput () {
	const input = document.querySelector('.searchbar__input');
	const cityName = input.value;
	const weatherData = await getWeatherData(cityName);
	console.log(weatherData)
	console.log(weatherData.location.name +", "+ weatherData.location.region);
	myData(weatherData);
};

function myData(data) {
	const myData = {
		// current data
		currentTemp:  Math.round(data.current.temp_f),
		currentIcon: data.current.condition.icon,
		sevenDayForecast: data.forecast.forecastday,
		// location data
		currentCity: data.location.name,
		currentRegion: data.location.region,
		currentCountry: data.location.country,
		// forecast data
		
	}
	displayData(myData);
	displayLocation(myData);

}

function displayData(myData) {
	var currentTempDiv = document.querySelector('.currentInformation__temperature');
	currentTempDiv.textContent = myData.currentTemp + ' °';

	var currentIconDiv = document.querySelector('.currentInformation__icon');
	var icon = document.createElement('img');
	icon.src =myData.currentIcon;
	currentIconDiv.replaceChildren(icon);
}

function displayLocation(myData) {
	var locationDiv = document.querySelector('.header__location');
	if(myData.currentCountry == "United States of America") {
		locationDiv.textContent = myData.currentCity + ', ' + myData.currentRegion;
	} else {
		locationDiv.textContent = myData.currentCity + ', ' + myData.currentCountry;
	}

}

const input = document.querySelector('.searchbar__input');
input.addEventListener("keypress", function(event) {
	if (event.key === "Enter") {
		console.log(input.value);
		getLocationFromInput()
	}
});


