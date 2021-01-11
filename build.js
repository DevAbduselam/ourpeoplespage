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
};
if (!existsSync("public")) mkdirSync("public");
if (!existsSync("public/r")) mkdirSync("public/r");
people.forEach(person => {
  writeFileSync('public/r/' + person + '.html', renderer('template.html', { person }));
});
writeFileSync('public/' + 'index.html', renderer('index.html', { people }));
