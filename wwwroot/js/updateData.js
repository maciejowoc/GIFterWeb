const modal = document.querySelector('#alterModal');
const inputs = document.querySelector('#tags');
const btn = document.querySelector('#submit');
const form = document.querySelector('#EditFormula');
const tagsConnected = document.querySelector('#senderTags');

//  Removing delete tag button from first tag in edit gif page
inputs.firstElementChild.lastElementChild.remove();

//  Adding event listeners to earlier created buttons
document.querySelectorAll('.btnRemoveTag').forEach(obj => obj.addEventListener('click', removeTag));

//  Add tag method from generator since it works identically
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
        inputs.appendChild(tagSpan);
    }
})

//  Removes input tag field with button itself
function removeTag() {
    this.parentNode.remove();
}

//  Process data to edit similar like in generator
function send() {
    var Tags = '';
    var condition = true;
    document.querySelectorAll('.tag').forEach(element => element.value != '' ? Tags += element.value + ',' : condition = false);
    if (condition) {
        Tags = Tags.substring(0, Tags.length - 1);
        tagsConnected.value = Tags;
    }
    else {
        alert('Please fill every field');
    }
}

//  Return to MyGifs page
document.querySelector('#cancel').addEventListener('click', () => {
    history.back();
})