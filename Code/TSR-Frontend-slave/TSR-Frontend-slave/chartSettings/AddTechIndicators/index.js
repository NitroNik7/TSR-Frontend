let notes = [
    {
        id: 1,
        title: "ZLEMA",
        message: "Great indicator which shows market trends earlier than sma/ema",
        date: new Date()
    },
    {
        id: 2,
        title: "CMO",
        message: "Easy to understand indicator",
        date: new Date()
    },
    {
        id: 3,
        title: "PPO",
        message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, nulla.",
        date: new Date()
    },
    {
        id: 4,
        title: "ZLEMA",
        message: "Great indicator which shows market trends earlier than sma/ema",
        date: new Date()
    },
    {
        id: 5,
        title: "CMO",
        message: "Easy to understand indicator",
        date: new Date()
    },
    {
        id: 6,
        title: "PPO",
        message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, nulla.",
        date: new Date()
    }
];

const showNotesList = function showNotesList() {
    if ($("#notesListDiv").length) {
        $("#notesListDiv").remove();
        $("#createNewNote").remove();
    }
    else {
        $("#notes").append("<div id='notesListDiv'></div>");
        $("#notesListDiv").append("<ul id='notesList'></ul>");
        $("#notesList").append(`<li id='addNewNote'>
                <div class="newNoteDiv">
                <button id="addNoteBtn" onclick="addNewNote(0, '')" style="padding: 10px" class="add_note_btn">New Note...<i class="fa-solid fa-plus"></i></button>
                </div>
            </li>`);

            // Sort notes in desc order when retrieving
        for (let i = notes.length-1; i >= 0 ; i--) {
            $("#notesList").append(`<li class='existingNoteDiv'>
            <div class="noteDetails" style="width: 200px">
                <b style="white-space: nowrap; text-overflow: ellipsis">` + notes[i].title + `</b>
                <p style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: 3px">` + notes[i].message + `</p>  
            </div>
            <button id="editNoteBtn" class="editNoteBtn" onclick='addNewNote(1, `
            + JSON.stringify({ id: notes[i].id, title: notes[i].title, message: notes[i].message}) +
            `)'  style="height: 60%" ><i class="fa-solid fa-pencil"></i></button>
            </li>`);
        }
    }

    $("#notesListDiv").css({ "transition": "height 0.3s ease" });
    $("#notesListDiv").css({
        "background-color": "white",
        "position": "fixed",
        "z-index": 1,
        "margin": "10px",
        "height": "400px",
        // "max-height": "fit-content",
        "max-width": "fit-content",
        // "width" : "300px",
        "border": "1px solid",
        "border-radius": "5px",
        "padding": "10px",
        "overflow": "auto"
    });

    $("#notesList").css({
        "margin": "0",
        "padding-start": "auto"
    });

    // $("#addNewNote").css({"display":"flex", "justify-content" : "center"});
    $("#notesList > *").css({
        "display": "flex",
        // "justify-content" : "center",
        "padding": "10px"
    });
}

$("#notesDropdown").on("click", showNotesList);

const addNewNote = function addNewNote(edit, noteDetails) {
    if (edit === 0) {  // When new note is to be added
        $(document.body).append(`
            <div id="createNewNote">
            <button id="closeNewNoteFormBtn"  onclick="closeNewNoteForm()" ><i class="fa-solid fa-xmark"></i></button>
                <form id="newNoteForm" class="new_note_form">
            <label for="title">Title</label>
            <input type="text" name="title" id="title" placeholder="Add a title" required>
            <br>
            <label for="message">Message</label>
            <input type="text" name="message" id="message" placeholder="Add a message" required>
            <br>
            <label for="tag">Tags</label>
            <input type="text" name="tags" id="tag" placeholder="Add tags">
            <br>
            <button id="submitNewNoteBtn" onclick='submitNewNote(0, ` + JSON.stringify({
                "title": $(".new_note_form #title").val(),
                "message": $(".new_note_form #message").val(),
            }) + `)'>
                Create
            </button>
        </form> 
        </div>
        `);
        // console.log($(".new_note_form #title").val(), $(".new_note_form #message").val())
    }
    else { // When note is to be edited

        const submitNewNoteHandler= function submitNewNoteHandler() {
            const noteData = {
                id: noteDetails.id,
                title: $("#title").val(),
                message: $("#message").val(),
                tag: $("#tag").val()
            };
            submitNewNote(1, noteData);
        }


        $(document.body).append(`
            <div id="createNewNote">
            <button id="closeNewNoteFormBtn"  onclick="closeNewNoteForm()"><i class="fa-solid fa-xmark"></i></button>
                <form id="newNoteForm" class="new_note_form" onsubmit='return false;'>
            <label for="title">Title</label>
            <input type="text" name="title" id="title" value="`+ noteDetails.title + `">
            <br>
            <label for="message">Message</label>
            <input type="text" name="message" id="message" value="`+ noteDetails.message + `">
            <br>
            <label for="tag">Tags</label>
            <input type="text" name="tags" id="tag" value="`+ noteDetails.tag + `">
            <br>
            <button id="submitNewNoteBtn" >
                Edit
            </button>
        </form> 
        </div>
        `);

        $("#submitNewNoteBtn").on("click", submitNewNoteHandler);



    }
    // $("#notesListDiv").remove();
    // console.log("hello world");
    // if ($("#createNewNote").length)
    //     $("#createNewNote").remove();


    $("body>*:not(#createNewNote)").css({
        "opacity": "0"
    });
    $("#createNewNote").css({
        "background-color": "white",
        "position": "sticky",
        // "height": "70%",
        "padding": "50px",
        "max-height": "fit-content",
        "max-width": "fit-content",
        "margin-right": "auto",
        "margin-left": "auto",
        "z-index": "1",
        "border": "1px solid",
        "border-radius": "5px",
        "display": "flex",
        "align-items": "center",
        "justify-content": "center"
    });
    $("#newNoteForm").css({ "display": "flex", "flex-direction": "column" });
    $("#newNoteForm>label").css({
        "font-size": "larger",
        "font-weight": "600",
        "margin-bottom": "3px"

    });
    $("#newNoteForm>#title").css({
        "height": "20px",
        "width": "300px"
    });
    $("#newNoteForm>#message").css({

        "height": "200px",
        "width": "300px",
        "text-wrap": "wrap",
        "overflow-x": "none"
    });
    $("#newNoteForm>#tag").css({

        "height": "20px",
        "width": "300px",

    });
    $("#closeNewNoteFormBtn").css({
        "position": "absolute",
        "right": "10%",
        "top": "5%"
    })
}

// $("#addNoteBtn").on("click", addNewNote);

const closeNewNoteForm = function closeNewNoteForm() {

    $("#createNewNote").remove();
    $("body>*").css({
        "opacity": "1"
    })



    // return false;
}

const submitNewNote = function submitNewNote(edit, noteDetails) {
    // console.log(noteDetails);
    if (edit ===0) {
        notes.push({
            // Need to push id as well, SQL auto increment will take care of it
            id: 7,
            title: $(".new_note_form #title").val(),
            message: $(".new_note_form #message").val()
        })

        closeNewNoteForm();
        // return false;
    }
    else {
                notes[noteDetails.id - 1].title = noteDetails.title;
                notes[noteDetails.id - 1].message = noteDetails.message;
                // notes[noteDetails.id].text = noteDetails.title;

                closeNewNoteForm();
            // }
        
    }
    showNotesList();
}

const addIndicatorsButton = document.getElementById('addIndicatorsButton');
const searchSelectIndicator = document.querySelector('.search_select_indicator');
const selectElement = document.getElementById('indicatorList');
const resetFilterButton = document.getElementById('resetFilter');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchIndicatorInput = document.getElementById('searchIndicator'); // Capture search input field

const indicators = [
    { id: 1, name: "ADI" },
    { id: 2, name: "ADX" },
    { id: 3, name: "Aroon" },
    { id: 4, name: "AroonOsc" },
    { id: 5, name: "ATR" },
    { id: 6, name: "ATR Band" },
    { id: 7, name: "Awe Osc" },
    { id: 8, name: "Bollinger" },
    { id: 9, name: "BOP" },
    { id: 10, name: "CMF" },
    { id: 11, name: "CCI" },
    { id: 12, name: "Chandelier" },
    { id: 13, name: "Choppiness" },
    { id: 14, name: "Coppock" },
    { id: 15, name: "CMO" },
    { id: 16, name: "DPO" },
    { id: 17, name: "Donchian" },
    { id: 18, name: "ElderRay" },
    { id: 19, name: "EFI" },
    { id: 20, name: "EOM" },
    { id: 21, name: "HL Bands" },
    { id: 22, name: "HL MA Bands" },
    { id: 23, name: "Ichimoku" },
    { id: 24, name: "Keltner" },
    { id: 25, name: "KST" },
    { id: 26, name: "MACD" },
    { id: 27, name: "MA Channel" },
    { id: 28, name: "MA Envelope" },
    { id: 29, name: "Mass Idx" },
    { id: 30, name: "MFI" },
    { id: 31, name: "Momentum" },
    { id: 32, name: "OBV" },
    { id: 33, name: "PGO" },
    { id: 34, name: "P SAR" },
    { id: 35, name: "PVT" },
    { id: 36, name: "PVO" },
    { id: 37, name: "PPO" },
    { id: 38, name: "PMO" },
    { id: 39, name: "ROC" },
    { id: 40, name: "RSI" },
    { id: 41, name: "RSI (fast)" },
    { id: 42, name: "Rel Vigor Idx" },
    { id: 43, name: "Sto (Fast)" },
    { id: 44, name: "Sto (Slow)" },
    { id: 45, name: "Sto RSI" },
    { id: 46, name: "Sto RSI (Fast)" },
    { id: 47, name: "Std Dev" },
    { id: 48, name: "Supertrend" },
    { id: 49, name: "TSI" },
    { id: 50, name: "TWAP" },
    { id: 51, name: "Ultimate (O)" },
    { id: 52, name: "Ulcer" },
    { id: 53, name: "W %R" },
    { id: 54, name: "Wil Alligator" },
    { id: 55, name: "VWAP / MVWAP" },
    { id: 56, name: "Vortex" },
    { id: 57, name: "ZigZag" }
];

// Function to populate the select options
function populateSelectOptions() {
    selectElement.innerHTML = '';  // Clear previous options
    indicators.forEach(item => {
        const option = document.createElement('option');
        option.addEventListener("click", selectOption);
        option.id = item.id;
        option.value = item.id;
        option.text = item.name;
        selectElement.appendChild(option);
    });
}

const selectOption = (e) => {
    let id = Number(e.target.id);
    // console.log(id);
    console.log("indicator ID: " + indicators[id+1].id + " name: ", indicators[id+1].name )

}

// Filter options based on the search input
function filterOptionsBySearch(query) {
    const filteredOptions = indicators.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
    selectElement.innerHTML = '';  // Clear previous options
    filteredOptions.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.text = item.name;
        selectElement.appendChild(option);
    });
}

// Filter function for the alphabet
function filterOptionsByLetter(letter) {
    const filteredOptions = indicators.filter(item => item.name.startsWith(letter));
    selectElement.innerHTML = '';  // Clear previous options
    filteredOptions.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.text = item.name;
        selectElement.appendChild(option);
    });
}

// Reset the filter (show all options)
function resetFilter() {
    populateSelectOptions();
}

// Event listeners for filter buttons
filterButtons.forEach(button => {
    button.addEventListener('click', function () {
        const letter = this.getAttribute('data-letter');
        if (letter === '#') {
            resetFilter();
        } else {
            filterOptionsByLetter(letter);
        }
    });
});

// Search functionality for input box
searchIndicatorInput.addEventListener('input', function () {
    const searchQuery = this.value;
    filterOptionsBySearch(searchQuery);
});

addIndicatorsButton.addEventListener('click', function () {
    searchSelectIndicator.style.display = searchSelectIndicator.style.display === 'block' ? 'none' : 'block';
});

// Populate options on load
populateSelectOptions();

// Close the popup when clicking outside of it
document.addEventListener('click', function (event) {
    if (!addIndicatorsButton.contains(event.target) && !searchSelectIndicator.contains(event.target)) {
        searchSelectIndicator.style.display = 'none';
    }
});
