/*
 * create-mailto.js
 *
 * version 0.4
 *
 * find email addresses in web pages and turn them into clickable <a href=mailto>
 */

'use strict'

var elementCollection, emailAddress, mailtoElement;

window.addEventListener('DOMContentLoaded', () => {

    // get elements inside  <body> whose class attribute includes 'email', 'u-email', or 'p-email';
	// or whose itemprop attribute includes 'email'; or with a data-email attribute

    elementCollection = document.querySelector('body');

    elementCollection = elementCollection.querySelectorAll('.email, .u-email, .p-email, [itemprop~=email], [data-email]');

    elementCollection.forEach(function(el){

	    // exclude elements that are <a>, a descendent of <a>, or contain <a>

        if ( el.tagName.toLowerCase() === "a" || el.getElementsByTagName('a').length || el.closest('a') ) {
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
