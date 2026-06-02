// var userProf = {
//     isLoggedIn: true,

//     // if below details are null, user will be required to enter them when buying plan
//     // please add any other field if req.
//     mobNo: "+91 9999999999", // mobNo: null - if user is !loggedIn or has not set mobNo
//     state: "Maharashtra",  // state: null - if user is !loggedIn or has not set mobNo

//     plan: { // plan: null - if user has is  !loggedIn or has not subscribed to any plan

//         // PLAN ID
//         planId: 4,
//         // EOD COMBO - 1, TRADER VALUE - 2, TRADER - 3, TRADER PRO - 4
//         // if id == null || id < 1 , -- show buy option
//         // if id >= 1 && id < 4 -- show upgrade & renew option
//         // if id == 4, -- show renew option

//         name: "Trader Pro",
//         expDate: "31 May, 2026",
//         daysRemaining: "24",
//         status: "ACTIVE",
//         alert: [
//             {
//                 type: "email",
//                 triggered: 50,
//                 balance: 50,
//             },
//             {
//                 type: "sms",
//                 triggered: 50,
//                 balance: 50,
//             },
//             {
//                 type: "whatsapp",
//                 triggered: 50,
//                 balance: 50,
//             },
//         ]
//     }
// }

var planStatus = {
    "plan": "TRADER_PRO",
    "daysRemain": 670,
    "valueRemain": 11014,
    "endDate": "12 Mar,2028",
    "emailTrig": 1,
    "emailPending": 810,
    "smsTrig": 6,
    "smsPending": 408,
    "waTrig": 7,
    "waPending": 193
}

var planDetails = [
    {
        "id": "EOD_COMBO",
        "name": "EOD Combo",
        "fit": "Suitable for  EOD pros, Investors & Part Timers",
        "period": [
            {
                "period": "1 Mth",
                "id": "1M",
                "orig": 2000,
                "buyPrice": 196.66666666666666,
                "perMth": 196.66666666666666
            },
            {
                "period": "1 Year",
                "id": "1Y",
                "orig": 2000,
                "off": 35,
                "buyPrice": 1534,
                "perMth": 127.83333333333333
            },
            {
                "period": "2 Years",
                "id": "2Y",
                "orig": 2000,
                "off": 45,
                "buyPrice": 2596,
                "perMth": 108.16666666666667
            },
            {
                "period": "5 Years",
                "id": "5Y",
                "orig": 2000,
                "off": 55,
                "buyPrice": 5309.999999999999,
                "perMth": 88.49999999999999
            }
        ]
    },
    {
        "id": "TRADER_VALUE",
        "name": "Trader Value",
        "fit": "Suitable for Beginers with Investor & Basic Trading options",
        "period": [
            {
                "period": "1 Mth",
                "id": "1M",
                "orig": 2000,
                "buyPrice": 196.66666666666666,
                "perMth": 196.66666666666666
            },
            {
                "period": "1 Year",
                "id": "1Y",
                "orig": 2000,
                "off": 35,
                "buyPrice": 1534,
                "perMth": 127.83333333333333
            },
            {
                "period": "2 Years",
                "id": "2Y",
                "orig": 2000,
                "off": 45,
                "buyPrice": 2596,
                "perMth": 108.16666666666667
            },
            {
                "period": "5 Years",
                "id": "5Y",
                "orig": 2000,
                "off": 55,
                "buyPrice": 5309.999999999999,
                "perMth": 88.49999999999999
            }
        ]
    },
    {
        "id": "TRADER",
        "name": "Trader",
        "fit": "Suitable for - Traders with more Intraday Options",
        "period": [
            {
                "period": "1 Mth",
                "id": "1M",
                "orig": 3300,
                "buyPrice": 324.5,
                "perMth": 324.5
            },
            {
                "period": "1 Year",
                "id": "1Y",
                "orig": 3300,
                "off": 25,
                "buyPrice": 2920.5,
                "perMth": 243.375
            },
            {
                "period": "2 Years",
                "id": "2Y",
                "orig": 3300,
                "off": 35,
                "buyPrice": 5062.2,
                "perMth": 210.92499999999998
            },
            {
                "period": "5 Years",
                "id": "5Y",
                "orig": 3300,
                "off": 50,
                "buyPrice": 9735,
                "perMth": 162.25
            }
        ]
    },
    {
        "id": "TRADER_PRO",
        "name": "Trader Pro",
        "pop": true,
        "fit": "For Pros - Utlimate flexibiliy and pre build strategies",
        "period": [
            {
                "period": "1 Mth",
                "id": "1M",
                "orig": 6000,
                "buyPrice": 590,
                "perMth": 590
            },
            {
                "period": "1 Year",
                "id": "1Y",
                "orig": 6000,
                "off": 35,
                "buyPrice": 4602,
                "perMth": 383.5
            },
            {
                "period": "2 Years",
                "id": "2Y",
                "orig": 6000,
                "off": 51,
                "buyPrice": 6938.4,
                "perMth": 289.09999999999997
            },
            {
                "period": "5 Years",
                "id": "5Y",
                "orig": 6000,
                "off": 60,
                "buyPrice": 14160,
                "perMth": 236
            }
        ]
    }
]

// var planDetails = [
//     // {
//     //     planId: 1,
//     //     planName: "Basic", 
//     //     planTypes: [
//     //         {
//     //             period: "monthly",
//     //             originalPrice: null,
//     //             discount: null,
//     //             price: 0,
//     //             effPricePerMonth: null,
//     //         },
//     //         {
//     //             period: "yearly",
//     //             originalPrice: null,
//     //             discount: null,
//     //             price: 0,
//     //             effPricePerMonth: null,
//     //         },
//     //         {
//     //             period: "twoYearly",
//     //             originalPrice: null,
//     //             discount: null,
//     //             price: 0,
//     //             effPricePerMonth: null,
//     //         },
//     //         {
//     //             period: "fiveYearly",
//     //             originalPrice: null,
//     //             discount: null,
//     //             price: 0,
//     //             effPricePerMonth: null,
//     //         },
//     //     ]
//     // },
//     {
//         planId: 1,
//         planName: "EOD Combo",
//         planFeatured: false,
//         planTypes: [
//             {
//                 period: "monthly",
//                 originalPrice: null,
//                 discount: null,
//                 price: 100,
//                 effPricePerMonth: null,
//             },
//             {
//                 period: "yearly",
//                 originalPrice: 2360,
//                 discount: 20,
//                 price: 1888,
//                 effPricePerMonth: 157,
//             },
//             {
//                 period: "twoYearly",
//                 originalPrice: 4720,
//                 discount: 35,
//                 price: 3068,
//                 effPricePerMonth: 128,
//             },
//             {
//                 period: "fiveYearly",
//                 originalPrice: 11800,
//                 discount: 45,
//                 price: 6490,
//                 effPricePerMonth: 108,
//             },
//         ]
//     },
//     {
//         planId: 2,
//         planName: "Trader Value",
//         planFeatured: false,
//         planTypes: [
//             {
//                 period: "monthly",
//                 originalPrice: null,
//                 discount: null,
//                 price: 100,
//                 effPricePerMonth: null,
//             },
//             {
//                 period: "yearly",
//                 originalPrice: 2360,
//                 discount: 20,
//                 price: 1888,
//                 effPricePerMonth: 157,
//             },
//             {
//                 period: "twoYearly",
//                 originalPrice: 4720,
//                 discount: 35,
//                 price: 3068,
//                 effPricePerMonth: 128,
//             },
//             {
//                 period: "fiveYearly",
//                 originalPrice: 11800,
//                 discount: 45,
//                 price: 6490,
//                 effPricePerMonth: 108,
//             },
//         ]
//     },
//     {
//         planId: 3,
//         planName: "Trader",
//         planFeatured: false,
//         planTypes: [
//             {
//                 period: "monthly",
//                 originalPrice: null,
//                 discount: null,
//                 price: 100,
//                 effPricePerMonth: null,
//             },
//             {
//                 period: "yearly",
//                 originalPrice: 2360,
//                 discount: 20,
//                 price: 1888,
//                 effPricePerMonth: 157,
//             },
//             {
//                 period: "twoYearly",
//                 originalPrice: 4720,
//                 discount: 35,
//                 price: 3068,
//                 effPricePerMonth: 128,
//             },
//             {
//                 period: "fiveYearly",
//                 originalPrice: 11800,
//                 discount: 45,
//                 price: 6490,
//                 effPricePerMonth: 108,
//             },
//         ]
//     },
//     {
//         planId: 4,
//         planName: "Trader Pro",
//         planFeatured: true,
//         planTypes: [
//             {
//                 period: "monthly",
//                 originalPrice: null,
//                 discount: null,
//                 price: 590,
//                 effPricePerMonth: null,
//             },
//             {
//                 period: "yearly",
//                 originalPrice: 7080,
//                 discount: 30,
//                 price: 4956,
//                 effPricePerMonth: 413,
//             },
//             {
//                 period: "twoYearly",
//                 originalPrice: 14160,
//                 discount: 40,
//                 price: 8496,
//                 effPricePerMonth: 354,
//             },
//             {
//                 period: "fiveYearly",
//                 originalPrice: 35400,
//                 discount: 50,
//                 price: 17700,
//                 effPricePerMonth: 290,
//             },
//         ]
//     }
// ];
