var mimarq = (function () {  // miscreener utils // mintnovate myc (myc taken from mytsr)  

  var htmlU = mintHtmlUtil;
  var jsu = mintJsUtil;
  var stkCmn = mintStkCommon;


  let tickerData = null;
  let gainer = true;

  let marqueeDuration = 10;

  let MARQUEE_DIV = 'tsrTickerContainer'
  let isOver = false;

  function init(){

  	let html = `<div class="tsrTickerMarquee">
                <div class="tsrTickerWrapper">
                    <div class="tsrTickerContainer" id = 'tsrTickerContainer' >`;




  	html+= `	</div>
	        </div>
	    </div>`;	


	htmlU.addMsgToDiv( 'tickersDiv' , true, html  )

	const div = document.querySelector('#tsrTickerContainer');

	div.addEventListener('mouseenter', () => isOver = true);
	div.addEventListener('mouseleave', () => isOver = false);


  	loadTickerData('init')
  }

  function loadTickerData(type){

  	let url =  jsu.getBaseUrl()+ '/json/Marquee.json';

  	$.ajax({
	    url: url, // Target URL
	    type: 'GET',              // HTTP method (GET, POST, etc.)
	    data: { },        // Data to send to the server
	    dataType: 'json',         // Expected response format (json, xml, html, text)
	    success: function(response) {
	        
	    	tickerData = response;

	    	if(type == 'init'){
	    		initHtml();
	    		refreshMarquee(); // Reload from Server
	    	}else{

	    		let nifty = tickerData.NIFTY;
  				let bankNifty = tickerData.BANKNIFTY;
	    		changeIdxVal(nifty);
					changeIdxVal(bankNifty)

	    	}

	    },
	    error: function(xhr, status, error) {
	        console.error('Error:', error);
	    }
	});

  	

  }


  function initHtml(){
		printIdx()

		printMarquee(true)

  }


  function printIdx(){

  	let nifty = tickerData.NIFTY;
  	let bankNifty = tickerData.BANKNIFTY;

  	if(nifty == null) return;




  	// let  niftyPcClass =     nifty.chg  > 0  'tsrTickerPriceChgPos'  :  'tsrTickerPriceChgNeg';
		// let  bankNiftyPcClass = bankNifty.chg > 0  'tsrTickerPriceChgPos'  :  'tsrTickerPriceChgNeg';

/*

  	 let html = `<div class="tsrHomeSection d-flex flex-column flex-md-row justify-content-between p-1 shadow-sm"
			        style="border-radius: 20px; margin: 10px 20px;">
			        <div class="d-flex flex-column align-items-center w-100 mb-2">

			                <p style="margin-bottom: 0;" class="d-flex justify-content-evenly w-100">
			                        <b class="">NIFTY </b>

			                </p>

			                <p id='NIFTYHL' style="margin-bottom: 0;" class="d-flex justify-content-around">
  	 										
			                </p>

			        </div>
			        <div class="d-flex flex-column align-items-center w-100">
			                <p style="margin-bottom: 0;">
			                        <b class="">BANKNIFTY </b>
			                </p>
			                <p  id='BANKNIFTYHL' style="margin-bottom: 0;" class="d-flex justify-content-around">
			                      
			                </p>
			        </div>
			</div>`

*/
  		let html =`
  				 <section class="tsrHomeIndicesSection py-4 mx-md-3">
        			<div class="row g-3">

                                <!-- NIFTY -->

                                <div class="col-md-12">
                                  
                                       <div  id='NIFTYHL'></div> 
                                    
                                </div>

                               

                            </div>

                        </section>
  		`;

	

			htmlU.addMsgToDiv('tickersIdxDiv' , true, html);	

			changeIdxVal(nifty);
			// changeIdxVal(bankNifty)
  }


  function changeIdxVal(nifty){

  	let  niftyPcClass =     nifty.chg  > 0 ?  'positive'  :  'negative';

  	let  niftyCaretClass =     nifty.chg  > 0 ? 'fas fa-caret-up' : 'fas fa-caret-down';

/*
  	let html =  `<span class="tsrTickerPrice mx-3">${nifty.close.toFixed(2)}</span>
			                        <span class="${niftyPcClass}">
			                                <i class="fas fa-caret-down mx-2"></i>
			                                ${nifty.chg.toFixed(2)}%
			                        </span>`

*/




  /*	
  	let html =`<div class="tsrHomeIndexCard">

          <div class="tsrHomeIndexCardHeader">
              <div class="tsrHomeIndexCardTitle">${nifty.code}</div>
              <div class="tsrHomeIndexCardChange ${niftyPcClass}">${nifty.chg.toFixed(2)}%</div>
          </div>

          <div class="tsrHomeIndexCardValue">${nifty.close.toFixed(2)}</div>

  			<div id='pbcr${nifty.code}' ></div>

      </div>`;
*/

      let html =`
                <div>
                        <div class="tsrHomeIndexCard">
                                <div class="tsrHomeIndexCardHeader ">

                                        <div class="d-flex w-100">
                                                <div class="tsrHomeIndexCardTitle">
                                                        <p style="margin-bottom: 0;">NIFTY</p>
                                                </div>
                                                <!-- NIFTY LINKS -->
                                                <div class="d-flex w-100 justify-content-around"
                                                        style="scale: 0.9; text-wrap: nowrap;">
                                                        <a href="${jsu.getBaseUrl()}/rt/Stock/NIFTY/InteractiveCharts"
                                                                class="btn btn-sm rounded-pill mx-2" title="View Chart">
                                                                Chart
                                                                <i class="fas fa-external-link-alt"></i> </a>
                                                        <a href="${jsu.getBaseUrl()}/rt/Stock/NIFTY/TechnicalAnalysis"
                                                                class="btn btn-sm rounded-pill mx-2"
                                                                title="View Technicals">
                                                                Tech <i class="fas fa-external-link-alt"></i></a>
                                                        <a href="${jsu.getBaseUrl()}/rt/Screener/Markets/IndexAnalysis" class="btn btn-sm rounded-pill mx-2"
                                                                title="View Nifty Stocks"> NIFTY STOCKS <i
                                                                        class="fas fa-external-link-alt"></i> </a>
                                                </div>
                                        </div>

                                        <!-- PRICE VALUES TO BE UPDATED HERE -->
                                        <div id="tsrHomeIndexCardValue" class="d-flex align-items-center">
                                                <b>${nifty.close.toFixed(2)}</b>
                                                <!--  -->
                                                <div class="tsrHomeIndexCardChange ${niftyPcClass}">
                                                        <span>|</span>
                                                        <span>${(nifty.close - nifty.prevClose).toFixed(2)}</span>
                                                        <span>|</span>
                                                        <span>${nifty.chg.toFixed(2)}%</span>
                                                </div>
                                        </div>
                                </div>

                                <hr style="margin: 5px 0px;">
                                <!-- price bar 1 -->
                                <div class="tsrHomeIndexCardBodyHighLowBar d-block d-sm-none mx-auto" id ='pbcr${nifty.code}m'>
                                        
                                </div>

                                <div class="tsrHomeIndexCardBody">
                                        <!-- Advances -->
                                        <div class="tsrHomeIndexCardBodyAdvCont">
      											<a href="${jsu.getBaseUrl()}/rt/Screener/Markets/AdvanceDecline"
                                                                class="btn btn rounded-pill mx-2" title="View Advance/Decline">
	                                                <b>Advances</b>
	                                                <p> ${nifty.adv}</p>
                                                </a>
                                        </div>

                                        <!-- price bar 2 -->
                                        <div class="tsrHomeIndexCardBodyHighLowBar d-none d-sm-block" id = 'pbcr${nifty.code}d'>
                                                
                                        </div>

                                        <!-- Declines -->
                                        <div class="tsrHomeIndexCardBodyDecCont">
      											<a href="${jsu.getBaseUrl()}/rt/Screener/Markets/AdvanceDecline"
                                                                class="btn btn rounded-pill mx-2" title="View Advance/Decline">
	                                                <b>Declines</b>
	                                                <p>${nifty.dec}</p>
      											</a>
                                        </div>
                                </div>
                        </div>
                </div>
`


		htmlU.addMsgToDiv( nifty.code +  'HL' , true, html);                        

		try{
			let ohlcBar = mintHtmlUtil.ppcl ( {"c":nifty.close,"t":"r","h":nifty.high,"id":nifty.code +'m',
				"l":nifty.low,"o":nifty.open , width : 300  , green:'green', red : 'red'});
	
		} catch (error) {
			
		}

		try{

		let ohlcBar2 = mintHtmlUtil.ppcl ( {"c":nifty.close,"t":"r","h":nifty.high,"id":nifty.code +'d',
				"l":nifty.low,"o":nifty.open , width : 400 , green:'green', red : 'red'});

		} catch (error) {
			
		}
  }



  function	printMarquee(init){


  	// const element = document.getElementById("tsrTickerContainer");
	if (isOver) {
	    // console.log("Mouse is over the element");
		setTimeout(function() { printMarquee() } ,marqueeDuration *1000);
	    return;
	}

  	let list = null;

  	let klass =''
  	let caret =''

  	if(gainer){
  		list = tickerData.gainers;
  		klass = 'tsrTickerPriceChgPos'
  		caret = 'fas fa-caret-up'
  	}else{
  		list = tickerData.losers;
  		klass = 'tsrTickerPriceChgNeg'
  		caret = 'fas fa-caret-down'
  	}

  	let html = ''

  	for(let i=0; i< list.length;i++){

  		let equity = list[i];

  		let code = equity.code

  		let url = jsu.getBaseUrl() +'/rt/Stock/'+code +'/BirdsEyeView'

  		// let pcChg = jsu.getPC(equity.close,   );


  		html+= `
  			<span class="tsrTickerItem">
                    <a href="${url}"> ${code} </a>
                    <span class="${klass} tsrTickerPrice ">${  equity.close.toFixed(2)}</span>
                    <span class="${klass}"><i
                            class="${caret} "></i> ${equity.chg.toFixed(2)} %</span>
                </span>
  		`
  		if(i==19) break;
  	}


  	if(init){

  		htmlU.addMsgToDiv(MARQUEE_DIV , true, html);

  	}else{
  		// layered
  		htmlU.addMsgToDiv(MARQUEE_DIV , true, html);
  	}

  	gainer = !gainer;


  	setTimeout(function() { printMarquee() } ,marqueeDuration *1000);

  }


  function refreshMarquee(){


  	if(mtgv ==null || mtgv.mktDet ==null){
  			setTimeout(function() { refreshMarquee() } ,3 *1000);
  			return;
  	}

  	if( mtgv.mktDet.mktHours){
  		if(mtgv.mktDet.ludt== null){
  				setTimeout(function() { refreshMarquee() } ,500);
  				return;
  		}

		    let serverTime =   mtgv.mktDet.ludt.getTime()

		    let reportGenTime =  mintJsUtil.parseDatedd_MM_yyyy_HH_ss( tickerData.reportGenTime ) .getTime();

		    let callLoad  = reportGenTime < serverTime ; 

		    console.log( ' callLoad ' + callLoad);

		    if( callLoad ){
		    		console.log('refresh ')
		    	  loadTickerData('refresh');

		    }else{
		    		// wait
		    	  console.log('skipping ')

		    }

		    setTimeout(function() { refreshMarquee() } ,3 *1000);

		}

  }




return {

	init : init,
   	// rm : refreshMarquee



  }
})(); // module 
