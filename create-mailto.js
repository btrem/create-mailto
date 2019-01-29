/*
 * create-mailto.js
 *
 * version 0.1
 *
 * find email addresses in web pages and turn them into clickable <a href=mailto>
 *
 * requires jquery 1.12.4+
 */


$(document).ready(function(){

	var emailAddress, mailtoElement;

	// get elements whose class attribute includes 'email', 'u-email', or 'p-email';
	// or whose itemprop attribute includes 'email'; or with a data-email attribute;
	// but exclude elements that are <a>, a descendent of <a>, or contain <a>

	$('.email, .u-email, .p-email, [itemprop~=email], [data-email]').not('a, a *, :has(a)').each(function(){

		// get email address, preferring data-email attribute when it's available, text content if not
		emailAddress = $(this).data('email') || $(this).text();

		emailAddress = $.trim(emailAddress);

		// validate email address
		if (/^[^@]+@[^@.]+\.[^@]*\w\w$/.test(emailAddress)) {

			// create <a> element with mailto: set to validated email address
			mailtoElement = $('<a />').attr({
				href: 'mailto:' + emailAddress
			});

			// if element is <img>, it is void; wrap anchor tags around it
			if($(this).prop('tagName').toLowerCase() == 'img') {
				$(this).wrap(mailtoElement);
			}
			// if not void, wrap content in anchor tags
			else {
				$(this).wrapInner(mailtoElement);
			}

		} // end if valid email address

	}); // end .each function

}); // end document.ready function
