
let data, current_edit
let new_item_flag = false
let main = document.querySelector('.main')
let card = document.querySelector('.card')
// read json from local storage and put in card
data = JSON.parse(localStorage.getItem('clipboard'))

// event listeners (wired here rather than inline, so the CSP can forbid inline script)
document.getElementById('add_button').addEventListener('click', add_item_clicked)
document.getElementById('add_submit').addEventListener('click', add_current_item)
document.getElementById('add_cancel').addEventListener('click', cancel)
document.getElementById('edit_submit').addEventListener('click', edit_current_item)
document.getElementById('edit_cancel').addEventListener('click', cancel_edit)
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
    
    
    add_item(new_index, note)
    // update storage
    data[new_index] = note
    localStorage.setItem('clipboard', JSON.stringify(data))
}
// builds the card with DOM APIs so clipboard text is shown as text, never parsed as HTML
function add_item(index, string) {
    const card_div = document.createElement('div')
    card_div.className = `card card${index}`
    card_div.addEventListener('mouseover', () => show_btns(card_div))
    card_div.addEventListener('mouseout', () => hide_btns(card_div))

    const text = document.createElement('p')
    text.id = 'text'
    text.textContent = string
    text.addEventListener('click', () => copy_to_clipboard(index))

    const buttons = document.createElement('div')
    buttons.className = 'item-btn'
    buttons.append(
        item_button('edit', 'Edit', () => edit(index)),
        item_button('copy', '📋', () => copy_to_clipboard(index)),
        item_button('remove', '❌', () => remove(index)),
    )

    card_div.append(text, buttons, document.createElement('hr'))
    main.append(card_div)
}
function item_button(id, label, on_click) {
    const button = document.createElement('p')
    button.id = id
    button.title = id
    button.textContent = label
    button.addEventListener('click', on_click)
    return button
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
