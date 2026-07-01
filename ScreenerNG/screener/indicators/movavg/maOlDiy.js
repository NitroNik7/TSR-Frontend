var maOlDiy =  (function () {


	var thisObject = 'maOlDiy';
	var htmlU = mintHtmlUtil;
	var jsu = mintJsUtil;

	var func = thisObject + '.mac';  // TODO -- Change to generic name

	var TECH_INDI_INDEX = cscmn.gttp(20);

	let DIY_OBJ_PROP = ['ops','idL', 'idR', 'v1', 'v2']; //biDiyObjProps

	let MA_HIST_TYPES = MA_TYPE_PR.slice()



	let OL_TYPES = olHistComp.olt;

	function addMaOl(){
	
		
	   
		let type = null;

		let json = addNewFilter(type);

		$('#maCtrlTab').append(json.html );

	    addFilterChange(type, json.id)
	    


	   

	    var element = document.querySelector('#csControlsDiv');
	    element.scrollTop = 0;
	}


	function addNewFilter(type){

		// HYBRID  -- Ma Model based on MA (LHS)   , RHS - Based on VWAP Style


		// var maComp = mtgv.cs.screenerData.maHistComp;
		var id =  myTsrScreener.getNextId( 'maOlCompId');

		// var maOlObj = null;
		var maOlObj = { id :id, idL : MA_HIST_TYPES[0].id, ops: COMP_DIY_OPS[0].id ,  olType : OL_TYPES[0].id  };  // Price / first MA type.....

		
		// maOlObj.indObL =  { indi: maOlObj.idL   , id : id + 'idL' } ; 
		// maOlObj.indObR =  { indi: maOlObj.idR  , id : id + 'idR' } ; 


		mtgv.cs.screenerData.maOlComp.push(maOlObj); // add to array

		var html = getMaOlRow(maOlObj);

		return { html : html , id : id};

	}

	function addFilterChange(type, id){
		maOlChg(id);
	    csu.dsf();

	}


	function getMaOlRow(maOlObj){
		var td2 =       getMaOlTd(maOlObj) ;
		var td2Div =  createDiv(maOlObj.id+'Td2Div', td2)
		var html = '<tr id='+maOlObj.id+'> ' +  createTd( td2Div ) +'</tr>';
		return html;
	}

	function  getMaOlTd(maOlObj){
			var html = '' ;
		var param = maOlObj.id ; // param should always be of DIY Object ...

		var leftIndiHtml = getMaHtml(maOlObj);
		var rightIndiHtml = getOlHtml(maOlObj);

		html+= htmlU.doBold("MA / Overlays Comp : ")


		html+= leftIndiHtml;
		html+= CS_DIV_WITH_MGN;
		// html +=  SP_2 + htmlU.doBold("Versus") 
		html+=  getDropDown(AB_CO_OPS_BASIC, maOlObj.id+'ops', null,func, param, maOlObj.ops);
		html+= '</div>';

		html+= rightIndiHtml;

		var compOpsHtml = cscmn.gcoh(maOlObj ,maOlObj.id , func , param);

		// if(jsu.isNotNull(compOpsHtml)){
		// 	html+= CS_DIV_WITH_MGN + compOpsHtml +'</div>';
		// }	

		var param = 'maOl' + ':'+param; // Vol Compare

		html+= csh.gept(maOlObj, MA_CS,  param);
		
		html+= SP_3 + csh.delIcon(param) ;

		return html;


	}


	function getMaHtml(maOlObj ){

		var param = maOlObj.id ; // param should always be of DIY Object ...

		var html =''
		html += SP_2+ getDropDown(TECH_INDI_INDEX, maOlObj.id+'maPeriod', null,func, param, maOlObj.maPeriod);

		// idL abd idR are Base object field ... 
		html+= SP_3 +  getInputTxtParam( maOlObj.id+'ma' , 5, maOlObj.ma, func , param)	;

		html+= SP_3 + getDropDown(MA_HIST_TYPES, maOlObj.id+'maType', null,func, param, maOlObj.maType); 
		
		html +=  '  MA On ' +  getDropDown(MA_PRICE_FIELDS, maOlObj.id+'maField', null,func, param, maOlObj.maField) ;

		var ticks = csu.gct(maOlObj , 'techTick');
		html+= htmlU.getSpan(' On ' , 'grey' , 10) + 	getDropDown(ticks, maOlObj.id+'maTick', null,func, param, maOlObj.maTick)
			+ htmlU.getSpan(' Tick ' , 'grey' , 10)

		return html;
	}

	function getOlHtml(obj  ){

		var param = obj.id ; 
		let html = '';

		html += getDropDown(cscmn.gttp(100) , obj.id+'bandPeriod', null,func, param, obj.bandPeriod) ;
		
		html+= SP_3 + getDropDown(OL_TYPES , obj.id+'olType', null,func, param, obj.olType) ;

		html+=  olHistComp.gh(obj.id, obj , obj.olType , func, param)

		return html;

		// var ticks = csu.gct(obj , 'tick2');
		// html+=  BR_2 +  " On  " + getDropDown(ticks,  id+ 'tick2', null, func, fncParam, obj.tick2) ;
		// html+= " tick ";
	}



	function maOlChg(id){

		var obj = jsu.getObjFrmArr(  mtgv.cs.screenerData.maOlComp , id );

		let origOl = obj.olType;

		let FIELDS = ['ma' , 'maTick',  'maPeriod', 'maType' ,'maField', 'ops',
			'olType', 'bandPeriod', 'p1','p2','p3','p4', 'bandMa', 'bandField', 'tick2'
		]

		// csu.setProp(obj  , FIELDS, obj.id);

		csu.siop(obj,  FIELDS);

		obj.goodData = true;




		

		var td = getMaOlTd( obj );
		
		htmlU.addMsgToDiv(obj.id+'Td2Div', true, td);

		if(!jsu.isInputPositiveNumber (obj.id+'ma') ){
			obj.goodData =  false;
		}

		if(!jsu.inputNumberRange (obj.id+'ma', 2,200)){
			obj.goodData =  false;
		}

		if(origOl == null || origOl != obj.olType ){
			// Overlays Changed ... resetting to def Values
			olHistComp.sdv(obj, obj.olType);	
		}


		olHistComp.hc(id, obj, obj.olType)

		// csu.setProp(obj  , FIELDS, obj.id);
		csu.siop(obj,  FIELDS);

		cscmn.rchv( obj.id , obj );   // compObj ,csTypeId , func , fncParam
		csu.dsf();

	}

	function validateFields(validResults){

		for ( var i=0;i< mtgv.cs.screenerData.maOlComp.length ;i++){

			var text ='';

			text += htmlU.doBold("MA / Overlays Comp : ");
			var obj = mtgv.cs.screenerData.maOlComp[i];
			
			
			var opsObj = jsu.getObjFrmArr( COMP_DIY_OPS , obj.ops ); 

			var maTypeObj = jsu.getObjFrmArr( MA_HIST_TYPES , obj.maType ); 

			var maPeriodObj =  jsu.getObjFrmArr( TECH_INDI_INDEX , obj.maPeriod ); 

			var maFieldObj= jsu.getObjFrmArr( MA_PRICE_FIELDS , obj.maField );    

			var ticks = csu.gct(obj , 'maTick');

			var maTickObj= jsu.getObjFrmArr( ticks , obj.maTick );    

			text+= maPeriodObj.label + ' ' +  obj.ma  + ' ' + maTypeObj.label   + ' on ' + maFieldObj.label + ' @ ' + maTickObj.label + ' Tick';

			text += ' ' +opsObj.label +' ';


			var bandPeriodObj =  jsu.getObjFrmArr( TECH_INDI_INDEX , obj.bandPeriod ); 
			// var olTickObj= jsu.getObjFrmArr( ticks , obj.maTick );     
			text += bandPeriodObj.label + ' ';

			text += olHistComp.vf(obj , obj.olType);

			var selParam = 'maOl' + ':'+obj.id; // Vol Compare
			
			obj.csType	 = MA_CS;

			if(!obj.goodData){
				text = 'Incorrect Value MA Cross'
			}

			csh.cdt(obj,text, validResults, selParam, obj.goodData);

		}

	}


	return {

		// new 
		anf : addNewFilter,
		afc : addFilterChange,
		// new

		add : addMaOl,
		gmo : getMaOlRow,
		gftd : getMaOlTd,
		mac : maOlChg, 
		vf : validateFields
	}

})(); // module 	
