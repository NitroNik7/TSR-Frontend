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