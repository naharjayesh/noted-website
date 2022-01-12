showNotes();

// Add notes to localStorage
let addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    if (
        addTxt.value != "" &&
        !JSON.stringify(notesObj).includes(addTxt.value)
    ) {
        notesObj.push(addTxt.value);
    } else {
        document.getElementsByName("text area")[0].placeholder =
            "Can not enter null string";
    }
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
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
        <h5 class="card-title">Note ${index + 1}</h5>
        <p class="card-text"> ${element} </p>
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

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
    let inputVal = search.value;
    // console.log("Searching ", inputVal);
    let noteCard = document.getElementsByClassName("noteCard");
    Array.from(noteCard).forEach(function (element) {
        let cardTxt = element
            .getElementsByTagName("p")[0]
            .innerText.toLowerCase();
        if (cardTxt.includes(inputVal.toLowerCase())) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });
});

let deleteAll = document.getElementById("deleteAll");
deleteAll.addEventListener("click", function () {
    /* if (notesObj.length) {
        sessionStorage.setItem("notes", JSON.stringify(notesObj));
    } */
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

// localStorage.clear();
