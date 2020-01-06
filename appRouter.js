const Helper = require('./helpers/index') // on fait appel au helpers
const routes = [{ // afficher les routes au server
    url: '/',
    controller: 'movies',
    method: 'GET',
    action: 'list'
}, {
    url: '/movies/:id', // on donne la route :id pour pouvoir le modifier par la suite, on doit fair un helper pour le remplacer par le bon id
    controller: 'movie',
    method: 'GET',
    action: 'read'
}];

module.exports = async (request, response) => {
    let parsedRoutes = await Helper.parsed(request, routes);
    // console.log(parsedRoutes);
    let index = parsedRoutes.findIndex((route) => route.url === request.url && route.method === request.method); // il vérifie si l'index existe dans les routes et si la méthode égalemnt
    console.log(index);
    try {

        if (request.url === '/favicon.ico') response.end() // on gère l'appel de faveicon, si tu l'as tu t'arrêtes

        let controller; // initier une vaariable 

        if (index !== -1) { // vérifie si mon index existe, si on ne le fait pas le serveur tourne en boucle
            controller = require(`${process.cwd()}/controllers/${parsedRoutes[index].controller}`) // on récupère l'action de mon controller
        }

        controller[parsedRoutes[index].action](request, response);

    } catch {
        controller = require(`${process.cwd()}/controllers/error`)
        controller['handleError'](request, response)
    }
}