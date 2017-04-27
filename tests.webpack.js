require('babel-polyfill');
var context = require.context('./UtopiaTargetFinder/Content', true, /-test\.js$/);
context.keys().forEach(context);
