

// CS TECH
var diybi =  (function () {


	var thisObject = 'diybi';
	var htmlU = mintHtmlUtil;
	var jsu = mintJsUtil;

	var func = thisObject + '.bic';  // TODO -- Change to generic name

	var NON_OBOS_BI_SUBTYPE = [TREND, MOMENTUM, ACC_DIST, VOLATILITY, OVERLAYS];

	var SINGLE_PARAM_INDI = [CMF, ATR, ROC, STD_DEV];

	// var SINGLE_PARAM_OHLC_INDI = [STD_DEV];

	// var SUPP


	var CROSS_INDI_DIY_TYPE = [OBOS, OVERLAYS] ; // later add Indis ... 

	var DIY_BI_STRAT =  [
			
			{'id':  STRAT_VS_HIST  		, 'label' : ' History'  },
			// {'id':  STRAT_VS_ANOTHER  	, 'label' : ' Another Field'  },
			// {'id':  STRAT_VS_AVG  		, 'label' : ' Average'  },

			//TODO Breakout , Std Dev PENDING
		];


	// var INDIS =  getIndis();


	


	var TECH_INDI_INDEX = cscmn.gttp(20);

	var BI_DIY_OBJ_PROP = ['ops','idL', 'idR','strat', 'v1', 'v2']; //biDiyObjProps



	function addNewFilter(diyType){

		var id =  myTsrScreener.getNextId( 'techDiyBiCompId');

		var biDiyObj = null;
		var diyIndis = getDiyIndis(diyType);

		var biDiyObj = { id :id,  strat :DIY_BI_STRAT[0].id,  indObL: {gen: 'ao'}, diyType: diyType,  indObR: {gen: 'ao'}, 
		 idL : diyIndis[0].id,  idR : diyIndis[0].id   };

		getDiyObjArray().push(biDiyObj); // add to array

		var html = getHtmlRow(biDiyObj);

		return { html : html , id : id};

	}

	function addFilterChange(type, id){
		bottomIndiChg(id);
	    // csu.dsf();

	}

	function addDiyBi(diyType){
		// var techDiyBiComp = mtgv.cs.screenerData.techDiyBiComp;


		let json = addNewFilter(diyType);

	    $('#tecCtrlTab').append( json.html);

	    addFilterChange(diyType, json.id);

	    csu.dsf();

	    var element = document.querySelector('#csControlsDiv');
	    element.scrollTop = 0;

	}

	function getHtmlRow(biDiyObj){
		var td = getHtmlTds(biDiyObj);

		var html = '<tr id='+biDiyObj.id+'>'	+ createTd(createDiv(biDiyObj.id+'Td2Div', td)) +'</tr>';

		return html;
	}


	function getHtmlTds(biDiyObj){

		var id = biDiyObj.id;
		

		var html = ''
		var diyIndis = getDiyIndis(biDiyObj.diyType);
		

		var delparam = 'techDiyBiComp' + ':'+id; // Vol Compare

		if(jsu.isNull( biDiyObj.idL ) || biDiyObj.idL == CS_NOT_SELECTED){
			html+=  doBold( " Advance Config : ("+biDiyObj.diyType+") " ) +  getDropDown(diyIndis, id+'idL', null,func, id, '') +' ' ;


			html+= csh.gept(biDiyObj, TI_CS,  delparam);

			html+= SP_3 + csh.delIcon(delparam) ;

		}else{
			
			var leftIndiHtml = getIndiHtml(biDiyObj,  'idL', 'indObL');
			var rightIndiHtml = getIndiHtml(biDiyObj,  'idR', 'indObR');

			html+= getStratHtml(biDiyObj, leftIndiHtml ,rightIndiHtml  , delparam );

		}

		
		

		return html;
	}


	function getIndiHtml(biDiyObj,  idType, objId ){

		var idTypeVal = biDiyObj[idType];

		if(jsu.isNull(idTypeVal)){
			return { indiHtml : indiHtml , setHtml : setHtml };
		}

		var param = biDiyObj.id ; // param should always be of DIY Object ...
		var indiHtml ='';
		var setHtml= '';

		var indiDef =  jsu.getObjFrmArr(ALL_INDIS_MAP,idTypeVal);
		var indiObj = biDiyObj[objId];


		var diyIndis = getIndisDefForDropDown( biDiyObj.diyType,  idType, indiObj.indi );

		// if(idType=='idR'){
		// 	getIndisDefRight();
		// }


/*
		var diyIndis = getDiyIndis(biDiyObj.diyType);

		if(!isCrossindi(biDiyObj.diyType) && idType=='idR'){
			
			diyIndis = getDiyIndis(biDiyObj.diyType);

			var indiObjDef = jsu.getObjFrmArr(diyIndis ,  indiObj.indi);
			diyIndis =[];
			diyIndis.push(indiObjDef);
		}
*/

		if(jsu.isNull( indiObj) ){
			indiObj.advOpt = true;
		}
		

		

		var ticks = csu.gct(indiObj , 'techTick');

		// indiHtml+= doBold( indiDef.shortName + " : " );


		indiHtml += getDropDown(diyIndis, biDiyObj.id+ idType, null,func, param, biDiyObj[idType]) ;



		if(indiDef != null){// case of RHS with OHLC only
			// Seting where are multiple lines indicator like Sto, macd ... 
			indiHtml+= addMultiLine(indiObj,func, param, indiDef); 
		}
		

		indiHtml+=  SP_3+   htmlU.getCheckboxP( indiObj.id+ 'advOpt', func,  ( indiObj.advOpt ? 'checked' : '' ), param ) + ' Advance Options ';

		if(indiObj.advOpt ){
			indiHtml += BR_2;

			indiHtml+= htmlU.getSpan(' On ' , 'grey' , 10) + 	getDropDown(ticks, indiObj.id+'techTick', '',func, param, indiObj.techTick) 
				+ htmlU.getSpan(' Tick ' , 'grey' , 10) 

			if(indiDef != null){// case of RHS with OHLC only
				// // Indi Settings ... 
				setHtml = getIndiSettings(indiObj , indiDef ,func, param);
			}
			setHtml += BREAK_LINE ;
		}





		return { indiHtml : indiHtml , setHtml : setHtml };
	}

	function addMultiLine(indiObj,func, param, indiDef ){

		// if(indiDef == null){
		// 	return '';  // case of RHS with OHLC only
		// }


		if( jsu.isNull( indiDef.lc)  &&  indiDef.lc >1){
			return '';
		}

		var list = null;

		if( jsu.containsString([STO_FAST, STO_SLOW, STO_RSI, STO_RSI_SLOW] , indiObj.indi )){
			list= LIST_STO;
		}else if (indiObj.indi == ADX){
			list = LIST_ADX;
		}else if (indiObj.indi == MACD){
			list = LIST_MACD;
		}else if (indiObj.indi == AROON){
			list = LIST_AROON;
		}else if (indiObj.indi == RVI){
			list = LIST_RVI;	
		}else if (indiObj.indi == BOLLINGER){
			list = LIST_BB;	
		}else if (indiObj.indi == KELTNER){
			list = LIST_KELTNER;	
		}

		if(list == null){
			return '';
		}

		return   SP_3 + getDropDown(list, indiObj.id+'fieldType', null,func, param, indiObj.fieldType); // 'width:90px'
	
	}

	function getIndiSettings(indiObj , indiDef ,func, param){
		// Indi Settings ... 
		if(indiDef.techType == OBOS){
			return tobos.cth(indiObj , indiDef ,func, param );  // techObj , objDef, func, id

		} else if(indiDef.subType == OVERLAYS){
			return  ' Settings : ' + tband.cts(indiObj, func, param);

		} else if( jsu.containsString(  SINGLE_PARAM_INDI , indiObj.indi)  ){	

			return tibsl.cth(indiObj , indiDef ,func, param );  // techObj , objDef, func, id
			// return indiDef.shortName  +' Period ' + getInputTxtParam( id+'p1' , 3, indiObj.p1, func , param)	;

		}else if( jsu.containsString( NON_OBOS_BI_SUBTYPE , indiDef.subType   ) ){
			return tindis.cth(indiObj , indiDef ,func, param );  // techObj , objDef, func, id
		}
	}



	function getStratHtml(biDiyObj, leftIndiHtml ,rightIndiHtml , delParam ){

		var param = biDiyObj.id ; // param should always be of DIY Object ...

		var html ='';

		// html+= leftIndiHtml.setHtml + rightIndiHtml.setHtml; // settings ...

		if( jsu.isNull(biDiyObj.strat)) { biDiyObj.strat = DIY_BI_STRAT[0].id }; // Defaulting to first 


		if(biDiyObj.strat == STRAT_VS_HIST ){

			if( jsu.isNull(biDiyObj.ops)) { biDiyObj.ops = COMP_DIY_OPS[0].id }; // Defaulting to first 

			
			
			html+= getIndiHtmlPart(biDiyObj , 'indObL',  leftIndiHtml, param);


			html+= CS_DIV_WITH_MGN;
			html +=  SP_2 + htmlU.doBold("Versus") +  SP_2 + getDropDown(DIY_BI_STRAT, biDiyObj.id+'strat', null,func, param, biDiyObj.strat);
			
			html+= SP_3 + getDropDown(COMP_DIY_OPS, biDiyObj.id+'ops', null,func, param, biDiyObj.ops);
			html+= '</div>';

			html+= getIndiHtmlPart(biDiyObj , 'indObR',  rightIndiHtml, param);

			var compOpsHtml = cscmn.gcoh(biDiyObj ,biDiyObj.id , func , param);

			if(jsu.isNotNull(compOpsHtml)){
				html+= CS_DIV_WITH_MGN + compOpsHtml   + SP_3 

				html+= csh.gept(biDiyObj, TI_CS,  delParam);
				html+= csh.delIcon(delParam) +'</div>';	
			}else{

				html+= csh.gept(biDiyObj, TI_CS,  delParam);
				html+= SP_3 + csh.delIcon(delParam) ;
			}
			


		}

		return html;
	}


	function getIndiHtmlPart(biDiyObj , objId,  htmlObj, param){   // (biDiyObj , indObR,  rightIndiHtml)
		var html = ''
		var indiObj = biDiyObj[objId];


		html += SP_2+ getDropDown(TECH_INDI_INDEX, indiObj.id+'indiIndex', null,func, param, indiObj.indiIndex);
		html += SP_2 + htmlObj.indiHtml ;
		html += SP_2 + htmlObj.setHtml ;
		return html;
	}


	function bottomIndiChg(id){
		// console.log('bottomIndiChg  Id :' + id);

		var biDiyObj= getObjFrmArr(getDiyObjArray(), id);

		initVals(biDiyObj);

		var td = getHtmlTds( biDiyObj);

		htmlU.addMsgToDiv( biDiyObj.id+'Td2Div', true, td);

		runHtmlVals(biDiyObj);
		
		csu.dsf();
	}

	function initVals(biDiyObj){

		var prevIdL = biDiyObj.idL ;   //$('#'+id+'idL').val();
		var prevIdR = biDiyObj.idR ;  //$('#'+id+'idR').val();

		csu.setProp(getDiyObjArray(), BI_DIY_OBJ_PROP ,biDiyObj.id);

		var leftIndiChange = setIndiVals(biDiyObj , 'idL', 'indObL', prevIdL);


		if(!isCrossindi(biDiyObj.diyType) && leftIndiChange){
			biDiyObj.idR = CS_NOT_SELECTED; // forcing RHS to be same as LHS when cross Indi Compare not allowed
		}

		setRhsValueCrossIndi(biDiyObj , prevIdR);

	}

	function setIndiVals(biDiyObj ,   idType, objId , prevVal ){  // biDiyObj , 'idL', 'indObL', 'prevIdL'
	
		var indiChange = false;

		var idTypeVal = biDiyObj[idType];
		var indiObj = biDiyObj[objId];

		var indiDef =  jsu.getObjFrmArr(ALL_INDIS_MAP, idTypeVal);
			// LHS Indi ...
		if( jsu.isNull(idTypeVal) ||    idTypeVal == CS_NOT_SELECTED){
			biDiyObj[objId] ={};
			indiChange = true;
		}else if (jsu.isNull(indiObj) || jsu.isNull(indiObj.id)  || idTypeVal!= prevVal){ 
			/* Indi Change   or first time settings ...*/
			indiObj  ={};
			indiObj.id = biDiyObj.id + idType;
			indiObj.type = 'techIndi';
			indiObj.indi = idTypeVal;

			if(idType == 'idR' &&   jsu.arrayContainsId ( CLOSE_FIELDS_NO_VOL ,biDiyObj.idR  )  ){
				// Do nothing its OHLC
			}else{



			indiObj.gen ='ao'  // advance options ....

			indiObj.advOpt =   htmlU.isChecked(indiObj.id+'advOpt');


				if( jsu.isNotNull( indiDef.subType)){
					indiObj.subType = indiDef.subType; // works for OBOS / Sto & Bands and others
				}else{
					indiObj.subType = indiDef.techType; // works for OBOS non-Sto twins ....
				}
			
				setdefVals(indiDef ,indiObj );
			}


			biDiyObj[objId] = indiObj;
			indiChange = true;

		}else { // Indi param Change 

			indiObj.gen ='ao'  // advance options ....

			indiObj.advOpt =   htmlU.isChecked(indiObj.id+'advOpt');

			// to make it generic to pick directly from definations ...
			csu.siop(indiObj , CS_INDI_PROPS );
		}	

		if(!indiObj.advOpt){
			indiObj.custom = false;
		}

		return indiChange;
	}

	
	function setRhsValueCrossIndi(biDiyObj , prevIdR){

		if(jsu.isNotNull(biDiyObj.idL) &&  biDiyObj.idL !=CS_NOT_SELECTED && 
			(jsu.isNull(biDiyObj.idR) ||  biDiyObj.idR ==CS_NOT_SELECTED) ){

			biDiyObj.idR = biDiyObj.idL;  // Setting right same as left if right is not yet selected....

			var indObR = jsu.cloneObj(biDiyObj.indObL);

			indObR.indiIndex=1;
			indObR.id = biDiyObj.id + 'idR';
			biDiyObj.indObR = indObR;

	
		}else{
			setIndiVals(biDiyObj , 'idR', 'indObR', prevIdR);	
		}
	}



	function setdefVals(indiDef, indiObj){

		// ...

		// indiObj.id+ 'advOpt'


		if(indiDef.techType ==OBOS){
			tobos.ctdf(indiObj);
		} else if( jsu.containsString(  SINGLE_PARAM_INDI , indiObj.indi)  ){	
			tibsl.ctdf(indiObj);
		}else if( jsu.containsString( NON_OBOS_BI_SUBTYPE , indiDef.subType   ) ){
			tindis.ctdf(indiObj);
		}
	}

	function runHtmlVals(biDiyObj){

		// cst.tcc(biDiyObj);
		cscmn.rchv( biDiyObj.id , biDiyObj );   // compObj ,csTypeId , func , fncParam
		paramPropChange(biDiyObj.indObL); // validate LHS Indi
		paramPropChange(biDiyObj.indObR); // validate LHS Indi

		csu.setProp(getDiyObjArray(), BI_DIY_OBJ_PROP ,biDiyObj.id);

		if( jsu.isNotNull(biDiyObj.idL) && biDiyObj.idL != CS_NOT_SELECTED){
			csu.siop(biDiyObj.indObL , CS_INDI_PROPS );
			// to make it generic to pick directly from definations ...
		}

		if(jsu.isNotNull(biDiyObj.idR) &&   biDiyObj.idR != CS_NOT_SELECTED){
			csu.siop(biDiyObj.indObR , CS_INDI_PROPS );
			// to make it generic to pick directly from definations ...
		}

	}


	function paramPropChange(indiObj ){

		if(jsu.isNull(indiObj) || jsu.isNull(indiObj.indi)){
			return;
		}

		var indiDef =  jsu.getObjFrmArr(ALL_INDIS_MAP, indiObj.indi);

		if(indiDef == null){// case of RHS with OHLC only
			return;
		}

		if(indiDef.techType ==OBOS){
			tobos.ctc(indiObj);
		} else if(indiDef.subType == OVERLAYS){
			cst.gctc(indiObj);	
		} else if( jsu.containsString(  SINGLE_PARAM_INDI , indiObj.indi)  ){	
			cst.gctc(indiObj);	

		}else if( jsu.containsString( NON_OBOS_BI_SUBTYPE , indiDef.subType   ) ){
			// tindis.ctc(indiObj);
			cst.gctc(indiObj);
		}

		if(!indiObj.advOpt){  // Overriding as These fields could be leading to Custom = true when advance options are not checked...
			indiObj.custom = false;
		}
		
	}

	function validateFields(validResults){

		var diyBiCompList =  getDiyObjArray();

		for ( var i=0;i< diyBiCompList.length ;i++){

			var diyBiComp = diyBiCompList[i];

			validate(diyBiComp, validResults);
		}
	}

	function validate(diyBiComp, validResults){

		var selParam = 'techDiyBiComp' + ':'+diyBiComp.id; // Vol Compare
		diyBiComp.csType	 = TI_CS;

		var validObj = {goodData : false , text : ''};

		validObj.goodData = cscmn.vdb (diyBiComp);


		if(diyBiComp.diyType== OBOS) {// OBOS
			validateObos( diyBiComp, validObj);
		}else  if  ( jsu.containsString(NON_OBOS_BI_SUBTYPE, diyBiComp.diyType)){
			validateTech( diyBiComp, validObj);
		}

		diyBiComp.goodData = validObj.goodData;

		if(!validObj.goodData){
			csh.cdt(diyBiComp, validObj.text , validResults, selParam, false);
			return;
		}

		var text =  getGoodText(diyBiComp);

		csh.cdt(diyBiComp,text, validResults, selParam, true);
	}


	


	function validateObos(diyBiComp,  validObj){

		var invalidMsg = 'Invalid values of OverBot / Sold oscillators Comparision'

		if(!validObj.goodData) {
			validObj.text =invalidMsg;
			return;
		} 

		if(! valObosSide(diyBiComp.indObL ) || ! valObosSide(diyBiComp.indObR ) ){
			validObj.goodData = false;
			validObj.text =invalidMsg;
		}
/*
		var obosFiledsToValiLhs = tobos.sfv(diyBiComp.indObL , null);
		var obosFiledsToValiRhs = tobos.sfv(diyBiComp.indObR , null);

		if(!mcval.vtf(  diyBiComp.indObL, null, null, obosFiledsToValiLhs) 
				|| !mcval.vtf(  diyBiComp.indObR, null, null, obosFiledsToValiRhs) ){
				validObj.goodData = false;
				validObj.text =invalidMsg;
		}
*/
	}

	function valObosSide(obj){

		if(obj.advOpt){
			var obosFiledsToVali = tobos.sfv(obj , null);
			return mcval.vtf(  obj , null, null, obosFiledsToVali);

		}else{
			return true;
		}

	}


	function validateTech(diyBiComp,  validObj){
		var invalidMsg = 'Invalid values of '+ diyBiComp.diyType+' Indicator Comparision'

		if(!validObj.goodData) {
			validObj.text =invalidMsg;
			return;
		} 

		if(! valSide(diyBiComp.indObL ) || ! valSide(diyBiComp.indObR ) ){
			validObj.goodData = false;
			validObj.text =invalidMsg;
		}
/*
		if(     !mcval.vtf(  diyBiComp.indObL, null, null, null)   ){
				validObj.goodData = false;
				validObj.text =invalidMsg;
		}



		if( !mcval.vtf(  diyBiComp.indObR, null, null, null) ){
				validObj.goodData = false;
				validObj.text =invalidMsg;
		}
*/

	}

	function valSide(obj ){

		if(jsu.arrayContainsId(CLOSE_FIELDS_NO_VOL, obj.indi) ){
			return true;  // No validation for OHLC ...
		}


		if(obj.advOpt){
			return mcval.vtf(  obj, null, null, null);

		}else{
			return true;
		}

	}


	function getGoodText( diyBiComp ){

		var indObL = diyBiComp.indObL;
		var indObR = diyBiComp.indObR;

		var indiDefLeft =  jsu.getObjFrmArr(ALL_INDIS_MAP, diyBiComp.idL);
		var indiDefRight =  jsu.getObjFrmArr(ALL_INDIS_MAP, diyBiComp.idR);


		var ticks = csu.gct( indObL , 'techTick');

		var text =  ''

		text += getSideText(indObL, indiDefLeft, ticks  );

		var rightIndiText = '';

		if(indiDefRight == null){
			// for OHLC only ...
			var ohlcObj =  jsu.getObjFrmArr(CLOSE_FIELDS_NO_VOL, diyBiComp.idR)  ; 
			indiDefRight = {shortName : ohlcObj.label};  // Hack to make Text ....
			// rightIndiText =  getSideText(indObR, indiDefRight, ticks  );
		}


		rightIndiText =  getSideText(indObR, indiDefRight, ticks  );	
		

		// var ops = jsu.getObjFrmArr( COMP_DIY_OPS, diyBiComp.ops );

		text +=  cscmn.dot(diyBiComp, rightIndiText );
		
		return text;

	}

	function getSideText(indOb,indiDef,  ticks  ){
		var text =  ''

		if(indOb.indiIndex >0){
			text += "[P-"+indOb.indiIndex+"] ";
		}
		text+= indiDef.shortName +' ';

		if(obj.advOpt){

			if(indOb.custom){
				text += 'with Cust Settings ';
			}
			var tickObj = jsu.getObjFrmArr(ticks, indOb.techTick);
			
			text+= 'on '+  tickObj.label + ' Tick ';
		}

		
		return text;		
	}

	


	function getDiyIndis(diyType, idType){

		var indis = [];

		if(idType=='idR' && diyType== OVERLAYS ){   // right Side for Overlays
			for(var i=0;i< CLOSE_FIELDS_NO_VOL.length ;i++){

				var ohlc =  jsu.cloneObj(CLOSE_FIELDS_NO_VOL[i]) ;
				ohlc.llabel = ohlc.label;
				ohlc.shortName = ohlc.label;
				indis.push(ohlc);
			}

		}else{
			indis.push(SELECT_ONE);	
		}

		

		for(var i=0;i< ALL_INDIS_MAP.length;i++){

			var indi = ALL_INDIS_MAP[i]; 

			if(jsu.isNotNull(indi.fields) &&  (indi.fields.diybi  || indi.fields.diyol   ) ) {

				if(indi.id == ICHIMOKU){
					continue;
				}


				if(diyType== OBOS &&  diyType == indi.techType){ // obos

					if(indi.id == CMO || indi.id ==PGO || indi.id == CHOP_IDX) { // HACK to do a better design.
						continue;
					}
					
/*					if( jsu.containsString([STO_FAST, STO_SLOW, STO_RSI, STO_RSI_SLOW] , indi.id )){

						indis.push({ id: indi.id , label : indi.shortName , llabel: indi.label  , shortName : indi.shortName, fieldType: 'k'});	

						indis.push({ id: indi.id , label : indi.shortName +" %D" , llabel: indi.label +" %D"  , shortName : indi.shortName+" %D" , fieldType: 'd'});	
					}else{
						indis.push({ id: indi.id , label : indi.shortName , llabel: indi.label  , shortName : indi.shortName});	
					}
*/
					indis.push({ id: indi.id , label : indi.shortName , llabel: indi.label  , shortName : indi.shortName});	

				// }else if(diyType== 'Bands' &&  diyType == indi.techType){
					// not implemented yet

				}else if( diyType == indi.subType){ // Generic ...
					indis.push({ id: indi.id , label : indi.shortName , llabel: indi.label  , shortName : indi.shortName});	

				// }else if(jsu.containsString( ['Indi', 'VolIndi'],  indi.techType )){
				// 	indis.push({ id: indi.id , label : indi.shortName , llabel: indi.label  , shortName : indi.shortName});	


				}else{
					// console.log('invalid diyType'+ diyType);
				}

			}

		}





		return indis;
	}
	// getIndisDefForDropDown( biDiyObj.diyType,  idType, indiObj.indi )

	function getIndisDefForDropDown( diyType ,  idType ,  indi){
		var diyIndis = getDiyIndis(diyType);

		if(idType=='idR'){
			diyIndis = getDiyIndis(diyType , idType); // For over lasys addi OHLC
		}


		if(!isCrossindi(diyType)   ){
			
			diyIndis = getDiyIndis(diyType);

			var indiObjDef = jsu.getObjFrmArr(diyIndis ,  indi);
			diyIndis =[];
			diyIndis.push(indiObjDef);
		}
		return diyIndis;
	}


	function getDiyObjArray(){

		return mtgv.cs.screenerData.techDiyBiComp;

	}

	function isCrossindi(diyType){
		return jsu.containsString( CROSS_INDI_DIY_TYPE,  diyType )
	}

	

	return {

		// new 
		anf : addNewFilter,

		afc : addFilterChange,

		// new


		ghr : getHtmlRow,
		gftd :getHtmlTds,
		add : addDiyBi,
		bic : bottomIndiChg,
		vf : validateFields

	}

})(); // module 	
