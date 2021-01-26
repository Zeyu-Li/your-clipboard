let new_item_flag = false;
let main = document.querySelector('.main');
let card = `<div class="card"><p>Some random thing</p></div><hr>`
// TODO: read from json and put in card

function add_item() {
    main.innerHTML += card
}

function add_item_clicked() {
    alert("Added item");
    // if successful
    main.innerHTML += card
    // update storage
}

// if add item is clicked while new item flag, highlight last empty box

let test = 10;
for (i = 0; i < test; i++) {
    add_item()
}
