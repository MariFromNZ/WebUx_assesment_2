//Validation for searchTransportForm
function validateForm() {
    var theForm = document.querySelector("#searchTransportForm");
    theForm.noValidate = true;// disable HTML5 validation
    var errors = [];//create array for errors

    if (document.getElementById("pickUpLocation").value === "Select pick up location") {//take value from input and check if user select any option
        errors.push("- Pick up location.");
    }

    if (document.getElementById("dropOffLocation").value === "Select drop-off location") {
        errors.push("- Drop-off location.");
    }

    if (document.getElementById("pickUpDate").value === "") {
        errors.push("- Pick up date.");
    }

    if (document.getElementById("dropOffDate").value === "") {
        errors.push("- Drop-off date.");
    }
    
    if (document.getElementById("driverAge").value === "Select driver age") {
        errors.push("- Driver age.");
    }

    if (errors.length > 0) {
        errors.unshift("Please fill in all required fields to continue:");//Insert text before all errors 

        alert(errors.join("\n"));//Separates errors
        return false;  //Prevent form submission
    }

    $("#exampleModal").removeClass("hidden");//Shows modal by remove class hidden

    return false;  //Prevent form submission to show modal first
}

//Validation for searchTransportForm
function tripDistanceValidation() {
    var tripDistance = document.getElementById("tripDistance").value.trim();//take value from input and remove any whitespace
    var errors = [];

    if (tripDistance !== "" && !/^\d+$/.test(tripDistance)) {//check characters - only letters allowed
        errors.push("- Trip distance should contain only digits.");
    }
    if (errors.length > 0) {
        alert(errors.join("\n"));
        return false;
    }
   
    return false; 
}
document.getElementById('btnSearchTransportForm').addEventListener('click', tripDistanceValidation);

//Hide searchTransportForm and shows availableTransport by adding  or removing class hidden
document.getElementById("modalOkButton").onclick = function () {
    $("#exampleModal, #searchTransportForm, #h1Title").addClass("hidden");
    $("#availableTransport").removeClass("hidden");
};

//Hide availableTransportForm and shows confirmationForm for all card buttons 
$(document).ready(function() {
    $(".cardSelectButton").on("click", function() {
        $("#availableTransport").addClass("hidden");
        $("#confirmationForm").removeClass("hidden");
    });
});

//Validation for confirmationForm 
function validateConfirmationForm() {
    var theForm = document.querySelector("#confirmationForm"); 
    theForm.noValidate = true;//disable HTML5 validation

    var errors = [];

    var firstName = $.trim($("#inputFirstName").val());//take value from input and remove whitespace
    var lastName = $.trim($("#inputLastName").val());
    var phoneNumber = $.trim($("#inputPhone").val());
    var emailAddress = $.trim($("#inputEmail").val());


    if (firstName === "") {
        errors.push("- First name is required");
    } else if (!/^[A-Za-z]+$/.test(firstName)) {//check characters - only letters allowed
        errors.push("- First name should contain only letters.");
    }

    if (lastName === "") {
        errors.push("- Last name is required");
    } else if (!/^[A-Za-z]+$/.test(lastName)) {//check characters - only letters allowed
        errors.push("- Last name should contain only letters.");
    }

    if (phoneNumber === "") {
        errors.push("- Phone number is required");
    } else if (!/^\+[\d\s\-()]+$/.test(phoneNumber)) {//check format - "+" in the begining followed by numbers /^\d+$/  ^\\+[1-9]\\\\d{1,14}$
        errors.push("- Phone number should be in the format +6402041975383");
    }

    if (emailAddress === "") {
        errors.push("- Email address is required.");
    } else if (!/^([a-z0-9_.\-+]+)@([\da-z.-]+)(\.([a-z]{2,}))+$/.test(emailAddress)) {//Validate email format
        errors.push("- Invalid email address.");
    }

    if (errors.length > 0) {
        errors.unshift("Please fill in all required fields correctly:");
        alert(errors.join("\n"));
        return false;  
    }

    $("#confirmationForm").addClass("hidden");
    $("#confirmationMessage").removeClass("hidden");
    return false;
}

//remove classes for responsive design based on screen size
$(document).ready(function () {
    function screenSizeResponsive() {
        if ($(window).width() < 1200) {
            $("#h1Title").removeClass("floatLeft");
            $("#searchTransportForm").removeClass("floatRight");
        } else {
            $("#h1Title").addClass("floatLeft");// Add classes again for big screens
            $("#searchTransportForm").addClass("floatRight");
        }
    }

    screenSizeResponsive(); // Initial call on document ready

    $(window).resize(function () {
        screenSizeResponsive(); // Start function again for resize
    });
});

//date picker library Flatpickr
let startDate, endDate, duration;//need those to use later,so its outside the flatpickr

flatpickr("#pickUpDate", {
    minDate: "today", // Disable previous days
    mode: "range",
    minRange: 1,
    maxRange: 15,
    plugins: [new rangePlugin({ input: "#dropOffDate" })], //range plagin for two inputs with range in calendar

      onChange: function(selectedDates, dateStr, instance) {//calculate difference (days)
        if (selectedDates.length > 1) {
          startDate = selectedDates[0];
          endDate = selectedDates[selectedDates.length - 1];
          duration = Math.ceil((endDate - startDate) / 86400000); //math.cell rounds up the result. 86400000 - amount od milliseconds in 1 day

          if (duration > 15) {
            alert("Maximum allowed duration is 15 days.");
            instance.clear(); //clear selection if duration is more then 15 days
          }

          if (duration < 1) {
            alert("Please select 2 dates: for pick up and drop-off.");
            instance.clear(); //clear selection if duration is less then 2 days
          }
        }
      }
});

// Disable transport cards buttons based on capacity 
function availabilityByCapacity() {
    var transportCapacity = parseInt($("#transportCapacity").val());//take value from input and change from string to number

    if ( transportCapacity > 1 ) {//check capacity, if its not in trasport type range, transport card button will be disabled
        $("#cardMotorbikeButton").addClass("disabled");//add bootstrap class disable
    }

    if ( transportCapacity > 2 ) {
        $("#cardSmallCarButton").addClass("disabled");
    }

    if ( transportCapacity > 5) {
        $("#cardLargeCarButton").addClass("disabled");
    }

    if ( transportCapacity < 2 || transportCapacity > 6) {
        $("#cardMotorHomeButton").addClass("disabled");
    }
}
document.getElementById('btnSearchTransportForm').addEventListener('click', availabilityByCapacity);//call function on btn click

//Calculate duration and disable transport cards buttons based on duration
function calculateDuration() {

    if ( duration > 5 ) {//if duration is not in trasport type range, transport card button will be disabled
        $("#cardMotorbikeButton").addClass("disabled");
    }

    if ( duration > 10) {
        $("#cardSmallCarButton").addClass("disabled");
    }

    if ( duration < 3 || duration > 10 ) {
        $("#cardLargeCarButton").addClass("disabled");
    }

    if ( duration < 2 || duration > 15 ) {
        $("#cardMotorHomeButton").addClass("disabled");
    }
}

document.getElementById('btnSearchTransportForm').addEventListener('click', calculateDuration);//call function on btn click

//Remove disable class when click link class to reset card buttons to initial state (active)
$(document).ready(function() {
    $('.goBackToSearch').on('click', function() {
        $("#cardMotorbikeButton, #cardSmallCarButton, #cardLargeCarButton, #cardMotorHomeButton").removeClass("disabled");
    });
});

//Calculate fuel consumption based on distance and transport type
const MOTORBIKEFUELCONSUMPTION = 3.7;
const SMALLCARFUELCONSUMPTION = 8.5;
const LARGECARFUELCONSUMPTION = 9.7;
const MOTORHOMEFUELCONSUMPTION = 17;

function calculateFuel(){

    var distance = parseInt($.trim($("#tripDistance").val()));//take value from input and change from string to number

    var motorbikeTripFuel = (distance * MOTORBIKEFUELCONSUMPTION) / 100; //calculate trip fuel for each type 
    var smallCarTripFuel = (distance * SMALLCARFUELCONSUMPTION) / 100;
    var largeCarTripFuel = (distance * LARGECARFUELCONSUMPTION) / 100;
    var motorHomeTripFuel = (distance * MOTORHOMEFUELCONSUMPTION) / 100;

    $( "#motorbikeTripFuel span" ).replaceWith('<span>' + motorbikeTripFuel + '</span>');//replace span in transport card to show trip fuel consumption
    $( "#smallCarTripFuel span" ).replaceWith('<span>' + smallCarTripFuel + '</span>');
    $( "#largeCarTripFuel span" ).replaceWith('<span>' + largeCarTripFuel + '</span>');
    $( "#motorHomeTripFuel span" ).replaceWith('<span>' + motorHomeTripFuel + '</span>');
}

document.getElementById('btnSearchTransportForm').addEventListener('click', calculateFuel);//call function on btn click

//Calculate total rent fee for each type based on duration(days)
const MOTORBIKERENTFEE = 109;
const SMALLCARRENTFEE = 129;
const LARGECARRENTFEE = 144;
const MOTORHOMERENTFEE = 200;

function calculateTotalFee(){

    var motorbikeTotalFee = duration * MOTORBIKERENTFEE; //calculate total fee for each type 
    var smallCarTotalFee = duration * SMALLCARRENTFEE;
    var largeCarTotalFee = duration * LARGECARRENTFEE;
    var motorHomeTotalFee = duration * MOTORHOMERENTFEE;

    $( "#motorbikeTotalFee span" ).replaceWith('<span>' + motorbikeTotalFee + '</span>');//replace span in transport card to show total rent fee 
    $( "#smallCarTotalFee span" ).replaceWith('<span>' + smallCarTotalFee + '</span>');
    $( "#largeCarTotalFee span" ).replaceWith('<span>' + largeCarTotalFee + '</span>');
    $( "#motorHomeTotalFee span" ).replaceWith('<span>' + motorHomeTotalFee + '</span>');
}

document.getElementById('btnSearchTransportForm').addEventListener('click', calculateTotalFee);//call function on btn click

//Hide confirmationForm and shows availableTransport when user come back from confirmation form
document.getElementById("goBackToAvailableTransport").onclick = function () {
    $("#confirmationForm").addClass("hidden");
    $("#availableTransport").removeClass("hidden");
};

//Disable transport cards buttons based on transport type 
function availabilityByType() {
    var transportType = parseInt($("#transportType").val()); //take value and change it to number

    if ( transportType === 1 ) { //check type; if not the same -  transport card button will be disabled
        $("#cardSmallCarButton, #cardLargeCarButton, #cardMotorHomeButton").addClass("disabled");
    }

    if ( transportType === 2 ) {
        $("#cardMotorbikeButton, #cardLargeCarButton, #cardMotorHomeButton").addClass("disabled");
    }

    if ( transportType === 3 ) {
        $("#cardMotorbikeButton, #cardSmallCarButton, #cardMotorHomeButton").addClass("disabled");
    }

    if ( transportType === 4 ) {
        $("#cardMotorbikeButton, #cardSmallCarButton, #cardLargeCarButton").addClass("disabled");
    }
}

document.getElementById('btnSearchTransportForm').addEventListener('click', availabilityByType);//call function on btn click

//Chahge p in link on hover 
$(document).ready(function() {
    $(".link").on("mouseenter", function() {
        $(this).find('p').addClass('bold');
    }).on("mouseleave", function() {
        $(this).find('p').removeClass('bold');
    });
});

