# create-mailto
A small jquery/javascript file to find email addresses in web pages and turn them into clickable <code>&lt;a href=mailto...&gt;</code>.

It is common to avoid using <code>&lt;a href=mailto...&gt;</code> in web pages to prevent spammers from harvesting your email address. If you put your email address in plain text on the page and add markup to identify it, the javascript file will add additional <code>&lt;a&gt;</code> markup to turn it into a normal "clickable" anchor element.

To use, add the javascript file to your page:

<code>&lt;script src="create-mailto.js"&gt;</code>

Then, in the web page, add markup to your email addresses:

<code>&lt;span class="email"&gt;youremail@example.com&lt;/span&gt;</code>

That's it!

If you use <a href="http://microformats.org/">microformats</a> or <a href="https://www.w3.org/TR/microdata/">microdata</a>, you can use the class names mandated by those standards, without adding any additional markup:

<dl>
  <dt>using <a href="http://microformats.org/wiki/hCard">microformats hCard 1.0</a></dt>
  <dd>this <code>&lt;span class="email"&gt;youremail@example.com&lt;/span&gt;</code></dd>
  <dd>becomes <code>&lt;span class="email"&gt;&lt;a href="mailto:youremail@example.com"&gt;youremail@example.com&lt;/a&gt;&lt;/span&gt;</code></dd>
  <dt>using <a href="http://microformats.org/wiki/h-card">microformats2 hcard</a></dt>
  <dd>this <code>&lt;span class="p-email"&gt;youremail@example.com&lt;/span&gt;</code></dd>
  <dd>becomes <code>&lt;span class="p-email"&gt;&lt;a href="mailto:youremail@example.com"&gt;youremail@example.com&lt;/a&gt;&lt;/span&gt;</code></dd>
  <dt>using <a href="https://schema.org/Person">schema.org person microdata</a></dt>
  <dd>this <code>&lt;span itemprop="email"&gt;youremail@example.com&lt;/itemprop&gt;</code></dd>
  <dd>becomes <code>&lt;span itemprop="email"&gt;&lt;a href="mailto:youremail@example.com"&gt;youremail@example.com&lt;/a&gt;&lt;/span&gt;</code></dd>
</dl>

You can also use this script in situations where the email address does <em>not</em> appear in the web page, by using <a href="https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes"><code>data-*</code></a>. Just add a <code>data-email</code> attribute to your element:

<dl>
  <dt>using text that is not an email address</dt>
  <dd>this <code>&lt;span data-email="youremail@example.com"&gt;email me&lt;/span&gt;</code></dd>
  <dd>becomes <code>&lt;span data-email="youremail@example.com"&gt;&lt;a href="mailto:youremail@example.com"&gt;email me&lt;/a&gt;&lt;/span&gt;</code></dd>
  <dt>using an image element</dt>
  <dd>this <code>&lt;img src="foo.jpg" alt="email me" data-email="youremail@example.com"&gt;</code></dd>
  <dd>becomes <code>&lt;a href="youremail@example.com"&gt;&lt;img src="foo.jpg" alt="email me" data-email="youremail@example.com"&gt;&lt;/a&gt;</code></dd>
</dl>
