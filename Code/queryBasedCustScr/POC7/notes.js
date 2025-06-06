// // TODO In syntax validation - add logic for comparing fields other than price fields

// TODO Show Query Based CS to team
// * Suggestions:
// advancedOptionsBox as a floating div, just like suggestionsDiv 
// 

// // TODO Task 1: Testing Pending
    // // TODO Test 1: Update advanced fields by clicking on field & its advanced fields both
    // // TODO Test 2: Update advanced fields using keyboard
    // // TODO Test 3: Test after adding funda ratios, as they don't have any advanced options
// // TODO Task 1: User should be able to type in the advanced options for a field
    // // * Solution #1: Default fields are added while inserting it from suggestionsDiv
        // // * #1a: Default fields are added when user types in keyword from keyboard
        // // * #1b: Will have to show advanced options even when cursor is placed on these options
    // // ? Solution #2: Adding incomplete brackets, where user is supposed to enter fields
        // // ! Inconvenient, since user might not know what fields are supported and would be inconvenient for them to type in all fields, that too wo errors

// TODO Task 2: Add funda ratios
    // TODO Task 2a: Inserting metric which has a space in between
// // TODO Enter key should work as intended
// ? Suggestions should not be shown on backspace ? i.e. it should be shown only when user types something...

// TODO Task 3: Suggestions div should consist of select/input box
// * Solution: Show advanced options div near click on resp. keyword only 

// ! Bug #1: Should be able to show related fields when user types in an operator
// ! Bug #4: Min Max in advanced options
// ! Bug #7: After entering operator, suggestionsDiv loses focus, thus keyboard events don't work 

// // ! Bug #2: Reentering keyword, using keyboard on suggestionsDiv, inserts keyword incorrectly  

// // ! Bug #3: Inserting metric using mouse click sets incorrect cursor position 

// // ! Bug #6: Related operators still being shown even when line has an operator

// // ! Bug #5: Adding spaces in between, results in metrics getting inserted at wrong positions 


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
