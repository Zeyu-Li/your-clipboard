
let data, current_edit
let new_item_flag = false
let main = document.querySelector('.main')
let card = document.querySelector('.card')
// read json from local storage and put in card
data = JSON.parse(localStorage.getItem('clipboard'))

// event listeners
// is user presses ctrl-b, then rebuild
document.addEventListener("keydown", function(e){
    if(e.ctrlKey && e.keyCode == 78) {
        add_item_clicked()
    }
})
function add_item_clicked() {
    // show popup
    $('.popup').show()
    $('#to_add').val("")
}

function edit_current_item() {
    // hide edit
    $('.edit').hide()

    let note = $("#to_edit").val()

    console.log(note);
    

    // if empty, remove
    if (note === "") {
        remove(current_edit)
        return
    }
    // updates render
    $(`.card${current_edit} #text`).text(note)

    // updates current
    data[current_edit] = note
    localStorage.setItem('clipboard', JSON.stringify(data))
}

function add_current_item() {
    $('.popup').hide()
    

    let new_index
    let note = $("#to_add").val()
    // if empty
    if (note === "") return;
    if (Object.keys(data).length !== 0) {
        new_index = Math.max(...(Object.keys(data)).map(x => parseInt(x))) + 1
    } else {
        new_index = 0
    }
    
    
    main.innerHTML += `<div class="card card${new_index}" onmouseover="show_btns(this)" onmouseout="hide_btns(this)">
    <p id="text" onclick="copy_to_clipboard(${new_index})">${note}</p>
    <div class="item-btn"><p id="edit" onclick="edit(${new_index})">Edit</p><p title="copy" id="copy" onclick="copy_to_clipboard(${new_index})">📋</p><p title="remove" id="remove" onclick="remove(${new_index})">❌</p></div>
    <hr></div>`
    // update storage
    data[new_index] = note
    localStorage.setItem('clipboard', JSON.stringify(data))
}
function add_item(index, string) {
    main.innerHTML += `<div class="card card${index}" onmouseover="show_btns(this)" onmouseout="hide_btns(this)">
    <p id="text" onclick="copy_to_clipboard('${index}')">${string}</p>
    <div class="item-btn"><p id="edit" onclick="edit(${index})">Edit</p><p title="copy" id="copy" onclick="copy_to_clipboard(${index})">📋</p><p title="remove" id="remove" onclick="remove(${index})">❌</p></div>
    <hr></div>`
}

function cancel() {
    // hide popup
    $('.popup').hide()
}
function cancel_edit() {
    // hide edit
    $('.edit').hide()
}

function init() {
    if (data !== null) {
        for (const [key, value] of Object.entries(data)) {
            add_item(key, value)
        }
    } else {
        // init data
        data = {}
    }
}
init()

function edit(number) {
    $('.edit').show()
    $('#to_edit').val(data[number])
    // set current edit number
    current_edit = number
}

function remove(number) {
    // removes from data
    delete data[number]
    // save
    localStorage.setItem('clipboard', JSON.stringify(data))
    // remove render
    $(`.card${number}`).remove()
}

// copies to clipboard
function copy_to_clipboard(num) {
    let text = data[num]
    navigator.clipboard.writeText(text)
}
// show buttons when mouse over
function show_btns(card_div) {
    card_div.children[1].style.display = "block"
}
function hide_btns(card_div) {
    card_div.children[1].style.display = "none"
}
