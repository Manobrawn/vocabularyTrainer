const addBtn = document.getElementById("add-btn");
const addSpan = document.getElementById("add-span")
const dialog = document.getElementById("dialog-add");
const cancelDialogBtn = document.querySelector("#cancel-dialog-btn");
const saveDialogBtn = document.querySelector("#save-dialog-btn")
const keyText = document.getElementById("key-text");
const valueText = document.getElementById("value-text");
const radioMeaning = document.getElementById("radio-meaning");
const radioTranslation = document.getElementById("radio-translation");
const vocabularyContainer = document.getElementById("vocabulary-container")
const reverseBtn = document.getElementById("reverse-btn");

let vocabularyMap = JSON.parse(localStorage.getItem("data")) || [];

const displayInput = (displayAll) => {
    if(displayAll) {
        for (const obj of vocabularyMap) {
            const span = document.createElement("span")
            span.innerText = `${obj.key}`;
            vocabularyContainer.insertBefore(span, vocabularyContainer.lastElementChild);
        }
    } else {
        const lastObj = vocabularyMap[vocabularyMap.length - 1];
        const span = document.createElement("span")
        span.innerText = `${lastObj.key}`;
        vocabularyContainer.insertBefore(span, vocabularyContainer.lastElementChild);
    }
};
displayInput(true); //runs displayALL

const saveInput = () => {
    const keys = []; 
    keys.push(keyText.value);
    const values = [];
    values.push(valueText.value);
    for (let i = 0; i < keys.length; i++) {
        vocabularyMap.push({key: keys[i], value: values[i]});
    }
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
addInput()

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
cancelOrSaveDialog();

const translationOrMeaning = () => {
    radioMeaning.addEventListener("change", () => {
        if (radioMeaning.checked) {
            valueText.placeholder = "write here the meaning of the vocabulary";
        }
    });

    radioTranslation.addEventListener("change", () => {
        if (radioTranslation.checked) {
            valueText.placeholder = "write here the translation of the vocabulary";
        }
    });
    };
translationOrMeaning();

let displayMode = "keys";

const reverseDisplay = () => {
    reverseBtn.addEventListener("click", () => {
        const lastElement = vocabularyContainer.lastElementChild;
        vocabularyContainer.innerHTML = "";
        displayMode = (displayMode === "keys") ? "values" : "keys";
        for (const obj of vocabularyMap) {
            const span = document.createElement("span");
            if (displayMode === "keys") {
                span.innerText = `${obj.key}`;
            } else {
                span.innerText = `${obj.value}`;
            }
            vocabularyContainer.appendChild(span);
        };
        vocabularyContainer.appendChild(lastElement);
    });
    /* Reverse individually clicking on screen */
    /*const spanElements = vocabularyContainer.querySelectorAll("span");
    spanElements.forEach((span) => {
        span.addEventListener("click", () => {}); 
        if (displayMode === "keys") {
            span.innetText = `${}`
        };
    });*/
}
    
reverseDisplay();


