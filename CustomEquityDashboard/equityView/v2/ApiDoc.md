## EQUITY ANALYSIS - CUSTOM VIEW

### Tech. Portlets:

1. **Technical Indicator**

    **Request**
    ```json
        "stockCode": "NATIONALUM",
        "portletCode": "TechIndi_1",
        "settings": {
            "userPref": [ 
                {
                    "id":"adx",
                    "label":"ADX 5 Minutes",
                    "tick":"mm5",
                    "indi":"adx"
                } 
            ],
            "available":[]
        }
    ``` 
    **Response**
    ```json
        "statusCode": "success",
        "list": [
                { 
                    "id": "adx", 
                    "label": "ADX 5 Minutes", 
                    "indi": "adx", 
                    "indiLabel": "ADX (Average Directional Index)", 
                    "tick": "mm5", 
                    "val": 31.45},
            ],
        "columns": ["Technical Indicator","Tick","Value"]
    ``` 

2. **Moving Average**

    **Request**
    ```json
        "stockCode": "NATIONALUM",
        "portletCode": "MA_1",
        "settings": {
            "userPref":
            [
                {
                    "id":"SMA_10_mm5",
                    "label":"SMA 10",
                    "maType":"SMA",
                    "maPeriod":"10",
                    "tick":"mm5"
                },
                {"id":"EMA_30_mm15","label":"EMA 30","maType":"EMA","maPeriod":"30","tick":"mm15"},
                {"id":"EMA_20_hh1","label":"EMA 20","maType":"EMA","maPeriod":"20","tick":"hh1"},
                {"id":"WMA_10_D","label":"WMA 10","maType":"WMA","maPeriod":"10","tick":"D"}
            ],
            "available":[]
        }
    ``` 

    **Response**
    ```json
        "statusCode": "success",   
        "settings": {
            "userPref": [
                {
                    "id": "SMA_10_mm5",
                    "label": "SMA 10",
                    "maType": "SMA",
                    "maPeriod": "10",
                    "tick": "mm5"
                },
                { "id": "EMA_30_mm15","label": "EMA 30","maType": "EMA","maPeriod": "30","tick": "mm15" },
                {"id": "EMA_20_hh1","label": "EMA 20","maType": "EMA","maPeriod": "20","tick": "hh1"},
                {"id": "WMA_10_D","label": "WMA 10","maType": "WMA","maPeriod": "10","tick": "D"}
            ],
            "available": []
        },
        "list": [
            { 
                "id": "SMA_10_mm5", 
                "maType": "SMA", 
                "ma": "10", 
                "value": "40.18", 
                "tick": "mm5"
            },
            {"id": "EMA_30_mm15","maType": "EMA","ma": "30","value": "27.52","tick": "mm15"},
            {"id": "EMA_20_hh1","maType": "EMA","ma": "20","value": "287.68","tick": "hh1"},
            {"id": "WMA_10_D","maType": "WMA","ma": "10","value": "198.18","tick": "D"}
        ],
        "columns": ["MA TYPE", "MA", "TICK", "Value"]
    ``` 

3. **Pivot Points**

    **Request**
    ```json
        "stockCode": "NATIONALUM",
        "portletCode": "PivotPoints",
        "settings": {
            "userPref":[
                { 
                    "id":"Standard_mm5_p20",
                    "label":"Standard",
                    "pivotType":"standard",
                    "tick":"mm5",
                    "nthTick":"p20"},
                {"id":"Camarilla_hh4_p15","label":"Camarilla","pivotType":"camarilla","tick":"mm5","nthTick":"p15"},
            ],
            "available":[]
        }
    ``` 

    **Response**
    ```json
        "statusCode": "success",
        "list": [
		    { 
                "id": "Standard_mm5_p20",
                "type": "Standard",
                "tick": "5 Minutes",
                "nthTick": "P-20",
                "s4": "-",
                "s3": "-",
                "s2": 88.07,
                "s1": 62.83,
                "pivot": 56.03,
                "r1": 8.42,
                "r2": 21.64,
                "r3": "-",
                "r4": "-" },
		    { "id": "Camarilla_hh4_p15","type": "Camarilla","tick": "5 Minutes","nthTick": "P-15","s4": "-","s3": 29.22,"s2": 17.37,"s1": 28.31,"pivot": 94.35,"r1": 50.98,"r2": 93.1,"r3": 29.22,"r4": "-" }
    	],
        "columns": ["Period", "Type", "Tick", "S4", "S3", "S2", "S1", "Pivot", "R1", "R2", "R3", "R4"]
    ``` 

4. **Beta**

    **Request**
    ```json
        "stockCode": "NATIONALUM",
        "portletCode": "Beta",
        "settings": {
            "userPref": [
                { 
                    "id": "D1M", 
                    "label": "Daily 1 Month", 
                    "tickPeriod": "D1M" },
                { "id": "D3M", "label": "Daily 3 Month", "tickPeriod": "D3M" },
                { "id": "W1Y", "label": "Weekly 1 Year", "tickPeriod": "W1Y" },
                { "id": "W2Y", "label": "Weekly 2 Year", "tickPeriod": "W2Y" }
            ],
            "available":[]
        }
    ``` 

    **Response**
    ```json
        "statusCode": "success",
        "list": [
            {
                "id": "D1M",
                "period": "Daily 1 Month",
                "beta": 0.08,
                "mean": 11.62,
                "sd": 9.88
            },
            {"id": "D3M","period": "Daily 3 Month","beta": 0.18,"mean": 11.62,"sd": 8.7},
            {"id": "W1Y","period": "Weekly 1 Year","beta": 0.73,"mean": 12.32,"sd": 6.72},
            {"id": "W2Y","period": "Weekly 2 Year","beta": 0.13,"mean": 18.12,"sd": 9.33}
        ],
        "columns": ["Period", "Beta", "Mean", "SD"]
    ``` 

5. **Relative Price Strength**

    **Request**
    ```json
        "stockCode": "NATIONALUM",
        "portletCode": "RelPriceStrength",
        "settings": {
            "userPref":[
                { 
                    "id": "1_W_Nifty50", 
                    "label": "1 Week vs NIFTY 50", 
                    "periodVal": "5", 
                    "period": "W", 
                    "index": "Nifty50" 
                },
                { "id": "2_W_Nifty50", "label": "2 Weeks vs NIFTY 50", "periodVal": "15", "period": "D", "index": "Nifty50" },
                { "id": "1_M_NiftyNext50", "label": "1 Month vs NIFTY NEXT 50", "periodVal": "10", "period": "M", "index": "NiftyNext50" },
            ],
            "available":[]
        }
    ``` 

    **Response**
    ```json
        "statusCode": "success",
        "list": [
            {   
                "id": "1_W_Nifty50",
                "period": "5 Week",
                "stkReturn": "17.86 %",
                "vsIndex": {
                    "value": "9.91 %", 
                    "label": "NIFTY 50"},
                "relStr": "20.17 %" 
            },
            {   "id": "2_W_Nifty50","period": "15 Days","stkReturn": "3.76 %",
                "vsIndex": { "value": "1.16 %", "label": "NIFTY 50"},
                "relStr": "21.81 %" },
            {   "id": "1_M_NiftyNext50", "period": "10 Month", "stkReturn": "9 %",
                "vsIndex": { "value": "23.47 %", "label": "NIFTY NEXT 50" },
                "relStr": "15.05 %"
            }
        ],

        "columns": ["Period", "Stock Return", "Returns vs Index", "Relative Strength"]

    ``` 

