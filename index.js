const stash_area = document.getElementById('stash_area');
const register_word_form = document.register_word;
const register_word_btn = document.getElementById('register_word_btn');

// check word to add to CSV
register_word_btn.addEventListener('click', function(e){
    let word_to_register = document.getElementsByName('word_to_register')[0].value;
    let words_in_csv = document.getElementsByName('word_to_delete');
    let num_word_in_csv = document.getElementsByClassName('word_in_csv').length;
    let exist_error = false;
    for (let i = 0; i < num_word_in_csv; i++){
        if(words_in_csv[i].value == word_to_register){
            alert('The word "'+ word_to_register + '" already exists');
            exist_error = true;
            break;
        }
    }
    if(!exist_error){
        document.register_word.submit();
    }
});

// delete a word in csv
$('.word_in_csv').draggable({
    revert: 'invalid',
    scroll: false,
});

// stash by DnD
$('#chosen_words').draggable({
    revert: 'invalid',
    drag: function(){
        $('#stash_area').css('background-color', 'rgba(250, 130, 88, 0.6)');
    },
    stop: function(){
        $('#stash_area').css('background-color', '#fff');
    }
});
$('#stash_area').droppable({
    accept: '#chosen_words, .stashed_word, .word_in_csv',
    drop: switchStashOrMove
});

// delete a stashed_card
$('#delete_stashed_word').droppable({
    accept: '.stashed_word, .word_in_csv',
    drop: switchDeleteProcess,
    activeClass: 'word_stashed_dragged'
});

listStashedWords();

function listStashedWords(){
    stash_area.innerHTML = null;
    if(sessionStorage.getItem('chosen_word_list')){
        let stashed_words_list = sessionStorage.getItem('chosen_word_list').split(',');
        let item_position_list = sessionStorage.getItem('item_position_list').split(',');
        let i = 0;
        for (let key in stashed_words_list){
            let item_x = item_position_list[i].split('&')[0];
            let item_y = item_position_list[i].split('&')[1];
            let tag_span = document.createElement('span');
            tag_span.innerHTML = stashed_words_list[key];
            tag_span.classList.add('stashed_word');
            tag_span.style.position = 'absolute';
            tag_span.style.top = item_y + 'px';
            tag_span.style.left = item_x + 'px';
            stash_area.appendChild(tag_span);
            i++;
        }
        $('.stashed_word').draggable({ revert: 'invalid' });
        saveStashedArea();
    }
}

function switchStashOrMove(e, object){
    let dragged = object.draggable[0];
    if(dragged.id){
        stashWords(dragged.classList.value.match('word_in_csv'));
    }else if(dragged.classList.value.match('word_in_csv')){
        stashWords(dragged);
        location.reload();
    }else{
        saveStashedArea();
    }
}

function saveStashedArea(){
    let word_to_stash = new Array();
    let item_position_list = new Array();
    let stashed_cards = stash_area.children;
    for (let i = 0; i < stashed_cards.length; i++){
        let card_x = Math.floor(stashed_cards[i].getBoundingClientRect().left)-stash_area.getBoundingClientRect().left - 1; // ????
        let card_y = Math.floor(stashed_cards[i].getBoundingClientRect().top)-stash_area.getBoundingClientRect().top -2;
        word_to_stash.push(stashed_cards[i].innerHTML);
        stashed_cards[i].style.top = card_y;
        stashed_cards[i].style.left = card_x;
        item_position_list.push(card_x+'&'+card_y);
        sessionStorage.setItem('chosen_word_list', word_to_stash);
        sessionStorage.setItem('item_position_list', item_position_list);
    }
    if(stashed_cards.length === 0){
        sessionStorage.setItem('chosen_word_list', '');
        sessionStorage.setItem('item_position_list', '');
    }
}

function stashWords(dragged){
    let chosen_word_list = new Array();
    let item_position_list = new Array();
    let word_to_stash = new Array();
    let item_position = new Array();
    // add DOM element
    let w_t_s_wrapper = document.getElementById('chosen_words');
    let word;
    if(dragged){
        word = dragged.children;
        console.log(word);
    }else{
        word = w_t_s_wrapper.children;
        console.log(word);
    }
    for (let i = 0; i < word.length; i++) {
        let w_t_s_x = word[i].getBoundingClientRect().left-stash_area.getBoundingClientRect().left;
        let w_t_s_y = word[i].getBoundingClientRect().top-stash_area.getBoundingClientRect().top;
        word_to_stash.push(word[i].innerText);
        word[i].style.top = w_t_s_y;
        word[i].style.left = w_t_s_x;
        item_position.push(w_t_s_x+'&'+w_t_s_y);
    }

    // save in sessionStorage
    chosen_word_list.push(sessionStorage.getItem('chosen_word_list'));
    item_position_list.push(sessionStorage.getItem('item_position_list'));
    if(chosen_word_list[0]){
        Array.prototype.push.apply(chosen_word_list, word_to_stash);
        Array.prototype.push.apply(item_position_list, item_position);
        sessionStorage.setItem('chosen_word_list', chosen_word_list);
        sessionStorage.setItem('item_position_list', item_position_list);
    }else{
        sessionStorage.setItem('chosen_word_list', word_to_stash);
        sessionStorage.setItem('item_position_list', item_position);
    }
    while (displayed_words.firstChild) displayed_words.removeChild(displayed_words.firstChild); 
    listStashedWords();
}

function switchDeleteProcess(e, object){
    let dragged = object.draggable[0];
    if(dragged.classList.value.match('word_in_csv')){
    console.log('gagaga');
        deleteWordInCSV(object);
    }else if(dragged.classList.value.match('stashed_word')){
        deleteStashedWord(object);
    }else{
        console.log('unexpected item');
    }
}

function deleteStashedWord(object){
    object.draggable[0].remove();
    saveStashedArea();
}

function deleteWordInCSV(object){
    let word_to_delete = object.draggable[0].firstChild.children[0].value;
    console.log('kakaka');
    document.getElementById('word_in_csv_delete').value = word_to_delete;
    document.del.submit();
}
