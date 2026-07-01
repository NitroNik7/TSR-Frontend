

var maDiy =  (function () {


	var thisObject = 'maDiy';
	var htmlU = mintHtmlUtil;
	var jsu = mintJsUtil;

	var func = thisObject + '.mach';  // TODO -- Change to generic name

	var TECH_INDI_INDEX = cscmn.gttp(20);

	var DIY_OBJ_PROP = ['ops','idL', 'idR', 'v1', 'v2']; //biDiyObjProps


	




	function addMaHist(){

		let type = null;

		let json = addNewFilter(type);

		$('#maCtrlTab').append(json.html );

	    addFilterChange(type, json.id)
	    

	    var element = document.querySelector('#csControlsDiv');
	    element.scrollTop = 0;
	}


	function addNewFilter(type){
		var MA_HIST_TYPES = getMaHistTypes();

		// var maComp = mtgv.cs.screenerData.maHistComp;
		var id =  myTsrScreener.getNextId( 'maHistCompId');

		var maHistObj = null;

		var maHistObj = { id :id, idL : MA_HIST_TYPES[0].id, ops: COMP_DIY_OPS[0].id ,     idR : MA_HIST_TYPES[1].id};  // Price / first MA type.....

		maHistObj.indObL =  { indi: maHistObj.idL   , id : id + 'idL' } ; 
		maHistObj.indObR =  { indi: maHistObj.idR  , id : id + 'idR' } ; 

		getDiyObjArray().push(maHistObj); // add to array

		// var td = getHtmlTds(maHistObj);

		// var html = '<tr id='+maHistObj.id+'>'	+ createTd(createDiv(maHistObj.id+'Td2Div', td)) +'</tr>';
		var html = getMaHistRow(maHistObj);


		return { html : html , id : id};
	}

	function addFilterChange(type, id){
		maHistChg(id);
	    csu.dsf();

	}


	function getMaHistRow(maHistObj){
		var td2 =       getMaHistTd(maHistObj) ;
		var td2Div =  createDiv(maHistObj.id+'Td2Div', td2)
		var html = '<tr id='+maHistObj.id+'> ' +  createTd( td2Div ) +'</tr>';
		return html;

	}

	function getMaHistTd(maHistObj){

		// var id = maHistObj.id;
		// var func = 'csma.mdc'; 
		var html = '' ;

		html+= htmlU.doBold("MA Hist Comp : ")

		var param = maHistObj.id ; // param should always be of DIY Object ...

		var leftIndiHtml = getIndiHtml(maHistObj,  'idL', 'indObL');
		var rightIndiHtml = getIndiHtml(maHistObj,  'idR', 'indObR');

		// if( jsu.isNull(maHistObj.ops)) { maHistObj.ops = COMP_DIY_OPS[0].id }; // Defaulting to first


		html+= leftIndiHtml;
			html+= CS_DIV_WITH_MGN;
			html +=  SP_2 + htmlU.doBold("Versus") 
			html+= SP_3 + getDropDown(COMP_DIY_OPS, maHistObj.id+'ops', null,func, param, maHistObj.ops);
			html+= '</div>';

		html+= rightIndiHtml;

		var compOpsHtml = cscmn.gcoh(maHistObj ,maHistObj.id , func , param);

		if(jsu.isNotNull(compOpsHtml)){
			html+= CS_DIV_WITH_MGN + compOpsHtml +'</div>';
		}	

		var param = 'maHist' + ':'+param; // Vol Compare

		html+= csh.gept(maHistObj, MA_CS,  param);
		
		html+= SP_3 + csh.delIcon(param) ;

		return html;
	}


	function getIndiHtml(maHistObj,  idType, objId ){
		var MA_HIST_TYPES = getMaHistTypes();
		var idTypeVal = maHistObj[idType];

		if(jsu.isNull(idTypeVal)){
			return '';
		}

		var param = maHistObj.id ; // param should always be of DIY Object ...
		// var indiHtml ='';
		// var setHtml= '';

		// var indiDef =  jsu.getObjFrmArr(ALL_INDIS_MAP,idTypeVal);
		var indiObj = maHistObj[objId];

//

		var html =''
		html += SP_2+ getDropDown(TECH_INDI_INDEX, indiObj.id+'indiIndex', null,func, param, indiObj.indiIndex);

		if(indiObj.indi == 'price'){
			html += SP_2+   getDropDown(MA_PRICE_FIELDS, indiObj.id+'priceField', null,func, param, indiObj.priceField)  ;
			html+= SP_3 + getDropDown(MA_HIST_TYPES, maHistObj.id+idType, null,func, param, indiObj.indi); 
		}else{
			// idL abd idR are Base object field ... 
			html+= SP_3 +  getInputTxtParam( indiObj.id+'ma' , 5, indiObj.ma, func , param)	;
			html+= SP_3 + getDropDown(MA_HIST_TYPES, maHistObj.id+idType, null,func, param, indiObj.indi); 
			html +=  '  MA On ' +  getDropDown(MA_PRICE_FIELDS, indiObj.id+'maField', null,func, param, indiObj.maField) ;
		}

		var ticks = csu.gct(indiObj , 'techTick');
		html+= htmlU.getSpan(' On ' , 'grey' , 10) + 	getDropDown(ticks, indiObj.id+'techTick', null,func, param, indiObj.techTick)
			+ htmlU.getSpan(' Tick ' , 'grey' , 10)

		return html;
	}


	function maHistChg(id){
		var maHistObj= getObjFrmArr(getDiyObjArray(), id);

		initVals(maHistObj);

		var td = getMaHistTd( maHistObj);

		htmlU.addMsgToDiv( maHistObj.id+'Td2Div', true, td);

		runHtmlVals(maHistObj);

		csu.dsf();
	}


	function initVals(maHistObj){

		// var prevIdL = maHistObj.idL ;   //$('#'+id+'idL').val();
		// var prevIdR = maHistObj.idR ;  //$('#'+id+'idR').val();

		csu.setProp(getDiyObjArray(), DIY_OBJ_PROP ,maHistObj.id);

		setIndiVals(maHistObj , 'idL', 'indObL');
		setIndiVals(maHistObj , 'idR', 'indObR');


	}

	function setIndiVals(maHistObj ,   idType, objId  ){  // biDiyObj , 'idL', 'indObL', 'prevIdL'

		var indiChange = false;

		var idTypeVal = maHistObj[idType];
		var indiObj = maHistObj[objId];
		indiObj.indi = idTypeVal;
		csu.siop(indiObj, ['ma' , 'techTick',  'indiIndex', 'priceField' ,'maField']);


	}

	function runHtmlVals(biDiyObj){

		// cst.tcc(biDiyObj);
		cscmn.rchv( biDiyObj.id , biDiyObj );   // compObj ,csTypeId , func , fncParam

		if(biDiyObj.indObL.indi != 'price'){
			jsu.inputNumberRange (biDiyObj.indObL.id+'ma', 2,200)	;
		}

		if(biDiyObj.indObR.indi != 'price'){
			jsu.inputNumberRange (biDiyObj.indObR.id+'ma', 2,200)	;
		}
	}

	function validateFields(validResults){

		var diyCompList =  getDiyObjArray();

		for ( var i=0;i< diyCompList.length ;i++){

			var diyComp = diyCompList[i];

			validate(diyComp, validResults);
		}
	}

	function validate(diyComp, validResults){

		var selParam = 'maHist' + ':'+diyComp.id; // Vol Compare
		diyComp.csType	 = MA_CS;

		var validObj = {goodData : false , text : ''};

		validObj.goodData = cscmn.vdb (diyComp);
		// validate other fields
		validMa(diyComp.indObL , validObj);
		validMa(diyComp.indObR , validObj);

		diyComp.goodData = validObj.goodData;

		if(!validObj.goodData){

			var badMsg = 'Invalid Setting for Ma Hist Comparision';
			csh.cdt(diyComp,badMsg , validResults, selParam, false);
			return;
		}

		var leftText= getindiText( diyComp.indObL, validObj);
		var rightText= getindiText( diyComp.indObR, validObj);

		var text =  htmlU.doBold("MA Hist Comp : ") +  leftText + cscmn.dot(diyComp, rightText );

		csh.cdt(diyComp,text, validResults, selParam, true);

		// validate other fields and create message .... 

	}

	function validMa(maObj, validObj){
		if(!validObj.goodData ){
			return;
		}
		
		if(maObj.indi != 'price'){
			if( !jsu.isNumber(maObj.ma) || Number(maObj.ma) <2   ||  Number(maObj.ma) >200){
				 validObj.goodData = false ;
			}
		}
	}


	function getindiText(maObj){
		var MA_HIST_TYPES = getMaHistTypes();
		var text = '' ;
		if(maObj.indiIndex >0){ 
			text += "[P-"+maObj.indiIndex+"] ";
		}
		var ohlcfield =  ''

		if(maObj.indi == 'price'){
			ohlcfield = jsu.getObjFrmArr( MA_PRICE_FIELDS ,maObj.priceField );
		}else{
			ohlcfield = jsu.getObjFrmArr( MA_PRICE_FIELDS ,maObj.maField );

			var maTypeObj =  jsu.getObjFrmArr( MA_HIST_TYPES ,maObj.indi );

			text += maObj.ma +  ' ' + maTypeObj.label + ' on ' ;
		}

		text +=  ohlcfield.label;
		text += ' Price';

		var ticks = csu.gct(maObj , 'techTick');
		var tickObj = jsu.getObjFrmArr(ticks, maObj.techTick);
		
		text+= ' on '+  tickObj.label + ' Tick ';

		return text;
	}

	function getDiyObjArray(){

		return mtgv.cs.screenerData.maHistComp;

	}

	function getMaHistTypes(){
		var types = MA_TYPE_PR.slice();
		types.unshift({id: "price", label: "Price"} );
		return types;
	}

	return {

		// new 
		anf : addNewFilter,

		afc : addFilterChange,

		// new
		gftd : getMaHistTd,

		ghr : getMaHistRow,
		add : addMaHist,
		mach : maHistChg, 
		vf : validateFields
	}

})(); // module 	
