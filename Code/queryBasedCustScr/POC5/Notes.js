// * Requirements: 
// * Understand TSR Custom Screener 
// * Understand the big picture
    // * Understand the DS
        // ? Maintainibility
        // ? Testing
        // ? Access Pattern
            // ? Actions needed to be taken on Data 
            // ? Modularize getting data from DS using components (create building blocks) - for reusability 
    // * 
// *

// * Algorithm:

// * Input:
// * let CLOSE = 'CLOSE', OPEN = 'OPEN', HIGH = 'HIGH', LOW = 'LOW';
// * 
// * let CLOSE_DEF = { id: CLOSE, label: 'Close', sLabel: 'C', qlCat: 'overlay' };
// * let OPEN_DEF = { id: OPEN, label: 'Open', sLabel: 'O', qlCat: 'overlay' };
// * let HIGH_DEF = { id: HIGH, label: 'High', sLabel: 'H', qlCat: 'overlay' };
// * let LOW_DEF = { id: LOW, label: 'Low', sLabel: 'L', qlCat: 'overlay' }
// * 
// * let OHLC_DEF = [
// *     CLOSE_DEF, 
// *     OPEN_DEF, 
// *     HIGH_DEF, 
// *     LOW_DEF
// * ];
// * 
// * let EMA = 'EMA';
// * let SMA = 'SMA';
// * let WMA = 'WMA';
// * 
// * let SMA_DEF = {id: SMA, label: SMA, qlCat: 'overlay'};
// * let EMA_DEF = {id: EMA, label: EMA, qlCat: 'overlay'};
// * let WMA_DEF = {id: WMA, label: EMA, qlCat: 'overlay'};
// * 
// * let MA_DEF = [
// *     SMA_DEF, 
// *     EMA_DEF,
// *     WMA_DEF
// * ];
// * 
// * let OHLC_OPS = ["<", ">", "=", "!="];
// * let MA_OPS = ["Cross Above (CA)", "Cross Below (CB)", "CA - Previous Tick", "CB - Previous Tick", "Within", "Off More Than"];
// * 
// * let OVERLAYS = [
// *     {id: 'OHLC', OHLC_DEF, OHLC_OPS},
// *     {id: 'MA', MA_DEF, MA_OPS}
// * ];
// * 
// * function cloneObj(obj) {
// *     var str = JSON.stringify(obj);
// *     var clone = JSON.parse(str);
// *     
// *     return clone;
// *  }

// * showSuggestions()
// * START
// * STEP 1: Get last word entered by user - using getKeyword()
// * STEP 2: Check whether it is an OVERLAY
    // * STEP 2a: Find in OHLC = ['CLOSE', 'OPEN', 'HIGH', 'LOW'] // Store it seperately
        // * 2a. i. If found, show matching OHLC fields and all related OVERLAY fields, i.e. MA fields
        // * 2a. ii. Else goto STEP 2b
    // * STEP 2b: Find in MA = ['SMA', 'EMA', 'WMA'] // Store it seperately
        // * 2b. i. If found, show matching MA fields and all related OVERLAY fields, i.e. OHLC fields
        // * 2b. ii. Else goto STEP 2b
    // * STEP 2c: Else, clear suggestions
// * STEP 3: END


// * For showAdvancedOptions(), will have to modify field objects
    // * For MA fields
    // * let SMA_DEF = {id: SMA, label: SMA, qlCat: 'overlay', advancedOptions: maAdvancedOptions};
    // * For Price fields
    // * let CLOSE_DEF = { id: CLOSE, label: 'Close', sLabel: 'C', qlCat: 'overlay', advancedOptions: priceAdvancedOptions };

// * maAdvancedOptions
// * Period

// * priceAdvancedOptions
// * Period
// * Tick

// * showAdvancedOptions()
// * START 
// * STEP 1 - showCorrespondingOptions for that particular keyword
    // * STEP 1a - Parse DATA_MASTER, search for the keyword field in it, if found check corresponding advanced options 
    // * let CLOSE_DEF = { id: CLOSE, label: 'Close', sLabel: 'C', qlCat: 'overlay', advancedOptions: ohlcAdvancedOptions };
    // * modifyAdvancedOptionsDiv() - this function creates required options for that particular keyword

// * STEP 
// * STEP 
// * STEP 
// * STEP 
// * STEP 
// * STEP 
// * STEP 
// * STEP 
// * STEP 
// * STEP 
// * STEP 
// * STEP 
// * STEP 








// * STEP 
// * STEP 
// * STEP 
// * STEP 
// * STEP 
// * STEP 
// * STEP 
// * STEP 
// * STEP 
// * STEP 
// * STEP 
// * STEP 
// * STEP 
// * STEP 
// * STEP 
// * STEP 
