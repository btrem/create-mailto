
'use strict'

window.addEventListener('DOMContentLoaded', () => {

    // output elements show test results
    const results = document.querySelector('p.results');
    const testsCount = document.querySelector('output.testsCount');
    const errorsCount = document.querySelector('output.errorsCount');
    const passFail = document.querySelector('output.passFail');

    // initialize errors
    let errors = 0;

    // number of tests is number of rows in table body
    testsCount.value = document.querySelectorAll('tbody > tr').length;

    // in table body with class=mailtoYep, there should be one mailto: link in each row;
    // get NodeList of rows in tbody class=mailtoYep
    const rows = document.querySelectorAll('tbody.mailtoYep > tr');
    // convert NodeList to array and search each row for mailto:
    Array.from(rows).forEach(function(row) {
        if (row.querySelectorAll('a[href^="mailto:"]').length !== 1) {
            errors += 1;
        }
    });

    // in table body with class=mailtoNope, there should be no mailto: links
    errors += document.querySelectorAll('tbody.mailtoNope a[href^="mailto:"]').length;

    errorsCount.value = errors;
    passFail.value = (errors) ? 'failed' : 'passed';
    results.className = (errors) ? 'failed' : 'passed';

}); // end wrapper DOMContentLoaded function
