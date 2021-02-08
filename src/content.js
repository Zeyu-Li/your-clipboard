
let data
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
    <p id="text" onclick="copy_to_clipboard('${note}')">${note}</p>
    <div class="item-btn"><p id="edit" onclick="edit(${new_index})">Edit</p><p title="copy" id="copy" onclick="copy_to_clipboard('${note}')">📋</p><p title="remove" id="remove" onclick="remove(${new_index})">❌</p></div>
    <hr></div>`
    // update storage
    data[new_index] = note
    localStorage.setItem('clipboard', JSON.stringify(data))
}
function add_item(index, string) {
    main.innerHTML += `<div class="card card${index}" onmouseover="show_btns(this)" onmouseout="hide_btns(this)">
    <p id="text" onclick="copy_to_clipboard('${string}')">${string}</p>
    <div class="item-btn"><p id="edit" onclick="edit(${index})">Edit</p><p title="copy" id="copy" onclick="copy_to_clipboard('${string}')">📋</p><p title="remove" id="remove" onclick="remove(${index})">❌</p></div>
    <hr></div>`
}

function cancel() {
    // remove popup
    $('.popup').hide()
}

// if add item is clicked while new item flag, highlight last empty box

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
    console.log(`Editing ${data[number]}`)
}

function remove(number) {
    delete data[number]
    // save
    localStorage.setItem('clipboard', JSON.stringify(data))
    // remove render
    $(`.card${number}`).remove()
}

// copies to clipboard
function copy_to_clipboard(text) {
    navigator.clipboard.writeText(text)
}
// show buttons when mouse over
function show_btns(card_div) {
    card_div.children[1].style.display = "block"
}
function hide_btns(card_div) {
    card_div.children[1].style.display = "none"
}
