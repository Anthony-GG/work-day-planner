


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

  $(".saveBtn").click(function(){
    console.log("button pressed, value: ")
    console.log($(this).prev("textarea").val());
    console.log($(this).prev("textarea"));
    $(this).prev("textarea").val('');
  });

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
