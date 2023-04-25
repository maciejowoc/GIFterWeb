const btn = document.querySelector('#SaveToServer');
const image = document.querySelector('#outputGif');
const tagInput = document.querySelector('#senderTags');
const form = document.querySelector('#Sender');

btn.addEventListener('click', () => {
    var Tags = '';
    var condition = true;
    document.querySelectorAll('.tag').forEach(element => element.value != '' ? Tags += element.value + ',' : condition = false);
    if (condition) {
        tagInput.value = Tags;
        form.submit();
    }
    else {
        alert('Please fill every field');
    }
})