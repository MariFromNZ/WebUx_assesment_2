


//Validation for searchTransportForm
function validateForm() {

    var theForm = document.querySelector("#searchTransportForm");

    theForm.noValidate = true;

    var errors = [];

    if (document.getElementById("pickUpLocation").value === "Select pick up location") {
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

    document.getElementById("exampleModal").classList.remove("hidden");//Shows modal

    return false;  //Prevent form submission to show modal first
}



 
function tripDistanceValuation(){
    var tripDistance = document.getElementById("tripDistance").value.trim();
    var errors = [];

    if (tripDistance !== "" && !/^\d+$/.test(tripDistance)) {
        errors.push("- Trip distance should contain only digits.");
    }
    if (errors.length > 0) {
        alert(errors.join("\n"));
        return false;
    }
   
    return false; 
}
document.getElementById('btnSearchTransportForm').addEventListener('click', tripDistanceValuation);



//Hide searchTransportForm and shows availableTransport
document.getElementById("modalOkButton").onclick = function () {
    document.getElementById("exampleModal").classList.add("hidden");
    document.getElementById("searchTransportForm").classList.add("hidden");
    document.getElementById("h1Title").classList.add("hidden");
    document.getElementById("availableTransport").classList.remove("hidden");
};

//Hide availableTransportForm and shows confirmationForm
// document.getElementById("cardSelectButton").onclick = function () {
//     document.getElementById("availableTransport").classList.add("hidden");
//     document.getElementById("confirmationForm").classList.remove("hidden");
// };

//Hide availableTransportForm and shows confirmationForm for all cards 
$(document).ready(function() {
    $(".cardSelectButton").on("click", function() {
        $("#availableTransport").addClass("hidden");
        $("#confirmationForm").removeClass("hidden");
    });
});



//Validation for confirmationForm 
function validateConfirmationForm() {

    var theForm = document.querySelector("#confirmationForm"); 
    theForm.noValidate = true;//to remove html5 validation - do I really need it?

    var errors = [];

    var firstName = document.getElementById("inputFirstName").value.trim();
    var lastName = document.getElementById("inputLastName").value.trim();
    var phoneNumber = document.getElementById("inputPhone").value.trim();
    var emailAddress = document.getElementById("inputEmail").value.trim();

    if (firstName === "") {
        errors.push("- First name is required");
    } else if (!/^[A-Za-z]+$/.test(firstName)) {//Check characters - only letters allowed
        errors.push("- First name should contain only letters.");
    }

    if (lastName === "") {
        errors.push("- Last name is required");
    } else if (!/^[A-Za-z]+$/.test(lastName)) {//Check characters - only letters allowed
        errors.push("- Last name should contain only letters.");
    }

    if (phoneNumber === "") {
        errors.push("- Phone number is required");
    // } else if (!/^\d+$/.test(phoneNumber)) {//Check characters - only digits allowed 
    //     errors.push("- Phone number should contain only digits.");
    
    } else if (!/^\+[\d\s\-()]+$/.test(phoneNumber)) {//Check format - "+" in the begining followed by numbers /^\d+$/  ^\\+[1-9]\\\\d{1,14}$
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

    document.getElementById("confirmationForm").classList.add("hidden");
    document.getElementById("confirmationMessage").classList.remove("hidden");
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
let startDate, endDate, duration;

flatpickr("#pickUpDate", {
    minDate: "today", // Disable previous days
    mode: "range",
    minRange: 1,
    maxRange: 15,
    plugins: [new rangePlugin({ input: "#dropOffDate" })], // Range plagin for two inputs with range in calendar

      onChange: function(selectedDates, dateStr, instance) {// Calculate difference
        if (selectedDates.length > 1) {
          startDate = selectedDates[0];
          endDate = selectedDates[selectedDates.length - 1];
          duration = Math.ceil((endDate - startDate) / 86400000); //math.cell rounds up the result. 86400000 - amount od milliseconds in 1 day

          if (duration > 15) {
            alert("Maximum allowed duration is 15 days.");
            instance.clear(); // Clear selection if duration is more then 15 days
          }

          if (duration < 1) {
            alert("Please select 2 dates: for pick up and drop-off.");
            instance.clear(); // Clear selection if duration is less then 2 days
          }
        }
      }
});

// disable transport cards buttons based on capacity 
function availabilityByCapasity(){

    var transportCapacity = document.getElementById("transportCapacity").value;
  
    transportCapacity = parseInt(transportCapacity);

    if ( transportCapacity > 1 ) {
        document.getElementById("cardMotorbikeButton").classList.add("disabled");
    }

    if ( transportCapacity > 2 ) {
        document.getElementById("cardSmallCarButton").classList.add("disabled");
    }

    if ( transportCapacity > 5) {
        document.getElementById("cardLargeCarButton").classList.add("disabled");
    }

    if ( transportCapacity < 2 || transportCapacity > 6) {
        document.getElementById("cardMotorHomeButton").classList.add("disabled");
    }

}
document.getElementById('btnSearchTransportForm').addEventListener('click', availabilityByCapasity);

//calculate duration and disable transport cards buttons based on duration
function calculateDuration(){

    if ( duration > 5 ) {
        document.getElementById("cardMotorbikeButton").classList.add("disabled");
    }

    if ( duration > 10) {
        document.getElementById("cardSmallCarButton").classList.add("disabled");
    }

    if ( duration < 3 || duration > 10 ) {
        document.getElementById("cardLargeCarButton").classList.add("disabled");
    }

    if ( duration < 2 || duration > 15 ) {
        document.getElementById("cardMotorHomeButton").classList.add("disabled");
    }
}

document.getElementById('btnSearchTransportForm').addEventListener('click', calculateDuration);

//remove disable class when click a link
$(document).ready(function() {
    $('.goBackToSearch').on('click', function() {
        $("#cardMotorbikeButton, #cardSmallCarButton, #cardLargeCarButton, #cardMotorHomeButton").removeClass("disabled");
    });

    console.log('ALL RESET')
});

//calculate fuel consumption based on distance and transport type
const motorbikeFuelConsumption = 3.7;
const smallCarFuelConsumption = 8.5;
const largeCarFuelConsumption = 9.7;
const motorHomeFuelConsumption = 17;

function calculateFuel(){
    var kmInput = document.getElementById("tripDistance").value.trim();//take value from input
    distance = parseInt(kmInput,10);

    motorbikeTripFuel = (distance * motorbikeFuelConsumption) / 100; //calculate trip fuel for each type 
    smallCarTripFuel = (distance * smallCarFuelConsumption) / 100;
    largeCarTripFuel = (distance * largeCarFuelConsumption) / 100;
    motorHomeTripFuel = (distance * motorHomeFuelConsumption) / 100;

    // console.log('motorbikeTripFuel', motorbikeTripFuel);
    // console.log('smallCarTripFuel', smallCarTripFuel);
    // console.log('largeCarTripFuel', largeCarTripFuel);
    // console.log('motorHomeTripFuel', motorHomeTripFuel);


    $( "#motorbikeTripFuel span" ).replaceWith('<span>' + motorbikeTripFuel + '</span>');//replace span in transport card to show ftrip fuel consumption
    $( "#smallCarTripFuel span" ).replaceWith('<span>' + smallCarTripFuel + '</span>');
    $( "#largeCarTripFuel span" ).replaceWith('<span>' + largeCarTripFuel + '</span>');
    $( "#motorHomeTripFuel span" ).replaceWith('<span>' + motorHomeTripFuel + '</span>');

}

document.getElementById('btnSearchTransportForm').addEventListener('click', calculateFuel);

//calculate total rent fee for each type based on duration(days)
const motorbikeRentFee = 109;
const smallCarRentFee = 129;
const largeCarRentFee = 144;
const motorHomeRentFee = 200;

function calculateTotalFee(){


    motorbikeTotalFee = duration * motorbikeRentFee; //calculate total fee for each type 
    smallCarTotalFee = duration * smallCarRentFee;
    largeCarTotalFee = duration * largeCarRentFee;
    motorHomeTotalFee = duration * motorHomeRentFee;

    console.log('motorbikeTotalFee', motorbikeTotalFee);
    console.log('smallCarTotalFee', smallCarTotalFee);
    console.log('largeCarTotalFee', largeCarTotalFee);
    console.log('motorHomeTripFuel', motorHomeTotalFee);


    $( "#motorbikeTotalFee span" ).replaceWith('<span>' + motorbikeTotalFee + '</span>');//replace span in transport card to show total fee for particular duration
    $( "#smallCarTotalFee span" ).replaceWith('<span>' + smallCarTotalFee + '</span>');
    $( "#largeCarTotalFee span" ).replaceWith('<span>' + largeCarTotalFee + '</span>');
    $( "#motorHomeTotalFee span" ).replaceWith('<span>' + motorHomeTotalFee + '</span>');

}

document.getElementById('btnSearchTransportForm').addEventListener('click', calculateTotalFee);


//Hide cinfirmationForm and shows availableTransport again
document.getElementById("goBackToAvailableTransport").onclick = function () {
    document.getElementById("confirmationForm").classList.add("hidden");
    document.getElementById("availableTransport").classList.remove("hidden");
};

// disable transport cards buttons based on transport type 
function availabilityByType(){

    var transportType = document.getElementById("transportType").value;
  
    transportType = parseInt(transportType);

    if ( transportType === 1 ) {
        document.getElementById("cardSmallCarButton").classList.add("disabled");
        document.getElementById("cardLargeCarButton").classList.add("disabled");
        document.getElementById("cardMotorHomeButton").classList.add("disabled");
    }

    if ( transportType === 2 ) {
        document.getElementById("cardMotorbikeButton").classList.add("disabled");
        document.getElementById("cardLargeCarButton").classList.add("disabled");
        document.getElementById("cardMotorHomeButton").classList.add("disabled");
    }

    if ( transportType === 3 ) {
        document.getElementById("cardMotorbikeButton").classList.add("disabled");
        document.getElementById("cardSmallCarButton").classList.add("disabled");
        document.getElementById("cardMotorHomeButton").classList.add("disabled");
    }

    if ( transportType === 4 ) {
        document.getElementById("cardMotorbikeButton").classList.add("disabled");
        document.getElementById("cardSmallCarButton").classList.add("disabled");
        document.getElementById("cardLargeCarButton").classList.add("disabled");
    }

}
document.getElementById('btnSearchTransportForm').addEventListener('click', availabilityByType);