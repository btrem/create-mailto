
'use strict'

window.addEventListener('DOMContentLoaded', () => {

    // output elements show test results
    const results = document.querySelector('p.results');
    const testsCount = document.querySelector('output.testsCount');
    const errorsCount = document.querySelector('output.errorsCount');
    const passFail = document.querySelector('output.passFail');

    let errors = 0;
    // there should be one mailto: link for each row in the table body
    const rows = document.querySelectorAll('tbody > tr');
    Array.from(rows).forEach(function(row) {
        if (row.querySelectorAll('a[href^="mailto:"]').length !== 1) {
            errors += 1;
        }
    });

    testsCount.value = rows.length;
    errorsCount.value = errors;
    passFail.value = (errors) ? 'failed' : 'passed';
    results.className = (errors) ? 'failed' : 'passed';

}); // end wrapper DOMContentLoaded function
