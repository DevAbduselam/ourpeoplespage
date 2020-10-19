const { writeFileSync, readFileSync, mkdirSync, existsSync } = require('fs');
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
exports.handler = function (event, context, callback) {
  const allowedPaths = ["mama", "baba", "dada", "nana"];
  const path = event.queryStringParameters.id.replace("/", "");
  if (allowedPaths.includes(path)) {
    return callback(null, {
      statusCode: 200,
      body: renderer('template.html', { person: path })
    });
  }
  return callback(null, {
    body: JSON.stringify({error: 'sorry'}),
    statusCode: 301,
    headers: {
      Location: `/404.html`,
    }
  });
}