const modal = document.querySelector('#alterModal');
const inputs = document.querySelector('#tagsField');
const btn = document.querySelector('#submit');
const form = document.querySelector('#EditFormula');
const tagsConnected = document.querySelector('#senderTags');

function ShowInterface(e) { 
    modal.showModal();
    let tags = e.parentElement.previousElementSibling.children;   
    let tagsRefined = [];
    debugger;
    for (let i = 0; i < tags.length; i++) {
        tagsRefined.push(tags[i].innerHTML);
    }
    
    tagsRefined.forEach((element,index) => {
        const tagSpan = document.createElement('li');
        const tagInput = document.createElement("input");
        tagInput.setAttribute('type', 'text');
        tagInput.setAttribute('class', 'tag');
        tagInput.setAttribute('value', element);
        const tagButton = document.createElement("span");
        tagButton.setAttribute('class', 'btnRemoveTag');
        tagButton.innerHTML = '-';
        tagButton.addEventListener('click', removeTag);
        tagSpan.appendChild(tagInput);
        if (index != 0) { tagSpan.appendChild(tagButton); }
        document.querySelector('#tagsField').appendChild(tagSpan);
    });
    document.querySelector('#gifId').value = e.parentElement.children[0].innerHTML;
}
function cancelModal() {
    while (inputs.firstChild) {
        inputs.removeChild(inputs.firstChild);
    }
    modal.close();
}

document.querySelector('#addTag').addEventListener('click', () => {
    let tags = document.querySelectorAll('.tag');
    if (tags.length < 5) {
        const tagSpan = document.createElement('li');
        const tagInput = document.createElement("input");
        tagInput.setAttribute('type', 'text');
        tagInput.setAttribute('class', 'tag');
        const tagButton = document.createElement("span");
        tagButton.setAttribute('class', 'btnRemoveTag');
        tagButton.innerHTML = '-';
        tagButton.addEventListener('click', removeTag);
        tagSpan.appendChild(tagInput);
        tagSpan.appendChild(tagButton);
        document.querySelector('#tagsField').appendChild(tagSpan);
    }
})

function removeTag() {
    this.parentNode.remove();
}

function send() {
    var Tags = '';
    var condition = true;
    document.querySelectorAll('.tag').forEach(element => element.value != '' ? Tags += element.value + ',' : condition = false);
    if (condition) {
        Tags = Tags.substring(0, Tags.length - 1);
        debugger;
        tagsConnected.value = Tags;
    }
    else {
        alert('Please fill every field');
    }
}