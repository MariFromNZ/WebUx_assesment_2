


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
document.getElementById("cardSelectButton").onclick = function () {
    document.getElementById("availableTransport").classList.add("hidden");
    document.getElementById("confirmationForm").classList.remove("hidden");
};

//Hide confirmationForm and shows confirmationMessage
// document.getElementById("confirmationFormButton").onclick = function () {
//     document.getElementById("confirmationForm").classList.add("hidden");
//     document.getElementById("confirmationMessage").classList.remove("hidden");
// };



//Validation for confirmationForm
// function validateConfirmationForm() {

//     var errors = [];

//     if (document.getElementById("inputFirstName").value.trim() === "") {
//         errors.push("- First name");
//     }

//     if (document.getElementById("inputLastName").value.trim() === "") {
//         errors.push("- Last name.");
//     }

//     if (errors.length > 0) {
//         errors.unshift("Please fill in all required fields to continue:");

//         alert(errors.join("\n"));
//         console.log()
//         return false;  
//     }
//     console.log()
//     document.getElementById("confirmationForm").classList.add("hidden");
//     document.getElementById("confirmationMessage").classList.remove("hidden");
//     return false;
// }


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
