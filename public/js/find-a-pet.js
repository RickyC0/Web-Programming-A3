function validateFormInput(){
    const form = document.getElementById('find-pet-form');

    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');

    
    const oldErrors = form.querySelectorAll('.error-message');
    oldErrors.forEach(function(error) {
        error.parentNode.removeChild(error);
    });

    requiredFields.forEach(function(field) {
        // Trim value for type="text" and type="email" inputs
        if(field.type === "text" || field.type === "email") {
            field.value = field.value.trim();
        }

        if (!field.value) {
            isValid = false;
            // Insert an error message after the field
            const errorMessage = document.createElement('div');
            errorMessage.textContent = 'This field is required';
            errorMessage.className = 'error-message';
            errorMessage.style.color = 'red';
            field.parentNode.insertBefore(errorMessage, field.nextSibling);
        }
    });

    if (isValid) {
        form.submit();
    } 
    
}