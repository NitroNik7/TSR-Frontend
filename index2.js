let data = [
    {
        code: "AAATECH",
        name: "AAA Technologies Ltd.",
        industry: "COMPUTERS - SOFTWARE - INDIA",
    }, {
        code: "AADHARHFC",
        name: "Aadhar Housing Finance Ltd.",
        industry: "FINANCE - HOUSING - INDIA",
    }, {
        code: "AADHARHFC",
        name: "Aadhar Housing Finance Ltd.",
        industry: "FINANCE - HOUSING - INDIA",
    }, {
        code: "AADHARHFC",
        name: "Aadhar Housing Finance Ltd.",
        industry: "FINANCE - HOUSING - INDIA",
    }, {
        code: "AADITYA",
        name: "Aaditya Healthcare Ltd.",
        industry: "Hospitals & Medical Services - INDIA",
    },{
        code: "AARVEEDEN",
        name: "Aarvee Denim and Exports",
        industry: "TEXTILE PRODUCTS - INDIA",
    }, {
        code: "AARVI",
        name: "Aarvi Encon Ltd.",
        industry: "DIVERSIFIED - INDIA",
    }, {
        code: "AATMAJ",
        name: "Aat maj Healthcare Ltd.",
        industry: "Hospitals & Medical Services - INDIA",
    }, {
        code: "AAVAS",
        name: "Aavas Financiers Ltd.",
        industry: "FINANCE - HOUSING - INDIA",
    }, {
        code: "ACUTAAS",
        name: "Acutaas Chemicals Limited",
        industry: "PHARMACEUTICALS - INDIA",
    }, {
        code: "ATLANTAA",
        name: "Atlantaa Ltd.",
        industry: "CONSTRUCTION - INDIA",
    }, {
        code: "AXISBPSETF",
        name: "AXIS MUTUAL FUND - Axis Nifty AAA Bond Plus SDL Apr 2026 50-50 ETF",
        industry: "FINANCE - INDIA",
    } , {
        code: "CEDAAR",
        name: "Cedaar Textile Limited",
        industry: "TEXTILES - COTTON - INDIA",
    }, {
        code: "DIAMONDYD",
        name: "Prataap Snacks Ltd.",
        industry: "FOOD AND FOOD PROCESSING - INDIA",
    }, {
        code: "IMAGICAA",
        name: "Imagicaaworld Entertainment Ltd.",
        industry: "MEDIA & ENTERTAINMENT - INDIA",
    }
];

    
// let data = [
//     "AAKAAR - Aakaar Medical Technologies Limited - Hospitals & Medical Services - INDIA",
//     "AAKASH - Aakash Exploration Services Ltd. - ENGINEERING - INDIA",
//     "AARADHYA - Aaradhya Disposal Industries Limited - PAPER AND PAPER PRODUCTS - INDIA",
//     "AAREYDRUGS - Aarey Drugs & Pharmaceuticals Ltd. - PHARMACEUTICALS - INDIA",
//     "AARON - Aaron Industries Ltd. - MISCELLANEOUS - INDIA",
//     "AARTECH - Aartech Solonics Ltd. - ELECTRICAL EQUIPMENT - INDIA",
//     "AARTIDRUGS - Aarti Drugs - PHARMACEUTICALS - INDIA",
//     "AARTIIND   - Aarti Industries Ltd. - CHEMICALS - ORGANIC - INDIA",
//     "AARTIPHARM - Aarti Pharmalabs Ltd. - PHARMACEUTICALS - INDIA",
//     "AARTISURF - Aarti Surfactants Ltd. - CHEMICALS - SPECIALITY - INDIA",
//     "AARVEEDEN - Aarvee Denim and Exports - TEXTILE PRODUCTS - INDIA",
//     "AARVI - Aarvi Encon Ltd. - DIVERSIFIED - INDIA",
//     "AATMAJ - Aat       maj Healthcare Ltd. - Hospitals & Medical Services - INDIA",
//     "AAVAS - Aavas Financiers Ltd. - FINANCE - HOUSING - INDIA",
//     "ACUTAAS - Acutaas Chemicals Limited - PHARMACEUTICALS - INDIA",
//     "ATLANTAA - Atlantaa Ltd. - CONSTRUCTION - INDIA",
//     "AXISBPSETF - AXIS MUTUAL FUND - Axis Nifty AAA Bond    Plus SDL Apr 2026 50-50 ETF - FINANCE - INDIA",
//     "CEDAAR - Cedaar Textile Limited - TEXTILES - COTTON - INDIA",
//     "DIAMONDYD - Prataap Snacks Ltd. - FOOD AND FOOD PROCESSING - INDIA",
//     "IMAGICAA - Imagicaaworld Entertainment Ltd. - MEDIA & ENTERTAINMENT - INDIA",
//     "JHS - JHS Svendgaard Laboratories Ltd. - PERSONAL CARE - INDIA",
//     "KRSNAA - Krsnaa Diagnostics Ltd. - Hospitals & Medical Services - INDIA",
//     "KTL - Kalahridhaan Trendz Ltd. - TEXTILE PRODUCTS - INDIA",
//     "MAANALU - Maan Aluminium - ALUMINIUM   - INDIA",
//     "RADAAN - Radaan Mediaworks India - MEDIA & ENTERTAINMENT - INDIA",
//     "REGAAL - Regaal Resources Limited - MISCELLANEOUS - INDIA",
//     "RETAIL - JHS Svendgaard Retail Ventures Ltd. - RETAIL - INDIA",
//     "SAAKSHI - Saakshi Medtech & Panels Ltd. - DIVERSIFIED - INDIA",
//     "SAMBHAAV - Sambhaav Media - PRINTING AND PUBLISHING - INDIA",
//     "SAMMAANCAP - Sammaan Capital Ltd. -    FINANCE - HOUSING - INDIA",
//     "SNEHAA - Snehaa Organics Limited - TRADING - INDIA",
//     "STYLEBAAZA - Baazar Style Retail Ltd. - RETAIL - INDIA",
//     "SUVIDHAA - Suvidhaa Infoserve Ltd. - FINANCE - INDIA",
//     "TCL - Thaai Casting Ltd. - AUTO ANCILLARIES - INDIA",
//     "UEL - Ujaas Energy Ltd. - ELECTRICAL EQUIPMENT - INDIA",
//     "VERITAAS - Veritaas Advertising Ltd. - MISCELLANEOUS - INDIA",
//     "WAAREEENER - Waaree Energies Limited - ENGINEERING - INDIA",
//     "WAAREERTL - Waaree Renewable Technologies Limited - POWER - INDIA",
//     "YAARI - Yaari Digital Integrated Services Ltd. - TRADING - INDIA",
// ];

function filterStocks(query) {
    let stockList = data.filter((item) => item.toLowerCase().includes(query.toLowerCase()));

    let list = document.getElementById('tsrStockList');
    list.innerHTML = ''; // Clear previous results

    stockList.forEach(element => {
        let li = document.createElement('li');

        let div = document.createElement('div');
        div.classList.add('d-flex', 'justify-content-between');

        let span1 = document.createElement('span');
        span1.textContent = element.code;

        let span2 = document.createElement('span');
        span2.textContent = element.name;

        let span3 = document.createElement('span');
        span3.textContent = element.industry;

        div.appendChild(span1);
        div.appendChild(span2);
        div.appendChild(span3);

        li.appendChild(div);
        
        list.appendChild(li);
    });

}
