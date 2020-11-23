/*
 * create-mailto.js
 *
 * version 0.6
 *
 * find email addresses in web pages and turn them into clickable <a href=mailto>
 */

'use strict'

var elementCollection, emailAddress, mailtoElement;

// elements that have to be handled specially
const specialElements =
    'a, audio, br, button, canvas, col, details, embed, hr, input, label, map, math, meter, object, param, progress, select, source, textarea, video';

// container elements that have to handled specially
const containerElements = 'fieldset, form, iframe';

const excludeClass = '.exclude-create-mailto';

window.addEventListener('DOMContentLoaded', () => {

    // get elements inside <body> whose class attribute includes 'email', 'u-email', or 'p-email';
	// or whose itemprop attribute includes 'email'; or with a data-email attribute

    elementCollection = document
        .getElementsByTagName('body')[0]
        .querySelectorAll('.email, .u-email, .p-email, [itemprop~=email], [data-email]');

    elementCollection.forEach(function(el) {

        // exclude problem elements and elements with special exclude class
        if ( el.matches(specialElements + ',' + containerElements + ',' + excludeClass) ) {
            return;
        }
	    // exclude element if it has problem descendents
        if ( el.querySelector(specialElements + ',' + containerElements)  ) {
            return;
        }
	    // exclude element if it has problem ancestors
        if ( el.closest(specialElements) ) {
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

			// if target element is <img>, it is void; move <img> inside <a>
			if (el.tagName.toLowerCase() == 'img') {
                // insert new empty <a> element into dom after target img element
                el.insertAdjacentElement('afterend', mailtoElement);
                // move target img element inside <a>
                mailtoElement.append(el);
			}
            else {
                // move contents of target element in DOM to inside of mailtoElement which is not yet in DOM
                while (el.firstChild) {
                    mailtoElement.appendChild(el.firstChild);
                }
			    // append mailtoElement to target element, which places it in DOM
                el.append(mailtoElement);
            }

		} // end if valid email address

    });

}); // end wrapper DOMContentLoaded function
