var olHistComp =  (function () {


	var thisObject = 'olHistComp';
	var htmlU = mintHtmlUtil;
	var jsu = mintJsUtil;

	function getOlType(){

		let OL_TYPES = [];
		OL_TYPES.push({id: 'bollingerUB', label: "Bollinger UB"});
		OL_TYPES.push({id: 'bollingerMB', label: "Bollinger MB"});
		OL_TYPES.push({id: 'bollingerLB', label: "Bollinger LB"});
		OL_TYPES.push({id: SUPER_TREND, label: "Super Trend"});
		OL_TYPES.push({id: PSAR, label: "Parabolic SAR"});

		return OL_TYPES;

	}


	let OL_TYPES = getOlType();



	function getOlHtml(id, obj , olType ,func, fncParam){

		// var id = obj.id;

		let html = ''

		if( olType == SUPER_TREND){

			let techObj = {indi: SUPER_TREND , p1: obj.p1 , p2: obj.p2, maType :obj.bandMa }

			mcval.sina(techObj , 'p1') // sets def Val

			mcval.sina(techObj , 'p2') // sets def Val

			mcval.sina(techObj , 'maType') // sets def Val

			var mas = jsu.cloneObj(mtgv.mtpp.MA_TYPE);

			mas.unshift(ATR_MA_DEF) ;

			obj.p1 = techObj.p1;
			obj.p2 = techObj.p2;
			obj.bandMa = techObj.maType;

			html+= BR_2 ;
			html+= 'Period  ' +  getInputTxtParam( id+'p1' , 3, obj.p1, func , fncParam)	;

			html+= SP_2 + getDropDown(mas, id+'bandMa', null,func, fncParam, obj.bandMa);

			

			html+=  SP_3+' Multiplier  '+ getInputTxtParam( id+'p2' , 3, obj.p2, func , fncParam)	;

			// html+=  SP_3+ getDropDown(OHLC_HA, id+'bandField', null,func, fncParam, obj.bandField);


		} else if( olType == PSAR){
			
			let techObj = {indi: PSAR , p1: obj.p1 , p2: obj.p2, p3 : obj.p3 }

			mcval.sina(techObj , 'p1') // sets def Val

			mcval.sina(techObj , 'p2') // sets def Val

			mcval.sina(techObj , 'p3') // sets def Val

			obj.p1 = techObj.p1;
			obj.p2 = techObj.p2;
			obj.p3 = techObj.p3;
			html+= BR_2 ;

			html+= 'Start ' + getInputTxtParam( id+'p1' , 3, obj.p1, func , fncParam)	;

			html+=  '  Increment  '+ getInputTxtParam( id+'p3' , 3, obj.p3, func , fncParam)	; // Incorrect order due to backward compatibility

			html+=  ' Maximum  '+ getInputTxtParam( id+'p2' , 3, obj.p2, func , fncParam)	;

			// html+=  SP_3  +' on '+ getDropDown(OHLC_HA, id+'fieldCat', null,func, fncParam, obj.fieldCat);

		}else if ( jsu.containsString( ['bollingerUB', 'bollingerMB', 'bollingerLB'],   olType) ){

			let techObj = {indi: BOLLINGER , p1: obj.p1 , p2: obj.p2}
			mcval.sina(techObj , 'p1') // sets def Val
			mcval.sina(techObj , 'p2') // sets def Val
			obj.p1 = techObj.p1;
			obj.p2 = techObj.p2;

			html+= ' ' + getDropDown(mtgv.mtpp.MA_TYPE, id+'bandMa', null,func, fncParam, obj.bandMa);

			html+=  ' ' + getInputTxtParam( id+'p1' , 3, obj.p1, func , fncParam)	;
			
			html+=  ' on ' + getDropDown(ALL_OHLC_HA_FIELD, id+'bandField', null,func, fncParam, obj.bandField);

			html+=  ' Std Dev ' + getInputTxtParam( id+'p2' , 3, obj.p2, func , fncParam)	;

			// html+= SP_3 + getInputTxtParam( obj.id + 'v1' , 3, obj.v1, func , fncParam);
		}
	

		var ticks = csu.gct(obj , 'tick2');
		html+=  BR_2 +  " On  " + getDropDown(ticks,  id+ 'tick2', null, func, fncParam, obj.tick2) ;
		html+= " tick ";

		return html;

	}


	function setDefVals(obj, olType){

		if ( jsu.containsString( ['bollingerUB', 'bollingerMB', 'bollingerLB'],   olType) ){

				let techObj = {indi: BOLLINGER } // , p1: obj.p1 , p2: obj.p2
				mcval.sina(techObj , 'p1') // sets def Val
				mcval.sina(techObj , 'p2') // sets def Val
				obj.p1 = techObj.p1;
				obj.p2 = techObj.p2;

			} else if( olType == SUPER_TREND){
				let techObj = {indi: SUPER_TREND }  // , p1: obj.p1 , p2: obj.p2, maType :obj.bandMa 

				mcval.sina(techObj , 'p1') // sets def Val

				mcval.sina(techObj , 'p2') // sets def Val

				mcval.sina(techObj , 'maType') // sets def Val

				obj.p1 = techObj.p1;
				obj.p2 = techObj.p2;
				obj.bandMa = techObj.maType;

			} else if( olType == PSAR){	
				let techObj = {indi: PSAR  } // , p1: obj.p1 , p2: obj.p2, p3 : obj.p3

				mcval.sina(techObj , 'p1') // sets def Val

				mcval.sina(techObj , 'p2') // sets def Val

				mcval.sina(techObj , 'p3') // sets def Val

				obj.p1 = techObj.p1;
				obj.p2 = techObj.p2;
				obj.p3 = techObj.p3;
			}

	}


	function handleChange(id, obj, olType){

		if( olType == SUPER_TREND){
				
			if(!jsu.isIntegerInput (id+'p1')) obj.goodData = false;
			if(!jsu.inputNumberRange (id+'p1', 1,50)) obj.goodData = false;

			if(!jsu.isPositiveNumInput (id+'p2')) obj.goodData = false;
			if(!jsu.inputNumberRange (id+'p2', 1,5)) obj.goodData = false;

		} else if( olType == SUPER_TREND){
		
			if(!jsu.isPositiveNumInput (id+'p1')) obj.goodData = false;
			if(!jsu.inputNumberRange (id+'p1', .001,.1)) obj.goodData = false;

			if(!jsu.isPositiveNumInput (id+'p2')) obj.goodData = false;
			if(!jsu.inputNumberRange (id+'p2', .001,.1)) obj.goodData = false;

			if(!jsu.isPositiveNumInput (id+'p3')) obj.goodData = false;
			if(!jsu.inputNumberRange (id+'p3', .001,.1)) obj.goodData = false;

		}else if ( jsu.containsString( ['bollingerUB', 'bollingerMB', 'bollingerLB'],   olType) ){

			if(!jsu.isIntegerInput (id+'p1')) obj.goodData = false;
			if(!jsu.inputNumberRange (id+'p1', 1,50)) obj.goodData = false;

			if(!jsu.isPositiveNumInput (id+'p2')) obj.goodData = false;
			if(!jsu.inputNumberRange (id+'p2', 1,5)) obj.goodData = false;
		}

	}


	function validateFields(obj , olType){

		let text ='';

		let olObj =  jsu.getObjFrmArr( OL_TYPES , olType ); 

		if( olType == SUPER_TREND){	
			
			text+= olObj.label;

			let fieldObj =  jsu.getObjFrmArr( OHLC_HA , obj.bandField ); 

			text += '('+ obj.bandMa +',' +obj.p1 + ',' + obj.p2 + ')'  //',' + obj.bandField  +

		} else if( olType == PSAR){	

			
			text+= olObj.label;

			let fieldObj =  jsu.getObjFrmArr( OHLC_HA , obj.bandField ); 

			text += '('+ obj.bandMa +',' +obj.p1 + ',' + obj.p2 + ',' + obj.p3 + ',' + obj.bandField  +')'	

		} else if ( jsu.containsString( ['bollingerUB', 'bollingerMB', 'bollingerLB'],   olType) ){

			text+= olObj.label;

			text += '('+ obj.bandMa +',' +obj.p1 + ',' + obj.p2   +')'

		}

		var ticks = csu.gct(obj , 'tick2');
		tickObj = jsu.getObjFrmArr( ticks , obj.tick2 )
		text += ' on '  + tickObj.label + ' tick '; 

		return text;	


	}



	return {

		olt : OL_TYPES,
		gh : getOlHtml,
		sdv : setDefVals,
		hc  : handleChange,
		vf 	: validateFields

		// ghr : getMaHistRow,
		// add : addMaHist,
		// mach : maHistChg, 
		// vf : validateFields
	}

})(); // module 	
