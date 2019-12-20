const Helper = require('./helpers/index')
const routes = [{
    url: '/',
    controller: 'movies',
    method: 'GET',
    action: 'list'
}, {
    url: '/movies/:id',
    controller: 'movie',
    method: 'GET',
    action: 'read'
}];

module.exports = async (request, response) => {
    let parsedRoutes = await Helper.parsed(request, routes);
    let index = parsedRoutes.findIndex((route) => route.url === request.url && route.method === request.method);
    console.log(index);
    try {

        if (request.url === 'favicon.ico') response.end()
        let controller;

        if (index !== -1) {
            controller = require(`${process.cwd()}/controllers/${parsedRoutes[index].controller}`)
        }

        controller[parsedRoutes[index].action](request, response);

    } catch {
        console.log(parsedRoutes[index]);
    }
}