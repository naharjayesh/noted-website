showNotes();

// Add notes to localStorage
let addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let titleTextObj = {
        title: addTitle.value,
        text: addTxt.value,
    };

    if (
        addTitle.value != "" &&
        addTxt.value != "" &&
        !JSON.stringify(notesObj).includes(addTxt.value)
    ) {
        notesObj.push(titleTextObj);
    } else {
        if (addTitle.value == "") {
            document.getElementsByName("title area")[0].placeholder =
                "Can not enter null string";
            return;
        } else {
            document.getElementsByName("text area")[0].placeholder =
                "Can not enter null string";
            return;
        }
    }

    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    showNotes();
});

// Delete notes
function deleteNote(index) {
    // console.log(`We're deleting`, index);

    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

// Show elements from localStorage
function showNotes() {
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="card noteCard my-2 mx-2" style="width: 18rem">
        <div class="card-body">
        <h5 class="card-title">${element.title}</h5>
        <p class="card-text"> ${element.text} </p>
        <button id='${index}' onclick='deleteNote(this.id)'  class="btn btn-primary">Delete</button>
        </div>
        </div>`;
    });
    let notesElem = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElem.innerHTML = html;
    } else {
        notesElem.innerHTML = `Zero notes added!`;
    }
}

// Search notes
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
    let inputVal = search.value;
    // console.log("Searching ", inputVal);
    let noteCard = document.getElementsByClassName("noteCard");
    Array.from(noteCard).forEach(function (element) {
        let cardTxt = element
            .getElementsByClassName("card-text")[0]
            .innerText.toLowerCase();
        let cardTitle = element
            .getElementsByClassName("card-title")[0]
            .innerText.toLowerCase();

        if (
            cardTxt.includes(inputVal.toLowerCase()) ||
            cardTitle.includes(inputVal.toLowerCase())
        ) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });
});

// Delete all notes
let deleteAll = document.getElementById("deleteAll");
deleteAll.addEventListener("click", function () {
    localStorage.clear();
    notesObj = [];
    showNotes();
});

/* function convertToPlain(html) {
    // Create a new div element
    var tempDivElement = document.createElement("div");

    // Set the HTML content with the given value
    tempDivElement.innerHTML = html;

    // Retrieve the text property of the element
    return tempDivElement.textContent || tempDivElement.innerText || "";
} */
