const { readFileSync } = require('fs');
const { default: axios } = require("axios");
const people = ['geddy', 'neil', 'alex'];
const renderer = (templatePath, data) => {
  let cooo = readFileSync(templatePath).toString();
  let isThere = true;
  while (isThere) {
    if (cooo.includes('{{{')) {
      const ini = cooo.indexOf('{{{');
      const fini = cooo.indexOf('}}}', ini);
      const val = cooo.substring(ini + 3, fini);
      cooo = cooo.replace(`{{{${val}}}}`, eval(val));
    }
    else isThere = false;
  }
  return cooo;
}
const BotToken = process.env.BOT_TOKEN;
exports.handler = function (event, context, callback) {
  console.log('got request: ', JSON.stringify(event));
  const allowedPaths = ["mama", "baba", "dada", "nana"];
  const path = event.queryStringParameters.id.replace("/", "");
  console.log("path: ", path);
  const url = `https://api.telegram.org/bot${BotToken}/sendMessage?text="path: ${path} request: ${JSON.stringify(event)}"&chat_id=471720649`;
  if (allowedPaths.includes(path)) {
    return axios.get(encodeURI(url)).then(r => {
      return callback(null, {
        statusCode: 200,
        body: renderer('template.html', { person: path })
      });
    }).catch(err => {
      return callback(null, {
        statusCode: 200,
        body: renderer("template.html", { person: path }),
      });
    });
  }
  return axios.get(encodeURI(url)).then(r => {
    return callback(null, {
      body: JSON.stringify({ error: "sorry" }),
      statusCode: 301,
      headers: {
        Location: `/404.html`,
      },
    });
    }).catch(err => {
      return callback(null, {
        body: JSON.stringify({ error: "sorry" }),
        statusCode: 301,
        headers: {
          Location: `/404.html`,
        },
      });
    });
}