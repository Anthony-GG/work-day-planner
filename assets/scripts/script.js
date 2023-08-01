
$(function () {

  //Dummy spots filled in array, leaving open spots for the given day schedule
  var events = ["event1", "event2", "event3", "event4", "event5", "event6", "event7", "event8", "event9", "", "", "", "", "", "", "", "", "", "", ""];
  //parses local storage for saved events list
  var savedEvents = JSON.parse(localStorage.getItem("savedEvents"));
  if (savedEvents == null){
    savedEvents = events;
  }
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
    currentSection.css("color", "#FDDC74")
    setTimeout(function(){
      currentSection.val(content);
      currentSection.css("color", "#EEEEEE")
    }, 1000);
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
