


//Validation for searchTransportForm
function validateForm() {

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


//Validation for confirmationForm  - Check that characters only letters
function validateConfirmationForm() {
    var errors = [];

    var firstName = document.getElementById("inputFirstName").value.trim();
    var lastName = document.getElementById("inputLastName").value.trim();

    if (firstName === "") {
        errors.push("- First name is required");
    } else if (!/^[A-Za-z]+$/.test(firstName)) {//Check that characters only letters
        errors.push("- First name should contain only letters.");
    }

    if (lastName === "") {
        errors.push("- Last name is required");
    } else if (!/^[A-Za-z]+$/.test(lastName)) {
        errors.push("- Last name should contain only letters.");
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

