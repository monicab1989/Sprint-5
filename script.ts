window.addEventListener("load", getJoke, false);
window.addEventListener("load", getWeather, false);
import { IJoke, IJokeChuck, IJokeResult } from './interfaces';


const reportAcudits: IJokeResult[] = [];
let reportJokes: IJokeResult[] = [];

let currentJoke: string;
let contador: number = 1;

function getJoke(): void {
    if (contador % 2 == 0) {
        jokeChuckNorris();
    } else {
        jokeDad();
    }
}

//Función API el tiempo de Madrid
function getWeather() {
    fetch('https://www.el-tiempo.net/api/json/v2/home')
        .then(response => response.json())
        .then(json => {
            const parrafoTown = document.getElementById('parrafoTown');
            const textParrafoTown = document.createTextNode(json.ciudades[1].name);
            parrafoTown.appendChild(textParrafoTown);
            const tiempo = document.getElementById('tiempo');
            const textTiempo = document.createTextNode(json.ciudades[1].stateSky.description);
            tiempo.appendChild(textTiempo);
            //Parrafos de las temperaturas
            const temperatureMax = document.getElementById('temperatureMax');
            const textTemperatureMax = document.createTextNode('Max ' + json.ciudades[1].temperatures.max + '°C');
            temperatureMax.appendChild(textTemperatureMax);
            const temperatureMin = document.getElementById('temperatureMin');
            const textTemperatureMin = document.createTextNode('Min ' + json.ciudades[1].temperatures.min + '°C');
            temperatureMin.appendChild(textTemperatureMin);
        });
}


//Funcion API chistes
function jokeDad() {
    fetch('https://icanhazdadjoke.com/', {
        headers: {
            'Accept': 'application/json',
        }
    })
        .then(response => response.json())
        .then(json => {
            showJoke(json);
            contador++;
            console.log(json)
        });
}

//Función API chistes Chuck Norris
function jokeChuckNorris() {
    fetch('https://api.chucknorris.io/jokes/random', {
        headers: {
            'Accept': 'application/json',
        }
    })
        .then(response => response.json())
        .then(json => {
            showJokeChuck(json);
            contador++;
        });
}

const imgMain = document.getElementById('imgMain');
const imgLateral1 = document.getElementById('imgLateral1');
const imgLateral2 = document.getElementById('imgLateral2');

//Función pintar los chistes
function showJoke(data: IJoke): void {
    const parrafoJoke = document.getElementById('parrafoJoke');
    currentJoke = data.joke;
    const textJoke = document.createTextNode(currentJoke);
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
function showJokeChuck(data: IJokeChuck): void {
    const parrafoJoke = document.getElementById('parrafoJoke');
    currentJoke = data.value;
    const textJoke = document.createTextNode(currentJoke);
    parrafoJoke.innerHTML = "";
    parrafoJoke.appendChild(textJoke);
    imgMain.setAttribute('src', './img/blobVerde(1).svg');
    imgLateral1.setAttribute('src', './img/blobLateralVer(3).svg');
    imgLateral2.setAttribute('src', './img/blobLateralVer(3).svg');
}

//Funciones valoraciones de los chistes
function badResult(): void {
    reportAcudits.push({
        joke: currentJoke,
        resultado: 1,
        date: new Date()
    });
}

function regularResult(): void {
    reportAcudits.push({
        joke: currentJoke,
        resultado: 2,
        date: new Date()
    });
}

function goodResult(): void {
    reportAcudits.push({
        joke: currentJoke,
        resultado: 3,
        date: new Date()
    });
}
