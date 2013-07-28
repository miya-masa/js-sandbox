$(function() {
	$("#button-click-id").click(function() {
		console.log("#button-clicked!");
		var $result = $("#result ul");
		var $target = $("<li>");
		$target.text("Clicked").appendTo($result);
	});

	$("#burron-clear-id").click(function() {
		console.log("#clear-clicked!");
		var $result = $("#result ul");
		$result.empty();
	});
});
