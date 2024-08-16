const timevisible = document.getElementById("time-display");
const datevisible = document.getElementById("date-display");

let Api_key = "8bc6fba66cd95f116669f1e0a8a68119";

setInterval(timedate, 1000);

function timedate() {
  const d = new Date();
  const hour = d.getHours();
  var hours = hour < 10 ? "0" + hour : hour;
  const minute = d.getMinutes();
  var minutes = minute < 10 ? "0" + minute : minute;
  const second = d.getSeconds();
  var seconds = second < 10 ? "0" + second : second;
  const day = d.getDay();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = d.getDate();
  const month = d.getMonth();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const year = d.getFullYear();
  timevisible.innerHTML = hours + ":" + minutes + " - " + days[day];
  datevisible.innerHTML = " , " + date + "-" + months[month] + "-" + year;
}

function getweather(cityname) {
  const weatherurl = "https://api.openweathermap.org/data/2.5/weather?";

  const main_url = `${weatherurl}q=${cityname}&appid=${Api_key}&units=imperial`;
  const weathering = fetch(main_url);

  return weathering.then((res) => res.json());
}

function output() {
  const searchvalue = document.getElementById("searchbar").value;
  getweather(searchvalue)
    .then((res) => {
      show_weather(res);
      console.log(res.clouds.all);
    })
    .catch((err) => {
      console.log(err);
    });
}

function show_weather(datas) {
  if ("city not found" == datas.message) {
    document.getElementById("citys").innerText = "Chennai";
  } else {
    document.getElementById("citys").innerText = datas.name;
  }
  document.getElementById("weathercondition").innerText = datas.weather[0].main;
  document.getElementById("degree").innerText =
    Math.round(datas.main.temp) + "\u00B0";
  document.getElementById("cloudy").innerText = datas.clouds.all + "%";
  document.getElementById("humidity").innerText = datas.main.humidity + "%";
  document.getElementById("wind").innerText = document.getElementById(
    "humidity"
  ).innerText = datas.main.humidity + "%";
  Math.round(datas.wind.speed) + " km/h";
  document.getElementById("maxi").innerText =
    Math.round(datas.main.temp_max) + "f";
}
