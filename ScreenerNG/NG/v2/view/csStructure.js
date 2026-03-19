
var csfstr = (function () {  //CS Filter Struc

	var htmlU = mintHtmlUtil;
	var jsu = mintJsUtil;



	var resizer; // = $("#tsrCsDivSeperator")

	function init() {

		resizer = $("#tsrCsDivSeperator")
		addResizerListeners();

	}

	function addResizerListeners() {

		if (isMobile()) return;

		resizer.on("mousedown", function (e) {
			e.preventDefault();
			mouseDownHandler(e);
		});
	}

	const mouseDownHandler = function mouseDownHandler(e) {

		xCord = e.clientX;
		let id = "#" + e.currentTarget.id;

		colAfter = $(id).next()[0];
		colBefore = $(id).prev()[0];

		if (jsu.isNotNull(colAfter) && jsu.isNotNull(colBefore)) {
			$(document.body).on("mousemove", (e) => {
				colMouseMoveHandler(e, colAfter, colBefore);
			});
			$(document.body).on("mouseup", mouseUpHandler);
		}
	}

	const colMouseMoveHandler = function (e, colAfter, colBefore) {
		let dx = xCord - e.clientX;

		colAfter.style.transition = 'none';
		colBefore.style.transition = 'none';
		let newColAfterWidth, newColBeforeWidth;

		newColBeforeWidth = colBefore.offsetWidth - dx + 'px';
		newColAfterWidth = colAfter.offsetWidth + dx + 'px';

		colBefore.style.width = newColBeforeWidth;
		colAfter.style.width = newColAfterWidth;

		xCord = e.clientX;
	}

	const mouseUpHandler = () => {
		$(document.body).off("mousemove");
		$(document.body).off("mouseup");
	}


	return {
		init: init
	}
})(); // module