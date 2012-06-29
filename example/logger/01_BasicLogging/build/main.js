var $_, $hxClasses = $hxClasses || {}, $estr = function() { return js.Boot.__string_rec(this,''); }
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	return proto;
}
var Hash = $hxClasses["Hash"] = function() {
	this.h = { };
};
Hash.__name__ = ["Hash"];
Hash.prototype = {
	h: null
	,set: function(key,value) {
		this.h["$" + key] = value;
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		key = "$" + key;
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return a.iterator();
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref["$" + i];
		}};
	}
	,toString: function() {
		var s = new StringBuf();
		s.b[s.b.length] = "{";
		var it = this.keys();
		while( it.hasNext() ) {
			var i = it.next();
			s.b[s.b.length] = i == null?"null":i;
			s.b[s.b.length] = " => ";
			s.add(Std.string(this.get(i)));
			if(it.hasNext()) s.b[s.b.length] = ", ";
		}
		s.b[s.b.length] = "}";
		return s.b.join("");
	}
	,__class__: Hash
}
var IntHash = $hxClasses["IntHash"] = function() {
	this.h = { };
};
IntHash.__name__ = ["IntHash"];
IntHash.prototype = {
	h: null
	,set: function(key,value) {
		this.h[key] = value;
	}
	,get: function(key) {
		return this.h[key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty(key);
	}
	,remove: function(key) {
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return a.iterator();
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i];
		}};
	}
	,toString: function() {
		var s = new StringBuf();
		s.b[s.b.length] = "{";
		var it = this.keys();
		while( it.hasNext() ) {
			var i = it.next();
			s.b[s.b.length] = i == null?"null":i;
			s.b[s.b.length] = " => ";
			s.add(Std.string(this.get(i)));
			if(it.hasNext()) s.b[s.b.length] = ", ";
		}
		s.b[s.b.length] = "}";
		return s.b.join("");
	}
	,__class__: IntHash
}
var IntIter = $hxClasses["IntIter"] = function(min,max) {
	this.min = min;
	this.max = max;
};
IntIter.__name__ = ["IntIter"];
IntIter.prototype = {
	min: null
	,max: null
	,hasNext: function() {
		return this.min < this.max;
	}
	,next: function() {
		return this.min++;
	}
	,__class__: IntIter
}
var Lambda = $hxClasses["Lambda"] = function() { }
Lambda.__name__ = ["Lambda"];
Lambda.array = function(it) {
	var a = new Array();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		a.push(i);
	}
	return a;
}
Lambda.list = function(it) {
	var l = new List();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		l.add(i);
	}
	return l;
}
Lambda.map = function(it,f) {
	var l = new List();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(x));
	}
	return l;
}
Lambda.mapi = function(it,f) {
	var l = new List();
	var i = 0;
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(i++,x));
	}
	return l;
}
Lambda.has = function(it,elt,cmp) {
	if(cmp == null) {
		var $it0 = it.iterator();
		while( $it0.hasNext() ) {
			var x = $it0.next();
			if(x == elt) return true;
		}
	} else {
		var $it1 = it.iterator();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(cmp(x,elt)) return true;
		}
	}
	return false;
}
Lambda.exists = function(it,f) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
}
Lambda.foreach = function(it,f) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(!f(x)) return false;
	}
	return true;
}
Lambda.iter = function(it,f) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		f(x);
	}
}
Lambda.filter = function(it,f) {
	var l = new List();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) l.add(x);
	}
	return l;
}
Lambda.fold = function(it,f,first) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		first = f(x,first);
	}
	return first;
}
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) {
		var $it0 = it.iterator();
		while( $it0.hasNext() ) {
			var _ = $it0.next();
			n++;
		}
	} else {
		var $it1 = it.iterator();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(pred(x)) n++;
		}
	}
	return n;
}
Lambda.empty = function(it) {
	return !it.iterator().hasNext();
}
Lambda.indexOf = function(it,v) {
	var i = 0;
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var v2 = $it0.next();
		if(v == v2) return i;
		i++;
	}
	return -1;
}
Lambda.concat = function(a,b) {
	var l = new List();
	var $it0 = a.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(x);
	}
	var $it1 = b.iterator();
	while( $it1.hasNext() ) {
		var x = $it1.next();
		l.add(x);
	}
	return l;
}
Lambda.prototype = {
	__class__: Lambda
}
var List = $hxClasses["List"] = function() {
	this.length = 0;
};
List.__name__ = ["List"];
List.prototype = {
	h: null
	,q: null
	,length: null
	,add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,first: function() {
		return this.h == null?null:this.h[0];
	}
	,last: function() {
		return this.q == null?null:this.q[0];
	}
	,pop: function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		if(this.h == null) this.q = null;
		this.length--;
		return x;
	}
	,isEmpty: function() {
		return this.h == null;
	}
	,clear: function() {
		this.h = null;
		this.q = null;
		this.length = 0;
	}
	,remove: function(v) {
		var prev = null;
		var l = this.h;
		while(l != null) {
			if(l[0] == v) {
				if(prev == null) this.h = l[1]; else prev[1] = l[1];
				if(this.q == l) this.q = prev;
				this.length--;
				return true;
			}
			prev = l;
			l = l[1];
		}
		return false;
	}
	,iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,toString: function() {
		var s = new StringBuf();
		var first = true;
		var l = this.h;
		s.b[s.b.length] = "{";
		while(l != null) {
			if(first) first = false; else s.b[s.b.length] = ", ";
			s.add(Std.string(l[0]));
			l = l[1];
		}
		s.b[s.b.length] = "}";
		return s.b.join("");
	}
	,join: function(sep) {
		var s = new StringBuf();
		var first = true;
		var l = this.h;
		while(l != null) {
			if(first) first = false; else s.b[s.b.length] = sep == null?"null":sep;
			s.add(l[0]);
			l = l[1];
		}
		return s.b.join("");
	}
	,filter: function(f) {
		var l2 = new List();
		var l = this.h;
		while(l != null) {
			var v = l[0];
			l = l[1];
			if(f(v)) l2.add(v);
		}
		return l2;
	}
	,map: function(f) {
		var b = new List();
		var l = this.h;
		while(l != null) {
			var v = l[0];
			l = l[1];
			b.add(f(v));
		}
		return b;
	}
	,__class__: List
}
var Main = $hxClasses["Main"] = function() { }
Main.__name__ = ["Main"];
Main.main = function() {
	var logger = m.cover.logger.MCoverLogger.getLogger();
	logger.startRecording();
	var example1 = new example.Example();
	logger.completionHandler = Main.completionHandler;
	logger.report();
}
Main.completionHandler = function(logger) {
	Main.completed = true;
	haxe.Log.trace("Logging report complete",{ fileName : "Main.hx", lineNumber : 37, className : "Main", methodName : "completionHandler"});
}
Main.prototype = {
	__class__: Main
}
var Std = $hxClasses["Std"] = function() { }
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
}
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std["int"] = function(x) {
	return x | 0;
}
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && x.charCodeAt(1) == 120) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
Std.random = function(x) {
	return Math.floor(Math.random() * x);
}
Std.prototype = {
	__class__: Std
}
var StringBuf = $hxClasses["StringBuf"] = function() {
	this.b = new Array();
};
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	add: function(x) {
		this.b[this.b.length] = x == null?"null":x;
	}
	,addSub: function(s,pos,len) {
		this.b[this.b.length] = s.substr(pos,len);
	}
	,addChar: function(c) {
		this.b[this.b.length] = String.fromCharCode(c);
	}
	,toString: function() {
		return this.b.join("");
	}
	,b: null
	,__class__: StringBuf
}
var StringTools = $hxClasses["StringTools"] = function() { }
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
}
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
}
StringTools.htmlEscape = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
StringTools.htmlUnescape = function(s) {
	return s.split("&gt;").join(">").split("&lt;").join("<").split("&amp;").join("&");
}
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && s.substr(0,start.length) == start;
}
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen && s.substr(slen - elen,elen) == end;
}
StringTools.isSpace = function(s,pos) {
	var c = s.charCodeAt(pos);
	return c >= 9 && c <= 13 || c == 32;
}
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return s.substr(r,l - r); else return s;
}
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return s.substr(0,l - r); else return s;
}
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
}
StringTools.rpad = function(s,c,l) {
	var sl = s.length;
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		s += c.substr(0,l - sl);
		sl = l;
	} else {
		s += c;
		sl += cl;
	}
	return s;
}
StringTools.lpad = function(s,c,l) {
	var ns = "";
	var sl = s.length;
	if(sl >= l) return s;
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		ns += c.substr(0,l - sl);
		sl = l;
	} else {
		ns += c;
		sl += cl;
	}
	return ns + s;
}
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
}
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
}
StringTools.fastCodeAt = function(s,index) {
	return s.cca(index);
}
StringTools.isEOF = function(c) {
	return c != c;
}
StringTools.prototype = {
	__class__: StringTools
}
var example = example || {}
example.Example = $hxClasses["example.Example"] = function() {
	var ___logEntry = m.cover.logger.MCoverLogger.getLogger().logEntry(false,{ fileName : "Example.hx", lineNumber : 10, className : "example.Example", methodName : "new"});
	this.i = 0;
	this.emptyFunction();
	this.ignoredFunction();
	this.returnValue();
	this.returnValueOfOtherFunction(true);
	this.returnValueOfOtherFunction(false);
	try {
		this.throwException();
	} catch( e ) {
		this.catchException();
	}
	this.nestedCallThrowsException();
	this.recurse();
	m.cover.logger.MCoverLogger.getLogger().logExit(___logEntry,{ fileName : "Example.hx", lineNumber : 30, className : "example.Example", methodName : "new"});
};
example.Example.__name__ = ["example","Example"];
example.Example.prototype = {
	i: null
	,emptyFunction: function() {
	}
	,ignoredFunction: function() {
	}
	,returnValue: function() {
		var ___logEntry = m.cover.logger.MCoverLogger.getLogger().logEntry(false,{ fileName : "Example.hx", lineNumber : 52, className : "example.Example", methodName : "returnValue"});
		var ____m0 = this.i;
		m.cover.logger.MCoverLogger.getLogger().logExit(___logEntry,{ fileName : "Example.hx", lineNumber : 52, className : "example.Example", methodName : "returnValue"});
		return ____m0;
	}
	,returnValueOfOtherFunction: function(value) {
		if(value == null) value = false;
		var ___logEntry = m.cover.logger.MCoverLogger.getLogger().logEntry(false,{ fileName : "Example.hx", lineNumber : 58, className : "example.Example", methodName : "returnValueOfOtherFunction"});
		var ____m1 = this.returnTrueOrFalse(value);
		m.cover.logger.MCoverLogger.getLogger().logExit(___logEntry,{ fileName : "Example.hx", lineNumber : 58, className : "example.Example", methodName : "returnValueOfOtherFunction"});
		return ____m1;
	}
	,returnTrueOrFalse: function(value) {
		if(value == null) value = false;
		var ___logEntry = m.cover.logger.MCoverLogger.getLogger().logEntry(false,{ fileName : "Example.hx", lineNumber : 63, className : "example.Example", methodName : "returnTrueOrFalse"});
		if(value) {
			var ____m2 = true;
			m.cover.logger.MCoverLogger.getLogger().logExit(___logEntry,{ fileName : "Example.hx", lineNumber : 65, className : "example.Example", methodName : "returnTrueOrFalse"});
			return ____m2;
		}
		var ____m3 = false;
		m.cover.logger.MCoverLogger.getLogger().logExit(___logEntry,{ fileName : "Example.hx", lineNumber : 67, className : "example.Example", methodName : "returnTrueOrFalse"});
		return ____m3;
	}
	,throwException: function() {
		var ___logEntry = m.cover.logger.MCoverLogger.getLogger().logEntry(false,{ fileName : "Example.hx", lineNumber : 72, className : "example.Example", methodName : "throwException"});
		var ____m4 = "exception";
		m.cover.logger.MCoverLogger.getLogger().logExit(___logEntry,{ fileName : "Example.hx", lineNumber : 72, className : "example.Example", methodName : "throwException"});
		throw ____m4;
	}
	,catchException: function() {
		var ___logEntry = m.cover.logger.MCoverLogger.getLogger().logEntry(false,{ fileName : "Example.hx", lineNumber : 77, className : "example.Example", methodName : "catchException"});
		try {
			var ____m5 = "exception";
			m.cover.logger.MCoverLogger.getLogger().logExit(___logEntry,{ fileName : "Example.hx", lineNumber : 79, className : "example.Example", methodName : "catchException"});
			throw ____m5;
		} catch( e ) {
		}
		m.cover.logger.MCoverLogger.getLogger().logExit(___logEntry,{ fileName : "Example.hx", lineNumber : 77, className : "example.Example", methodName : "catchException"});
	}
	,nestedCallThrowsException: function() {
		var ___logEntry = m.cover.logger.MCoverLogger.getLogger().logEntry(false,{ fileName : "Example.hx", lineNumber : 89, className : "example.Example", methodName : "nestedCallThrowsException"});
		try {
			this.level2();
		} catch( e ) {
		}
		m.cover.logger.MCoverLogger.getLogger().logExit(___logEntry,{ fileName : "Example.hx", lineNumber : 89, className : "example.Example", methodName : "nestedCallThrowsException"});
	}
	,level2: function() {
		var ___logEntry = m.cover.logger.MCoverLogger.getLogger().logEntry(false,{ fileName : "Example.hx", lineNumber : 101, className : "example.Example", methodName : "level2"});
		this.level3();
		m.cover.logger.MCoverLogger.getLogger().logExit(___logEntry,{ fileName : "Example.hx", lineNumber : 101, className : "example.Example", methodName : "level2"});
	}
	,level3: function() {
		var ___logEntry = m.cover.logger.MCoverLogger.getLogger().logEntry(false,{ fileName : "Example.hx", lineNumber : 106, className : "example.Example", methodName : "level3"});
		var ____m6 = "exception";
		m.cover.logger.MCoverLogger.getLogger().logExit(___logEntry,{ fileName : "Example.hx", lineNumber : 106, className : "example.Example", methodName : "level3"});
		throw ____m6;
	}
	,recurse: function(depth) {
		if(depth == null) depth = 0;
		var ___logEntry = m.cover.logger.MCoverLogger.getLogger().logEntry(false,{ fileName : "Example.hx", lineNumber : 112, className : "example.Example", methodName : "recurse"});
		depth++;
		if(depth <= 10) {
			this.i = 0;
			while(this.i < 5000) this.i++;
			this.recurse(depth);
		}
		m.cover.logger.MCoverLogger.getLogger().logExit(___logEntry,{ fileName : "Example.hx", lineNumber : 113, className : "example.Example", methodName : "recurse"});
	}
	,returnInsideIfElse: function() {
		var ___logEntry = m.cover.logger.MCoverLogger.getLogger().logEntry(false,{ fileName : "Example.hx", lineNumber : 126, className : "example.Example", methodName : "returnInsideIfElse"});
		var ____m7 = true;
		m.cover.logger.MCoverLogger.getLogger().logExit(___logEntry,{ fileName : "Example.hx", lineNumber : 126, className : "example.Example", methodName : "returnInsideIfElse"});
		return ____m7;
	}
	,returnInsideSwitch: function() {
		var ___logEntry = m.cover.logger.MCoverLogger.getLogger().logEntry(false,{ fileName : "Example.hx", lineNumber : 132, className : "example.Example", methodName : "returnInsideSwitch"});
		switch(true) {
		case true:
			var ____m9 = true;
			m.cover.logger.MCoverLogger.getLogger().logExit(___logEntry,{ fileName : "Example.hx", lineNumber : 134, className : "example.Example", methodName : "returnInsideSwitch"});
			return ____m9;
		default:
			var ____m10 = false;
			m.cover.logger.MCoverLogger.getLogger().logExit(___logEntry,{ fileName : "Example.hx", lineNumber : 135, className : "example.Example", methodName : "returnInsideSwitch"});
			return ____m10;
		}
	}
	,oneLineMethod: function() {
		var ___logEntry = m.cover.logger.MCoverLogger.getLogger().logEntry(false,{ fileName : "Example.hx", lineNumber : 139, className : "example.Example", methodName : "oneLineMethod"});
		var ____m11 = true;
		m.cover.logger.MCoverLogger.getLogger().logExit(___logEntry,{ fileName : "Example.hx", lineNumber : 139, className : "example.Example", methodName : "oneLineMethod"});
		return ____m11;
	}
	,__class__: example.Example
}
example.InternalClass = $hxClasses["example.InternalClass"] = function() {
};
example.InternalClass.__name__ = ["example","InternalClass"];
example.InternalClass.prototype = {
	__class__: example.InternalClass
}
example.InternalClassWithIgnore = $hxClasses["example.InternalClassWithIgnore"] = function() {
};
example.InternalClassWithIgnore.__name__ = ["example","InternalClassWithIgnore"];
example.InternalClassWithIgnore.prototype = {
	__class__: example.InternalClassWithIgnore
}
if(!example._Example) example._Example = {}
example._Example.PrivateClass = $hxClasses["example._Example.PrivateClass"] = function() {
};
example._Example.PrivateClass.__name__ = ["example","_Example","PrivateClass"];
example._Example.PrivateClass.prototype = {
	__class__: example._Example.PrivateClass
}
example._Example.PrivateClassWithIgnore = $hxClasses["example._Example.PrivateClassWithIgnore"] = function() {
};
example._Example.PrivateClassWithIgnore.__name__ = ["example","_Example","PrivateClassWithIgnore"];
example._Example.PrivateClassWithIgnore.prototype = {
	__class__: example._Example.PrivateClassWithIgnore
}
var haxe = haxe || {}
haxe.Log = $hxClasses["haxe.Log"] = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Log.clear = function() {
	js.Boot.__clear_trace();
}
haxe.Log.prototype = {
	__class__: haxe.Log
}
haxe.StackItem = $hxClasses["haxe.StackItem"] = { __ename__ : ["haxe","StackItem"], __constructs__ : ["CFunction","Module","FilePos","Method","Lambda"] }
haxe.StackItem.CFunction = ["CFunction",0];
haxe.StackItem.CFunction.toString = $estr;
haxe.StackItem.CFunction.__enum__ = haxe.StackItem;
haxe.StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Lambda = function(v) { var $x = ["Lambda",4,v]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.Stack = $hxClasses["haxe.Stack"] = function() { }
haxe.Stack.__name__ = ["haxe","Stack"];
haxe.Stack.callStack = function() {
	return [];
}
haxe.Stack.exceptionStack = function() {
	return [];
}
haxe.Stack.toString = function(stack) {
	var b = new StringBuf();
	var _g = 0;
	while(_g < stack.length) {
		var s = stack[_g];
		++_g;
		b.b[b.b.length] = "\nCalled from ";
		haxe.Stack.itemToString(b,s);
	}
	return b.b.join("");
}
haxe.Stack.itemToString = function(b,s) {
	var $e = (s);
	switch( $e[1] ) {
	case 0:
		b.b[b.b.length] = "a C function";
		break;
	case 1:
		var m = $e[2];
		b.b[b.b.length] = "module ";
		b.b[b.b.length] = m == null?"null":m;
		break;
	case 2:
		var line = $e[4], file = $e[3], s1 = $e[2];
		if(s1 != null) {
			haxe.Stack.itemToString(b,s1);
			b.b[b.b.length] = " (";
		}
		b.b[b.b.length] = file == null?"null":file;
		b.b[b.b.length] = " line ";
		b.b[b.b.length] = line == null?"null":line;
		if(s1 != null) b.b[b.b.length] = ")";
		break;
	case 3:
		var meth = $e[3], cname = $e[2];
		b.b[b.b.length] = cname == null?"null":cname;
		b.b[b.b.length] = ".";
		b.b[b.b.length] = meth == null?"null":meth;
		break;
	case 4:
		var n = $e[2];
		b.b[b.b.length] = "local function #";
		b.b[b.b.length] = n == null?"null":n;
		break;
	}
}
haxe.Stack.makeStack = function(s) {
	return null;
}
haxe.Stack.prototype = {
	__class__: haxe.Stack
}
var js = js || {}
js.Boot = $hxClasses["js.Boot"] = function() { }
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
	var msg = i != null?i.fileName + ":" + i.lineNumber + ": ":"";
	msg += js.Boot.__string_rec(v,"");
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof(console) != "undefined" && console.log != null) console.log(msg);
}
js.Boot.__clear_trace = function() {
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
}
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ != null || o.__ename__ != null)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__ != null) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	try {
		if(o instanceof cl) {
			if(cl == Array) return o.__enum__ == null;
			return true;
		}
		if(js.Boot.__interfLoop(o.__class__,cl)) return true;
	} catch( e ) {
		if(cl == null) return false;
	}
	switch(cl) {
	case Int:
		return Math.ceil(o%2147483648.0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return o === true || o === false;
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o == null) return false;
		return o.__enum__ == cl || cl == Class && o.__name__ != null || cl == Enum && o.__ename__ != null;
	}
}
js.Boot.__init = function() {
	js.Lib.isIE = typeof document!='undefined' && document.all != null && typeof window!='undefined' && window.opera == null;
	js.Lib.isOpera = typeof window!='undefined' && window.opera != null;
	Array.prototype.copy = Array.prototype.slice;
	Array.prototype.insert = function(i,x) {
		this.splice(i,0,x);
	};
	Array.prototype.remove = Array.prototype.indexOf?function(obj) {
		var idx = this.indexOf(obj);
		if(idx == -1) return false;
		this.splice(idx,1);
		return true;
	}:function(obj) {
		var i = 0;
		var l = this.length;
		while(i < l) {
			if(this[i] == obj) {
				this.splice(i,1);
				return true;
			}
			i++;
		}
		return false;
	};
	Array.prototype.iterator = function() {
		return { cur : 0, arr : this, hasNext : function() {
			return this.cur < this.arr.length;
		}, next : function() {
			return this.arr[this.cur++];
		}};
	};
	if(String.prototype.cca == null) String.prototype.cca = String.prototype.charCodeAt;
	String.prototype.charCodeAt = function(i) {
		var x = this.cca(i);
		if(x != x) return undefined;
		return x;
	};
	var oldsub = String.prototype.substr;
	String.prototype.substr = function(pos,len) {
		if(pos != null && pos != 0 && len != null && len < 0) return "";
		if(len == null) len = this.length;
		if(pos < 0) {
			pos = this.length + pos;
			if(pos < 0) pos = 0;
		} else if(len < 0) len = this.length + len - pos;
		return oldsub.apply(this,[pos,len]);
	};
	Function.prototype["$bind"] = function(o) {
		var f = function() {
			return f.method.apply(f.scope,arguments);
		};
		f.scope = o;
		f.method = this;
		return f;
	};
}
js.Boot.prototype = {
	__class__: js.Boot
}
js.Lib = $hxClasses["js.Lib"] = function() { }
js.Lib.__name__ = ["js","Lib"];
js.Lib.isIE = null;
js.Lib.isOpera = null;
js.Lib.document = null;
js.Lib.window = null;
js.Lib.alert = function(v) {
	alert(js.Boot.__string_rec(v,""));
}
js.Lib.eval = function(code) {
	return eval(code);
}
js.Lib.setErrorHandler = function(f) {
	js.Lib.onerror = f;
}
js.Lib.prototype = {
	__class__: js.Lib
}
var m = m || {}
if(!m.cover) m.cover = {}
m.cover.Exception = $hxClasses["m.cover.Exception"] = function(message,cause,info) {
	this.type = this.here({ fileName : "Exception.hx", lineNumber : 66, className : "m.cover.Exception", methodName : "new"}).className;
	this.message = message;
	this.cause = cause;
	this.info = info;
	if(cause != null) {
		this.causeExceptionStack = haxe.Stack.exceptionStack();
		this.causeCallStack = haxe.Stack.callStack();
	}
};
m.cover.Exception.__name__ = ["m","cover","Exception"];
m.cover.Exception.prototype = {
	type: null
	,message: null
	,info: null
	,cause: null
	,causeExceptionStack: null
	,causeCallStack: null
	,toString: function() {
		var str = this.type + ": " + this.message;
		if(this.info != null) str += " at " + this.info.className + "#" + this.info.methodName + " (" + this.info.lineNumber + ")";
		if(this.cause != null) str += "\n\t Caused by: " + this.cause;
		return str;
	}
	,here: function(info) {
		return info;
	}
	,__class__: m.cover.Exception
}
if(!m.cover.logger) m.cover.logger = {}
m.cover.logger.Logger = $hxClasses["m.cover.logger.Logger"] = function() { }
m.cover.logger.Logger.__name__ = ["m","cover","logger","Logger"];
m.cover.logger.Logger.prototype = {
	completionHandler: null
	,isRecording: null
	,startRecording: null
	,stopRecording: null
	,getRecording: null
	,report: null
	,addClient: null
	,removeClient: null
	,logEntry: null
	,logExit: null
	,__class__: m.cover.logger.Logger
}
m.cover.logger.LoggerException = $hxClasses["m.cover.logger.LoggerException"] = function(message,cause,info) {
	m.cover.Exception.call(this,message,cause,info);
	this.type = this.here({ fileName : "LoggerException.hx", lineNumber : 39, className : "m.cover.logger.LoggerException", methodName : "new"}).className;
};
m.cover.logger.LoggerException.__name__ = ["m","cover","logger","LoggerException"];
m.cover.logger.LoggerException.__super__ = m.cover.Exception;
m.cover.logger.LoggerException.prototype = $extend(m.cover.Exception.prototype,{
	__class__: m.cover.logger.LoggerException
});
m.cover.logger.LoggerImpl = $hxClasses["m.cover.logger.LoggerImpl"] = function() {
	this.defaultClient = new m.cover.logger.client.LoggerClientImpl();
	this.clients = [];
	this.clientCompleteCount = 0;
	this.reset();
};
m.cover.logger.LoggerImpl.__name__ = ["m","cover","logger","LoggerImpl"];
m.cover.logger.LoggerImpl.__interfaces__ = [m.cover.logger.Logger];
m.cover.logger.LoggerImpl.prototype = {
	completionHandler: null
	,isRecording: null
	,count: null
	,depth: null
	,maxDepth: null
	,logs: null
	,stack: null
	,logsById: null
	,recording: null
	,clients: null
	,clientCompleteCount: null
	,defaultClient: null
	,reset: function() {
		this.count = 0;
		this.logs = [];
		this.stack = [];
		this.logsById = new IntHash();
		this.depth = 0;
		this.maxDepth = 0;
	}
	,logEntry: function(isInlineFunction,pos) {
		if(isInlineFunction == null) isInlineFunction = false;
		if(!this.isRecording) return -1;
		var t = m.cover.util.Timer.stamp();
		var log = new m.cover.logger.data.Log(this.count++);
		log.enter(pos,t,this.depth++);
		log.inlined = isInlineFunction;
		this.logsById.set(log.id,log);
		this.logs.push(log);
		if(this.stack.length > 0) this.stack[this.stack.length - 1].children.push(log);
		this.stack.push(log);
		if(this.depth > this.maxDepth) this.maxDepth = this.depth;
		return log.id;
	}
	,logExit: function(entryId,pos) {
		if(!this.isRecording) return;
		if(!this.logsById.exists(entryId)) {
			haxe.Log.trace("WARNING: Cannot find matching entry log. " + [entryId,pos],{ fileName : "LoggerImpl.hx", lineNumber : 139, className : "m.cover.logger.LoggerImpl", methodName : "logExit"});
			return;
		}
		try {
			var t = m.cover.util.Timer.stamp();
			var entryLog = this.logsById.get(entryId);
			var log = this.stack.pop();
			if(log != entryLog) while(log != null && log != entryLog) {
				log.exit(null,t);
				this.depth--;
				log = this.stack.pop();
			}
			this.depth--;
			entryLog.exit(pos,t);
			if(this.depth < 0) this.depth = 0;
		} catch( e ) {
			haxe.Log.trace(e,{ fileName : "LoggerImpl.hx", lineNumber : 171, className : "m.cover.logger.LoggerImpl", methodName : "logExit"});
		}
	}
	,startRecording: function() {
		this.isRecording = true;
		this.reset();
		this.recording = new m.cover.logger.data.LogRecording();
	}
	,stopRecording: function() {
		if(!this.isRecording) throw new m.cover.logger.LoggerException("No recording active.",null,{ fileName : "LoggerImpl.hx", lineNumber : 191, className : "m.cover.logger.LoggerImpl", methodName : "stopRecording"});
		this.isRecording = false;
		this.updateRecording();
	}
	,getRecording: function() {
		if(this.isRecording) this.updateRecording();
		return this.recording;
	}
	,updateRecording: function() {
		if(this.recording == null) return;
		this.recording.maxDepth = this.maxDepth;
		this.recording.endTime = m.cover.util.Timer.stamp();
		this.recording.duration = this.recording.endTime - this.recording.startTime;
	}
	,report: function(recording) {
		if(recording == null) recording = this.getRecording();
		if(recording == null) throw new m.cover.logger.LoggerException("Cannot report on empty log.\nYour should probably make sure to call startRecording() sometime before calling report()",null,{ fileName : "LoggerImpl.hx", lineNumber : 228, className : "m.cover.logger.LoggerImpl", methodName : "report"});
		this.clientCompleteCount = 0;
		if(this.clients.length == 0 && this.defaultClient != null) {
			this.defaultClient.completionHandler = this.clientCompletedHandler.$bind(this);
			this.defaultClient.report(this.logs,recording);
		} else {
			var _g = 0, _g1 = this.clients;
			while(_g < _g1.length) {
				var client = _g1[_g];
				++_g;
				client.completionHandler = this.clientCompletedHandler.$bind(this);
				client.report(this.logs,recording);
			}
		}
	}
	,clientCompletedHandler: function(client) {
		this.clientCompleteCount++;
		if(this.clientCompleteCount >= this.clients.length) {
			if(this.completionHandler != null) this.completionHandler(this);
		}
	}
	,addClient: function(client) {
		this.clients.remove(client);
		this.clients.push(client);
	}
	,removeClient: function(client) {
		this.clients.remove(client);
	}
	,__class__: m.cover.logger.LoggerImpl
}
m.cover.logger.MCoverLogger = $hxClasses["m.cover.logger.MCoverLogger"] = function() {
};
m.cover.logger.MCoverLogger.__name__ = ["m","cover","logger","MCoverLogger"];
m.cover.logger.MCoverLogger.logger = null;
m.cover.logger.MCoverLogger.getLogger = function() {
	if(m.cover.logger.MCoverLogger.logger == null) m.cover.logger.MCoverLogger.logger = new m.cover.logger.LoggerImpl();
	return m.cover.logger.MCoverLogger.logger;
}
m.cover.logger.MCoverLogger.prototype = {
	__class__: m.cover.logger.MCoverLogger
}
if(!m.cover.logger.client) m.cover.logger.client = {}
m.cover.logger.client.LoggerClient = $hxClasses["m.cover.logger.client.LoggerClient"] = function() { }
m.cover.logger.client.LoggerClient.__name__ = ["m","cover","logger","client","LoggerClient"];
m.cover.logger.client.LoggerClient.prototype = {
	completionHandler: null
	,output: null
	,report: null
	,__class__: m.cover.logger.client.LoggerClient
}
m.cover.logger.client.LoggerClientImpl = $hxClasses["m.cover.logger.client.LoggerClientImpl"] = function() {
	this.output = "";
};
m.cover.logger.client.LoggerClientImpl.__name__ = ["m","cover","logger","client","LoggerClientImpl"];
m.cover.logger.client.LoggerClientImpl.__interfaces__ = [m.cover.logger.client.LoggerClient];
m.cover.logger.client.LoggerClientImpl.prototype = {
	completionHandler: null
	,output: null
	,report: function(logs,recording) {
		var buf = new StringBuf();
		this.reportFull(buf,logs,recording);
		this.reportFrequency(buf,logs,recording);
		this.reportSlowest(buf,logs,recording);
		this.reportStats(buf,logs,recording);
		this.output = buf.b.join("");
		haxe.Log.trace(this.output,{ fileName : "LoggerClientImpl.hx", lineNumber : 75, className : "m.cover.logger.client.LoggerClientImpl", methodName : "report"});
		if(this.completionHandler != null) this.completionHandler(this);
	}
	,reportStats: function(buf,logs,recording) {
		buf.b[buf.b.length] = "\n\n--------";
		buf.b[buf.b.length] = "\nStats:";
		buf.add("\n    Total logs: " + logs.length);
		buf.add("\n    Max depth: " + recording.maxDepth);
		buf.b[buf.b.length] = "\n--------\n";
	}
	,reportFrequency: function(buf,logs,recording) {
		buf.b[buf.b.length] = "\n\nHighest Frequency:\n";
		var hash = new Hash();
		var _g = 0;
		while(_g < logs.length) {
			var log = logs[_g];
			++_g;
			var logCount;
			if(hash.exists(log.get_name())) logCount = hash.get(log.get_name()); else logCount = { name : log.get_name(), count : 0};
			logCount.count++;
			hash.set(log.get_name(),logCount);
		}
		var a = Lambda.array(hash);
		a.sort(this.sortOnCount.$bind(this));
		var count = 0;
		var _g = 0;
		while(_g < a.length) {
			var logCount = a[_g];
			++_g;
			buf.add("\n   " + logCount.count + " | " + logCount.name);
			count++;
			if(count > 10) break;
		}
	}
	,sortOnCount: function(a,b) {
		return Math.round(-a.count + b.count);
	}
	,reportSlowest: function(buf,logs,recording) {
		buf.b[buf.b.length] = "\n\nLongest Execution Times:\n";
		var a = logs.concat([]);
		a.sort(this.sortOnExecution.$bind(this));
		var count = 0;
		var _g = 0;
		while(_g < a.length) {
			var log = a[_g];
			++_g;
			buf.add("\n   " + m.cover.util.NumberUtil.round(log.internalDuration) + " | " + log.get_name());
			count++;
			if(count > 10 || m.cover.util.NumberUtil.round(log.internalDuration) == 0) break;
		}
	}
	,sortOnExecution: function(a,b) {
		return Math.round(-a.internalDuration * 10000 + b.internalDuration * 10000);
	}
	,reportFull: function(buf,logs,recording) {
		buf.b[buf.b.length] = "\n\nFull log:\n";
		var count = 0;
		var padding = "                                                                         ";
		var _g = 0;
		while(_g < logs.length) {
			var log = logs[_g];
			++_g;
			count++;
			var time = this.formatTime(log.entryTime - recording.startTime);
			var $char = log.skipped?"!":">";
			buf.add("\n    " + time + "| " + padding.substr(0,log.depth) + $char + " " + log.toString());
			if(count > 200) break;
		}
		return buf.b.join("");
	}
	,formatTime: function(value,decimalCount,length,$char) {
		if($char == null) $char = " ";
		if(length == null) length = 8;
		if(decimalCount == null) decimalCount = 4;
		value = m.cover.util.NumberUtil.round(value,decimalCount);
		return StringTools.rpad(Std.string(value),$char,length);
	}
	,__class__: m.cover.logger.client.LoggerClientImpl
}
if(!m.cover.logger.data) m.cover.logger.data = {}
m.cover.logger.data.Log = $hxClasses["m.cover.logger.data.Log"] = function(id) {
	this.id = id;
	this.inlined = false;
	this.skipped = false;
	this.totalDuration = 0;
	this.internalDuration = 0;
	this.children = [];
};
m.cover.logger.data.Log.__name__ = ["m","cover","logger","data","Log"];
m.cover.logger.data.Log.prototype = {
	id: null
	,name: null
	,children: null
	,depth: null
	,entryPos: null
	,exitPos: null
	,entryTime: null
	,exitTime: null
	,totalDuration: null
	,internalDuration: null
	,skipped: null
	,inlined: null
	,toString: function() {
		return this.get_name() + " (" + m.cover.util.NumberUtil.round(this.totalDuration) + ", " + m.cover.util.NumberUtil.round(this.internalDuration) + ")";
	}
	,enter: function(pos,time,depth) {
		this.entryPos = pos;
		this.entryTime = time;
		this.depth = depth;
	}
	,exit: function(pos,time) {
		this.exitPos = pos;
		this.set_exitTime(time);
		this.totalDuration = this.exitTime - this.entryTime;
		this.skipped = pos == null;
		this.internalDuration = this.totalDuration;
		var _g = 0, _g1 = this.children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			this.internalDuration -= child.totalDuration;
		}
	}
	,get_name: function() {
		if(this.name == null) {
			if(this.entryPos == null) return null;
			this.name = this.entryPos.className + "/" + this.entryPos.methodName;
			if(this.inlined) this.name += "/function_" + this.entryPos.lineNumber;
		}
		return this.name;
	}
	,set_exitTime: function(value) {
		this.exitTime = value;
		return value;
	}
	,__class__: m.cover.logger.data.Log
	,__properties__: {set_exitTime:"set_exitTime",get_name:"get_name"}
}
m.cover.logger.data.LogRecording = $hxClasses["m.cover.logger.data.LogRecording"] = function() {
	this.depth = 0;
	this.maxDepth = 0;
	this.startTime = Date.now().getTime() / 1000;
	this.endTime = 0;
	this.duration = 0;
};
m.cover.logger.data.LogRecording.__name__ = ["m","cover","logger","data","LogRecording"];
m.cover.logger.data.LogRecording.prototype = {
	depth: null
	,maxDepth: null
	,startTime: null
	,endTime: null
	,duration: null
	,__class__: m.cover.logger.data.LogRecording
}
if(!m.cover.util) m.cover.util = {}
m.cover.util.NumberUtil = $hxClasses["m.cover.util.NumberUtil"] = function() { }
m.cover.util.NumberUtil.__name__ = ["m","cover","util","NumberUtil"];
m.cover.util.NumberUtil.round = function(value,precision) {
	if(precision == null) precision = 4;
	value = value * Math.pow(10,precision);
	return Math.round(value) / Math.pow(10,precision);
}
m.cover.util.NumberUtil.prototype = {
	__class__: m.cover.util.NumberUtil
}
m.cover.util.Timer = $hxClasses["m.cover.util.Timer"] = function(time_ms) {
	this.run = this.defaultRun.$bind(this);
	this.id = m.cover.util.Timer.arr.length;
	m.cover.util.Timer.arr[this.id] = this;
	this.timerId = window.setInterval("m.cover.util.Timer.arr[" + this.id + "].run();",time_ms);
};
m.cover.util.Timer.__name__ = ["m","cover","util","Timer"];
m.cover.util.Timer.delay = function(f,time_ms) {
	var t = new m.cover.util.Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
}
m.cover.util.Timer.stamp = function() {
	return Date.now().getTime() / 1000;
}
m.cover.util.Timer.inlineStamp = function() {
	return Date.now().getTime() / 1000;
}
m.cover.util.Timer.prototype = {
	run: null
	,id: null
	,timerId: null
	,defaultRun: function() {
	}
	,stop: function() {
		if(this.id == null) return;
		window.clearInterval(this.timerId);
		m.cover.util.Timer.arr[this.id] = null;
		if(this.id > 100 && this.id == m.cover.util.Timer.arr.length - 1) {
			var p = this.id - 1;
			while(p >= 0 && m.cover.util.Timer.arr[p] == null) p--;
			m.cover.util.Timer.arr = m.cover.util.Timer.arr.slice(0,p + 1);
		}
		this.id = null;
	}
	,__class__: m.cover.util.Timer
}
js.Boot.__res = {}
js.Boot.__init();
{
	var d = Date;
	d.now = function() {
		return new Date();
	};
	d.fromTime = function(t) {
		var d1 = new Date();
		d1["setTime"](t);
		return d1;
	};
	d.fromString = function(s) {
		switch(s.length) {
		case 8:
			var k = s.split(":");
			var d1 = new Date();
			d1["setTime"](0);
			d1["setUTCHours"](k[0]);
			d1["setUTCMinutes"](k[1]);
			d1["setUTCSeconds"](k[2]);
			return d1;
		case 10:
			var k = s.split("-");
			return new Date(k[0],k[1] - 1,k[2],0,0,0);
		case 19:
			var k = s.split(" ");
			var y = k[0].split("-");
			var t = k[1].split(":");
			return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
		default:
			throw "Invalid date format : " + s;
		}
	};
	d.prototype["toString"] = function() {
		var date = this;
		var m = date.getMonth() + 1;
		var d1 = date.getDate();
		var h = date.getHours();
		var mi = date.getMinutes();
		var s = date.getSeconds();
		return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d1 < 10?"0" + d1:"" + d1) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
	};
	d.prototype.__class__ = $hxClasses["Date"] = d;
	d.__name__ = ["Date"];
}
{
	Math.__name__ = ["Math"];
	Math.NaN = Number["NaN"];
	Math.NEGATIVE_INFINITY = Number["NEGATIVE_INFINITY"];
	Math.POSITIVE_INFINITY = Number["POSITIVE_INFINITY"];
	$hxClasses["Math"] = Math;
	Math.isFinite = function(i) {
		return isFinite(i);
	};
	Math.isNaN = function(i) {
		return isNaN(i);
	};
}
{
	String.prototype.__class__ = $hxClasses["String"] = String;
	String.__name__ = ["String"];
	Array.prototype.__class__ = $hxClasses["Array"] = Array;
	Array.__name__ = ["Array"];
	var Int = $hxClasses["Int"] = { __name__ : ["Int"]};
	var Dynamic = $hxClasses["Dynamic"] = { __name__ : ["Dynamic"]};
	var Float = $hxClasses["Float"] = Number;
	Float.__name__ = ["Float"];
	var Bool = $hxClasses["Bool"] = Boolean;
	Bool.__ename__ = ["Bool"];
	var Class = $hxClasses["Class"] = { __name__ : ["Class"]};
	var Enum = { };
	var Void = $hxClasses["Void"] = { __ename__ : ["Void"]};
}
{
	if(typeof document != "undefined") js.Lib.document = document;
	if(typeof window != "undefined") {
		js.Lib.window = window;
		js.Lib.window.onerror = function(msg,url,line) {
			var f = js.Lib.onerror;
			if(f == null) return false;
			return f(msg,[url + ":" + line]);
		};
	}
}
Main.__meta__ = { obj : { IgnoreLogging : null}};
Main.completed = false;
example.Example.__meta__ = { fields : { ignoredFunction : { IgnoreLogging : null}}};
example.InternalClassWithIgnore.__meta__ = { obj : { IgnoreLogging : null}};
example._Example.PrivateClassWithIgnore.__meta__ = { obj : { IgnoreLogging : null}};
js.Lib.onerror = null;
m.cover.logger.LoggerImpl.__meta__ = { obj : { IgnoreLogging : null, IgnoreCover : null}};
m.cover.logger.LoggerImpl.MAX_STACK_DEPTH_LIMIT = 26;
m.cover.logger.MCoverLogger.__meta__ = { obj : { IgnoreLogging : null, IgnoreCover : null}, statics : { getLogger : { IgnoreLogging : null, IgnoreCover : null}}};
m.cover.logger.client.LoggerClientImpl.__meta__ = { obj : { IgnoreLogging : null, IgnoreCover : null}};
m.cover.logger.data.Log.__meta__ = { obj : { IgnoreLogging : null}};
m.cover.logger.data.LogRecording.__meta__ = { obj : { IgnoreLogging : null}};
m.cover.util.NumberUtil.__meta__ = { obj : { IgnoreCover : null, IgnoreLogging : null}};
m.cover.util.Timer.__meta__ = { obj : { IgnoreCover : null, IgnoreLogging : null}, statics : { inlineStamp : { IgnoreCover : null}}, fields : { defaultRun : { IgnoreCover : null}}};
m.cover.util.Timer.arr = [];
Main.main()