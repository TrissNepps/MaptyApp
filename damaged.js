'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

//New Lesson - How to Plan a Web Project

//Planning the mapty project - start out with concept called User Stories - a description of the apps functionaity from the users perspective. All the users stories together will clearly describe the functionality of the entire app. User stories are thus a high level overview of the entire application which allows developers to determine what features need to be included to make the user stories work as intended.

//Then, to visualize the different actions a user can take and how the program reacts to these actions, we put all of these features into a flow chart

//Once we know WHAT we will build, then we think of HOW. Now we come to architecture to determine how we will write our code and what JS features we will use. The architecture gives us the structure to develop the apps functionality. How will we wimplemenet all these features before we start to do it.

//Once architecture is established planning is done and development starts using JS code.

//So lets plan the app we will buid in this section by covering these steps starting with the user story.

//Common format is: As a [type of user], I want [an action] so that [a benefit].

//Ex for mapty: As a user, I want to log my running workouts with location, distance, time, pace and steps/minute, so that I can keep a log of all my running.

//Ex 2: As a user I want to log my cycling worouts with location, distaance, time, speed and elevation gain so I can keep a log of all my cycling.

//Ex 3: As a user I want to see all my workouts at a glance so I can easily track my progress over time

//Ex 4. I want to also see my workouts on a map so I can see where I workout th most

//Ex 5: I want to see all my workouts when I leave the app and come back later so I can keep it updated over time

//Based on this we can plan features.

//Based on the user stories we can imagine some features our app will need - A) A map where user clicks to add new workoout (this is the best way to get location coordinates)    B) Geolocation so we can display the map at the users current location (more user friendly)  C) A form to input the data (distance, time, pace, steps/min) -- all this from the first user story

//For second user story we need: A) Another form, similar to the first but with different data inputs

//For third user we need: A) Display all workouts in a list    B)Display all workouts on the map

//Last - Keep theworkouts saved for later use - we can save that data in the browser using an API aka local storage. When the user returns to the page the data will be read from the local storage and displayed on the map and in the list.

//These are the features - now build a flow chart showing how the different parts of the app interact, which event makes sense to implement and how data flows accross the application

//What are the first features we need to implement? 1) Geolocation to display the map at the users location and 2) to display a map where the user can click to add new workouts

//Good idea to start flow charts with events (Page Loads) --> ASYNC -get current location coordinates using geolocation API --> After that data arrives we want to render the map on the location of the user

//Then we need a form to input distance, time, pace, steps/min, ect and we need it to be rendered when the user clicks on a certain area of the map (2 forms - 1 for running and 1 for cycling)

//After the form is submitted we need to display the workouts in a list and on a map (2 things to do)

//Then the workout data is also stored in local storage

//Then wjenever the page loads we get all of the workouts from local stoarage and render them on the map and on the list wich can only happen after the current location has been fetched and the map hhas been displayed

//ASYNC means it is an operation that takes some time and only after it is completed can the rest of the operations that depend on it be executed

//Also we need to move the map to the workout location seected by the user when the user clicks on the workout in the list

//That is essentially what the app will do but now how - how is for the architecture

//To start this project we will just atart coding and putting the features according to the flow chart - then as we start to need more organization and ways to manage our data we will come back to architecture.

//New Lesson - Using the Geolocation API
//This API is a broswer API like internationalization or timers, ect.
//**Note that the getCurrentPosition method takes 2 callback functions as its parameters, the call back function called when the location is found and the error callback when the location is not. */
// To use it look below:
let map, mapEvent;
//All of the if code block below is being moved to the app object at the bottom.
// if (navigator.geolocation)
//   navigator.geolocation.getCurrentPosition(
//     function (position) {
//       const { latitude } = position.coords;
//       const { longitude } = position.coords;
//       //   console.log(latitude, longitude);
//       console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

//       const coords = [latitude, longitude];

//       map = L.map('map').setView(coords, 13);

//       L.tileLayer('https://{s}.google.com/vt/1yrs=m&x={x}&y={y}&z={z}', {
//         maxZoom: 20,
//         subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
//       }).addTo(map);

//       map.on('click', function (mapE) {
//         mapEvent = mapE;
//         form.classList.remove('hidden');

//         inputDistance.focus();

//         // console.log(mapEvent);
//         // const { lat, lng } = mapEvent.latlng;

//         // L.marker([lat, lng])
//         //   .addTo(map)
//         //   .bindPopup(
//         //     L.popup({
//         //       maxWidth: 250,
//         //       minWidth: 100,
//         //       autoClose: false,
//         //       closeOnClick: false,
//         //       className: 'running-popup',
//         //     })
//         //   )
//         //   .setPopupContent('Workout')
//         //   .openPopup();
//       });
//     },
//     function () {
//       alert('Could not get your location.');
//     }
//   );

//The following results in geolocator being run which generates the users Lat/Long inside the GeolocationPosition object.
//const {latitude} = position.coords was added to extract the latitude from that object. This gives integers we can work with.

//The coordinates extracted will be used to load the correct map to the correct position

//Now create a link on google maps:
//console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

//Now we can right click and open a new tab to open googlemaps on ur current location

//This showed us how Geolocation works but next lesson will show how to use a 3rd party script to load a map and display it on the right side of our UI

//New Lesson - Displaying a Map Using Leaflet Library
//To start Google leafletjs.com which is an opensource JS library for mobile-friendly interactive maps!

//Whenever using a 3rd party library must first include it in our site (download tab - Using a Hosted Version of Leaflet): Can also instal leaflet npm then run it

//This project we will use a hosted version that we then paste into our HTML head - dont forget to put defer into the script tag bc the order in which the scripts are downloaded is important

//Now that the library is included n the site we have to do something with it. We need to use the functions defined in the library to our advantage to use it on our own page - you can see an example on the home page. C&P that and put it into our success function under the cl googlemaps line and then refactor it for our own use.

// const map = L.map('map').setView([51.505, -0.09], 13);  ----whatever string we pass into the map function there ('map') must tbe the ID name of an element in our HTML and it is inside that element where the map will get displayed - so in our HTML we need an element with the ID of map
//<div id="map"></div>   The L (L.map('map)) is the main function leaflet gives us as an entry point (namespace). The L has methods we can use like the map method and title layer and market methods.
//Currently this works! Gives us a map of London

//**side note: global variables are available in ALL connected descending scripts -- so script.js has access to global variables in leaflet.js but not vice versa bc of scope - order matters!*/

//So this map works generic for London but we want to use our own location so we need to create an array: const coords = [latitude, longitude] then we can use that array in the .setView() method instead of the generic coordinates that it came loaded with:
//.setView([51.505, -0.09], 13);
//Change to:
//.setView(coords, 13); -- also do the same for L.marker()

//This now makes the location to the user! Whoa!
//*Note: the 13 is the zoom level and can be changed. Making it 10 would zoom the user out further away on the map and raising the number zooms in -- more inaccurate

//The map we see on the page is made up of small tiles which come from the url openstreetmap.org - leaflet works with googlemaps fyi

//we can use the L.tileLayer('https...) url to change the appearence of our map by removing .org and replacing with .fr/hot t get anther theme

//New Lesson - Displaying a Map Marker
//This will explain how to display a marker wherever we click on the map. We use leaflet library to do this.

//At this point we have gotten the current location corrdinates and renders the map on the current location. Now we are ready to bind a handler to track user clicks on the map and display a marker which can later be replaced to show data instead

//First think it to add event handler to the map so that the position of the click is registerred - we cant simply use addeventlistener bc it wont do that. Something similar in leaflet library will help tho.

//Now our map variable comes in handy which we got from the site.
// const map = L.map('map').setView(coords, 13);
//its onto the map object where we can now add an event listener .on() comes from the leaflet library not JS and map is a leaflet method L.map so it will have some methods and properties on it too that are not in JS. We will be using the on() method as our addeventlistener method.

//map.on('click), function(mapEvent){}  when leaflet calls this function it does so with a special map event. Now every click of the mouse has its location on the map logged in latling. COOL

//Now we can take coorindates of latling and add a market at that point

//The code below shows how to ake a marker:
//  L.marker(coords)
// .addTo(map)
// .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
// .openPopup()

//we move that code into map and deconstruct the lat and long from the mapEvent.latling
//
// map.on('click', function (mapEvent) {
//     console.log(mapEvent);
//     const {lat, lng} = mapEvent.latling;

//     L.marker(coords)
//     .addTo(map)
//     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
//     .openPopup()
//   });

//Now we want to put the pin where we click instead of where it starts at. L.marker(coords) - the coords is the center of the map we specified before which comes from geo location ut now we want to use the deconstructed lat and lng instead

// L.marker([lat,lng])
// .addTo(map)
// .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
// .openPopup();

//Now when a user click a pin is added to the clickpoint on the map -- COOL!

//Notice that when we add a new pin the other pins popup window gets closed - but we want the info in the pins to stay open - what to do?

//    L.marker([lat, lng]).addTo(map).bindPopup('Workout').openPopup();

//L.marker() is the code that creates the marker to the map. .addTo() is what adds the marker to the map.binbPopup() creates a popup and binds it to the marker - it can hold a string or something better, like an object with options!

//    L.marker([lat, lng]).addTo(map).bindPopup(L.popup({maxWidth: 250, minWidth:100, autoClose: false, closeOnClick: false, className: 'running-popup',})).openPopup();    in leaflet documentation you can see how to create an object for the popup. Docs, UI layers, POPUP - docs tell you that L.popup can take in an object of options which is what we will do - maxWidth and minWidth so the popup always has a nice size. Also change bahvior of the autoClose. Also closeOnClick change to false as well. LAstly className to assign any css class name we want to the popup which is useful for styling. (.leaflet-popup stuff) -- now the markers set with stylized popups

//Now need to set the text inside the marker popups as well. This is another method on the MArker inside the documentation - popup methods inherited from layer   setPopupContent() is what we are looking for to give the popup content. These methods are chainable

//     .setPopupContent('Workout')     This sets the popup text to workout =)

//in final app final marker is not put on map immediately bc the popup will contain data about the workout so first we need to get that data. So in the real world application when we click then the form opens so we can input our data first -- just like on the flow chart

//New Lesson - Rendering Workout Input Form
//We will render the workout input form now for whenever the user clicks on the map - we want to render the form which currently has the hidden class
//When a click on the map happens then we want to show a form so we will cancel out the other code we put in so far and make the form:

// map.on('click', function (mapEvent) {
// form.classList.remove('hidden');

//   console.log(mapEvent);
//   const { lat, lng } = mapEvent.latlng;

//   L.marker([lat, lng])
//     .addTo(map)
//     .bindPopup(
//       L.popup({
//         maxWidth: 250,
//         minWidth: 100,
//         autoClose: false,
//         closeOnClick: false,
//         className: 'running-popup',
//       })
//     )
//     .setPopupContent('Workout')
//     .openPopup();
// });
// },
// function () {
// alert('Could not get your location.');
// }
// );

//Now when we click the form turns up on the left side. For better UI it should imedately focus the cursor on the disance field.
// inputDistance.focus();

//Now we will add an event handler to the form to submit it -so when submit is clicked we want a marker to appear on the map at that place

//we will add the eventlistener outside of the gelocation set up so completely seperate from what we have done so far.
form.addEventListener('submit', function (e) {
  e.preventDefault();
  //Clear input fields
  inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value =
    '';

  //Display marker
  //   console.log(mapEvent);
  const { lat, lng } = mapEvent.latlng;

  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
      })
    )
    .setPopupContent('Workout')
    .openPopup();
});
//map and maEvent are not in the current scpope but we can create a global variable

//Now the marker and submit form submit but the form should disappear and values reset - lets clear input fields and hide the form later

//take all the values, inputdistance, cadence, duration, and input elevantion for cycing - we need to clear all of them

//Now we will listen to the change even on the type (running vs cycling)
inputType.addEventListener('change', function () {
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
});
//Now the cadenece and Elev Gain switch depending on the type selected. Next step is to take the data from the form and use it to create a workout. First our data needs some structure and we need a way of managing and storing the workout data too.

//Next Lesson - Project Architecture
//Now we should think about architecture -- we will use OOP with classes - architecture is abput structure. That main structure will come from classes and objects

//1 of most important considerations is deciding where and how to store the data. Data is key to any application - without data why have an app? The app must have data to run.

//The data we need to store and manage comes from the user story - location, distance, time, pace, steps/min and same for the second user but also elevation gain instead of steps/min

//We will design classes that can hold this type of data - we will have a parent class workout that will hold distance duration and coords and the child classes of running and cycling will have cadencae and pace and evelavtion and speed respectively

//reason we design classes like this is bc dist, dur and corrd are common to both activities - so go in parent. Same is true for some methods

//in OOP usually each class is represented by a box where the top part is the properties and the bottom part the methods.

//What code do we have to structure from previous lectures?
// 1) load page  2) receive position from geolocation (still an event even rthough not using addeventlistener) 3) click on the map 4) changing input from cyle to running    5) submitting a form

//Now we need to create different functions that can handle these different events  - so we will create a big class called app that will hold all of these functions as methods

//New Lesson - Refactoring for Project Architecture
//start by implementing the app class and all of the methods that go in it
class App {
  constructor() {
    this._getPosition(); //current position should be determined here then load map gets called with the current position
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        map._loadmap,
        function () {
          alert('Could not get your location.');
        } //js will call this._loadMap callback function and pass in the position argument as soon as the current position of the user is determined.
      );
    //the call bback function below got refactored into the app object and edited. This is the original below:

    // function (position) {
    //   const { latitude } = position.coords;
    //   const { longitude } = position.coords;
    //   //   console.log(latitude, longitude);
    //   console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

    //   const coords = [latitude, longitude];

    //   map = L.map('map').setView(coords, 13);

    //   L.tileLayer('https://{s}.google.com/vt/1yrs=m&x={x}&y={y}&z={z}', {
    //     maxZoom: 20,
    //     subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    //   }).addTo(map);

    //   map.on('click', function (mapE) {
    //     mapEvent = mapE;
    //     form.classList.remove('hidden');

    //     inputDistance.focus();

    //     // console.log(mapEvent);
    //     // const { lat, lng } = mapEvent.latlng;

    //     // L.marker([lat, lng])
    //     //   .addTo(map)
    //     //   .bindPopup(
    //     //     L.popup({
    //     //       maxWidth: 250,
    //     //       minWidth: 100,
    //     //       autoClose: false,
    //     //       closeOnClick: false,
    //     //       className: 'running-popup',
    //     //     })
    //     //   )
    //     //   .setPopupContent('Workout')
    //     //   .openPopup();
    //   });
    // },
    //     this._loadmap,
    //     function () {
    //       alert('Could not get your location.');
    //     } //js will call this._loadMap callback function and pass in the position argument as soon as the current position of the user is determined.
    //   );
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    //   console.log(latitude, longitude);
    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude];

    map = L.map('map').setView(coords, 13);

    L.tileLayer('https://{s}.google.com/vt/1yrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    }).addTo(map);

    map.on('click', function (mapE) {
      mapEvent = mapE;
      form.classList.remove('hidden');

      inputDistance.focus();
    });
  }

  _showForm() {}

  _toggleElevationField() {}

  _newWorkout() {}
}
//Now we have the strcuture where we can put our code

const app = new App(); //dont need arguments because the constructor doesnt have any. IF we needed we could add to the constructor - one example would be an object of options like in 3rd party libraries

//to trigger geolocation AP the _getPosition method must be called - how?
app._getPosition(); //this code would execute at the point where the app loads bc all the code in top level scope (outside functions) gets executed as the script loads as at the beginning the new app variable is created out of the class and then immediately afterwards we get the position of the user.

//Why do it outside instead of doing it inside the class? Inside the class we automatically have a method that is executed as soon as const app is created ---- that is the constructor method

//the contsructor method is called immediately when a new object is created from this class and the object created (app) is created when the page loads so the constructor is executed when the page loads so we can get the position in the constructor and change app to this._getPosition();
