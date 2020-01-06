/** 
 * @param {*} request
 * lorqu'on selectionne un lien dans notre home, il récupère l'ensemble des infos
 * @param {*} response
 * on récupérer le bonne id de chaque élément que le selectionne 
 */

exports.parsed = (req, routes) => { // exporte notre fonction parsed

    let splitReq = req.url.split('/') // on split la requête
    let regex = /([0-9])/; // on crée une regex afin de vérifier si notre requête(=id) contient des chiffre
    let id = splitReq[splitReq.length - 1] // méthode pour récupérer le dernier élément de notre tableau après le split
    if (regex.test(id)) { // on test la regex
        let newRoutes = routes.map(route => { // on initialise la nouvelle route
            if (route.url.includes('/:id')) { // si la condition est ok, on modifie la route
                return {
                    url: `/movies/${id}`,
                    controller: 'movies',
                    method: 'GET',
                    action: 'read'
                }
            } else {
                return route; // si ce n'est pas le cas on retourne la route sans modification
            }
        })
        return newRoutes; // on retourne la nouvelle route
        //console.log(routes);
    } else {
        return routes // si ce n'est pas le cas retourne la route sans modification
    }
}

// on crée une méthode pour juste récupérer l'id

exports.id = (req) => {
    let splitReq = req.url.split('/')
    return splitReq[splitReq.length - 1]
}