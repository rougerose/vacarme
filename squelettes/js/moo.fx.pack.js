/*
moo.fx pack, effects extensions for moo.fx.
by Valerio Proietti (http://mad4milk.net) MIT-style LICENSE
for more info visit (http://moofx.mad4milk.net).
Wednesday, November 16, 2005
v1.0.4
*/


//composition effect, calls Width and Height alltogheter
fx.Resize = Class.create();
fx.Resize.prototype = {
	initialize: function(el, options) {
		this.h = new fx.Height(el, options); 
		if (options) options.onComplete = null;
		this.w = new fx.Width(el, options);
		this.el = $(el);
	},

	toggle: function(){
		this.h.toggle();
		this.w.toggle();
	},

	modify: function(hto, wto) {
		this.h.custom(this.el.offsetHeight, this.el.offsetHeight + hto);
		this.w.custom(this.el.offsetWidth, this.el.offsetWidth + wto);
	},

	custom: function(hto, wto) {
		this.h.custom(this.el.offsetHeight, hto);
		this.w.custom(this.el.offsetWidth, wto);
	},

	hide: function(){
		this.h.hide();
		this.w.hide();
	}
}
