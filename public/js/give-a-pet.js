function validateFormInput(){
    const form = document.getElementById('pet-form');

    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');

    
    const oldErrors = form.querySelectorAll('.error-message');
    oldErrors.forEach(function(error) {
        error.parentNode.removeChild(error);
    });

    requiredFields.forEach(function(field) {

        if (field.type === "text" || field.type === "email") {
            field.value = field.value.trim();
        }

        if (!field.value) {
            isValid = false;
        }
        
        else if (field.getAttribute('pattern') && !new RegExp(field.getAttribute('pattern')).test(field.value)) {
            isValid = false;
        }

        if (!isValid) {
            // Insert an error message after the field
            const errorMessage = document.createElement('div');
            errorMessage.textContent = field.type === "email" ? 'Please enter a valid email address.' : 'This field is required';
            errorMessage.className = 'error-message';
            errorMessage.style.color = 'red';
            field.parentNode.insertBefore(errorMessage, field.nextSibling);
        }
    });


    if (isValid) {
        form.submit();
    } 
    
}