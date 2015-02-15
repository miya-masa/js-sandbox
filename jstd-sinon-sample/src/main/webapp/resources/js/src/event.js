$(function() {
	$("#button-id").click(function() {
		console.log("clicked");
		$("<div>").attr("id", "div-add").text("add").appendTo($("body"));
	});
});