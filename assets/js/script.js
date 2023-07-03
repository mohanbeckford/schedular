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


  //NOTIFICATION

  $('.saveBtn').on('click', function () {
    var timeBlockId = $(this).parent().attr('id'); // Get the id of the parent time-block
    var description = $(this).siblings('.description').val(); // Get the value of the description textarea
  
    // Save the user input in local storage using the timeBlockId as the key
    localStorage.setItem(timeBlockId, description);
  
    // Show notification
    var notification = $('<div>').addClass('notification').text('Appointment added to LocalStorage ✔');
    $('.container-fluid').prepend(notification);
  
    // Remove the notification after 3 seconds
    setTimeout(function () {
      notification.remove();
    }, 3000);
  });
  


  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  //CHECK HOUR STATUS

  function checkHourStatus() {
    // Get the current hour using Day.js in 24-hour format
    const currentHour = dayjs().format('HH');
  
    // Loop through each time block
    $('.time-block').each(function () {
      const hourBlock = parseInt($(this).attr('id').split('-')[1]);
  
      // Compare the current hour with the hour of the time block
      if (hourBlock < currentHour) {
        $(this).removeClass('present future past').addClass('past');
      } else if (hourBlock === currentHour) {
        $(this).removeClass('past future').addClass('present');
      } else {
        $(this).removeClass('past present').addClass('future');
      }
      
    });

    checkHourStatus();
  }


  //CURRENT HOUR

  var currentHour = dayjs().format('HH'); // Get the current hour in 24-hour time format

  $('.time-block').each(function() {
    var timeBlockHour = parseInt($(this).attr('id').split('-')[1]); // Get the hour from the id

    // Adjust the time block hour by subtracting 9 to make it relative to 9am
    timeBlockHour += 9;
  
    if (timeBlockHour < currentHour) {
      $(this).removeClass('present future').addClass('past');
    } else if (timeBlockHour === currentHour) {
      $(this).removeClass('past future').addClass('present');
    } else {
      $(this).removeClass('past present').addClass('future');
    }
  });
  


  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //


  $('.time-block').each(function() {
    var timeBlockId = $(this).attr('id'); // Get the id of the time-block
    var description = localStorage.getItem(timeBlockId); // Retrieve the user input from local storage
  
    if (description) {
      $(this).find('.description').val(description); // Set the value of the textarea
    }
  });
  
  checkHourStatus();

  // TODO: Add code to display the current date in the header of the page.


  var currentDate = dayjs().format('MMMM D, YYYY'); // Get the current date in the desired format
  $('#currentDay').text(currentDate); // Set the text of the element with id 'currentDay'
  

});
