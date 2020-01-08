const fsp = require('fs').promises; // on crée une promise de type asynchrone, il exécute toutes les taches en meme temps 
const Movie = require('../models/movie')
const Helper = require('../helpers/index')
const Moment = require('moment')

/** 
 * @param {*} request
 * @param {*} response
 */
//permet de commenter la méthode que l'on crée 

exports.list = async (request, response) => {
    console.log('LISTING')
    let output;
    let template = await fsp.readFile(`${process.cwd()}/views/index.html`, 'UTF-8')
    //console.log(template);

    let html = "<ul>"; // on ouvre la liste
    let movies = await Movie.find({}).limit(100) // on lui demande d'afficher une liste de 20 éléments
    movies.forEach((movie) => {
        html += `<a href="/movies/${movie.id}"><li>${movie.fields.title} : ${movie.fields.year} </li><a>`
    });
    // on ajoute les élément grâce à la boucle

    html += '</ul>' // on ferme la liste


    output = template.replace(/{{LIST}}/, html) // on lui demande de remplacer {{LIST}} par html
    response.end(output) // output devient la réponse
}

exports.read = async (req, res) => {
    let output;
    // console.log(Helper.id(req));
    // let parsedRoutes = await Helper.parsed(request, routes)

    let template = await fsp.readFile(`${process.cwd()}/views/detail.html`, 'UTF-8')

    let movie = await Movie.findOne({
        _id: Helper.id(req),
    })
    // console.log(movie);
    let titleMovie = `<h2>${movie.fields.title} || ${movie.fields.rating}</h2>`


    let description = `
    <p>Genre(s) : ${movie.fields.genres}</p>
    <p>Resume : ${movie.fields.plot}</p>
    <img src="${movie.fields.image_url.replace('http://', 'https://')}" alt="${movie.fields.title}">
    <p>Release date : ${Moment(movie.fields.release_date).format('DD - MM - YY')}</p>
    <p>Director(s) : ${movie.fields.directors.reduce((oldString, newString) => `${oldString.toUpperCase()} | ${newString.toUpperCase()}`)}</p>
    <p>Actors : ${movie.fields.actors.reduce((oldString, newString) => `${oldString.toUpperCase()} | ${newString.toUpperCase()}`)}</p>
    

    `

    let edit = `/movies/edit/${Helper.id(req)}`

    if (movie.fields.running_time_secs) {
        description += `<p>Time: ${Moment.duration(parseInt(movie.fields.running_time_secs)*1000).asMinutes()} min</p>`
    }

    output = template
        .replace(/{{TITLE}}/, titleMovie)
        .replace(/{{DESCRIPTION}}/, description)
        .replace(/{{EDIT}}/, edit)

    res.end(output)



}

exports.edit = async (req, res) => {
    let output;

    let template = await fsp.readFile(`${process.cwd()}/views/edit.html`, 'UTF-8')

    //console.log(template);

    let movie = await Movie.findOne({
        _id: Helper.id(req),
    })

    output = template
        .replace(/{{ID}}/, movie.id)
        .replace(/{{TITLE}}/, movie.fields.title)
        .replace(/{{IMAGE}}/, movie.fields.image_url.replace('http://', 'https://'))
        .replace(/{{RELEASED_DATE}}/, Moment(movie.fields.release_date).format('DD - MM - YY'))
        .replace(/{{GENRES}}/, movie.fields.genres)
        .replace(/{{DIRECTORS}}/, movie.fields.directors)
        .replace(/{{ACTORS}}/, movie.fields.actors)
        .replace(/{{RATING}}/, movie.fields.rating)
        .replace(/{{PLOT}}/, movie.fields.plot)
        .replace(/{{RUNNING_TIME_SECS}}/, Moment.duration(parseInt(movie.fields.running_time_secs) * 1000).asMinutes())
        .replace(/{{YEAR}}/, movie.fields.year)

    res.end(output)



}