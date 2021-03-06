$("#answercallbtn").click(startConv);

// answercall button function
function startConv() {
    // const numOfCalls = parseInt(document.getElementById("total").value);
    let totalCalls = parseInt(document.getElementById("total").value) || 0;
    if (parseInt(totalCalls) > 0) {
        document.getElementById("total").value = (--totalCalls) + "";
        sendMessage(totalCalls);
    }
    else {
        popUpModal("There Are No Waiting Calls To Answer!");
        return;
    }

    var tr = document.getElementById("openConversations").insertRow();
    var cStart = tr.insertCell(0);
    var cCity = tr.insertCell(1);
    var cTopic = tr.insertCell(2);
    var cLanguage = tr.insertCell(3);
    var cGender = tr.insertCell(4);
    var cAge = tr.insertCell(5);
    var cEnd = tr.insertCell(6);
    var cCancel = tr.insertCell(7);

    const date = Date.now();
    const dayMonthYearHourMin = getTime();

    cStart.innerHTML = "<div id='" + date +"' class='date-of-call'"+ ">" + dayMonthYearHourMin + "</div>";
    cCity.innerHTML =
        "<select class = 'custom-select'><option value='Jerusalem'>Jerusalem</option><option value='Naaria'>Naaria</option><option value='Haifa'>Haifa</option><option value='Tel Aviv'>Tel Aviv</option><option value='Ashdod'>Ashdod</option><option value='Ashkelon'>Ashkelon</option><option value='Beer Sheva'>Beer Sheva</option></select>";
    cTopic.innerHTML =
        "<select class = 'custom-select'><option value='Medical'>Medical</option><option value='Drugs'>Drugs</option><option value='Food'>Food</option><option value='Water'>Water</option><option value='Shelter'>Shelter</option><option value='Information'>Information</option><option value='Evacuation'>Evacuation</option></select>";
    cLanguage.innerHTML =
        "<select class = 'custom-select'><option value='Hebrew'>Hebrew</option><option value='English'>English</option><option value='Amharic'>Amharic</option><option value='Russian'>Russian</option><option value='Arabic'>Arabic</option></select>";
    cAge.innerHTML = "<input id = 'agecol' type='number' min='0' max='120'/>";
    cGender.innerHTML = "<select class = 'custom-select'><option value='Male'>Male</option><option value='Female'>Female</option></select>";
    cEnd.innerHTML = "<button class='btn btn-outline-danger btn-sm endCallbtn' id='end-btn' onclick='reportEndCall(this.parentNode.parentNode)'><i class='fas fa-phone-slash'></i> End Call</button>";
    cCancel.innerHTML = "<button class='btn btn-danger btn-sm cancelCallbtn' id='cancle-btn' onclick='CancelRow(this.parentNode.parentNode)'> Cancel Call</button>";

}

//end call button function
function reportEndCall(row) {
    const situation = document.getElementById("kind-of-call");
    const timeRecived = row.cells[0].getElementsByTagName("div")[0].innerHTML.split(",")[1];

    const rawCallData = {};
    rawCallData.id = row.cells[0].getElementsByTagName("div")[0].id;
    rawCallData.city = row.cells[1].getElementsByTagName("select")[0].value;
    rawCallData.topic = row.cells[2].getElementsByTagName("select")[0].value;
    rawCallData.language = row.cells[3].getElementsByTagName("select")[0].value;
    rawCallData.gender = row.cells[4].getElementsByTagName("select")[0].value;
    rawCallData.age = (row.cells[5].getElementsByTagName("input")[0].value);
    if (!rawCallData.age) {
        popUpModal("Can Not End A Call Without The Age Listed !");
        return;
    }
    rawCallData.typeOfCall = situation.value;
    rawCallData.timeRecived = timeRecived;
    const timeOfEnding = getTime().split(",")[1];
    rawCallData.timeEnded = timeOfEnding;
    rawCallData.totalTime = (parseInt(Date.now()) - parseInt(rawCallData.id)) / 1000; // seconds


    emitCallData(rawCallData);
    deleteRow(row);
}

function CancelRow(row) {
    const i = row.rowIndex;
    document.getElementById("openConversations").deleteRow(i);
    let totalCalls = parseInt(document.getElementById("total").value) || 0;
}

function deleteRow(row) {
    const i = row.rowIndex;
    document.getElementById("openConversations").deleteRow(i);
}

function getTime() {
    const date = Date.now();
    const dateTimeFormat = new Intl.DateTimeFormat("en", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        hour12: false
    });
    const [{ value: month }, , { value: day }, , { value: year }, , { value: hour }, , { value: minute }] = dateTimeFormat.formatToParts(date);
    return `${day}-${month}-${year} ,${hour}:${minute}`;
}
const outsideModal = document.getElementById("outside-modal");

function popUpModal(textToWrite) {
    const outsideModal = document.getElementById("outside-modal");
    const modalText = document.getElementById("modal-text");
    modalText.innerHTML = textToWrite;
    outsideModal.classList.toggle("hidden");
}

function closeOnClick(e) {
    if (e.target === outsideModal) {
        outsideModal.classList.toggle("hidden");
    }
}

function closeModalBtnClicked() {
    outsideModal.classList.toggle("hidden");
}

outsideModal.addEventListener("click", closeOnClick);
