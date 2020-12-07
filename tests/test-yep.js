
'use strict'

window.addEventListener('DOMContentLoaded', () => {

    // output elements show test results
    const errorsOutput = document.querySelector('.errors > output');
    const resultOutput = document.querySelector('.result > output');

    let errors = 0;
    // there should be one mailto: link for each row in the table body
    const rows = document.querySelectorAll('tbody > tr');
    Array.from(rows).forEach(function(row) {
        if (row.querySelectorAll('a[href^="mailto:"]').length !== 1) {
            errors += 1;
        }
    });

    errorsOutput.value = errors;
    resultOutput.value = (errors) ? 'failed' : 'passed';
    resultOutput.parentElement.parentElement.className = (errors) ? 'failed' : 'passed';

}); // end wrapper DOMContentLoaded function
