function validateFormInput() {
    const form = document.getElementById('pet-form');

    // Remove existing error messages
    const oldErrors = form.querySelectorAll('.error-message');
    oldErrors.forEach(function (error) {
        error.parentNode.removeChild(error);
    });


    const requiredFields = form.querySelectorAll('[required]');
    let allFieldsValid = true;

    requiredFields.forEach(function (field) {
        let fieldIsValid = true;

        if (field.type === "text" || field.type === "email") {
            field.value = field.value.trim();
        }

        // Check if the field is empty
        if (!field.value) {
            fieldIsValid = false;
        }
        // Check if the field matches the pattern
        else if (field.getAttribute('pattern') && !new RegExp(field.getAttribute('pattern')).test(field.value)) {
            fieldIsValid = false;
        }

        // If the individual field is not valid, show an error message
        if (!fieldIsValid) {
            allFieldsValid = false;

            // Insert an error message after the field
            const errorMessage = document.createElement('div');
            errorMessage.textContent = field.type === "email" ? 'Please enter a valid email address.' : 'This field is required';
            errorMessage.className = 'error-message';
            errorMessage.style.color = 'red';
            field.classList.add('invalid');
            field.parentNode.insertBefore(errorMessage, field.nextSibling);
        } else {
            field.classList.remove('invalid'); // Remove the class if the field is valid
        }
    });


    return allFieldsValid;
}

document.getElementById('pet-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(this); // Create a FormData object from the form

    fetch('/ex4/give-pet/form', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json()) // Assuming the server responds with JSON
        .then(data => {
            alert('Form data saved successfully!'); // Display an alert on success
            document.getElementById('pet-form').reset();

        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to save the form data.'); // Display an error alert
        });
});

