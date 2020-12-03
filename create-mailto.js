/*
 * create-mailto.js
 *
 * version 0.7
 *
 * find email addresses in web pages and turn them into clickable <a href=mailto>
 */

'use strict'

var elementCollection, elementArray, elementArrayFiltered, emailAddress, mailtoElement;

// query selector for mailto elements: class attribute includes 'email',
// 'u-email', or 'p-email'; or itemprop attribute includes 'email';
// or has data-email attribute
const mailtoSelector = '.email, .u-email, .p-email, [itemprop~=email], [data-email]';

// query selector for elements that can't be links, nor be inside links, nor contain links
const excludeSelector = 'a, audio, br, button, canvas, col, details, embed, ' +
                        'hr, input, label, map, math, meter, object, param, ' +
                        'progress, select, source, textarea, video';

// query selector for elements that can't be links nor be inside links, but can contain links
const excludeSelectorUnlessContainer = 'fieldset, form, iframe';

// some elements can't contain links (<img> is void, and <picture> can't contain <a>); they must be wrapped
const outerWrapElements = 'img, picture';

// class to allow authors to exclude elements from create-mailto processing
const excludeClass = '.exclude-create-mailto';

function canBeMailto(elmt) {
    // don't make element into a link if it can't be a link
    if ( elmt.matches(excludeSelector + ',' + excludeSelectorUnlessContainer + ',' + excludeClass ) ) {
        return false;
    }
    // don't make element a link if it has descendent that a link can't contain
    if ( elmt.querySelector(excludeSelector + ',' + excludeSelectorUnlessContainer)  ) {
        return false;
    }
    // don't make element a link if it has ancestor that can't contain links
    if ( elmt.closest(excludeSelector) ) {
        return false;
    }

    return true;
}


window.addEventListener('DOMContentLoaded', () => {

    // get elements inside <body> whose class attribute includes 'email', 'u-email', or 'p-email';
	// or whose itemprop attribute includes 'email'; or with a data-email attribute

    elementCollection = document.getElementsByTagName('body')[0].querySelectorAll(mailtoSelector);

    elementArray = Array.from(elementCollection);

    elementArrayFiltered = elementArray.filter(canBeMailto);

    elementArrayFiltered.forEach(function(el) {

        // get email address from data-email attribute (preferred) or text content;
        // for text content, use HTML-only innerText first, since this ignores HTML comments;
        // then use textContent which works with SVG; if those fail, set to empty
        // string to avoid fatal error caused by using trim() on null
		emailAddress = el.dataset.email || el.innerText || el.textContent || "";

		emailAddress = emailAddress.trim();

		// validate email address
		if (/^[^@]+@[^@.]+\.[^@]*\w\w$/.test(emailAddress)) {

			// create <a> element
            if ( el.closest('svg') ) {
                mailtoElement = document.createElementNS('http://www.w3.org/2000/svg','a');
            }
            else {
                mailtoElement = document.createElement('a');
            }

			// set mailto: attribute to validated email address; use setAttributeNS in case el is <svg>
            mailtoElement.setAttributeNS(null, 'href', 'mailto:' + emailAddress);

            // check if element can't contain link
            if ( el.matches(outerWrapElements ) ) {
                // insert new empty <a> element into dom after target element
                el.insertAdjacentElement('afterend', mailtoElement);
                // move target element inside inserted <a>
                mailtoElement.append(el);
			}
            else {
                // move children of target element out of DOM and into mailtoElement
                while (el.firstChild) {
                    mailtoElement.appendChild(el.firstChild);
                }
			    // append mailtoElement to target element, putting it back into DOM
                el.append(mailtoElement);
            }

		} // end if valid email address

    });

}); // end wrapper DOMContentLoaded function
