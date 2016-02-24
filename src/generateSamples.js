/**
 * This is a node script that will generate the samples by injecting the generated javscript into them
 */

var fs = require('fs');
var path = require('path');

var js = fs.readFileSync(path.join(__dirname, '../dist/loading-page.min.js')).toString();

generateSamplePage('sample.html');
generateSamplePage('advanced-sample.html');

var readme = fs.readFileSync(path.join(__dirname, './README.md')).toString();

// assumes sha was passed in as arg - see [package.json].scripts.build
var sha = process.argv[2]

var templatedReadme= readme.replace(new RegExp('{{loading-page.min.js}}', 'g'), js)
    .replace('v=sha', 'v=' + sha);

fs.writeFileSync(path.join(__dirname, '../README.md'), templatedReadme);


function generateSamplePage(page){
    var samplePage = fs.readFileSync(path.join(__dirname, './' + page)).toString();

    var templatedSamplePage = samplePage.replace('//{{loading-page.min.js}}', js);

    fs.writeFileSync(path.join(__dirname, '../dist/' + page), templatedSamplePage);

}