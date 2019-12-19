const fsp = require('fs').promises;
/**
 * @param {*} request
 * @param {*} response
 */

 exports.list = async(request,response)=>{
     console.log('LISTING')
     let output;
     let template = await fsp.readFile(`${process.cwd()}/views/index.html`,'UTF-8')
     let html='liiiiiiiiistttt';
     output = template.replace(/{{LIST}}/,html)
     response.end(output)
 }