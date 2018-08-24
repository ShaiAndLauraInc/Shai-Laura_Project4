(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//user arrives on page
//user asked for their name and age. age must be >= 19
//if user is not >=  serve up a page that says "oops you're to young"
//if age requirement is met, load main page
// on main page we greet the user and present them with a natural language filter
//natural language filter says something like "I want to feel _________" with a dropdown of selections.
//options could include releif from depression, pain, anxiety, etc. or simply moods like happy, relaxed, hungry...
//user selects an option and are served strains that match that option.
//strains will be displayed with random photo (stretch goal is to have a real one), their name, flavours, all effects, race.
//name photo and 

var app = {};
app.apiUrl = 'http://strainapi.evanbusse.com/';
app.apiKey = 'OcnJg8N';
app.searchQueryEffect = '/strains/search/effect/';
app.searchQueryName = '/strains/search/name/';

var userSelection = '';
var strains15 = [];
var descript15 = [];
var descriptResponse = '';

app.events = function () {
  $('form').on('submit', function (e) {
    e.preventDefault();
    // console.log('did this work?');
    userSelection = $('option:selected').val();
    // console.log(userSelection);
    app.getEffect(userSelection);
  });
};

app.getEffect = function (user) {
  var effect = user;
  $.ajax({
    url: '' + app.apiUrl + app.apiKey + app.searchQueryEffect + effect,
    method: 'GET',
    dataType: 'json'
  }).then(function (res) {
    var _$;

    console.log(res);

    //find out the number of strains in the users selected effect
    console.log('number of items in the array: ' + res.length);
    //select a random number from 0 to the number of items in the array
    var randomNumber = Math.floor(Math.random() * res.length + 1);
    console.log(randomNumber);
    // log the randomly selected name in the users selected effect
    console.log(res[randomNumber].name);

    var randomStrain = res[randomNumber].name;

    strains15 = [];
    //make an array with 15 random strains generated from the users chosen effect.
    for (var i = 0; i < 14; i++) {
      var _randomNumber = Math.floor(Math.random() * res.length + 1);
      // log the randomly selected name in the users selected effect
      var _randomStrain = res[_randomNumber].name;
      console.log(_randomStrain);
      strains15.push(_randomStrain);
    }
    //this is a randomly generated array of 15 strains in the users chosen effect category.
    console.log(strains15);

    var getDescription = function getDescription(name) {
      return $.ajax({
        url: '' + app.apiUrl + app.apiKey + app.searchQueryName + name,
        //url: 'http://strainapi.evanbusse.com/OcnJg8N/strains/search/name/Royal%20Kush',
        method: 'GET',
        dataType: 'json'
      });
    };
    var descriptionRequests = strains15.map(getDescription);

    (_$ = $).when.apply(_$, _toConsumableArray(descriptionRequests)).then(function () {
      for (var _len = arguments.length, responses = Array(_len), _key = 0; _key < _len; _key++) {
        responses[_key] = arguments[_key];
      }

      console.log(responses);
      responses = responses.map(function (item) {
        return item[0][0];
      });

      //  descript15 = [];
      //   for (let i = 0;  i < responses.length; i++ ){
      //     descript15.push(response.desc);
      //   }

      descriptResponse = responses.forEach(function (response) {
        // console.log(response.desc)
        descript15.push(response.desc);
      });

      //console.log(descript15);

      // const strainsDescriptions = responses.filter((des)=>{
      //   return des.desc;
      // });
      // console.log(strainsDescription);


      // LEFT OFF HERE
      // const strainDescriptions = responses.filter(responses[item].desc) =>{
      //   console.log(strainDescriptions)
      // })
      app.displayEffect(strains15, descript15);
    });

    // we are calling the app.displayEffects and passing through
    // the array

  });
};

app.displayEffect = function (strainsArray, descArray) {
  // console.log("this is the random strains array passed into display effect " + strainsArray);
  // we created a for loop to go through the length of the array
  // create html card for each item [i]
  //console.log(`this is working ${descArray}`);

  for (var i = 0; i < strainsArray.length; i++) {
    // we inserted a template literal with the [i] into the card
    // displaying a differnt strain name
    $('.resultsContainer').append('<div class="card">\n  <div class="cardTop">\n  <figure></figure>\n  </div>\n  <div class="cardBottom">\n  <h3 class="strainName">' + strainsArray[i] + '</h3>\n  </div>\n  </div>');
  }

  console.log(strainsArray, descArray);
  for (var _i = 0; _i < descArray.length; _i++) {
    // we inserted a template literal with the [i] into the card
    // displaying a differnt strain name
    $('.resultsContainer').append('<div class="card">\n  <div class="cardTop">\n  <figure></figure>\n  </div>\n  <div class="cardBottom">\n  <h3 class="strainName">' + descArray[_i] + '</h3>\n  </div>\n  </div>');
  }
};

app.init = function () {

  app.events();
};

$(function () {
  app.init();
});

// inside we want to put a varauble inside [] of our array
// variable will generate random number that will go into []
// para 0 - end of array -1
// array.length 
// res.length 
// random nubemer = Math.floor(Math.random)()*res.length 
// for(let item = 0; item > res.length > item++)

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQU0sTUFBTSxFQUFaO0FBQ0EsSUFBSSxNQUFKLEdBQWEsaUNBQWI7QUFDQSxJQUFJLE1BQUosR0FBYSxTQUFiO0FBQ0EsSUFBSSxpQkFBSixHQUF3Qix5QkFBeEI7QUFDQSxJQUFJLGVBQUosR0FBc0IsdUJBQXRCOztBQUlBLElBQUksZ0JBQWdCLEVBQXBCO0FBQ0EsSUFBSSxZQUFZLEVBQWhCO0FBQ0EsSUFBSSxhQUFhLEVBQWpCO0FBQ0EsSUFBSSxtQkFBbUIsRUFBdkI7O0FBRUEsSUFBSSxNQUFKLEdBQWEsWUFBTTtBQUNqQixJQUFFLE1BQUYsRUFBVSxFQUFWLENBQWEsUUFBYixFQUF1QixVQUFVLENBQVYsRUFBYTtBQUNsQyxNQUFFLGNBQUY7QUFDQTtBQUNBLG9CQUFnQixFQUFFLGlCQUFGLEVBQXFCLEdBQXJCLEVBQWhCO0FBQ0E7QUFDQSxRQUFJLFNBQUosQ0FBYyxhQUFkO0FBQ0QsR0FORDtBQU9ELENBUkQ7O0FBWUEsSUFBSSxTQUFKLEdBQWdCLFVBQUMsSUFBRCxFQUFVO0FBQ3hCLE1BQUksU0FBUyxJQUFiO0FBQ0EsSUFBRSxJQUFGLENBQU87QUFDSCxjQUFRLElBQUksTUFBWixHQUFxQixJQUFJLE1BQXpCLEdBQWtDLElBQUksaUJBQXRDLEdBQTBELE1BRHZEO0FBRUgsWUFBUSxLQUZMO0FBR0gsY0FBVTtBQUhQLEdBQVAsRUFLRyxJQUxILENBS1EsVUFBQyxHQUFELEVBQVM7QUFBQTs7QUFDYixZQUFRLEdBQVIsQ0FBWSxHQUFaOztBQUVBO0FBQ0EsWUFBUSxHQUFSLG9DQUE2QyxJQUFJLE1BQWpEO0FBQ0E7QUFDQSxRQUFJLGVBQWUsS0FBSyxLQUFMLENBQVksS0FBSyxNQUFMLEtBQWdCLElBQUksTUFBckIsR0FBK0IsQ0FBMUMsQ0FBbkI7QUFDQSxZQUFRLEdBQVIsQ0FBWSxZQUFaO0FBQ0E7QUFDQSxZQUFRLEdBQVIsQ0FBWSxJQUFJLFlBQUosRUFBa0IsSUFBOUI7O0FBR0EsUUFBSSxlQUFlLElBQUksWUFBSixFQUFrQixJQUFyQzs7QUFFQSxnQkFBWSxFQUFaO0FBQ0E7QUFDQSxTQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksRUFBcEIsRUFBd0IsR0FBeEIsRUFBNkI7QUFDM0IsVUFBSSxnQkFBZSxLQUFLLEtBQUwsQ0FBWSxLQUFLLE1BQUwsS0FBZ0IsSUFBSSxNQUFyQixHQUErQixDQUExQyxDQUFuQjtBQUNBO0FBQ0EsVUFBSSxnQkFBZSxJQUFJLGFBQUosRUFBa0IsSUFBckM7QUFDQSxjQUFRLEdBQVIsQ0FBWSxhQUFaO0FBQ0EsZ0JBQVUsSUFBVixDQUFlLGFBQWY7QUFDRDtBQUNEO0FBQ0EsWUFBUSxHQUFSLENBQVksU0FBWjs7QUFFQSxRQUFNLGlCQUFpQixTQUFqQixjQUFpQixDQUFDLElBQUQsRUFBVTtBQUMvQixhQUFPLEVBQUUsSUFBRixDQUFPO0FBQ1osa0JBQVEsSUFBSSxNQUFaLEdBQXFCLElBQUksTUFBekIsR0FBa0MsSUFBSSxlQUF0QyxHQUF3RCxJQUQ1QztBQUVaO0FBQ0EsZ0JBQVEsS0FISTtBQUlaLGtCQUFVO0FBSkUsT0FBUCxDQUFQO0FBTUQsS0FQRDtBQVFBLFFBQU0sc0JBQXNCLFVBQVUsR0FBVixDQUFjLGNBQWQsQ0FBNUI7O0FBR0EsYUFBRSxJQUFGLDhCQUFVLG1CQUFWLEdBQ0csSUFESCxDQUNRLFlBQWtCO0FBQUEsd0NBQWQsU0FBYztBQUFkLGlCQUFjO0FBQUE7O0FBQ3RCLGNBQVEsR0FBUixDQUFZLFNBQVo7QUFDQSxrQkFBWSxVQUFVLEdBQVYsQ0FBYyxVQUFDLElBQUQsRUFBVTtBQUNsQyxlQUFPLEtBQUssQ0FBTCxFQUFRLENBQVIsQ0FBUDtBQUNELE9BRlcsQ0FBWjs7QUFJRjtBQUNBO0FBQ0E7QUFDQTs7QUFFRyx5QkFBbUIsVUFBVSxPQUFWLENBQWtCLFVBQUMsUUFBRCxFQUFjO0FBQ25EO0FBQ0EsbUJBQVcsSUFBWCxDQUFnQixTQUFTLElBQXpCO0FBQ0EsT0FIbUIsQ0FBbkI7O0FBS0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBSSxhQUFKLENBQWtCLFNBQWxCLEVBQTZCLFVBQTdCO0FBQ0QsS0E5Qkg7O0FBa0NBO0FBQ0E7O0FBSUQsR0FqRkg7QUFrRkQsQ0FwRkQ7O0FBc0ZBLElBQUksYUFBSixHQUFvQixVQUFVLFlBQVYsRUFBd0IsU0FBeEIsRUFBbUM7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLGFBQWEsTUFBakMsRUFBeUMsR0FBekMsRUFBOEM7QUFDNUM7QUFDQTtBQUNBLE1BQUUsbUJBQUYsRUFBdUIsTUFBdkIsdUlBS3VCLGFBQWEsQ0FBYixDQUx2QjtBQVFEOztBQUVELFVBQVEsR0FBUixDQUFZLFlBQVosRUFBMEIsU0FBMUI7QUFDQSxPQUFLLElBQUksS0FBSSxDQUFiLEVBQWdCLEtBQUksVUFBVSxNQUE5QixFQUFzQyxJQUF0QyxFQUEyQztBQUN6QztBQUNBO0FBQ0EsTUFBRSxtQkFBRixFQUF1QixNQUF2Qix1SUFLdUIsVUFBVSxFQUFWLENBTHZCO0FBUUQ7QUFNRixDQXJDRDs7QUF1Q0EsSUFBSSxJQUFKLEdBQVcsWUFBWTs7QUFFckIsTUFBSSxNQUFKO0FBRUQsQ0FKRDs7QUFNQSxFQUFFLFlBQVk7QUFDWixNQUFJLElBQUo7QUFDRCxDQUZEOztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy91c2VyIGFycml2ZXMgb24gcGFnZVxuLy91c2VyIGFza2VkIGZvciB0aGVpciBuYW1lIGFuZCBhZ2UuIGFnZSBtdXN0IGJlID49IDE5XG4vL2lmIHVzZXIgaXMgbm90ID49ICBzZXJ2ZSB1cCBhIHBhZ2UgdGhhdCBzYXlzIFwib29wcyB5b3UncmUgdG8geW91bmdcIlxuLy9pZiBhZ2UgcmVxdWlyZW1lbnQgaXMgbWV0LCBsb2FkIG1haW4gcGFnZVxuLy8gb24gbWFpbiBwYWdlIHdlIGdyZWV0IHRoZSB1c2VyIGFuZCBwcmVzZW50IHRoZW0gd2l0aCBhIG5hdHVyYWwgbGFuZ3VhZ2UgZmlsdGVyXG4vL25hdHVyYWwgbGFuZ3VhZ2UgZmlsdGVyIHNheXMgc29tZXRoaW5nIGxpa2UgXCJJIHdhbnQgdG8gZmVlbCBfX19fX19fX19cIiB3aXRoIGEgZHJvcGRvd24gb2Ygc2VsZWN0aW9ucy5cbi8vb3B0aW9ucyBjb3VsZCBpbmNsdWRlIHJlbGVpZiBmcm9tIGRlcHJlc3Npb24sIHBhaW4sIGFueGlldHksIGV0Yy4gb3Igc2ltcGx5IG1vb2RzIGxpa2UgaGFwcHksIHJlbGF4ZWQsIGh1bmdyeS4uLlxuLy91c2VyIHNlbGVjdHMgYW4gb3B0aW9uIGFuZCBhcmUgc2VydmVkIHN0cmFpbnMgdGhhdCBtYXRjaCB0aGF0IG9wdGlvbi5cbi8vc3RyYWlucyB3aWxsIGJlIGRpc3BsYXllZCB3aXRoIHJhbmRvbSBwaG90byAoc3RyZXRjaCBnb2FsIGlzIHRvIGhhdmUgYSByZWFsIG9uZSksIHRoZWlyIG5hbWUsIGZsYXZvdXJzLCBhbGwgZWZmZWN0cywgcmFjZS5cbi8vbmFtZSBwaG90byBhbmQgXG5cbmNvbnN0IGFwcCA9IHt9XG5hcHAuYXBpVXJsID0gJ2h0dHA6Ly9zdHJhaW5hcGkuZXZhbmJ1c3NlLmNvbS8nXG5hcHAuYXBpS2V5ID0gJ09jbkpnOE4nXG5hcHAuc2VhcmNoUXVlcnlFZmZlY3QgPSAnL3N0cmFpbnMvc2VhcmNoL2VmZmVjdC8nXG5hcHAuc2VhcmNoUXVlcnlOYW1lID0gJy9zdHJhaW5zL3NlYXJjaC9uYW1lLydcblxuXG5cbmxldCB1c2VyU2VsZWN0aW9uID0gJydcbmxldCBzdHJhaW5zMTUgPSBbXTtcbmxldCBkZXNjcmlwdDE1ID0gW107XG5sZXQgZGVzY3JpcHRSZXNwb25zZSA9ICcnIFxuXG5hcHAuZXZlbnRzID0gKCkgPT4ge1xuICAkKCdmb3JtJykub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIC8vIGNvbnNvbGUubG9nKCdkaWQgdGhpcyB3b3JrPycpO1xuICAgIHVzZXJTZWxlY3Rpb24gPSAkKCdvcHRpb246c2VsZWN0ZWQnKS52YWwoKTtcbiAgICAvLyBjb25zb2xlLmxvZyh1c2VyU2VsZWN0aW9uKTtcbiAgICBhcHAuZ2V0RWZmZWN0KHVzZXJTZWxlY3Rpb24pO1xuICB9KVxufVxuXG5cblxuYXBwLmdldEVmZmVjdCA9ICh1c2VyKSA9PiB7XG4gIGxldCBlZmZlY3QgPSB1c2VyXG4gICQuYWpheCh7XG4gICAgICB1cmw6IGAke2FwcC5hcGlVcmx9JHthcHAuYXBpS2V5fSR7YXBwLnNlYXJjaFF1ZXJ5RWZmZWN0fSR7ZWZmZWN0fWAsXG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgZGF0YVR5cGU6ICdqc29uJ1xuICAgIH0pXG4gICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgY29uc29sZS5sb2cocmVzKTtcblxuICAgICAgLy9maW5kIG91dCB0aGUgbnVtYmVyIG9mIHN0cmFpbnMgaW4gdGhlIHVzZXJzIHNlbGVjdGVkIGVmZmVjdFxuICAgICAgY29uc29sZS5sb2coYG51bWJlciBvZiBpdGVtcyBpbiB0aGUgYXJyYXk6ICR7cmVzLmxlbmd0aH1gKTtcbiAgICAgIC8vc2VsZWN0IGEgcmFuZG9tIG51bWJlciBmcm9tIDAgdG8gdGhlIG51bWJlciBvZiBpdGVtcyBpbiB0aGUgYXJyYXlcbiAgICAgIGxldCByYW5kb21OdW1iZXIgPSBNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogcmVzLmxlbmd0aCkgKyAxKTtcbiAgICAgIGNvbnNvbGUubG9nKHJhbmRvbU51bWJlcik7XG4gICAgICAvLyBsb2cgdGhlIHJhbmRvbWx5IHNlbGVjdGVkIG5hbWUgaW4gdGhlIHVzZXJzIHNlbGVjdGVkIGVmZmVjdFxuICAgICAgY29uc29sZS5sb2cocmVzW3JhbmRvbU51bWJlcl0ubmFtZSk7XG5cblxuICAgICAgbGV0IHJhbmRvbVN0cmFpbiA9IHJlc1tyYW5kb21OdW1iZXJdLm5hbWU7XG5cbiAgICAgIHN0cmFpbnMxNSA9IFtdO1xuICAgICAgLy9tYWtlIGFuIGFycmF5IHdpdGggMTUgcmFuZG9tIHN0cmFpbnMgZ2VuZXJhdGVkIGZyb20gdGhlIHVzZXJzIGNob3NlbiBlZmZlY3QuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE0OyBpKyspIHtcbiAgICAgICAgbGV0IHJhbmRvbU51bWJlciA9IE1hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiByZXMubGVuZ3RoKSArIDEpO1xuICAgICAgICAvLyBsb2cgdGhlIHJhbmRvbWx5IHNlbGVjdGVkIG5hbWUgaW4gdGhlIHVzZXJzIHNlbGVjdGVkIGVmZmVjdFxuICAgICAgICBsZXQgcmFuZG9tU3RyYWluID0gcmVzW3JhbmRvbU51bWJlcl0ubmFtZTtcbiAgICAgICAgY29uc29sZS5sb2cocmFuZG9tU3RyYWluKTtcbiAgICAgICAgc3RyYWluczE1LnB1c2gocmFuZG9tU3RyYWluKTtcbiAgICAgIH1cbiAgICAgIC8vdGhpcyBpcyBhIHJhbmRvbWx5IGdlbmVyYXRlZCBhcnJheSBvZiAxNSBzdHJhaW5zIGluIHRoZSB1c2VycyBjaG9zZW4gZWZmZWN0IGNhdGVnb3J5LlxuICAgICAgY29uc29sZS5sb2coc3RyYWluczE1KTtcbiAgICAgIFxuICAgICAgY29uc3QgZ2V0RGVzY3JpcHRpb24gPSAobmFtZSkgPT4ge1xuICAgICAgICByZXR1cm4gJC5hamF4KHtcbiAgICAgICAgICB1cmw6IGAke2FwcC5hcGlVcmx9JHthcHAuYXBpS2V5fSR7YXBwLnNlYXJjaFF1ZXJ5TmFtZX0ke25hbWV9YCxcbiAgICAgICAgICAvL3VybDogJ2h0dHA6Ly9zdHJhaW5hcGkuZXZhbmJ1c3NlLmNvbS9PY25KZzhOL3N0cmFpbnMvc2VhcmNoL25hbWUvUm95YWwlMjBLdXNoJyxcbiAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgY29uc3QgZGVzY3JpcHRpb25SZXF1ZXN0cyA9IHN0cmFpbnMxNS5tYXAoZ2V0RGVzY3JpcHRpb24pXG5cblxuICAgICAgJC53aGVuKC4uLmRlc2NyaXB0aW9uUmVxdWVzdHMpXG4gICAgICAgIC50aGVuKCguLi5yZXNwb25zZXMpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZXMpO1xuICAgICAgICAgIHJlc3BvbnNlcyA9IHJlc3BvbnNlcy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtWzBdWzBdIFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgIC8vICBkZXNjcmlwdDE1ID0gW107XG4gICAgICAgIC8vICAgZm9yIChsZXQgaSA9IDA7ICBpIDwgcmVzcG9uc2VzLmxlbmd0aDsgaSsrICl7XG4gICAgICAgIC8vICAgICBkZXNjcmlwdDE1LnB1c2gocmVzcG9uc2UuZGVzYyk7XG4gICAgICAgIC8vICAgfVxuICBcbiAgICAgICAgICAgZGVzY3JpcHRSZXNwb25zZSA9IHJlc3BvbnNlcy5mb3JFYWNoKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXNwb25zZS5kZXNjKVxuICAgICAgICAgICBkZXNjcmlwdDE1LnB1c2gocmVzcG9uc2UuZGVzYyk7XG4gICAgICAgICAgfSlcblxuICAgICAgICAgIC8vY29uc29sZS5sb2coZGVzY3JpcHQxNSk7XG4gICAgICAgICAgXG4gICAgICAgICAgLy8gY29uc3Qgc3RyYWluc0Rlc2NyaXB0aW9ucyA9IHJlc3BvbnNlcy5maWx0ZXIoKGRlcyk9PntcbiAgICAgICAgICAvLyAgIHJldHVybiBkZXMuZGVzYztcbiAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhzdHJhaW5zRGVzY3JpcHRpb24pO1xuICAgICAgICAgIFxuXG4gICAgICAgICAgLy8gTEVGVCBPRkYgSEVSRVxuICAgICAgICAgIC8vIGNvbnN0IHN0cmFpbkRlc2NyaXB0aW9ucyA9IHJlc3BvbnNlcy5maWx0ZXIocmVzcG9uc2VzW2l0ZW1dLmRlc2MpID0+e1xuICAgICAgICAgIC8vICAgY29uc29sZS5sb2coc3RyYWluRGVzY3JpcHRpb25zKVxuICAgICAgICAgIC8vIH0pXG4gICAgICAgICAgYXBwLmRpc3BsYXlFZmZlY3Qoc3RyYWluczE1LCBkZXNjcmlwdDE1KVxuICAgICAgICB9KTtcblxuXG5cbiAgICAgIC8vIHdlIGFyZSBjYWxsaW5nIHRoZSBhcHAuZGlzcGxheUVmZmVjdHMgYW5kIHBhc3NpbmcgdGhyb3VnaFxuICAgICAgLy8gdGhlIGFycmF5XG4gICAgIFxuICAgICAgXG5cbiAgICB9KVxufVxuXG5hcHAuZGlzcGxheUVmZmVjdCA9IGZ1bmN0aW9uIChzdHJhaW5zQXJyYXksIGRlc2NBcnJheSkge1xuICAvLyBjb25zb2xlLmxvZyhcInRoaXMgaXMgdGhlIHJhbmRvbSBzdHJhaW5zIGFycmF5IHBhc3NlZCBpbnRvIGRpc3BsYXkgZWZmZWN0IFwiICsgc3RyYWluc0FycmF5KTtcbiAgLy8gd2UgY3JlYXRlZCBhIGZvciBsb29wIHRvIGdvIHRocm91Z2ggdGhlIGxlbmd0aCBvZiB0aGUgYXJyYXlcbiAgLy8gY3JlYXRlIGh0bWwgY2FyZCBmb3IgZWFjaCBpdGVtIFtpXVxuICAvL2NvbnNvbGUubG9nKGB0aGlzIGlzIHdvcmtpbmcgJHtkZXNjQXJyYXl9YCk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHJhaW5zQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAvLyB3ZSBpbnNlcnRlZCBhIHRlbXBsYXRlIGxpdGVyYWwgd2l0aCB0aGUgW2ldIGludG8gdGhlIGNhcmRcbiAgICAvLyBkaXNwbGF5aW5nIGEgZGlmZmVybnQgc3RyYWluIG5hbWVcbiAgICAkKCcucmVzdWx0c0NvbnRhaW5lcicpLmFwcGVuZChgPGRpdiBjbGFzcz1cImNhcmRcIj5cbiAgPGRpdiBjbGFzcz1cImNhcmRUb3BcIj5cbiAgPGZpZ3VyZT48L2ZpZ3VyZT5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJjYXJkQm90dG9tXCI+XG4gIDxoMyBjbGFzcz1cInN0cmFpbk5hbWVcIj4ke3N0cmFpbnNBcnJheVtpXX08L2gzPlxuICA8L2Rpdj5cbiAgPC9kaXY+YClcbiAgfVxuICBcbiAgY29uc29sZS5sb2coc3RyYWluc0FycmF5LCBkZXNjQXJyYXkpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGRlc2NBcnJheS5sZW5ndGg7IGkrKykge1xuICAgIC8vIHdlIGluc2VydGVkIGEgdGVtcGxhdGUgbGl0ZXJhbCB3aXRoIHRoZSBbaV0gaW50byB0aGUgY2FyZFxuICAgIC8vIGRpc3BsYXlpbmcgYSBkaWZmZXJudCBzdHJhaW4gbmFtZVxuICAgICQoJy5yZXN1bHRzQ29udGFpbmVyJykuYXBwZW5kKGA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxuICA8ZGl2IGNsYXNzPVwiY2FyZFRvcFwiPlxuICA8ZmlndXJlPjwvZmlndXJlPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImNhcmRCb3R0b21cIj5cbiAgPGgzIGNsYXNzPVwic3RyYWluTmFtZVwiPiR7ZGVzY0FycmF5W2ldfTwvaDM+XG4gIDwvZGl2PlxuICA8L2Rpdj5gKVxuICB9XG4gIFxuICBcblxuIFxuXG59XG5cbmFwcC5pbml0ID0gZnVuY3Rpb24gKCkge1xuXG4gIGFwcC5ldmVudHMoKTtcblxufVxuXG4kKGZ1bmN0aW9uICgpIHtcbiAgYXBwLmluaXQoKTtcbn0pO1xuXG5cbi8vIGluc2lkZSB3ZSB3YW50IHRvIHB1dCBhIHZhcmF1YmxlIGluc2lkZSBbXSBvZiBvdXIgYXJyYXlcbi8vIHZhcmlhYmxlIHdpbGwgZ2VuZXJhdGUgcmFuZG9tIG51bWJlciB0aGF0IHdpbGwgZ28gaW50byBbXVxuLy8gcGFyYSAwIC0gZW5kIG9mIGFycmF5IC0xXG4vLyBhcnJheS5sZW5ndGggXG4vLyByZXMubGVuZ3RoIFxuLy8gcmFuZG9tIG51YmVtZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKSgpKnJlcy5sZW5ndGggXG4vLyBmb3IobGV0IGl0ZW0gPSAwOyBpdGVtID4gcmVzLmxlbmd0aCA+IGl0ZW0rKykiXX0=
