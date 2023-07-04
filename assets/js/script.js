

 

$(function () {

//NOTIFICATION

  $('.saveBtn').on('click', function () {
    var timeBlockId = $(this).parent().attr('id'); // Get the id of the parent time-block
    var description = $(this).siblings('.description').val(); // Get the value of the description textarea
  
    // SAVING THE TIME 
    localStorage.setItem(timeBlockId, description);
  
    // SHOW NOTIFICATION
    var notification = $('<div>').addClass('notification').text('Appointment added to LocalStorage ✔');
    $('.container-fluid').prepend(notification);
  
    setTimeout(function () {
      notification.remove();
    }, 3000);
  });
  

  //CHECK HOUR STATUS

  function checkHourStatus() {
    const currentHour = dayjs().format('HH');
  
    //THIS IS THE LOOP
    $('.time-block').each(function () {
      const hourBlock = parseInt($(this).attr('id').split('-')[1]);
  
      //COMPARE TIME BLOCK WITH DEFAULT HOUR
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

  var currentHour = dayjs().format('HH'); 

  $('.time-block').each(function() {
    var timeBlockHour = parseInt($(this).attr('id').split('-')[1]); 

    //ADJUSTING THE TIME
    timeBlockHour += 9;
  
    if (timeBlockHour < currentHour) {
      $(this).removeClass('present future').addClass('past');
    } else if (timeBlockHour === currentHour) {
      $(this).removeClass('past future').addClass('present');
    } else {
      $(this).removeClass('past present').addClass('future');
    }
  });
  


  //GETTING USER INPUT


  $('.time-block').each(function() {
    var timeBlockId = $(this).attr('id'); 
    var description = localStorage.getItem(timeBlockId); 
  
    if (description) {
      $(this).find('.description').val(description); 
    }
  });
  
  checkHourStatus();

  // TODO: Add code to display the current date in the header of the page.

  var currentDate = dayjs().format('MMMM D, YYYY'); 
  $('#currentDay').text(currentDate); 

});
