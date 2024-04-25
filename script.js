const addBtn = document.getElementById("add-btn");
const addSpan = document.getElementById("add-span");
const dialog = document.getElementById("dialog-add");
const confirmationDialog = document.getElementById("confirmation-dialog");
const confirmationQuestion = document.getElementById("confirmation-question");
const confirmDeleteBtn = document.getElementById("confirm-delete-btn");
const cancelDeleteBtn = document.getElementById("cancel-delete-btn");
const cancelDialogBtn = document.querySelector("#cancel-dialog-btn");
const saveDialogBtn = document.querySelector("#save-dialog-btn");
const keyText = document.getElementById("key-text");
const valueText = document.getElementById("value-text");
const radioMeaning = document.getElementById("radio-meaning");
const radioTranslation = document.getElementById("radio-translation");
const vocabularyContainer = document.getElementById("vocabulary-container");
const reverseBtn = document.getElementById("reverse-btn");

let vocabularyMap = JSON.parse(localStorage.getItem("data")) || [];

const displayInput = (displayAll) => {
    if(displayAll) {
        for (const obj of vocabularyMap) {
            const span = document.createElement("span");
            span.innerText = `${obj.key}`;
            vocabularyContainer.insertBefore(span, vocabularyContainer.lastElementChild);
        };
    } else {
        const lastObj = vocabularyMap[vocabularyMap.length - 1];
        const span = document.createElement("span");
        span.innerText = `${lastObj.key}`;
        vocabularyContainer.insertBefore(span, vocabularyContainer.lastElementChild);
        reverseEach();
        hoverDeleteEditBtns();
    }
};

const saveInput = () => {
    const keys = []; 
    keys.push(keyText.value);
    const values = [];
    values.push(valueText.value);
    for (let i = 0; i < keys.length; i++) {
        vocabularyMap.push({key: keys[i], value: values[i]});
    };
    localStorage.setItem("data", JSON.stringify(vocabularyMap));
    keyText.value = "";
    valueText.value = "";
    dialog.close();
    displayInput(false); //runs else
};

const addInput = () => {
    addBtn.addEventListener("click", () => dialog.showModal());
    addSpan.addEventListener("click", () => dialog.showModal());
};

const cancelOrSaveDialog = () => {
    cancelDialogBtn.addEventListener("click", () => dialog.close());
    saveDialogBtn.addEventListener("click", () => {
        if (keyText.value === "" || valueText.value === "") {
            alert("Please fill out both fields with text");
        } else {
            saveInput();
        };
        });
    };

const translationOrMeaning = () => {
    radioMeaning.addEventListener("change", () => {
        if (radioMeaning.checked) {
            valueText.placeholder = "write here the meaning of the vocabulary";
        };
    })
    radioTranslation.addEventListener("change", () => {
        if (radioTranslation.checked) {
            valueText.placeholder = "write here the translation of the vocabulary";
        };
    });
    };

let displayMode = "keys";
let reverseEachTimeout;

const reverseDisplay = () => {
    reverseBtn.addEventListener("click", () => {
        clearTimeout(reverseEachTimeout);
        displayMode = (displayMode === "keys") ? "values" : "keys";
        const spans = vocabularyContainer.querySelectorAll("span");
        for (let i = 0; i < vocabularyMap.length; i++) {
            if (displayMode === "keys") {
                spans[i].innerText = `${vocabularyMap[i].key}`;
            } else {
                spans[i].innerText = `${vocabularyMap[i].value}`;
            };
        };
    });
};

const reverseEach = () => {
    const spans = Array.from(vocabularyContainer.querySelectorAll("span"));
    const spansToIterate = spans.filter(span => span !== addSpan);
    spansToIterate.forEach((span, index) => {
        span.addEventListener("click", () => {
            const obj = vocabularyMap[index];
            if (displayMode === "keys") {
                span.innerText = obj.value;
                reverseEachTimeout = setTimeout(() => {
                    span.innerText = obj.key;
                }, 1500);
            } else {
                span.innerText = obj.key;
                reverseEachTimeout = setTimeout(() => {
                    span.innerText = obj.value;
                }, 1500);
            };
        });
    });
    
};

const hoverDeleteEditBtns = () => {
    const spans = Array.from(vocabularyContainer.querySelectorAll("span"));
    const filteredSpans = spans.filter(span => span !== addSpan);
    filteredSpans.forEach((span) => {
        let deleteBtn, editBtn; 
        deleteBtn = document.createElement("span");
        deleteBtn.innerText = "x";
        deleteBtn.classList.add("delete-edit-btns");
        deleteBtn.id = "delete-btn";
        editBtn = document.createElement("span");
        editBtn.innerText = "Edit";
        editBtn.classList.add("delete-edit-btns");
        editBtn.id = "edit-btn";
        span.addEventListener("mouseover", () => {
            span.appendChild(deleteBtn);
            span.appendChild(editBtn);
        span.addEventListener("mouseout", (event) => {
            if (!span.contains(event.relatedTarget)) {
                deleteBtn.remove();
                editBtn.remove();      
            };
        });

        span.addEventListener("touchstart", () => {
            span.appendChild(deleteBtn);
            span.appendChild(editBtn);
        });

        span.addEventListener("touchend", (event) => {
            if (!span.contains(event.target)) {
                deleteBtn.remove();
                editBtn.remove();
            }
        });

        /*span.addEventLister("touchcancel", () => {
            deleteBtn.remove();
            editBtn.remove();
        });*/
        
        deleteBtn.addEventListener("click", () =>{
            console.log("delete was clicked!")
        });
        editBtn.addEventListener("click", () => {
            console.log("edit was clicked!")
        });
        });
    });
};

displayInput(true); //runs displayALL
addInput();
cancelOrSaveDialog();
translationOrMeaning();
reverseDisplay();
reverseEach();
hoverDeleteEditBtns();
