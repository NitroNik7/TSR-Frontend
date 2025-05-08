// * Parse Query
// * Steps
// * Split entire query into multiple lines w.r.t \n character
    // * Check occurence of any operator in the line
    // * Split each line by operator
        // * After getting 3 substrings (assuming split() splits at first occurence of splitter string)
        // * Recursively split 3rd substring until substring does not contain any operator
        // * Store first substring, operator for syntax validation with result of recursive function
            // * Syntax Validation
                // * Validate RHS
                // * Validate operator
                // * Validate LHS
                // * return "true" if validation succeeds, else "false"
            //
        //
    //
//