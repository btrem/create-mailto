
'use strict'

window.addEventListener('DOMContentLoaded', () => {

    // output elements show test results
    const errorsOutput = document.querySelector('.errors > output');
    const resultOutput = document.querySelector('.result > output');

    // there should be no mailto: links anywhere in table body
    const errors = document.querySelectorAll('tbody a[href^="mailto:"]').length;

    errorsOutput.value = errors;
    resultOutput.value = (errors) ? 'failed' : 'passed';
    resultOutput.parentElement.parentElement.className = (errors) ? 'failed' : 'passed';

}); // end wrapper DOMContentLoaded function
