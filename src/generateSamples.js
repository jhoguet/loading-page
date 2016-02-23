/**
 * This is a node script that will generate the samples by injecting the generated javscript into them
 */

var fs = require('fs');
var path = require('path');

var js = fs.readFileSync(path.join(__dirname, '../dist/loading-page.min.js')).toString();

var samplePage = fs.readFileSync(path.join(__dirname, './sample.html')).toString();

var templatedSamplePage = samplePage.replace('//{{loading-page.min.js}}', js);

fs.writeFileSync(path.join(__dirname, '../dist/sample.html'), templatedSamplePage);

var readme = fs.readFileSync(path.join(__dirname, './README.md')).toString();

var templatedReadme= readme.replace('{{loading-page.min.js}}', js);

fs.writeFileSync(path.join(__dirname, '../README.md'), templatedReadme);
