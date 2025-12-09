const colorsMobile = [
    {
        id: "Red",
        label: "Red",
        hex: "#f44336"
    },
    {
        id: "Pink",
        label: "Pink",
        hex: "#e91e63"
    },
    {
        id: "Purple",
        label: "Purple",
        hex: "#9c27b0"
    },
    {
        id: "Deep-Purple",
        label: "Deep Purple",
        hex: "#673ab7"
    },
    {
        id: "Indigo",
        label: "Indigo",
        hex: "#3f51b5"
    },
    {
        id: "Blue",
        label: "Blue",
        hex: "#2196f3"
    },
    {
        id: "Light-Blue",
        label: "Light Blue",
        hex: "#03a9f4"
    },
    {
        id: "Cyan",
        label: "Cyan",
        hex: "#00bcd4"
    },
    {
        id: "Teal",
        label: "Teal",
        hex: "#009688"
    },
    {
        id: "Green",
        label: "Green",
        hex: "#4caf50"
    },
    {
        id: "Light Green",
        label: "Light Green",
        hex: "#8bc34a"
    },
    {
        id: "Orange",
        label: "Orange",
        hex: "#ff9800"
    },
    {
        id: "Yellow",
        label: "Yellow",
        hex: "#ffeb3b"
    },
    {
        id: "Amber",
        label: "Amber",
        hex: "#ffc107"
    },
    {
        id: "Brown",
        label: "Brown",
        hex: "#795548"
    },
    {
        id: "Grey",
        label: "Grey",
        hex: "#9e9e9e"
    },
    {
        id: "Blue Grey",
        label: "Blue Grey",
        hex: "#607d8b"
    },
    {
        id: "White",
        label: "White",
        hex: "#ffffff"
    },
    {
        id: "Black",
        label: "Black",
        hex: "#000000"
    }
];


const colorsDesktop = [
    {
        id: "Red",
        label: "Red",
        shades: [
            {id: "red", label: "red", hex: "#f44336"},
            {id: "red-50", label: "red-50", hex: "#ffebee"},
            {id: "red-100", label: "red-100", hex: "#ffcdd2"},
            {id: "red-200", label: "red-200", hex: "#ef9a9a"},
            {id: "red-300", label: "red-300", hex: "#e57373"},
            {id: "red-400", label: "red-400", hex: "#ef5350"},
            {id: "red-500", label: "red-500", hex: "#f44336"},
            {id: "red-600", label: "red-600", hex: "#e53935"},
            {id: "red-700", label: "red-700", hex: "#d32f2f"},
            {id: "red-800", label: "red-800", hex: "#c62828"},
            {id: "red-900", label: "red-900", hex: "#b71c1c"}
        ]
    },
    {
        id: "Pink",
        label: "Pink",
        shades: [
            {id: "pink", label: "pink", hex: "#e91e63"},
            {id: "pink-50", label: "pink-50", hex: "#fce4ec"},
            {id: "pink-100", label: "pink-100", hex: "#f8bbd0"},
            {id: "pink-200", label: "pink-200", hex: "#f48fb1"},
            {id: "pink-300", label: "pink-300", hex: "#f06292"},
            {id: "pink-400", label: "pink-400", hex: "#ec407a"},
            {id: "pink-500", label: "pink-500", hex: "#e91e63"},
            {id: "pink-600", label: "pink-600", hex: "#d81b60"},
            {id: "pink-700", label: "pink-700", hex: "#c2185b"},
            {id: "pink-800", label: "pink-800", hex: "#ad1457"},
            {id: "pink-900", label: "pink-900", hex: "#880e4f"}
        ]
    },
    {
        id: "Purple",
        label: "Purple",
        shades: [
            {id: "purple", label: "purple", hex: "#9c27b0"},
            {id: "purple-50", label: "purple-50", hex: "#f3e5f5"},
            {id: "purple-100", label: "purple-100", hex: "#e1bee7"},
            {id: "purple-200", label: "purple-200", hex: "#ce93d8"},
            {id: "purple-300", label: "purple-300", hex: "#ba68c8"},
            {id: "purple-400", label: "purple-400", hex: "#ab47bc"},
            {id: "purple-500", label: "purple-500", hex: "#9c27b0"},
            {id: "purple-600", label: "purple-600", hex: "#8e24aa"},
            {id: "purple-700", label: "purple-700", hex: "#7b1fa2"},
            {id: "purple-800", label: "purple-800", hex: "#6a1b9a"},
            {id: "purple-900", label: "purple-900", hex: "#4a148c"}
        ]
    },
    {
        id: "Deep-Purple",
        label: "Deep Purple",
        shades: [
            {id: "deep-purple", label: "deep-purple", hex: "#673ab7"},
            {id: "deep-purple-50", label: "deep-purple-50", hex: "#ede7f6"},
            {id: "deep-purple-100", label: "deep-purple-100", hex: "#d1c4e9"},
            {id: "deep-purple-200", label: "deep-purple-200", hex: "#b39ddb"},
            {id: "deep-purple-300", label: "deep-purple-300", hex: "#9575cd"},
            {id: "deep-purple-400", label: "deep-purple-400", hex: "#7e57c2"},
            {id: "deep-purple-500", label: "deep-purple-500", hex: "#673ab7"},
            {id: "deep-purple-600", label: "deep-purple-600", hex: "#5e35b1"},
            {id: "deep-purple-700", label: "deep-purple-700", hex: "#512da8"},
            {id: "deep-purple-800", label: "deep-purple-800", hex: "#4527a0"},
            {id: "deep-purple-900", label: "deep-purple-900", hex: "#311b92"}
        ]
    },
    {
        id: "Indigo",
        label: "Indigo",
        shades: [
            {id: "indigo", label: "indigo", hex: "#3f51b5"},
            {id: "indigo-50", label: "indigo-50", hex: "#e8eaf6"},
            {id: "indigo-100", label: "indigo-100", hex: "#c5cae9"},
            {id: "indigo-200", label: "indigo-200", hex: "#9fa8da"},
            {id: "indigo-300", label: "indigo-300", hex: "#7986cb"},
            {id: "indigo-400", label: "indigo-400", hex: "#5c6bc0"},
            {id: "indigo-500", label: "indigo-500", hex: "#3f51b5"},
            {id: "indigo-600", label: "indigo-600", hex: "#3949ab"},
            {id: "indigo-700", label: "indigo-700", hex: "#303f9f"},
            {id: "indigo-800", label: "indigo-800", hex: "#283593"},
            {id: "indigo-900", label: "indigo-900", hex: "#1a237e"}
        ]
    },
    {
        id: "Blue",
        label: "Blue",
        shades: [
            {id: "blue", label: "blue", hex: "#2196f3"},
            {id: "blue-50", label: "blue-50", hex: "#e3f2fd"},
            {id: "blue-100", label: "blue-100", hex: "#bbdefb"},
            {id: "blue-200", label: "blue-200", hex: "#90caf9"},
            {id: "blue-300", label: "blue-300", hex: "#64b5f6"},
            {id: "blue-400", label: "blue-400", hex: "#42a5f5"},
            {id: "blue-500", label: "blue-500", hex: "#2196f3"},
            {id: "blue-600", label: "blue-600", hex: "#1e88e5"},
            {id: "blue-700", label: "blue-700", hex: "#1976d2"},
            {id: "blue-800", label: "blue-800", hex: "#1565c0"},
            {id: "blue-900", label: "blue-900", hex: "#0d47a1"}
        ]
    },
    {
        id: "Light-Blue",
        label: "Light Blue",
        shades: [
            {id: "light-blue", label: "light-blue", hex: "#03a9f4"},
            {id: "light-blue-50", label: "light-blue-50", hex: "#e1f5fe"},
            {id: "light-blue-100", label: "light-blue-100", hex: "#b3e5fc"},
            {id: "light-blue-200", label: "light-blue-200", hex: "#81d4fa"},
            {id: "light-blue-300", label: "light-blue-300", hex: "#4fc3f7"},
            {id: "light-blue-400", label: "light-blue-400", hex: "#29b6f6"},
            {id: "light-blue-500", label: "light-blue-500", hex: "#03a9f4"},
            {id: "light-blue-600", label: "light-blue-600", hex: "#039be5"},
            {id: "light-blue-700", label: "light-blue-700", hex: "#0288d1"},
            {id: "light-blue-800", label: "light-blue-800", hex: "#0277bd"},
            {id: "light-blue-900", label: "light-blue-900", hex: "#01579b"}
        ]
    },
    {
        id: "Cyan",
        label: "Cyan",
        shades: [
            {id: "cyan", label: "cyan", hex: "#00bcd4"},
            {id: "cyan-50", label: "cyan-50", hex: "#e0f7fa"},
            {id: "cyan-100", label: "cyan-100", hex: "#b2ebf2"},
            {id: "cyan-200", label: "cyan-200", hex: "#80deea"},
            {id: "cyan-300", label: "cyan-300", hex: "#4dd0e1"},
            {id: "cyan-400", label: "cyan-400", hex: "#26c6da"},
            {id: "cyan-500", label: "cyan-500", hex: "#00bcd4"},
            {id: "cyan-600", label: "cyan-600", hex: "#00acc1"},
            {id: "cyan-700", label: "cyan-700", hex: "#0097a7"},
            {id: "cyan-800", label: "cyan-800", hex: "#00838f"},
            {id: "cyan-900", label: "cyan-900", hex: "#006064"}
        ]
    },
    {
        id: "Teal",
        label: "Teal",
        shades: [
            {id: "teal", label: "teal", hex: "#009688"},
            {id: "teal-50", label: "teal-50", hex: "#e0f2f1"},
            {id: "teal-100", label: "teal-100", hex: "#b2dfdb"},
            {id: "teal-200", label: "teal-200", hex: "#80cbc4"},
            {id: "teal-300", label: "teal-300", hex: "#4db6ac"},
            {id: "teal-400", label: "teal-400", hex: "#26a69a"},
            {id: "teal-500", label: "teal-500", hex: "#009688"},
            {id: "teal-600", label: "teal-600", hex: "#00897b"},
            {id: "teal-700", label: "teal-700", hex: "#00796b"},
            {id: "teal-800", label: "teal-800", hex: "#00695c"},
            {id: "teal-900", label: "teal-900", hex: "#004d40"}
        ]
    },
    {
        id: "Green",
        label: "Green",
        shades: [
            {id: "green", label: "green", hex: "#4caf50"},
            {id: "green-50", label: "green-50", hex: "#e8f5e9"},
            {id: "green-100", label: "green-100", hex: "#c8e6c9"},
            {id: "green-200", label: "green-200", hex: "#a5d6a7"},
            {id: "green-300", label: "green-300", hex: "#81c784"},
            {id: "green-400", label: "green-400", hex: "#66bb6a"},
            {id: "green-500", label: "green-500", hex: "#4caf50"},
            {id: "green-600", label: "green-600", hex: "#43a047"},
            {id: "green-700", label: "green-700", hex: "#388e3c"},
            {id: "green-800", label: "green-800", hex: "#2c6e2f"},
            {id: "green-900", label: "green-900", hex: "#1b5e20"}
        ]
    },
    {
        id: "Light Green",
        label: "Light Green",
        shades: [
            {id: "light-green", label: "light-green", hex: "#8bc34a"},
            {id: "light-green-50", label: "light-green-50", hex: "#f1f8e9"},
            {id: "light-green-100", label: "light-green-100", hex: "#dcedc8"},
            {id: "light-green-200", label: "light-green-200", hex: "#c5e1a5"},
            {id: "light-green-300", label: "light-green-300", hex: "#aed581"},
            {id: "light-green-400", label: "light-green-400", hex: "#9ccc65"},
            {id: "light-green-500", label: "light-green-500", hex: "#8bc34a"},
            {id: "light-green-600", label: "light-green-600", hex: "#7cb342"},
            {id: "light-green-700", label: "light-green-700", hex: "#689f38"},
            {id: "light-green-800", label: "light-green-800", hex: "#558b2f"},
            {id: "light-green-900", label: "light-green-900", hex: "#33691e"}
        ]
    },
    {
        id: "Orange",
        label: "Orange",
        shades: [
            {id: "orange", label: "orange", hex: "#ff9800"},
            {id: "orange-50", label: "orange-50", hex: "#fff3e0"},
            {id: "orange-100", label: "orange-100", hex: "#ffe0b2"},
            {id: "orange-200", label: "orange-200", hex: "#ffcc80"},
            {id: "orange-300", label: "orange-300", hex: "#ffb74d"},
            {id: "orange-400", label: "orange-400", hex: "#ff9800"},
            {id: "orange-500", label: "orange-500", hex: "#fb8c00"},
            {id: "orange-600", label: "orange-600", hex: "#f57c00"},
            {id: "orange-700", label: "orange-700", hex: "#ef6c00"},
            {id: "orange-800", label: "orange-800", hex: "#e65100"},
            {id: "orange-900", label: "orange-900", hex: "#bf360c"}
        ]
    },
    {
        id: "Yellow",
        label: "Yellow",
        shades: [
            {id: "yellow", label: "yellow", hex: "#ffeb3b"},
            {id: "yellow-50", label: "yellow-50", hex: "#fff9c4"},
            {id: "yellow-100", label: "yellow-100", hex: "#fff59d"},
            {id: "yellow-200", label: "yellow-200", hex: "#fff176"},
            {id: "yellow-300", label: "yellow-300", hex: "#ffee58"},
            {id: "yellow-400", label: "yellow-400", hex: "#fdd835"},
            {id: "yellow-500", label: "yellow-500", hex: "#ffeb3b"},
            {id: "yellow-600", label: "yellow-600", hex: "#fbc02d"},
            {id: "yellow-700", label: "yellow-700", hex: "#f9a825"},
            {id: "yellow-800", label: "yellow-800", hex: "#f57f17"},
            {id: "yellow-900", label: "yellow-900", hex: "#c65100"}
        ]
    },
    {
        id: "Amber",
        label: "Amber",
        shades: [
            {id: "amber", label: "amber", hex: "#ffc107"},
            {id: "amber-50", label: "amber-50", hex: "#ffecb3"},
            {id: "amber-100", label: "amber-100", hex: "#ffe082"},
            {id: "amber-200", label: "amber-200", hex: "#ffd54f"},
            {id: "amber-300", label: "amber-300", hex: "#ffca28"},
            {id: "amber-400", label: "amber-400", hex: "#ffc107"},
            {id: "amber-500", label: "amber-500", hex: "#ffb300"},
            {id: "amber-600", label: "amber-600", hex: "#ff8f00"},
            {id: "amber-700", label: "amber-700", hex: "#ff6f00"},
            {id: "amber-800", label: "amber-800", hex: "#ff4f00"},
            {id: "amber-900", label: "amber-900", hex: "#e65100"}
        ]
    },
    {
        id: "Brown",
        label: "Brown",
        shades: [
            {id: "brown", label: "brown", hex: "#795548"},
            {id: "brown-50", label: "brown-50", hex: "#efebe9"},
            {id: "brown-100", label: "brown-100", hex: "#d7ccc8"},
            {id: "brown-200", label: "brown-200", hex: "#bcaaa4"},
            {id: "brown-300", label: "brown-300", hex: "#a1887f"},
            {id: "brown-400", label: "brown-400", hex: "#8d6e63"},
            {id: "brown-500", label: "brown-500", hex: "#795548"},
            {id: "brown-600", label: "brown-600", hex: "#6d4f39"},
            {id: "brown-700", label: "brown-700", hex: "#5d4037"},
            {id: "brown-800", label: "brown-800", hex: "#4e342e"},
            {id: "brown-900", label: "brown-900", hex: "#3e2723"}
        ]
    },
    {
        id: "Grey",
        label: "Grey",
        shades: [
            {id: "grey", label: "grey", hex: "#9e9e9e"},
            {id: "grey-50", label: "grey-50", hex: "#fafafa"},
            {id: "grey-100", label: "grey-100", hex: "#f5f5f5"},
            {id: "grey-200", label: "grey-200", hex: "#eeeeee"},
            {id: "grey-300", label: "grey-300", hex: "#e0e0e0"},
            {id: "grey-400", label: "grey-400", hex: "#bdbdbd"},
            {id: "grey-500", label: "grey-500", hex: "#9e9e9e"},
            {id: "grey-600", label: "grey-600", hex: "#757575"},
            {id: "grey-700", label: "grey-700", hex: "#616161"},
            {id: "grey-800", label: "grey-800", hex: "#424242"},
            {id: "grey-900", label: "grey-900", hex: "#212121"}
        ]
    },
    {
        id: "Blue Grey",
        label: "Blue Grey",
        shades: [
            {id: "blue-grey", label: "blue-grey", hex: "#607d8b"},
            {id: "blue-grey-50", label: "blue-grey-50", hex: "#eceff1"},
            {id: "blue-grey-100", label: "blue-grey-100", hex: "#cfd8dc"},
            {id: "blue-grey-200", label: "blue-grey-200", hex: "#b0bec5"},
            {id: "blue-grey-300", label: "blue-grey-300", hex: "#90a4ae"},
            {id: "blue-grey-400", label: "blue-grey-400", hex: "#78909c"},
            {id: "blue-grey-500", label: "blue-grey-500", hex: "#607d8b"},
            {id: "blue-grey-600", label: "blue-grey-600", hex: "#546e7a"},
            {id: "blue-grey-700", label: "blue-grey-700", hex: "#455a64"},
            {id: "blue-grey-800", label: "blue-grey-800", hex: "#37474f"},
            {id: "blue-grey-900", label: "blue-grey-900", hex: "#263238"}
        ]
    }
]

