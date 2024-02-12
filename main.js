import './style.css'
import dayjs from 'dayjs';

function makeWeekViewWeather(myData) {
	var dayContainers = document.querySelectorAll('.weekView__weather')
	for(var i = 0; i < myData.sevenDayForecast.length; i++) {
		var dayContainer = dayContainers[i];
		var forecastData = myData.sevenDayForecast[i];
		console.log(forecastData);

		var weekViewContainer = document.createElement('div')
		weekViewContainer.classList.add('weekView__container')
	
		var weekDayText = document.createElement('p');
		weekDayText.textContent = 'Monday';
	
		var weatherIcon = document.createElement('img');
		weatherIcon.src = forecastData.day.condition.icon;
		weatherIcon.classList.add('weather__icon')
	
		var temperatureContainer = document.createElement('div');
		temperatureContainer.classList.add('temperature__container')
	
		var weatherHigh = document.createElement('p');
		weatherHigh.textContent = Math.round(forecastData.day.maxtemp_f);
	
		var weatherSeparator = document.createElement('p');
		weatherSeparator.textContent= '/'
		weatherSeparator.classList.add('weatherSeparator');

	
		var weatherLow = document.createElement('p');
		weatherLow.textContent = Math.round(forecastData.day.mintemp_f) + '°';
	
		weekViewContainer.appendChild(weekDayText);
		weekViewContainer.appendChild(weatherIcon);
		weekViewContainer.appendChild(temperatureContainer)
		temperatureContainer.appendChild(weatherHigh);
		temperatureContainer.appendChild(weatherSeparator);
		temperatureContainer.appendChild(weatherLow);
		
		dayContainer.replaceChildren(weekViewContainer);
	}
}

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
	myData(weatherData);
};



function myData(data) {
	const myData = {
		// current data
		currentTemp:  Math.round(data.current.temp_f),
		currentIcon: data.current.condition.icon,
		// location data
		currentCity: data.location.name,
		currentRegion: data.location.region,
		currentCountry: data.location.country,
		currentTime: data.location.localtime,
		// forecast data
		sevenDayForecast: data.forecast.forecastday,
	}
	displayData(myData);
	displayLocation(myData);
	displayTime(myData);
	makeWeekViewWeather(myData);
}

function displayData(myData) {
	var currentTempDiv = document.querySelector('.currentInformation__temperature');
	currentTempDiv.textContent = myData.currentTemp + ' °';

	var currentIconDiv = document.querySelector('.currentInformation__icon');
	var icon = document.createElement('img');
	icon.src =myData.currentIcon;
	currentIconDiv.replaceChildren(icon);
}

function displayTime(myData) {
	var currentDate = dayjs(myData.currentTime).format('MM-DD-YY');
	var currentDateDiv = document.querySelector('.currentInformation__date');
	currentDateDiv.replaceChildren(currentDate);

	var currentTime = dayjs(myData.currentTime).format('h:mm A');
	var currentTimeDiv = document.querySelector('.currentInformation__time');
	currentTimeDiv.replaceChildren(currentTime);
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

async function defaultPageLoad () {
	const weatherData = await getWeatherData("Cincinnati, Ohio");
	myData(weatherData);
};
defaultPageLoad();

