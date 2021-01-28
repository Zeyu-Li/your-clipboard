
let data;
let new_item_flag = false;
let main = document.querySelector('.main');
let card = document.querySelector('.card');
let card_html = `<div class="card" onclick="copy_to_clipboard(0)" onmouseover="show_btns(this)" onmouseout="hide_btns(this)">
<p>Some random thingSome random thinthingSome random thinthingSome random thinthingSome random thinthingSome random thingSome random thing</p>
<!-- when hover <p id="edit">Edit</p><p title="copy" id="copy">📋</p> <p title="remove" id="remove">🚫</p> -->
<div class="item-btn"><p id="edit" onclick="edit(0)">Edit</p><p title="copy" id="copy" onclick="copy_to_clipboard(0)">📋</p><p title="remove" id="remove" onclick="remove(0)">❌</p></div>
</div><hr>`
// TODO: read from json and put in card

function add_item() {
    main.innerHTML += card_html
}

function add_item_clicked() {
    alert("Added item");
    // if successful
    main.innerHTML += card_html
    // update storage
}

// if add item is clicked while new item flag, highlight last empty box

let test = 10;
for (i = 0; i < test; i++) {
    add_item()
}

function edit(number) {
    console.log(`Editing ${number}`)
}
function remove(number) {
    console.log(`Removing ${number}`)
}

// copies to clipboard
function copy_to_clipboard(text) {
    navigator.clipboard.writeText(text);
}
// show buttons when mouse over
function show_btns(card_div) {
    card_div.children[1].style.display = "block";
}
function hide_btns(card_div) {
    card_div.children[1].style.display = "none";
}
