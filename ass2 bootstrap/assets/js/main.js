


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

    if (document.getElementById("driverAge").value === "Select driver age") {
        errors.push("- Driver age.");
    }

    if (document.getElementById("pickUpDate").value === "") {
        errors.push("- Pick up date.");
    }

    if (document.getElementById("dropOffDate").value === "") {
        errors.push("- Drop-off date.");
    }

    if (errors.length > 0) {
        errors.unshift("Please fill in all required fields to continue:");//Insert text before all errors 

        alert(errors.join("\n"));//Separates errors
        return false;  //Prevent form submission
    }

    document.getElementById("exampleModal").classList.remove("hidden");//Shows modal

    return false;  //Prevent form submission to show modal first
}

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
    } else if (/^[A-Za-z]+$/.test(phoneNumber)) {//Check characters - only digits allowed 
        errors.push("- Phone number should contain only digits.");
    
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
let startDate, endDate, range;

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
          range = Math.ceil((endDate - startDate) / 86400000); //math.cell rounds up the result. 86400000 - amount od milliseconds in 1 day

          if (range > 15) {
            alert("Maximum allowed duration is 15 days.");
            instance.clear(); // Clear selection if duration is more then 15 days
          }

          if (range < 1) {
            alert("Please select 2 dates: for pick up and drop-off.");
            instance.clear(); // Clear selection if duration is less then 2 days
          }
        }
      }
});






var duration = range;

var transportType = document.getElementById("transportType").value.trim();

// disable transport cards buttons based on capacity 
function availabilityByCapasity(){

    var transportCapacity = document.getElementById("transportCapacity").value.trim();
    transportCapacity = parseInt(transportCapacity,10);

    console.log('capacity', transportCapacity);

    if ( range = 1 ) {
        document.getElementById("cardMotorbikeButton").classList.remove("disabled");
    } else {
        document.getElementById("cardMotorbikeButton").classList.add("disabled");
    }

    if ( range < 2 ) {
        document.getElementById("cardSmallCarButton").classList.remove("disabled");
    } else {
        document.getElementById("cardSmallCarButton").classList.add("disabled");
    }

    if ( range < 5) {
        document.getElementById("cardLargeCarButton").classList.remove("disabled");
    } else {
        document.getElementById("cardLargeCarButton").classList.add("disabled");
    }

    if ( range >= 2 && range < 6 ) {
        document.getElementById("cardMotorHomeButton").classList.remove("disabled");
    }else {
        document.getElementById("cardMotorHomeButton").classList.add("disabled");
    }

}
document.getElementById('btnSearchTransportForm').addEventListener('click', availabilityByCapasity);








// function calculateDuration(){
//     range = Math.ceil((endDate - startDate) / 86400000);

//     console.log('range',range);
// }



// function calculateDuration(){
//     range = Math.ceil((endDate - startDate) / 86400000);

//     console.log('range',range);

//     if (range => 2) {
//         alert("2 options are available");
//     }

//     if ( 1 <= range < 6 ) {
//         document.getElementById("cardMotorbikeButton").classList.remove("disabled");
//     } else {
//         document.getElementById("cardMotorbikeButton").classList.add("disabled");
//     }

//     if ( 1 <= range < 11 ) {
//         document.getElementById("cardSmallCarButton").classList.remove("disabled");
//     } else {
//         document.getElementById("cardSmallCarButton").classList.add("disabled");
//     }

//     if ( 3 <= range < 11 ) {
//         document.getElementById("cardLargeCarButton").classList.remove("disabled");
//     } else {
//         document.getElementById("cardLargeCarButton").classList.add("disabled");
//     }

//     if ( 2 <= range < 16 ) {
//         document.getElementById("cardMotorHomeButton").classList.remove("disabled");
//     }else {
//         document.getElementById("cardMotorHomeButton").classList.add("disabled");
//     }
// }

// document.getElementById('btnSearchTransportForm').addEventListener('click', calculateDuration);



//calculate duration and disable transport cards buttons based on duration
function calculateDuration(){
    range = Math.ceil((endDate - startDate) / 86400000);

    console.log('range',range);

    if (range => 2) {
        alert("2 options are available");
    }

    if ( range >= 1 && range < 6 ) {
        document.getElementById("cardMotorbikeButton").classList.remove("disabled");
    } else {
        document.getElementById("cardMotorbikeButton").classList.add("disabled");
    }

    if ( range >= 1 && range < 11) {
        document.getElementById("cardSmallCarButton").classList.remove("disabled");
    } else {
        document.getElementById("cardSmallCarButton").classList.add("disabled");
    }

    if ( range >= 3 && range < 11 ) {
        document.getElementById("cardLargeCarButton").classList.remove("disabled");
    } else {
        document.getElementById("cardLargeCarButton").classList.add("disabled");
    }

    if ( range >= 2 && range < 16 ) {
        document.getElementById("cardMotorHomeButton").classList.remove("disabled");
    }else {
        document.getElementById("cardMotorHomeButton").classList.add("disabled");
    }
}

document.getElementById('btnSearchTransportForm').addEventListener('click', calculateDuration);








//add disable class back when click a link
// $(document).ready(function() {
//     $('#goBackToSearch').on('click', function() {
//         $("#cardMotorbikeButton, #cardSmallCarButton, #cardLargeCarButton, #cardMotorHomeButton").addClass("disabled");
//     });
// });