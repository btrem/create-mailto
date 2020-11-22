/*
 * create-mailto.js
 *
 * version 0.6
 *
 * find email addresses in web pages and turn them into clickable <a href=mailto>
 */

'use strict'

var elementCollection, emailAddress, mailtoElement;

// interactive elements that have to be handled specially
const interactiveElements = 'a, audio, button, details, input, label, meter, progress, select, textarea, video';

// container elements that have to handled specially
const containerElements = 'fieldset, form, iframe, math';

const excludeClass = '.exclude-create-mailto';

window.addEventListener('DOMContentLoaded', () => {

    // get elements inside  <body> whose class attribute includes 'email', 'u-email', or 'p-email';
	// or whose itemprop attribute includes 'email'; or with a data-email attribute

    elementCollection = document
        .querySelector('body')
        .querySelectorAll('.email, .u-email, .p-email, [itemprop~=email], [data-email]');

    elementCollection.forEach(function(el) {

        // exclude problem elements and elements with special exclude class
        if ( el.matches(interactiveElements + ',' + containerElements + ',' + excludeClass) ) {
            return;
        }
	    // exclude element if it has problem descendents
        if ( el.querySelector(interactiveElements + ',' + containerElements)  ) {
            return;
        }
	    // exclude element if it has problem ancestors
        if ( el.closest(interactiveElements) ) {
            return;
        }

        // get email address from data-email attribute (preferred) or text content
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
