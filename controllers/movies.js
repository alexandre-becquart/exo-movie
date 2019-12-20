const fsp = require('fs').promises;
const Movie = require('../models/movie')
const Helper = require('../helpers')

/**
 * @param {*} request
 * @param {*} response
 */


exports.list = async (request, response) => {
    console.log('LISTING')
    let output;
    let template = await fsp.readFile(`${process.cwd()}/views/index.html`, 'UTF-8')
    //console.log(template);

    let html = "<ul>";
    let movies = await Movie.find({}).limit(10)
    movies.forEach((movie) => {
        html += `<a href="/movies/${movie._id}"><li>${movie.fields.title} : ${movie.fields.year} </li><a>`
    });


    html += '</ul>'


    output = template.replace(/{{LIST}}/, html)
    response.end(output)
}

exports.read = async (req, res) => {
    let output;
    console.log(Helper.id(req));
    // let parsedRoutes = await Helper.parsed(request, routes)

    let template = await fsp.readFile(`${process.cwd()}/views/detail.html`, 'UTF-8')

    let movie = await Movie.findOne({
        _id: Helper.id(req),
    })
    console.log(movie);
    let titleMovie = `<h2>${movie.fields.title} || ${movie.fields.rating}</h2>`


    let description = `
    <p>Genre(s) : ${movie.fields.genres}</p>
    <p>Resume : ${movie.fields.plot}</p>
    <img src="${movie.fields.image_url}" alt="${movie.fields.title}">
    <p>Release date : ${movie.fields.release_date}</p>
    <p>Director(s) : ${movie.fields.directors}</p>
    <p>Actors : ${movie.fields.actors}</p>
    <p>Time : ${movie.fields.running_time_secs}</p>

    `

    output = template.replace(/{{TITLE}}/, titleMovie).replace(/{{DESCRIPTION}}/, description)
    res.end(output)

}