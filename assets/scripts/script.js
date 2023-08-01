


// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  //Dummy spots filled in array, leaving open spots for the given day schedule
  var events = ["event1", "event2", "event3", "event4", "event5", "event6", "event7", "event8", "event9", "", "", "", "", "", "", "", "", "", "", ""];
  //parses local storage for saved events list
  var savedEvents = JSON.parse(localStorage.getItem("savedEvents"));

  //PURPOSE: saved the given text to localStorage to persist on the page even after refreshes
  //PARAMETERS: a click on any 'save' button
  //RETURNS: NONE
  $(".saveBtn").click(function(){
    //selects content and content position
    content = $(this).prev("textarea").val();
    position = $(this).parent().attr("id").slice(5);
    currentSection = $(this).prev("textarea");

    //saves content to array in given position and updates the savedEvents which is then saved in local storage
    events[Number(position)] = content;
    savedEvents = JSON.stringify(events)
    localStorage.setItem("savedEvents", savedEvents)
    
    //gives user indication of being 'saved' via popup that appears and then disappears
    currentSection.val('SAVED');
    currentSection.css("color", "#2E9CFB")
    setTimeout(function(){
      currentSection.val(content);
      currentSection.css("color", "black")
    }, 2000);
  });



  setEvents();
  function setEvents() {
    for (var i = 9; i < 18; i++) {
        $("#hour-" + i).find("textarea").val(savedEvents[i]);
      }
    }

//Initially sets the time section colors and setInterval continues to call the function every minute
  setScheduleColor();
  setInterval(setScheduleColor, 60000)
//PURPOSE: updates the colors of the different time sections based on the current real world time
//PARAMETERS: NONE
//RETURNS: NONE
  function setScheduleColor(){
  for (var i = 9; i < 18; i++) {
    var currentHour = moment().format("H");
    if (Number(currentHour) === i) {
      $("#hour-" + i).removeClass()
      $("#hour-"+ i).addClass("row time-block present");
    } else if(Number(currentHour) < i) {
      $("#hour-" + i).removeClass()
      $("#hour-"+ i).addClass("row time-block future");
    } else {
      $("#hour-" + i).removeClass()
      $("#hour-"+ i).addClass("row time-block past");
    }
  }
}

  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //


//Initially sets the datetime at the top of the page and setInterval continues to call the function every second
  update();
  setInterval(update, 1000);

//PURPOSE: updates the datetime at the top of the page
//PARAMETERS: NONE
//RETURNS: NONE
  function update() {
    var currentDateTime = moment().format("MMMM Do YYYY, h:mm:ss a");
    $("#currentDay").text(currentDateTime);
  }
});
