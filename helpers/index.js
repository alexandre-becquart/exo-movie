exports.parsed = (req, routes) => {

    let splitReq = req.url.split('/')
    let regex = /([0-9])/;
    let id = splitReq[splitReq.length - 1]
    if (regex.test(id)) {
        let newRoutes = routes.map(route => {
            if (route.url.includes('/:id')) {
                return {
                    url: `/movies/${id}`,
                    controller: 'movies',
                    method: 'GET',
                    action: 'read'
                }
            } else {
                return route;
            }
        })
        return newRoutes;
        //console.log(routes);
    } else {
        return routes
    }
}

exports.id = (req) => {
    let splitReq = req.url.split('/')
    return splitReq[splitReq.length - 1]
}