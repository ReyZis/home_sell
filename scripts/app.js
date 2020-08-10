/* switching the pages */
$(document).ready(function() {

    /* active line animation */
    setActiveLine('home')

    $('#home, .logo-container').click(function() {
        if ($('.active')[0] !== $('.home')[0]) {
            setActiveLine('home');

            removeThenAddClass('home');
        }
    });

    $('#what_is_this').click(function() {
        if ($('.active')[0] !== $('.what_is_this')[0]) {
            setActiveLine('what_is_this')

            removeThenAddClass('what_is_this');
        }
    });

    $('#category').click(function() {
        if ($('.active')[0] !== $('.category')[0]) {
            setActiveLine('category')

            removeThenAddClass('category');
        }
    });

    $('#about_us').click(function() {
        if ($('.active')[0] !== $('.about_us')[0]) {
            setActiveLine('about_us')

            removeThenAddClass('about_us');
        }
    });


});

/* the gategory page */

const form = document.getElementById('search-form');

let tagsContainer = document.getElementById('tags-container');

form.addEventListener('submit', submitHandler);

function submitHandler(event) {
    event.preventDefault();
    const tag = document.getElementById('search');
    if (tag.value) {
        const tagContainer = makeElement('div', 'tag my-1 mr-2 d-flex align-items-center');

        const span = makeElement('span', 'd-block text-truncate my-2 mx-2');
        const text = document.createTextNode(tag.value)
        span.appendChild(text);

        const button = makeElement('button', 'btn btn-warning bmd-btn-icon mx-1');
        button.setAttribute('type', 'button')
        const icon = makeElement('i', 'fas fa-times material-icons');
        button.appendChild(icon);
        button.addEventListener('click', removeThisTag)

        tagContainer.appendChild(span);
        tagContainer.appendChild(button);

        tagsContainer.appendChild(tagContainer);

        tag.value = '';
    }
}

/**
 * 
 * @param {string} tagName 
 * @param {string} content 
 */

function makeElement(tagName, content) {
    const elem = document.createElement(tagName);
    elem.setAttribute('class', content)
    return elem;
}

function removeThisTag(ele) {
    if (ele.target.tagName === "I") {
        ele.target.parentNode.parentNode.remove();
    } else if (ele.target.tagName === "BUTTON") {
        ele.target.parentNode.remove()
    }
}


document.getElementById('search').addEventListener('keydown', removeLastTag);

/**
 * 
 * @param {KeyboardEvent} event 
 */
function removeLastTag(event) {
    let search = document.getElementById('search');
    let tagsList = document.querySelectorAll('.tag');
    if (event.key == "Backspace" && !search.value && tagsList.length != 0) {
        tagsList[tagsList.length - 1].remove();
    }
}


form.querySelector('button[type="reset"]').addEventListener('click', removeAllTags);

function removeAllTags() {
    tagsContainer.innerHTML = ''
}


function setActiveLine(page) {
    let left = $(`#${page}`)[0].getBoundingClientRect()['left'];
    let bottom = $(`#${page}`)[0].getBoundingClientRect()['bottom'];
    let width = $(`#${page}`)[0].offsetWidth;
    $($('#active-line')[0]).animate({
        width: width,
        left: left
    }, 'slow').animate({
        top: bottom
    }, 'slow');
}

function removeThenAddClass(page) {
    $($('.active')[0]).removeClass("active").fadeOut('slow', function() {
        $(`.${page}`).addClass('active').fadeIn('slow');
    })
}