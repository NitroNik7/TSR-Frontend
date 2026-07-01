
var csfstr = (function () {  //CS Filter Struc

	var htmlU = mintHtmlUtil;
	var jsu = mintJsUtil;



	var resizer ; // = document.querySelector('.csResizer');
	var leftColumn ; //= document.querySelector('#csControlsDiv');
	var rightColumn ; //= document.querySelector('#csSelFieldsDivWrap');
	var wrapper ; //= document.querySelector('.csWrapper');
	var collapseButton ; //= document.querySelector('#collapse-button');
	var insideTabs ; //= document.getElementById("insideTabs");
	var selectFieldsButton ; //= document.querySelector(".selectfields-Button");


	function init(){

		resizer = document.querySelector('.csResizer');
		leftColumn = document.querySelector('#csControlsDiv');
		rightColumn = document.querySelector('#csSelFieldsDivWrap');
		wrapper = document.querySelector('.csWrapper');
		collapseButton = document.querySelector('#collapse-button');
		insideTabs = document.getElementById("insideTabs");
		selectFieldsButton = document.querySelector(".selectfields-Button");

		if(!mtgv.cs.ng){
			addResizerListeners();

			addCollapsableBtnListeners();
			addSelFldListeners();

			new ResizeObserver(() => initwrapperWidth()).observe(wrapper);

			new ResizeObserver(() => initScrollBtns()).observe(insideTabs);

			addScrollBarEventListner();

			
		}

	}






/* 
    
    Scrollbar hover :

*/

function addScrollBarEventListner(){

	// #csControlsDiv
	leftColumn.addEventListener("mousemove", function(e){
	    let ele = document.getElementById('csControlsDiv');

	    let rect = ele.getBoundingClientRect();
	    var rightCord = rect.right;

	    var pageX= e.pageX;

	    if(rightCord-pageX  <20 && rightCord-pageX  >=0){
	    	ele.classList.add('more-width') 
	    }else{
	    	ele.classList.remove('more-width')
	    }

	    // let distance = ele.offsetLeft + ele.offsetWidth - e.pageX;
	    // distance < 15 && distance > -15 ? ele.classList.add('more-width') : ele.classList.remove('more-width');
	});
	leftColumn.addEventListener("mouseleave", function(e){
		let ele = document.getElementById('csControlsDiv');
		ele.classList.remove('more-width')
	});


/*
	leftColumn.addEventListener("mousemove", function(e){
	    
	    let ele = document.getElementById('csControlsDiv');
	    let rect = ele.getBoundingClientRect();
	    let distance = rect.top + ele.offsetHeight - e.pageY;
	    distance < 15 && distance > -15 ? ele.classList.add('more-height') : ele.classList.remove('more-height');
	});
*/
	// #csSelFieldsDivWrap


	if(!isMobile()) {

		rightColumn.addEventListener("mousemove", function(e){
		    let ele = document.getElementById('csSelFieldsDivWrap');

		    let rect = ele.getBoundingClientRect();
		    var rightCord = rect.right;

		    var pageX= e.pageX;

		    if(rightCord-pageX  <20){
		    	ele.classList.add('more-width-sf') 
		    }else{
		    	ele.classList.remove('more-width-sf')
		    }

		    // let distance = ele.offsetLeft + ele.offsetWidth - e.pageX;
		    // distance < 15 && distance > -15 ? ele.classList.add('more-width-sf') : ele.classList.remove('more-width-sf');
		});

		rightColumn.addEventListener("mousemove", function(e){
		    
		    let ele = document.getElementById('csSelFieldsDivWrap');
		    let rect = ele.getBoundingClientRect();
		    let distance = rect.top + ele.offsetHeight - e.pageY;
		    distance < 15 && distance > -15 ? ele.classList.add('more-height-sf') : ele.classList.remove('more-height-sf');
		});

	}

	

}



	function addResizerListeners(){

		if(isMobile()) return;



		resizer.addEventListener('mousedown', function (e) {
		    e.preventDefault();
		    document.addEventListener('mousemove', resize);
		    document.addEventListener('mouseup', stopResize);
		});
	}


	function addCollapsableBtnListeners(){

		if(isMobile()) return;

		collapseButton.addEventListener('click', function (e) {
		    e.preventDefault();

		    const newLeftWidth = e.pageX - wrapper.offsetLeft;
		    const rightWidth = wrapper.offsetWidth - newLeftWidth - resizer.offsetWidth;

		    if (rightColumn.style.display === 'none') {
		        leftColumn.style.width = newLeftWidth - 400 + 'px';
		        rightColumn.style.width = '400px';
		        rightColumn.style.display = 'block';
		        collapseButton.innerHTML = '<i class="fa fa-solid fa-caret-right"  style="color: #000000;"></i>';
		        // collapseButton.textContent = '>';

		    } else {
		        leftColumn.style.width = newLeftWidth + rightWidth + 'px';
		        rightColumn.style.display = 'none';
		        // collapseButton.textContent = '<';
		        collapseButton.innerHTML = '<i class="fa fa-solid fa-caret-left"  style="color: #000000;"></i>';
		    }
		});

	}

	function addSelFldListeners(){

		if(isMobile()) return;

		selectFieldsButton.addEventListener('click', function (e) {
		    e.preventDefault();
		    if (rightColumn.style.display === "none" || rightColumn.style.display === '') {
		        // wrapper.style.height = "750px";
		        showSelFieldsForMobInvali();

		        // resizer.style.height = "500px";

		    } else {
		        // wrapper.style.height = "510px";
		    	wrapper.style.height = "max-content";

		        leftColumn.style.height = "100%";
		        rightColumn.style.height = "100%";
		        rightColumn.style.display = 'none';
		    }
		});


	}

	function showSelFieldsForMobInvali(){
/*
		if(wrapper.offsetWidth <= 901){
			rightColumn.style.width = '100%';
		       rightColumn.style.height = "250px";
		        leftColumn.style.height = "500px";
		        leftColumn.style.marginRight = '5px';
		        // leftColumn.style.borderRight = '5px';
		        rightColumn.style.display = 'block';
		        rightColumn.style.width = 'auto';
		        // rightColumn.style.marginTop = '0px';
		        rightColumn.style.marginLeft = '5px';
		        rightColumn.style.borderLeft = '1px solid rgb(0 0 0 / 25%)';	
		}
*/
		
	}




	function resize(e) {
	    // e.pageX gives X coordinate of mouse click event
	    // wrapper.offsetLeft gives the number of pixels by which wrapper div is offset to the left to the page(parent)
	    const offset = e.pageX - wrapper.offsetLeft; // width of left column
	    const newLeftWidth = offset; // width of left column
	    const newRightWidth = wrapper.offsetWidth - offset - resizer.offsetWidth; // width of right column

	    // if condition to prevent resizing left column's width < 400px
	    if (newLeftWidth < 400) {
	        leftColumn.style.width = '400px';
	        rightColumn.style.width = (wrapper.offsetWidth - 400 - resizer.offsetWidth) + 'px';
	    }
	    // if condition to prevent resizing right column's width < 400px
	    else if (newRightWidth < 200) {
	        rightColumn.style.display = 'block';
	        leftColumn.style.width = (wrapper.offsetWidth - 200 - resizer.offsetWidth) + 'px';
	        rightColumn.style.width = '200px';
	    }
	    // if condition to adjust left and right column width and also move resizer (because its position is set to relative)
	    else {
	        leftColumn.style.width = newLeftWidth + 'px';
	        rightColumn.style.width = newRightWidth + 'px';
	    }
	}

	function stopResize() {
	    document.removeEventListener('mousemove', resize);
	}


	function initwrapperWidth() {
	   
/*
	    if (wrapper.offsetWidth > 901) {
*/
	    	var winht = window.innerHeight;
	    	var wrapperHt = 510;
	    	var colHt = 500;
	    	if(winht<800){
	    		wrapperHt = winht -300;
	    		colHt = wrapperHt-10;
	    	}


	    	wrapper.style.padding ='10px 0 10px 0  '

	        // wrapper.style.height = wrapperHt+'px';
	    	wrapper.style.height = 'max-content';



	        wrapper.style.flexDirection = "row";

	        // leftColumn.style.height = colHt+ 'px';

	        if(isMobile()){

	        	 leftColumn.style.height = 'max-content';

	        leftColumn.style.width = '100%';
	        leftColumn.style.marginRight = '0px';
	        leftColumn.style.borderRight = 'none';

	        // resizer.style.display = "block";

	        // rightColumn.style.height = colHt+ 'px';
	        // rightColumn.style.height = 'max-content';

	        // rightColumn.style.width = '15%';
	        // rightColumn.style.display = "block";
	        // rightColumn.style.marginLeft = '0px';
	        // // rightColumn.style.borderLeft = '0';  

	        // selectFieldsButton.style.display = "none";

	        // // 
	        // htmlU.divHide('right-scroll');
	        htmlU.divHide('left-scroll');

	        }else{



	        	 leftColumn.style.height = 'max-content';

	        leftColumn.style.width = '85%';
	        leftColumn.style.marginRight = '0px';
	        leftColumn.style.borderRight = 'none';

	        resizer.style.display = "block";

	        // rightColumn.style.height = colHt+ 'px';
	        rightColumn.style.height = 'max-content';

	        rightColumn.style.width = '15%';
	        rightColumn.style.display = "block";
	        rightColumn.style.marginLeft = '0px';
	        // rightColumn.style.borderLeft = '0';  

	        selectFieldsButton.style.display = "none";

	        // 
	        htmlU.divHide('right-scroll');
	        htmlU.divHide('left-scroll');
	        }



	       
/*
	    }
	    else {
	        wrapper.style.flexDirection = "column";
	        resizer.style.display = "none";
	        rightColumn.style.display = "none";

	        leftColumn.style.width = 'auto';
	        leftColumn.style.borderRight = '1px solid rgb(0 0 0 / 25%)';
	        leftColumn.style.marginRight = '5px';

	        selectFieldsButton.style.top = "450px";
	        selectFieldsButton.style.right = "25px";
	        selectFieldsButton.style.display = "block";

	        // var selBtn = $("selectfields-Button")

	        // selBtn.css("background-color", "yellow");
	        // selBtn.css("border-radius" , "4px")

	        // selectFieldsButton.style.border-radius = "24px";
	        // selectFieldsButton.style.height = "4px";


	
	// box-shadow: inset 0px 0px 0px 0px red;
	// text-shadow: none;
	// border-color: #C0C0C0;
	// background-color:white;	

	        htmlU.divShow('right-scroll');
	        htmlU.divShow('left-scroll');
	    }

*/	    
	}



	/*

	    Code for scrolling through tab menu options Price, Volume, High/Low etc.... below

	*/

	function left_scroll() {
	    const left = document.getElementById("insideTabs");
	    left.scrollBy({
	        left: -250,
	        behavior: "smooth"
	    });
	}

	function right_scroll() {
	    const right = document.getElementById("insideTabs");
	    right.scrollBy({
	        left: 250,
	        behavior: "smooth"
	    });
	}

	function initScrollBtns() {
	    var screener_width = document.getElementById("insideTabs").offsetWidth;
	    const left = document.getElementById("LeftScrollBtn");
	    const right = document.getElementById("RightScrollBtn");
	    const leftScroll = document.getElementById("left-scroll");
	    const rightScroll = document.getElementById("right-scroll");

	    if (screener_width <= 1350) {
	        leftScroll.style.display = 'grid';
	        rightScroll.style.display = 'grid';
	        left.style.display = "block";
	        right.style.display = "block";
	    }
	    else {
	        leftScroll.style.display = 'none';
	        rightScroll.style.display = 'none';
	        left.style.display = "none";
	        right.style.display = "none";
	    }
	}




	return {

	init : init,
	ls : left_scroll, 
	rs : right_scroll,
	scsffmi : showSelFieldsForMobInvali

  }
})(); // module