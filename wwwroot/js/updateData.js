const modal = document.querySelector('#alterModal');
const inputs = document.querySelector('#tempTags');

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
    console.log(e);
}
function cancelModal() {
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