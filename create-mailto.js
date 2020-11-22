/*
 * create-mailto.js
 *
 * version 0.5
 *
 * find email addresses in web pages and turn them into clickable <a href=mailto>
 */

'use strict'

var elementCollection, emailAddress, mailtoElement;

// elements that can't be made into, nor be ancestors of, nor be inside anchor links
const forbiddenElements = [
    'a', 'audio', 'button', 'details', 'input', 'label', 'meter', 'progress', 'select', 'textarea', 'video'
];

// elements that can't be anchor links, nor be inside anchors (as above),
// but can be ancestors (e.g., a form can have a link inside)
let forbiddenElementsPlus = forbiddenElements;
forbiddenElementsPlus.push('fieldset', 'form', 'iframe', 'math');

// TODO improve variable names for forbidden elements

window.addEventListener('DOMContentLoaded', () => {

    // get elements inside  <body> whose class attribute includes 'email', 'u-email', or 'p-email';
	// or whose itemprop attribute includes 'email'; or with a data-email attribute

    elementCollection = document.querySelector('body');

    elementCollection = elementCollection.querySelectorAll('.email, .u-email, .p-email, [itemprop~=email], [data-email]');

    elementCollection.forEach(function(el){

	    // exclude elements that are can't be/contain/be inside of anchor links

        if ( forbiddenElementsPlus.includes( el.tagName.toLowerCase() ) ) {
            return;
        }
        if ( el.querySelectorAll( forbiddenElementsPlus.join() ).length ) {
            return;
        }
        if ( el.closest( forbiddenElements.join() ) ) {
            return;
        }

        // get email address, preferring data-email attribute when it's available, text content if not
		emailAddress = el.dataset.email || el.innerText;

		emailAddress = emailAddress.trim();

		// validate email address
		if (/^[^@]+@[^@.]+\.[^@]*\w\w$/.test(emailAddress)) {

			// create empty <a> element with mailto: set to validated email address
			mailtoElement = document.createElement('a');
            mailtoElement.setAttribute('href', 'mailto:' + emailAddress);

            // insert new empty <a> element in dom before target element
            el.parentElement.insertBefore(mailtoElement, el);

			// if target element is <img>, it is void; move <img> inside <a>
			if(el.tagName.toLowerCase() == 'img') {
                mailtoElement.append(el);
			}
			// not void; move _contents_ of target element inside <a>, then move <a> inside taget element
            else {
                while (el.firstChild) {
                    mailtoElement.appendChild(el.firstChild);
                }
                el.append(mailtoElement);
            }

		} // end if valid email address

    });

}); // end wrapper DOMContentLoaded function
