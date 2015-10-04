(function() {
    "use strict";
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

//jquery timers
jQuery.fn.extend({everyTime:function(a,b,c,d){return this.each(function(){jQuery.timer.add(this,a,b,c,d)})},oneTime:function(a,b,c){return this.each(function(){jQuery.timer.add(this,a,b,c,1)})},stopTime:function(a,b){return this.each(function(){jQuery.timer.remove(this,a,b)})}});jQuery.extend({timer:{global:[],guid:1,dataKey:"jQuery.timer",regex:/^([0-9]+(?:\.[0-9]*)?)\s*(.*s)?$/,powers:{ms:1,cs:10,ds:100,s:1e3,das:1e4,hs:1e5,ks:1e6},timeParse:function(a){if(a==undefined||a==null)return null;var b=this.regex.exec(jQuery.trim(a.toString()));if(b[2]){var c=parseFloat(b[1]);var d=this.powers[b[2]]||1;return c*d}else{return a}},add:function(a,b,c,d,e){var f=0;if(jQuery.isFunction(c)){if(!e)e=d;d=c;c=b}b=jQuery.timer.timeParse(b);if(typeof b!="number"||isNaN(b)||b<0)return;if(typeof e!="number"||isNaN(e)||e<0)e=0;e=e||0;var g=jQuery.data(a,this.dataKey)||jQuery.data(a,this.dataKey,{});if(!g[c])g[c]={};d.timerID=d.timerID||this.guid++;var h=function(){if(++f>e&&e!==0||d.call(a,f)===false)jQuery.timer.remove(a,c,d)};h.timerID=d.timerID;if(!g[c][d.timerID])g[c][d.timerID]=window.setInterval(h,b);this.global.push(a)},remove:function(a,b,c){var d=jQuery.data(a,this.dataKey),e;if(d){if(!b){for(b in d)this.remove(a,b,c)}else if(d[b]){if(c){if(c.timerID){window.clearInterval(d[b][c.timerID]);delete d[b][c.timerID]}}else{for(var c in d[b]){window.clearInterval(d[b][c]);delete d[b][c]}}for(e in d[b])break;if(!e){e=null;delete d[b]}}for(e in d)break;if(!e)jQuery.removeData(a,this.dataKey)}}}});jQuery(window).bind("unload",function(){jQuery.each(jQuery.timer.global,function(a,b){jQuery.timer.remove(b)})});

/*Img load event*/
$.fn.imageLoad = function(fn){
	this.load(fn);
	this.each( function() {
		if ( this.complete && this.naturalWidth !== 0 ) {
			$(this).trigger('load');
		}
	});
};

/*Is n a number?*/
function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}


/*CRC32 hash*/
function crc32(s/*, polynomial = 0x04C11DB7, initialValue = 0xFFFFFFFF, finalXORValue = 0xFFFFFFFF*/) {
	s = String(s);
	var polynomial = arguments.length < 2 ? 0x04C11DB7 : (arguments[1] >>> 0);
	var initialValue = arguments.length < 3 ? 0xFFFFFFFF : (arguments[2] >>> 0);
	var finalXORValue = arguments.length < 4 ? 0xFFFFFFFF : (arguments[3] >>> 0);
	var table = new Array(256);

	var reverse = function (x, n) {
		var b = 0;
		while (--n >= 0) {
			b <<= 1;
			b |= x & 1;
			x >>>= 1;
		}
		return b;
	};

	var i = -1;
	while (++i < 256) {
		var g = reverse(i, 32);
		var j = -1;
		while (++j < 8) {
			g = ((g << 1) ^ (((g >>> 31) & 1) * polynomial)) >>> 0;
		}
		table[i] = reverse(g, 32);
	}

	var crc = initialValue;
	var length = s.length;
	var k = -1;
	while (++k < length) {
		var c = s.charCodeAt(k);
		if (c > 255) {
			throw new RangeError();
		}
		var index = (crc & 255) ^ c;
		crc = ((crc >>> 8) ^ table[index]) >>> 0;
	}
	return (crc ^ finalXORValue) >>> 0;
}

/*Plural forms 1, 2, 5*/
function plural(number, one, two, five) {
    number = Math.abs(number);
    number %= 100;
    if (number >= 5 && number <= 20) {
        return five;
    }
    number %= 10;
    if (number == 1) {
        return one;
    }
    if (number >= 2 && number <= 4) {
        return two;
    }
    return five;
}

/*Logarithmic slider*/
function fromSlider(value) {
    return Math.round(Math.pow(10, value));
}

function toSlider(value) {
    return Math.log(value) / Math.log(10);
}

/*Round with treshold*/
function tround(n, threshold) {
    var digits, out;

    n = n.toFixed(0);
    digits = n.length;
    out = n.substr(0, Math.min(digits, threshold));
    if (digits > threshold) {
        out = out + "000000000000".substr(0, digits - threshold);
    }

    return parseInt(out);
}

/*Split digit groups*/
function splitGroups(n, delim) {
    var digits;

    delim = delim || '&nbsp;';

    n = n.toFixed(0);
    digits = n.length > 3 ? n.length % 3 : 0;

    return (digits ? n.substr(0, digits) + delim : '') +
        n.substr(digits).replace(/(\d{3})(?=\d)/g, "$1" + delim);
}


/*Round for digit*/
function round(a,b) {
	var b = b || 0;
	return Math.round(a*Math.pow(10,b))/Math.pow(10,b);
}

/*Random integer*/
function getRandomInt (min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
/*Random float*/
function getRandomArbitary (min, max){
	return Math.random() * (max - min) + min;
}

function getInternetExplorerVersion()
{
	var rv = -1;
	if (navigator.appName == 'Microsoft Internet Explorer')
	{
		var ua = navigator.userAgent;
		var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(ua) != null)
			rv = parseFloat( RegExp.$1 );
	}
	else if (navigator.appName == 'Netscape')
	{
		var ua = navigator.userAgent;
		var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(ua) != null)
			rv = parseFloat( RegExp.$1 );
	}
	return rv;
}


function formatDate(d){
	var dd = d.getDate(),
		mm = d.getMonth() + 1,
		yy = d.getFullYear();
	if (dd<10) dd= '0'+dd;
	if (mm<10) mm= '0'+mm;

	return yy + '/' + mm + '/' + dd;
}

function formatMoney(money){

	var money = parseFloat(money),
		moneyInt = Math.floor(money),
		moneyDecimal = Math.floor((money - Math.floor(money))*100);

	if(moneyDecimal == 0){
		moneyDecimal = '';
	}else{
		if(moneyDecimal < 10){
			moneyDecimal = ',' + moneyDecimal + '0';
		}else{
			moneyDecimal = ',' + moneyDecimal.toString().substr(0, 2);
		}
	}



	return splitGroups(moneyInt, '.') + moneyDecimal;
}

function beautifyNumber(n){

	if(n >= 1000 && n < 1000000){
		n = n / 1000;
		n += 'K';
	}else if(n >= 1000000){
		n = n / 1000000;
		n += 'KK';
	}

	return '$' + n;
}