/*
 * create-mailto.js
 *
 * version 0.8.0
 *
 * find email addresses in web pages and turn them into clickable <a href=mailto>
 */

'use strict'

var elmts, emailAddress, mailtoElement;

// query selector for mailto elements: class attribute includes 'email',
// 'u-email', or 'p-email'; or itemprop attribute includes 'email';
// or has data-email attribute
const mailtoSelector = '.email, .u-email, .p-email, [itemprop~=email], [data-email]';

// query selector for elements that can't be links, nor be inside links, nor contain links
const excludeSelector = 'a, audio, br, button, canvas, col, details, embed, hr,' +
                        'input, label, map, math, meter, object, param, progress,' +
                        'script, select, source, style, textarea, video';

// query selector for elements that can't be links nor be inside links, but can contain links
const excludeSelectorUnlessContainer = 'fieldset, form, iframe';

// class that create-mailto.js will ignore
const ignoreClass = '.ignore-create-mailto';

// some elements can't contain links (<img> is void, and <picture> can't contain <a>); they must be wrapped
const outerWrapElements = 'img, picture';

function canBeMailto(elmt) {
    // don't make element into a link if it can't be a link
    if ( elmt.matches(excludeSelector + ',' + excludeSelectorUnlessContainer + ',' + ignoreClass ) ) {
        return false;
    }
    // don't make element a link if it has descendent that a link can't contain
    if ( elmt.querySelector(excludeSelector + ',' + excludeSelectorUnlessContainer)  ) {
        return false;
    }
    // don't make element a link if it has ancestor that can't contain links
    if ( elmt.closest(excludeSelector + ',' + ignoreClass) ) {
        return false;
    }

    return true;
}


window.addEventListener('DOMContentLoaded', () => {

    // get element collection from <body> based on mailto selector list;
    // convert to array; filter excluded elements from array
    elmts = document.getElementsByTagName('body')[0].querySelectorAll(mailtoSelector);
    elmts = Array.from(elmts);
    elmts = elmts.filter(canBeMailto);

    // loop through filtered array
    elmts.forEach(function(el) {

        // get email address from data-email attribute if it exists;
        // or from HTML-only innerText, which accounts for hidden elements
        // then use textContent which works with SVG
		emailAddress = el.dataset.email || el.innerText || el.textContent || '';

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
