myapp = {};
myapp.Hello = function() {
};
myapp.Hello.prototype.sayHello = function(name) {
	if (name === "special") {
		return "Special!!!";
	}
	return "Hello " + name + "!!";
};
