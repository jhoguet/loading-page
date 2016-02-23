/**
 * This is a node script that will generate the asset that makes up the loading page script.
 * It will
 * 1. read iframe.html into memory
 * 2. make it into a script friendly string (without quotes)
 * 3. read loading-page.js into memory
 * 4. inject iframe.html (script friendly) into loading-page.js (in memory)
 * 5. write the result out to the dist folder
 */

var fs = require('fs');
var path = require('path');

var iframeHtml = fs.readFileSync(path.join(__dirname, 'iframe.html')).toString();

var jsSafeHtml = iframeHtml.replace(/\n/g, '');

var loadingPageJs = fs.readFileSync(path.join(__dirname, 'loading-page.js')).toString();

var templatedJs = loadingPageJs.replace('{{iframe.html}}', jsSafeHtml);

fs.writeFileSync(path.join(__dirname, '../dist/loading-page.js'), templatedJs);