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

    // personal: {
    //     email: 'abc@bcd',
    //     First: 'myName',
    //     Tel: '1234567',
    //     state: 'MH',
    //     postalcode: 'pc'
    // },
    personal: null,
    plan: {
        id: 5,
        name: "Trader Pro",
        startDate: "31 May, 2025",   // 'dd_MMM_YY'
        expDate: "31 May, 2026", // 'dd_MMM_YY'
        daysRemaining: "24",
        status: "ACTIVE",
        alert: [
            {
                type: "email",
                triggered: 50,
                balance: 50,
            },
            {
                type: "sms",
                triggered: 50,
                balance: 50,
            },
            {
                type: "whatsapp",
                triggered: 50,
                balance: 50,
            },
        ]
    }


}

var planDetails = [
    // {
    //     planId: 1,
    //     planName: "Basic", 
    //     planTypes: [
    //         {
    //             period: "monthly",
    //             originalPrice: null,
    //             discount: null,
    //             price: 0,
    //             effPricePerMonth: null,
    //         },
    //         {
    //             period: "yearly",
    //             originalPrice: null,
    //             discount: null,
    //             price: 0,
    //             effPricePerMonth: null,
    //         },
    //         {
    //             period: "twoYearly",
    //             originalPrice: null,
    //             discount: null,
    //             price: 0,
    //             effPricePerMonth: null,
    //         },
    //         {
    //             period: "fiveYearly",
    //             originalPrice: null,
    //             discount: null,
    //             price: 0,
    //             effPricePerMonth: null,
    //         },
    //     ]
    // },
    {
        planId: 1,
        planName: "EOD Combo",
        planFeatured: false,
        planTypes: [
            {
                period: "monthly",
                originalPrice: 100,
                discount: null,
                price: 100,
                effPricePerMonth: null,
            },
            {
                period: "yearly",
                originalPrice: 2360,
                discount: 20,
                price: 1888,
                effPricePerMonth: 157,
            },
            {
                period: "twoYearly",
                originalPrice: 4720,
                discount: 35,
                price: 3068,
                effPricePerMonth: 128,
            },
            {
                period: "fiveYearly",
                originalPrice: 11800,
                discount: 45,
                price: 6490,
                effPricePerMonth: 108,
            },
        ]
    },
    {
        planId: 2,
        planName: "Trader Value",
        planFeatured: false,
        planTypes: [
            {
                period: "monthly",
                originalPrice: 100,
                discount: null,
                price: 100,
                effPricePerMonth: null,
            },
            {
                period: "yearly",
                originalPrice: 2360,
                discount: 20,
                price: 1888,
                effPricePerMonth: 157,
            },
            {
                period: "twoYearly",
                originalPrice: 4720,
                discount: 35,
                price: 3068,
                effPricePerMonth: 128,
            },
            {
                period: "fiveYearly",
                originalPrice: 11800,
                discount: 45,
                price: 6490,
                effPricePerMonth: 108,
            },
        ]
    },
    {
        planId: 3,
        planName: "Trader",
        planFeatured: false,
        planTypes: [
            {
                period: "monthly",
                originalPrice: 100,
                discount: null,
                price: 100,
                effPricePerMonth: null,
            },
            {
                period: "yearly",
                originalPrice: 2360,
                discount: 20,
                price: 1888,
                effPricePerMonth: 157,
            },
            {
                period: "twoYearly",
                originalPrice: 4720,
                discount: 35,
                price: 3068,
                effPricePerMonth: 128,
            },
            {
                period: "fiveYearly",
                originalPrice: 11800,
                discount: 45,
                price: 6490,
                effPricePerMonth: 108,
            },
        ]
    },
    {
        planId: 4,
        planName: "Trader Pro",
        planFeatured: true,
        planTypes: [
            {
                period: "monthly",
                originalPrice: 590,
                discount: null,
                price: 590,
                effPricePerMonth: null,
            },
            {
                period: "yearly",
                originalPrice: 7080,
                discount: 30,
                price: 4956,
                effPricePerMonth: 413,
            },
            {
                period: "twoYearly",
                originalPrice: 14160,
                discount: 40,
                price: 8496,
                effPricePerMonth: 354,
            },
            {
                period: "fiveYearly",
                originalPrice: 35400,
                discount: 50,
                price: 17700,
                effPricePerMonth: 290,
            },
        ]
    }
];
