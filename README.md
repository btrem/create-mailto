# create-mailto
A small javascript file to find email addresses in web pages and turn them into clickable `<a href=mailto.../>`.

It is common to avoid using `<a href=mailto...>` in web pages to prevent spammers from harvesting your email address. If you put your email address in plain text on the page and add markup to identify it, the javascript file will add additional `<a>` markup to turn it into a normal "clickable" anchor element.

To use, add the javascript file to your page:

`<script src="create-mailto.js">`

Then, in the web page, add markup to your email addresses:

`<span class="email">username@example.com</span>`

plain html | html with create-mailto.js
-------------------- | -------------------
`<span class="email">username@example.com</span>` | `<span class="email"><a href="mailto:username@example.com">username@example.com</a></span>`

That's it!

## reusing existing classnames

If you use [microformats](http://microformats.org/) or [microdata](https://www.w3.org/TR/microdata/), create-mailto will convert email addresses without any additional markup:

markup type | plain html           | html with create-mailto.js
------------|--------------------- | -------------------
[microformats hCard 1.0](http://microformats.org/wiki/hCard) | `<span class="email">username@example.com</span>` | `<span class="email"><a href="mailto:username@example.com">username@example.com</a></span>`
[microformats2 hcard](http://microformats.org/wiki/h-card) | `<span class="p-email">username@example.com</span>` | `<span class="p-email"><a href="mailto:username@example.com">username@example.com</a></span>`
[schema.org microdata](https://schema.org/email) | `<span itemprop="email">username@example.com</itemprop>`| `<span itemprop="email"><a href="mailto:username@example.com">username@example.com</a></span>`

## using `data-` attribute
You can also use this script in situations where the email address does *not* appear in the web page, by using [`data-*` attributes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes). Just add a `data-email` to your element:

plain html           | html with create-mailto.js
-------------------- | -------------------
`<span data-email="username@example.com">email me</span>` | `<span data-email="username@example.com"><a href="mailto:username@example.com">email me</a></span>`
`<img src="foo.jpg" alt="email me" data-email="username@example.com">` | `<a href="username@example.com"><img src="foo.jpg" alt="email me" data-email="username@example.com"></a>`

## automatically excluded elements
create-mailto will not change any part of a document's `<head>` element. There are also restrictions on
interactive and form elements. For example, it will not add `<a>` markup inside a `<label>` element, since clicking a `<label>` element should not cause a new page to load, but rather put focus on the form element associated with that `<label>`. The list below is not exhaustive:

plain html           | html with create-mailto.js (no markup changes)
-------------------- | ----------------------------------------------
`<label class="email">username@example.com<label>` | `<label class="email">username@example.com<label>`
`<label><span class="email">username@example.com</span><label>` | `<label><span class="email">username@example.com</span><label>`
`<input class="email">username@example.com<input>` | `<input class="email">username@example.com<input>`
`<textarea class="email">username@example.com<textarea>` | `<textarea class="email">username@example.com<textarea>`
`<details class="email">username@example.com<details>` | `<details class="email">username@example.com<details>`
`<audio class="email" controls src="foo.ogg"></audio>` | `<audio class="email" controls src="foo.ogg"></audio>`
`<button class="email">username@example.com<button>` | `<button class="email">username@example.com<button>`
`<input class="email">username@example.com<input>` |
