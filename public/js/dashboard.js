/**
 * Created by Stephanie on 6/9/2015.
 */



var theTemplateScript = document.getElementById('myLineupTemplate').innerHTML;
var theData = {
   team1: "254",
   team2: "1983",
   team3: "971"
};
var theTemplate = Handlebars.compile(theTemplateScript);

document.getElementById('output').innerHTML = theTemplate(theData);