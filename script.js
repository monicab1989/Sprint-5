"use strict";
exports.__esModule = true;
window.addEventListener("load", getJoke, false);
window.addEventListener("load", getWeather, false);
var reportAcudits = [];
var reportJokes = [];
var currentJoke;
var contador = 1;
function getJoke() {
    if (contador % 2 == 0) {
        jokeChuckNorris();
    }
    else {
        jokeDad();
    }
}
//Función API el tiempo de Madrid
function getWeather() {
    fetch('https://www.el-tiempo.net/api/json/v2/home')
        .then(function (response) { return response.json(); })
        .then(function (json) {
        var parrafoTown = document.getElementById('parrafoTown');
        var textParrafoTown = document.createTextNode(json.ciudades[1].name);
        parrafoTown.appendChild(textParrafoTown);
        var tiempo = document.getElementById('tiempo');
        var textTiempo = document.createTextNode(json.ciudades[1].stateSky.description);
        tiempo.appendChild(textTiempo);
        //Parrafos de las temperaturas
        var temperatureMax = document.getElementById('temperatureMax');
        var textTemperatureMax = document.createTextNode('Max ' + json.ciudades[1].temperatures.max + '°C');
        temperatureMax.appendChild(textTemperatureMax);
        var temperatureMin = document.getElementById('temperatureMin');
        var textTemperatureMin = document.createTextNode('Min ' + json.ciudades[1].temperatures.min + '°C');
        temperatureMin.appendChild(textTemperatureMin);
    });
}
//Funcion API chistes
function jokeDad() {
    fetch('https://icanhazdadjoke.com/', {
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(function (response) { return response.json(); })
        .then(function (json) {
        showJoke(json);
        contador++;
        console.log(json);
    });
}
//Función API chistes Chuck Norris
function jokeChuckNorris() {
    fetch('https://api.chucknorris.io/jokes/random', {
        headers: {
            'Accept': 'application/json'
        }
    })
        .then(function (response) { return response.json(); })
        .then(function (json) {
        showJokeChuck(json);
        contador++;
    });
}
var imgMain = document.getElementById('imgMain');
var imgLateral1 = document.getElementById('imgLateral1');
var imgLateral2 = document.getElementById('imgLateral2');
//Función pintar los chistes
function showJoke(data) {
    var parrafoJoke = document.getElementById('parrafoJoke');
    currentJoke = data.joke;
    var textJoke = document.createTextNode(currentJoke);
    parrafoJoke.innerHTML = "";
    parrafoJoke.appendChild(textJoke);
    imgMain.setAttribute('src', './img/blob1.svg');
    imgLateral1.setAttribute('src', './img/lateral.svg');
    imgLateral2.setAttribute('src', './img/lateral2.svg');
    if (reportAcudits.length != 0) {
        reportJokes = reportAcudits;
        console.log(reportJokes);
    }
}
//Función pintar los chistes de Chuck Norris
function showJokeChuck(data) {
    var parrafoJoke = document.getElementById('parrafoJoke');
    currentJoke = data.value;
    var textJoke = document.createTextNode(currentJoke);
    parrafoJoke.innerHTML = "";
    parrafoJoke.appendChild(textJoke);
    imgMain.setAttribute('src', './img/blobVerde(1).svg');
    imgLateral1.setAttribute('src', './img/blobLateralVer(3).svg');
    imgLateral2.setAttribute('src', './img/blobLateralVer(3).svg');
}
//Funciones valoraciones de los chistes
function badResult() {
    reportAcudits.push({
        joke: currentJoke,
        resultado: 1,
        date: new Date()
    });
}
function regularResult() {
    reportAcudits.push({
        joke: currentJoke,
        resultado: 2,
        date: new Date()
    });
}
function goodResult() {
    reportAcudits.push({
        joke: currentJoke,
        resultado: 3,
        date: new Date()
    });
}
