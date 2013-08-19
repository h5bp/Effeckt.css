/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'Buttons\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-cart' : '&#xe000;',
			'icon-star' : '&#xe008;',
			'icon-heart' : '&#xe006;',
			'icon-cog' : '&#xe001;',
			'icon-arrow-up' : '&#xe002;',
			'icon-arrow-right' : '&#xe003;',
			'icon-arrow-down' : '&#xe004;',
			'icon-arrow-left' : '&#xe005;',
			'icon-remove' : '&#xe007;',
			'icon-truck' : '&#xe009;',
			'icon-envelop' : '&#xe00a;',
			'icon-heart-2' : '&#xe00b;',
			'icon-star-2' : '&#xe00c;',
			'icon-plus' : '&#xe00d;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, html, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};