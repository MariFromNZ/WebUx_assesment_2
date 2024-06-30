


//Validation for searchTransportForm
function validateForm() {

    var errors = [];

    if (document.getElementById("pickUpLocation").value === "Select pick up location") {
        errors.push("- Pick up location.");
    }

    if (document.getElementById("dropOffLocation").value === "Select drop-off location") {
        errors.push("- Drop-off location.");
    }

    if (document.getElementById("driverAge").value === "21") {
        errors.push("- Select driver age.");
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
document.getElementById("confirmationFormButton").onclick = function () {
    document.getElementById("confirmationForm").classList.add("hidden");
    document.getElementById("confirmationMessage").classList.remove("hidden");
};