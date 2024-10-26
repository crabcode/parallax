window.Parallax = {
	_layers: {},
	
	add: function({
			id, url, width, height, repeat = false, 
			speed = 100, x = 0, y = 0, sX = 1, sY = 1,
			opacity = 100, scale = 1, rotation = 0,
			contrast = 100, brightness = 100, saturation = 100,
			hue = 0, blur = 0, grayscale = 0, invert = 0, sepia = 0
		 })
	{
		let scroll = this._getScrollPosition();
		speed = (1 - (speed / 100));
		
		let div = document.createElement("div");
		div.id = id;
		div.className = "parallax-layer";
		div.style.backgroundImage = `url(${url})`;
		div.style.position = "absolute";
		div.style.top = (y + (scroll.top * speed * sY))  + "px";
		div.style.left = (x + (scroll.left * speed * sX))  + "px";
		div.style.zIndex = speed * -1000;
		div.style.width = width + "px";
		div.style.height = height + "px";
		div.style.backgroundRepeat = repeat ? "repeat" : "no-repeat";
		div.style.filter = `hue-rotate(${hue}deg) saturate(${saturation}%) brightness(${brightness}%) contrast(${contrast}%) blur(${blur}px) sepia(${sepia}%) grayscale(${grayscale}%) invert(${invert}%) opacity(${opacity}%)`;
		div.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
		div.style.WebkitFilter = div.style.filter;
		div.style.willChange = "transform, top, left";
		
		this._layers[id] = {
			div, url, width, height, repeat,
			speed, x, y, sX, sY,
			opacity, scale, rotation,
			contrast, brightness, saturation,
			hue, blur, grayscale, invert, sepia,
		};
		
		if (this.onAdd) this.onAdd({ layer: this._layers[id], scroll, ref: this });
	},
	
	destroy: function()
	{
		if (this._observer) { this._observer.disconnect(); this._observer = null; }
		while (this._container && this._container.firstChild) this._container.removeChild(this._container.firstChild);
		this._layers = {};
		window.removeEventListener("resize", this._onResize.bind(this));
		window.removeEventListener("scroll", this._onScroll.bind(this));
		this._container = null;
	},
	
	init: function(id, useObserver = false)
	{
		let container = document.querySelector(id);
		if (!container) throw new Error(id + " not found.");
		container.style.width = document.documentElement.scrollWidth + "px";
		container.style.height = document.documentElement.scrollHeight + "px";
		container.style.position = "absolute";
		container.style.top = 0;
		container.style.left = 0;
		container.style.overflow = "hidden";
		
		for (let id of Object.keys(this._layers)) container.prepend(this._layers[id].div);
		this._container = container;
		
		if (useObserver)
		{
			this._observer = new MutationObserver(this._onResize.bind(this));
			this._observer.observe(document.body, { childList: true, subtree: true, attributes: false, });
		}
		
		window.addEventListener("resize", this._onResize.bind(this));
		window.addEventListener("scroll", this._onScroll.bind(this));
		if (this.onInit) this.onInit({ container: id, scroll, ref: this });
	},
	
	_onResize: function(e)
	{
		let previous = { width: this._container.style.width, height: this._container.style.height };
		this._container.style.width = document.documentElement.scrollWidth + "px";
		this._container.style.height = document.documentElement.scrollHeight + "px";
		if (this.onResize) this.onResize({ event: e, previous, newSize: { width: this._container.style.width, height: this._container.style.height }, ref: this });
		this._onScroll();
	},
	
	_onScroll: function(e)
	{
		let scroll = this._getScrollPosition();
		
		for (let id of Object.keys(this._layers))
		{
			let l = this._layers[id];
			l.div.style.top = Math.round(l.y + (scroll.top * l.speed * l.sY))  + "px";
			l.div.style.left = Math.round(l.x + (scroll.left * l.speed * l.sX))  + "px";
		}
		
		if (this.onScroll) this.onScroll({ scroll, event: e, ref: this });
	},
	
	_getScrollPosition: function()
	{
		let top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
		let left = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
		return { top, left };
	}
};