

// for elements in progress registerBtn
// var registerBtn = document.getElementById('registerBtn');
// registerBtn.addEventListener('click', function() {
//     alert('Sorry, still in development');
// });

// // for login
// var loginBtn = document.getElementById('loginBtn');
// loginBtn.addEventListener('click', function() {
//     var userNameInput = document.getElementById('name').value;
//     var passwordInput = document.getElementById('password').value;
//     if(userNameInput === 'Mariia' && passwordInput === '123')
//     {

//     }
//     else{
//         alert('Username or password is not correct. Try username - Mariia, password - 123')
//     }      
// });




// flatpickr({
//     "plugins": [new rangePlugin({ input: "#secondRangeInput"})]
// });


// flatpickr("#firstRangeInput", {
//     minDate: "today",
//     plugins: [new rangePlugin({ input: "#secondRangeInput" })]
// });

// flatpickr('#secondRangeInput', {
//     "mode": "range"
// });


// flatpickr("#firstRangeInput", {
//     minDate: "today",
//     plugins: [new rangePlugin({ input: "#secondRangeInput" })],

//     onClose: function(selectedDates, dateStr, instance) {
//         let daysInRange = document.getElementsByClassName('inRange');
//         let daysLengthTotal = daysInRange.length + 1;
//         console.log(daysLengthTotal);
//       }
// });

// flatpickr("#firstRangeInput", {
//     minDate: "today",
//     mode: "range",
//     minRange: 1,
//     maxRange: 15,
//     plugins: [new rangePlugin({ input: "#secondRangeInput" })],

//     onClose: function(selectedDates, dateStr, instance) {
//         let daysInRange = document.getElementsByClassName('inRange');
//         let daysLengthTotal = daysInRange.length + 1;
//         console.log(daysLengthTotal);
//       }
// });


//date picker library Flatpickr
flatpickr("#firstRangeInput", {
    minDate: "today", // Disable previous days
    mode: "range",
    minRange: 1,
    maxRange: 15,
    plugins: [new rangePlugin({ input: "#secondRangeInput" })], // Range plagin for two inputs with range in calendar

      onChange: function(selectedDates, dateStr, instance) {// Calculate difference
        if (selectedDates.length > 1) {
          let startDate = selectedDates[0];

          console.log('selectedDates',selectedDates);

          let endDate = selectedDates[selectedDates.length - 1];
          let range = Math.ceil((endDate - startDate) / 86400000); //math.cell rounds up the result. 86400000 - amount od milliseconds in 1 day

          console.log(range);

          if (range > 15) {
            alert("Maximum allowed duration is 15 days.");
            instance.clear(); // Clear selection if duration is more then 15 days
          }
        }
      }
});
