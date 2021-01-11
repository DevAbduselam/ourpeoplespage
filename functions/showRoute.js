const renderer = (template, data) => {
  let cooo = template;
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
const templateHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="description" content="{{{data.person}}}">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Title</title>
</head>
<body>
  {{{data.person}}}
</body>
<script>
  const listofusers = [{{{people}}}];
</script>
</html>
`;
exports.handler = function (event, context, callback) {
  console.log('got request: ', JSON.stringify(event));
  const allowedPaths = ["mama", "baba", "dada", "nana"];
  const path = event.queryStringParameters.id.replace("/", "");
  console.log("path: ", path);
  if (allowedPaths.includes(path)) {
    return callback(null, {
      statusCode: 200,
      body: renderer(templateHtml, {
        person: path
      })
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