// const ejs = require('ejs');
const { writeFileSync, readFileSync } = require('fs');
const people = ['geddy', 'neil', 'alex'];
// const html = ejs.render(readFileSync('template.html').toString(), { people: people });
// console.log(html);
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
people.forEach(person => {
  writeFileSync('./r/' + person + '.html', renderer('template.html', { person }));
})
