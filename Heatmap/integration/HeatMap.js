var dyhm = (function () {  // Dyna Heat Map


	let thisObj = 'dyhm';


	let USER_ACTION  = thisObj + '.ua';
	var htmlU = mintHtmlUtil;
	var jsu = mintJsUtil;


	var htmltoimagejsLoaded = false;



	let hmReportTime = null ;// Hack for AR;

	let LOAD_DIV = 'hmLdgDiv';
	let FB_DIV ='hmFbDiv'

	let WATCHLIST ='Watchlist';

	let FREQ_LIST ;

	let wlDefId;

	let hmResult;

	let stockCode ;
	let hmFreq ;
	let htmList ;
	let hmField ;


	let fontFamily = 'sans-serif';


	let THEME = [  {id : 'light' , label : 'Light' } , {id : 'dark' , label : 'Dark' } ];

	let PC_CHANGE_TYPE = [  {id : 'all' , label : 'All' } , {id : 'gainer' , label : 'Gainer' }
			, {id : 'loser' , label : 'Loser' } ];

	let VIEW_TYPE = [  {id : 'lean' , label : 'Lean' }, {id : 'standard' , label : 'Standard' } , {id : 'detailed' , label : 'Detailed' }
		 ];		

	let HM_FIELDS = [ 

		{id : 'priceChangePC' , label : 'Change %'  , suffix: '%'},
		
		{id : 'idxPts' , label : 'Points'  , suffix: ''},

		{id : 'val' , label : 'Turnover'  , suffix: 'Cr'},

		{id : 'vol' , label : 'Volume'  , suffix: ''},

		{id : 'list' , label : 'List' },
	 ];



	let HM_DEF_COLS =6;


/* OLD
	let LIGHT_BG_CLR = 'cornsilk';
	let DARK_BG_CLR = '#433c3c';
*/

	let LIGHT_BG_CLR = 'e3e3e3';
	let DARK_BG_CLR = '#000a20';

	// let ANTTIQUE_WHITE= "#faebd7" // Antique Wgite
	// let DARK_OLIVE_GREEN ='#556b2f'  // 
	// let CORAL = '#bb5858' // coral
	 // #c58e07


    // let COLOR_WHITE= "#FFFFFF";  // White...
    // let COLOR_GREY= "#8a8a8a";  // Grey...
	// let COLOR_BLACK= "black";  // Grey...

   



    // -----------------------
/*    
    let COLOR_GREEN1= "#E2F0D9";  // Lightest Green

    let COLOR_GREEN2= "#C5E0B4"; 
    
    let COLOR_GREEN3= "#A9D18E";  

    let COLOR_GREEN4= "#548235";  

    let COLOR_GREEN5= "#385724";  // Darkest Green

*/

	let FONT_GREEN1= "#556b2f";  // Lightest Green

    let FONT_GREEN2= "#064e3b"; 
    
    let FONT_GREEN3= "#ffffff";  

    let FONT_GREEN4= "#ffffff";  

    let FONT_GREEN5= "#ffffff";  // Darkest Green



    let COLOR_GREEN1= "#ecfdf5";  // Lightest Green

    let COLOR_GREEN2= "#a7f3d0"; 
    
    let COLOR_GREEN3= "#059669";  

    let COLOR_GREEN4= "#047857";  

    let COLOR_GREEN5= "#064e3b";  // Darkest Green





    // Green 
	let GREEN_5 = { color : COLOR_GREEN5, fontColor : FONT_GREEN5, codeSize : 28 , valSize : 24 , othVal : 22,		padding : 14 	};

	let GREEN_4 = { color : COLOR_GREEN4, fontColor : FONT_GREEN4, codeSize : 24 , valSize : 20 , othVal : 18,		padding : 12 	};

	let GREEN_3 = { color : COLOR_GREEN3, fontColor : FONT_GREEN3, codeSize : 20 , valSize : 18 , othVal : 16,		padding : 10 	};

	let GREEN_2 = { color : COLOR_GREEN2, fontColor : FONT_GREEN2, codeSize : 17 , valSize : 15 , othVal : 13,		padding : 8 	};

	let GREEN_1 = { color : COLOR_GREEN1, fontColor : FONT_GREEN1 , codeSize : 15 , valSize : 13 , othVal : 13,		padding : 6 	};

 	// -----------------------
/*
    let COLOR_RED5="#951a1a"; // Darkest Red
    
    let COLOR_RED4= "#cd5c5c"; // Indian Red   "#FF6400";
    
    let COLOR_RED3= "#FF9664";

    let COLOR_RED2= "#FFC896";
    
    let COLOR_RED1= "#FFE1AF";  // Lightest Red

*/


    let COLOR_RED5="#9b1c1c"; // Darkest Red
    
    let COLOR_RED4= "#e53e3e"; // Indian Red   "#FF6400";
    
    let COLOR_RED3= "#feb2b2";

    let COLOR_RED2= "#fed7d7";
    
    let COLOR_RED1= "#fff5f5";  // Lightest Red


    let FONT_RED5="#faebd7"; // Darkest Red
    
    let FONT_RED4= "#faebd7"; // Indian Red   "#FF6400";
    
    let FONT_RED3= "#7f1d1d";

    let FONT_RED2= "#7f1d1d";
    
    let FONT_RED1= "#7f1d1d";  // Lightest Red



	let RED_5 = { color : COLOR_RED5, fontColor : FONT_RED5,codeSize : 28 , valSize : 24 , othVal : 22,		padding : 14 	};

	let RED_4 = { color : COLOR_RED4, fontColor : FONT_RED4,codeSize : 24 , valSize : 20 , othVal : 18,		padding : 12 	};

	let RED_3 = { color : COLOR_RED3, fontColor : FONT_RED3,codeSize : 20 , valSize : 18 , othVal : 16,		padding : 10 	};

	let RED_2 = { color : COLOR_RED2, fontColor : FONT_RED2,codeSize : 17 , valSize : 15 , othVal : 13,		padding : 8 	};

	let RED_1 = { color : COLOR_RED1, fontColor : FONT_RED1, codeSize : 15 , valSize : 13 , othVal : 13,		padding : 6 	};

	//	 Neutral
	let COLOR_NEUTRAL= "#ffffff";  // Lightest Red

    let FONT_NEUTRAL="grey"; // Darkest Red
    



	let WHITE = { color : COLOR_NEUTRAL, fontColor : FONT_NEUTRAL, codeSize : 14 , valSize : 13 , othVal : 12,		padding : 6 	};

	// Sequence is Important....
	let CLR_DEF_ARR = [ GREEN_5 , GREEN_4 , GREEN_3 ,GREEN_2 , GREEN_1 ,WHITE,
		RED_1 , RED_2 , RED_3 , RED_4 , RED_5
	]

/*

	let STYLE =`
	`;
*/

	function getSupportedFreq (){

		FREQ_LIST = [
			FREQ_INTRA_DAILY_OBJ ,   FREQ_DAILY_OBJ , FREQ_WK_OBJ 
		]

		let ENTITLED_FREQ = mtgv.mtpp.FREQ_SCR_MAP; 

		if( jsu.arrayContainsId(ENTITLED_FREQ,  FREQ_MM5)){

			if( jsu.arrayContainsId(ENTITLED_FREQ,  FREQ_MM1)){
			    FREQ_LIST = FREQ_LIST.concat([ FREQ_MM1_OBJ , FREQ_MM2_OBJ , FREQ_MM3_OBJ]);            
			}

			FREQ_LIST =  FREQ_LIST.concat([ FREQ_MM5_OBJ, FREQ_MM10_OBJ, FREQ_MM15_OBJ, FREQ_MM30_OBJ, FREQ_MM45_OBJ,
                 FREQ_HH1_OBJ, FREQ_MM75_OBJ ,  FREQ_HH2_OBJ, FREQ_HH3_OBJ , FREQ_HH4_OBJ ])

		}
		//  FREQ_WK2_OBJ , , FREQ_MTH6_OBJ , FREQ_YR_OBJ
		FREQ_LIST = FREQ_LIST.concat([ FREQ_MTH_OBJ , FREQ_QTR_OBJ ])

		if(!mtgv.mtpp.pr){
			FREQ_LIST = [FREQ_INTRA_DAILY_OBJ ]
		}


		return FREQ_LIST;

	}

	// let SUPPORTED_FREQ = getSupportedFreq ();


	// This Sequence and CLR_DEF_ARR has to be in sync....
	let DAY_SIZE_PC = [3.5 ,2.25, 1.5, .75,.01,0,-.75,-1.5,-2.25,-3.5,-4]	;


	function multiPCArray(arr , mult){

		let freqArr = [];

		for(let i=0;i< arr.length ; i++){
			freqArr.push( arr[i] * mult)
		}
		return freqArr;

	}

	
	// This Sequence and CLR_DEF_ARR has to be in sync....
	function getPcDefArr (freq){

		// DAY and above ..
		if(freq== FREQ_DAILY  || freq ==FREQ_INTRA_DAILY ){
			return DAY_SIZE_PC;
		}else if(freq== FREQ_WK || freq =='W2'   ){
			return multiPCArray ( DAY_SIZE_PC , 2);
		}else if(freq== FREQ_MTH || freq == FREQ_QTR   ){
			return multiPCArray ( DAY_SIZE_PC , 3.5);
		}else if(freq== FREQ_YEAR || freq =='M6'   ){
			return multiPCArray ( DAY_SIZE_PC , 5);

		// HRS 
		}else if(freq== FREQ_HH3 || freq == FREQ_HH4   ){
			return multiPCArray ( DAY_SIZE_PC , .8);
		}else if(freq== FREQ_HH1 || freq == FREQ_HH2     ){
			return multiPCArray ( DAY_SIZE_PC , .6);
		// MINS
		}else if(freq== FREQ_MM75     ){
			return multiPCArray ( DAY_SIZE_PC , .6);  // same as 1/ 2 HRS
		
		}else if(freq== FREQ_MM45 || freq == FREQ_MM30     ){
			return multiPCArray ( DAY_SIZE_PC , .5);
			
		}else if(freq== FREQ_MM15 || freq == FREQ_MM10     ){
			return multiPCArray ( DAY_SIZE_PC , .3);

		}else if( freq == FREQ_MM5     ){
			return multiPCArray ( DAY_SIZE_PC , .2);

		}else if(freq== FREQ_MM2 || freq == FREQ_MM3     ){
			return multiPCArray ( DAY_SIZE_PC , .12);
		}else if(freq== FREQ_MM1      ){
			return multiPCArray ( DAY_SIZE_PC , .08);
		}

		throw new Error('freq not supported')
	}

	function getDef(freq , pcChg ){

		let freqArr = getPcDefArr(freq) ; 


		for(let i=0;i< freqArr.length ; i++){

			let elem = freqArr [i];
			if( pcChg >= elem){
				return CLR_DEF_ARR[i];
			}
		}
		if(pcChg < 0) { // last red elem 
			return CLR_DEF_ARR[CLR_DEF_ARR.length-1];
		}


		throw new Error('freq not supported')
	}

	function init(code, freq){

		//TODO wait till mipu is loaded...
		// Also 


		// 
		// htmlU.addCssToHead("tsrHmDiv", STYLE);



		if(isMobile()){
			HM_DEF_COLS =3;
		}

		getSupportedFreq(); // load Freq List

		stockCode = (code == null ? 'NIFTY' : code);

		hmFreq = getHmFreq();


		if(code == WATCHLIST ){

			if(!mtgv.mtpp.pr){
				let msg = ' Either you are not Logged in Or You are not a premium member '
				htmlU.addMsgToDiv('heatMapDiv' , true, msg, 'red' , 12);
			}

			if(wlsize == 0){
				let msg = ' You are Yet to create Watch list. '
				htmlU.addMsgToDiv('heatMapDiv' , true, msg, 'red' , 12);
			}

			wlDefId = wldefidp;
			callRemote();
		}else{

			callRemote();
		}




		addAutoRefresh()
		addControl()
	}


	function addControl(){

		
		


		let html =''
		

		html+= SMALL_BR + SMALL_BR;
		html+= '<div class="miCtrl">'

		let freq =  getHmFreq();
		html+= htmlU.doBold('Tick') + SP_2 +  htmlU.getDropDown(FREQ_LIST , 'hmFreq', null , USER_ACTION , 'hmFreq' , freq );

		html += SP_3 +'|' + SP_3;

		let hmField =  getHmField();

		// html+= "<b>By</b> : " + htmlU.crg( "hmField",thisObj + '.ua', HM_FIELDS, hmField,'hmField');

		html+= htmlU.doBold('By') + SP_2 +  htmlU.getDropDown(HM_FIELDS , 'hmField', null , USER_ACTION , 'hmField' , hmField );

		

		if(isMobile()){
			html+= SMALL_BR + SMALL_BR;
		}else{
			html += SP_3 +'|' + SP_3;
		}

		

		let hmtype =  getHmValType();

		html+= "<b>Show</b> : " + htmlU.crg( "hmtype",USER_ACTION, PC_CHANGE_TYPE, hmtype,'hmtype');
		


		html += SP_3 +'|' + SP_3;
		let vtype =  getViewType();

		html+= "<b>View</b> : " + htmlU.crg( "vtype",USER_ACTION, VIEW_TYPE, vtype,'vtype');
		html+= SMALL_BR + SMALL_BR;

		html+= '</div>';



		htmlU.addMsgToDiv('hmCtrlDiv' , true, html)
	}

	function addAutoRefresh(){

		if(isMobile()) return;

		
		let html =''

		let arChecked = isArChecked()  ? 'checked' : '';;

		html+='<div align="right" class="miCtrl">'
		html+=  htmlU.getCheckboxP( 'hmar', USER_ACTION , arChecked   ,'hmar' ) 

		html+=   SP_2 + 'Auto Refresh';

		let popcChecked = isPopcChecked()  ? 'checked' : '';
		
		html+=   SP_3 +'|' + SP_3 +  htmlU.getCheckboxP('hmpc', USER_ACTION , popcChecked   ,'hmpc') + SP_2 + 'Popup Charts';

		html += SP_3 +'|' + SP_3;



		let hmbgc = getBgColor();
		let val =   (DARK_BG_CLR == hmbgc)  ? 'dark' : 'light';


		html+= "<b>Theme</b> : " + htmlU.crg( "hmbgc",USER_ACTION, THEME, val,'hmbgc');
		html+= '</div>';

		htmlU.addMsgToDiv('hmArDiv' , true, html)
		
	}


	function getFreqType(){

		let list = getSupportedFreq ();

		let html =''
	}


	function show(list , freq){


		 

		let type = getHmValType();

		let field = getHmField();

		let fieldDef = jsu.getObjFrmArr(HM_FIELDS, field)

		let fieldSuffix = fieldDef.suffix;
		
		// if(field == 'priceChangePC' ) fieldSuffix ='%';


		let otherField = ''
		let summary =''
		let smrycolor =(getBgColor() ==DARK_BG_CLR) ? "#faebd7" : 'black'; 



		

		let table =''

		let bgclr = getBgColor();

		if(field == 'list'){
			bgclr =''
			smrycolor =''
			table = createListTable(list, freq, type,); 
		}else{
			table = createTable(list, freq, type, field, fieldSuffix , otherField);	
		}
		

		let html = "<div    style='background-color : "+bgclr+"; text-align:center ' >";


		if( jsu.isNotNull( hmResult ) && jsu.isNotNull(hmResult.IdxVal)){

			
			summary = '<div align = "right" style ="color:'+ smrycolor+' ; font-size:18px;" >'
			summary+= hmResult.IdxName +' Close : ' + jsu.formatNumber(hmResult.IdxVal) 
			+ ', Change ' + jsu.formatNumber(hmResult.IdxVal - hmResult.IdxValP )
			+ ', ' + jsu.formatPC(hmResult.IdxVal , hmResult.IdxValP );

			summary += '</div>'
		}


		html+= summary;



        html+= table;

        html+= "</div>"

        htmlU.addMsgToDiv('heatMapDiv' , true, html)
        

        if(mtgv.mtpp.pr){
        	if(field == 'list' ){
	         	midt.dtsf('results_table', 6);
	     	}	
        }else{
        	let fb = BREAK_LINE+ 'Premium users can view Heat Map from 1 min to 1 Qtr, Create heatmap on watchlist and Download Heatmap '

        	;

        	htmlU.addMsgToDiv(FB_DIV , true, fb , 'grey' , 12)
        }
        
	}




	function createListTable(plist, freq, type){

		// let list = jsu.sort(plist, 'priceChangePC', false,  'num' )

		let list = null;

		if(type == 'loser'){
			list = jsu.sort(plist, 'priceChangePC', true,  'num' )
		}else{
			list = jsu.sort(plist, 'priceChangePC', false,  'num' )
		}
		let pcChg = item.priceChangePC;

		let html =`<table id='results_table' class='table table-striped'  width='100%' style='border-collapse: separate; 
			font-family ;sans-serif; border-spacing: .2em; text-align:center'   width='100%'>`

		
		html+=`<thead><tr>
				<th>Code</th>
				<th>Price</th>
				<th>%Change</th>
				<th>Turnover (Cr)</th>
				<th>Contribution Pts</th>
				<th>Volume</th>
				</tr></thead>
				<tbody>
			`

		for(let i=0;i< list.length;i++){
			let item = list[i];
			let pcChg = item.priceChangePC;
			 if( type=='all' || ( type == 'gainer'  &&  pcChg > 0 )  || (type == 'loser' && pcChg < 0) ){
				html+='<tr>'
				html+='<td>' +item.code+'</td>';
				html+='<td>' + jsu.formatNumber( item.close )+'</td>';
				html+='<td>' + jsu.formatNumber(item.priceChangePC)+'</td>';
				html+='<td>' + jsu.formatNumber(item.val)+'</td>';
				html+='<td>' + jsu.formatNumber(item.idxPts)+'</td>';
				html+='<td>' +  jsu.formatNumber(item.vol)+'</td>';
				html+='</tr>'
			}
		}


		html+='</tbody></table>';

		return html;	
	}


	function createTable(plist, freq, type, field, fieldSuffix , otherField){


		let list = null;

		if(type == 'loser'){
			list = jsu.sort(plist, field, true,  'num' )
		}else{
			list = jsu.sort(plist, field, false,  'num' )
		}


		let bgColor = getBgColor();



		let html =''

		// let html =`<table id='results_table'  width='100%' style='border-collapse: separate; 
		// 	font-family ;sans-serif; border-spacing: .2em; text-align:center'   width='100%'>`


		html = `<div class="tsrHmDiv">` ;

		let counter = 0;

		let viewType = getViewType();

		for(let i=0;i< list.length;i++){

			let item = list[i];


			let pcChg = item.priceChangePC;

			

            let styledef = getDef(freq , pcChg );

            // let gain = 

            if( type=='all' || ( type == 'gainer'  &&  pcChg > 0 )  || (type == 'loser' && pcChg < 0) ){





            	// if (counter == 0 || counter % HM_DEF_COLS == 0) {
	            //     html+= "<tr>";
	            // }

            	// html+= '<td  style="background-color: '+ styledef.color+'  ;padding :'+ styledef.padding +';   " >' ;

            	let divId = item.ecId +"_" + item.scId;

            	let cperiod = '';
            	let cTick = hmFreq;

            	let div = `<div id="${divId}" onmouseenter="${USER_ACTION}('popc','${divId}','${item.name}'  ,'${item.code}'
            		   ,'${cperiod}' , '${cTick}' ) ;" 
            		onmouseleave="cputl.cp('popc','${divId}', false, '${item.name}') ;"

            		style="background-color: ${styledef.color} ;"

            		>



            		<a href="${jsu.getRootUrl()}/Stock/${item.code}/BirdsEyeView" alt='${item.name}' 
            		title='${item.name}'
            		
            		 class="tsrHmItem " style="display: flex;">`

            	// div+= `<img src="https://nitronik7.github.io/TSR-Frontend/tsrHeatmap/Light/assets/Icons/Adani.png" alt="" style ='max-height:40px;'>`	 
				// div+= `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Adani_logo_2012.svg/120px-Adani_logo_2012.svg.png?_=20211023113746" alt="" 
				// 	style ='max-width:40px;'>`	 



            	div+= '<p>'	 

            		// '${item.code}'
            	div+='<font  style="color: '+ styledef.fontColor  +';  font-size : '+styledef.codeSize+';"> '
            	div+= item.code ;


            	div+= '</font>'	
           	
            	html+=div;

            	html+= BREAK_LINE;

            	html+='<font  style="color: '+ styledef.fontColor  +';  font-size : '+styledef.valSize+'";> '

            	let val  = item[field];

            	val = jsu.isNumber( val) ? jsu.formatNumber(val) : val;

            	html+= val  + ' ' + fieldSuffix;
            	html+= '</font>'

            	// other fields if any
            	if(viewType == 'standard' ||  viewType == 'detailed'){
            		html+= BREAK_LINE;
            		html+='<font  style="color: '+ styledef.fontColor  +';  font-size : '+styledef.othVal+'";> '

	            	{
		            	let val  = item.close;

		            	val = jsu.isNumber( val) ? jsu.formatNumber(val) : val;

		            	html+= val  + ' ' ;

	            	}

	            	if(viewType == 'detailed'){
	            		

	            		if(field!='priceChangePC') {
            				html+= BREAK_LINE;
		            		let val  = item.priceChangePC;

			            	val = jsu.isNumber( val) ? jsu.formatNumber(val) : val;

			            	html+= 'Change : ' + val  + ' % ' ;
		            	}

		            	if(field!='idxPts'  && jsu.isNotNull(item.idxPts)) {
            				html+= BREAK_LINE;
		            		let val  = item.idxPts;

			            	val = jsu.isNumber( val) ? jsu.formatNumber(val) : val;

			            	html+= 'Idx Points : ' + val  + ' ' ;
		            	}

	            		
	            		if(field!='val'){	
            				html+= BREAK_LINE;
		            		let val  = item.val;

			            	val = jsu.isNumber( val) ? jsu.formatNumber(val) : val;

			            	html+= ' Turnover : ' + val  + ' Cr ' ;
		            	}

		            	// html+= BREAK_LINE;

	            		if(field!='vol') {
            				html+= BREAK_LINE;
		            		let val  = item.vol;

			            	val = jsu.isNumber( val) ? jsu.formatNumber(val) : val;

			            	html+= 'Vol : ' + val   ;
		            	}

	            	}


	            	html+= '</font>'
	            	html+= '</p>'	
	            	html+= '</a>'
            	}

            	html+= '</div>';

	            // counter++;
	            // if (counter % HM_DEF_COLS == 0) {
	            //     html+= "</tr>";
	            // }




            }

		}

		// if(counter !=0){
		// 	html+= "</tr>";
		// }

		// html+='</table>';

		html+='<div align="center" id="wmdiv"></div>' // watermark div






		html+= BREAK_LINE + createLegend(freq);


		html+= '</div>';


		return html;
	}


	function createLegend(freq){


		let legend = `<div class="tsrHmColorSchemeWrapper">
                            <p>Color Scheme</p>

                            <div class="tsrHmColorScheme">`;


		// 		let legend = `<table style="border-collapse: separate; border-spacing: .2em; 
		// text-align:center;  margin-left:auto;font-weight: bold;  margin-right:auto;">
		// <tbody><tr style="font-size:13px;">

		// <td style="text-align: center; border-radius: 4px; width: 95px; background:black ; color:#FFFFFF; ">Color Scheme : </td>`

		  let freqArr = getPcDefArr(freq) ; 

		  let elem = null;
		  // let def =
			
			for(let i=0; i< freqArr.length ; i++){

				elem = freqArr [i];

				let def = CLR_DEF_ARR[i];

				let symbol = '';

				if(elem == 0){
					 // no legend
				} else if( elem > 0  && elem <= .01) {
					symbol = ' > '	
					elem = 0;
				}else if( elem > 0 ){
					symbol = ' > '	
				}else{
					symbol = ' < '	
				}


				legend += `<div style="background:  ${def.color}; color:${def.fontColor}">
                                            ${symbol} ${elem} % </div>`

/*
				legend += `<td style="text-align: center; border-radius: 4px; width: 65px;
					  background: ${def.color} ; color:${def.fontColor}">`

				if(elem == 0){
					 // no legend
				} else if( elem > 0  && elem <= .01) {
					legend += ' > '	
					elem = 0;
				}else if( elem > 0 ){
					legend += ' > '	
				}else{
					legend += ' < '	
				}
				



				legend +=  jsu.formatNumber( elem ) +   ' % </td>'
*/

			}


		// legend += `</tr></tbody></table>`;

		legend += `	</div>
                </div>`	

        return legend;        

	}


 	
	function getBgColor(){

		var hmbgc = localStorage.getItem("hmbgc");

		if(jsu.isNull(hmbgc)){

			localStorage.setItem("hmbgc" ,"dark");

			return DARK_BG_CLR;
		}

		if(hmbgc == 'light'){
			return LIGHT_BG_CLR;
		}
		return DARK_BG_CLR; 
	}


	function getHmValType(){

		var hmtype = localStorage.getItem("hmtype");

		if(jsu.isNull(hmtype)){
			localStorage.setItem("hmtype" ,"all");
			return 'all';
		}

		if( jsu.containsString(['gainer' , 'loser'],  hmtype)    ){
			return hmtype;
		}
		return 'all'; 
	}


	function getHmField(){

		var hmField = localStorage.getItem("hmField");

		if(jsu.isNull(hmField)){
			localStorage.setItem("hmField" ,"priceChangePC");
			return 'priceChangePC';
		}

		if( jsu.arrayContainsId(HM_FIELDS,  hmField)    ){
			return hmField;
		}
		return 'priceChangePC'; 
	}

	function getViewType(){

		var vtype = localStorage.getItem("vtype");

		if(jsu.isNull(vtype)){
			localStorage.setItem("vtype" ,"lean");
			return 'lean';
		}

		if( jsu.arrayContainsId(VIEW_TYPE,  vtype)    ){
			return vtype;
		}
		return 'lean'; 
	}



	function getHmFreq(){

		var hmFreq = localStorage.getItem("hmFreq");

		if(jsu.isNull(hmFreq)){
			localStorage.setItem("hmFreq" ,FREQ_INTRA_DAILY);
			return FREQ_INTRA_DAILY;
		}

		if( jsu.arrayContainsId(FREQ_LIST,  hmFreq)    ){
			return hmFreq;
		}
		return FREQ_INTRA_DAILY; 
	}


	function isArChecked(){

		var hmar = localStorage.getItem("hmar");

		if(jsu.isNull(hmar)  || hmar =='true'){
			return true;
		}

		return false;
	}

	function isPopcChecked(){

		var hmpc = localStorage.getItem("hmpc");

		if(jsu.isNull(hmpc)  || hmpc =='true'){
			return true;
		}

		return false;
	}



	function callRemote(){

		// TODO make it more generic

		let DJS_URL = '/rt/djs';
		let postData = {cat: 'Markets', subCat:'HeatMap', freq : hmFreq ,index : stockCode , defId : wlDefId }

		var remoteObject = new RC( DJS_URL, null,postData, LOAD_DIV, FB_DIV, thisObj, 'uar', 'getIdx');

		// URL  : // https://www.tsruat.com/rt//djs?cat=Markets&subCat=HeatMap&freq=mm5&index=Nifty50
		jsu.rc(remoteObject);

	}

	function userAction( type , param, param2 , param3, param4, param5){

		if(type == 'hmbgc'){
			let hmbgc = htmlU.getRadioVal('hmbgc');
			localStorage.setItem("hmbgc" ,hmbgc);
			show(htmList , hmFreq );
		}else if(type == 'hmtype'){
			let hmtype = htmlU.getRadioVal('hmtype');
			localStorage.setItem("hmtype" ,hmtype);
			show(htmList , hmFreq );
		}else if(type == 'vtype'){
			let vtype = htmlU.getRadioVal('vtype');
			localStorage.setItem("vtype" ,vtype);
			show(htmList , hmFreq );
		
		}else if(type == 'hmField'){
			hmField = htmlU.getInputVal('hmField');
			localStorage.setItem("hmField" ,hmField);
			show(htmList , hmFreq );
		}else if(type == 'hmFreq'){
			hmFreq = htmlU.getInputVal('hmFreq');
			localStorage.setItem("hmFreq" ,hmFreq);
			callRemote();
		}else if(type == WATCHLIST  || type =='wl'){
			wlDefId = param;
			callRemote();	
		}else if(type ==  'hmar'){
			let hmar = htmlU.isChecked('hmar');
			localStorage.setItem("hmar" ,hmar);
		}else if(type ==  'hmpc'){
			let hmpc = htmlU.isChecked('hmpc');
			localStorage.setItem("hmpc" ,hmpc);
		}else if(type ==  'dl'){
			handleDownload();

		}else if(type ==  'popc'){ // show pop chart
			
			if(isPopcChecked()){


				let cperiod = '';
            	let cTick = param5;

				if(jsu.containsString([FREQ_INTRA_DAILY ,   FREQ_DAILY, FREQ_WK  ]  , cTick)){
					cTick = FREQ_DAILY;
					cperiod = '1M'

					cperiod
				}else if(jsu.containsString([ FREQ_MTH , FREQ_QTR ]  , cTick)){
					cTick = FREQ_DAILY;
					cperiod = '6M'
				}else if(jsu.containsString([ FREQ_MM1 , FREQ_MM2 , FREQ_MM3,  ]  , cTick)){
					// cTick = cT;
					cperiod = '1D'

				}else if(jsu.containsString([  FREQ_MM5, FREQ_MM10, FREQ_MM15 ]  , cTick)){
					// cTick = cT;
					if(mtgv.mktDet.mktHours){
						cperiod = '1D'
					}else{
						cperiod = '2D'
					}					
				}else if(jsu.containsString([  FREQ_MM30, FREQ_MM45,
                 	FREQ_HH1, FREQ_MM75 ,  FREQ_HH2, FREQ_HH3 , FREQ_HH4  ]  , cTick)){
					// cTick = cT;
					cperiod = '1W'
				}


				// let cperiod = '';
            	// let cTick = hmFreq;

            	// let div = `<div id="${divId}" onmouseenter="${USER_ACTION}('popc','${divId}','${item.name}'  ,'${item.code}'
            	// 	   ,'${cperiod}' , '${cTick}' ) ;" 

				// param is DivId 


				// let divId = param;
				// let chartDivId = divId+'Ch';


				let item = null;
				for(let i=0;i< htmList.length;i++){
					let thisItem = htmList[i]

					if( param == (thisItem.ecId +"_" + thisItem.scId) ){
						item = thisItem;
						break;
					}
				}	


				let html=`
						<h5 align = 'center'>Code  : ${ item.code} </h5>
						
						Close :  ${  item.close .toFixed(2)} , Chg % :  ${item.idxPc.toFixed(2)}
						<br>
						Vol :  ${item.vol} , Idx Pts :  ${item.idxPts.toFixed(2)}
						<br>
				`



				cputl.cp('popc',param, true, param2  ,param3 ,cperiod , cTick, 300, 'addiTextDiv') ;	


				setTimeout(function() {
					htmlU.addMsgToDiv('addiTextDiv' , true, html);

				 } , 50);


			}
			

		}

	}

	function userActionResponse(data , type, remoteObject){

		if(data.statusCode==MSG_STATUS_GOOD){
			if(type == 'getIdx'){
				let list = data.results;
				hmResult = data;
				htmList = list;

				show(list , hmFreq, 'priceChangePC');

				if(mtgv.mktDet.mktHours){

					let localTime = new Date();
					let servertime = mtgv.mktDet.serverTime;

					let diff = localTime.getTime() - mtgv.mktDet.localTime.getTime();

					if(jsu.isNull(hmReportTime)){
						
						misu.war(); // only one to enable Auto Refresh	
					}
					
					hmReportTime = servertime.getTime() + diff;

				}
			}
		}
	}


	var processDownload = function(){

		
		if(typeof html2canvas != 'undefined' ){

			htmlU.addMsgToDiv('wmdiv' , true,"TopStockResearch.com" ,"grey", 14);

			var container = document.getElementById("heatMapDiv");; /* full page */


	        html2canvas(container, { allowTaint: true }).then(function (canvas) {

	        	


	        	let imgName = "HeatMapOf"+stockCode+ "_"+ jsu.formatDateToLongString(new Date())  +"ByTSR.png"
	            var link = document.createElement("a");
	            document.body.appendChild(link);


	            link.download = imgName;
	            link.href = canvas.toDataURL();
	            link.target = '_blank';
	            link.click();

	            htmlU.addMsgToDiv('wmdiv' , true,"" ,"grey", 14);
	        });
	        
        }else{
        	setTimeout(function() { processDownload() } , 500);
        }

	}

	function handleDownload(){


		if(!mtgv.mtpp.pr){
			alert('Only Premium users Can download');
		}


		if(typeof html2canvas == 'undefined' ){
			jQuery.loadScript = function (url, processDownload) {
		    jQuery.ajax({
		        url: url,
		        dataType: 'script',
		        success: processDownload,
		        async: true
		    });
		}

		let url = jsu.getStaticUrl() + '/js/tp/h2c_min.js'
			if (typeof html2canvas == 'undefined') $.loadScript(url, function(){
		    	// processDownload();	
		    	let i=0;
			});
		}
			

			processDownload();	
		

		
		

		// if(jsu.isNull(html2canvas)){

		// }

		// loadScript();

	}



	function autoRefresh(){
		


		if(!isArChecked()){
			return;
		}

		if( hmReportTime < mtgv.mktDet.lpt.getTime() ){
			callRemote();
		}

	}

	function getFreq(){
		return hmFreq;
	}

	return {
		init : init,
		freq : getFreq,
		ar : autoRefresh,
		ua : userAction,
		uar : userActionResponse,



	}


})(); // module 