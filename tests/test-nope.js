
'use strict'

window.addEventListener('DOMContentLoaded', () => {

    // output elements show test results
    const results = document.querySelector('p.results');
    const testsCount = document.querySelector('output.testsCount');
    const errorsCount = document.querySelector('output.errorsCount');
    const passFail = document.querySelector('output.passFail');

    const rows = document.querySelectorAll('tbody > tr');
    // there should be no mailto: links anywhere in table body
    const errors = document.querySelectorAll('tbody a[href^="mailto:"]').length;

    testsCount.value = rows.length;
    errorsCount.value = errors;
    passFail.value = (errors) ? 'failed' : 'passed';
    results.className = (errors) ? 'failed' : 'passed';

}); // end wrapper DOMContentLoaded function
