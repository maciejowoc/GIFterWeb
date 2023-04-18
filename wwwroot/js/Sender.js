const form = document.querySelector('#Sender');
const btn = document.querySelector('#SaveToServer');
const image = document.querySelector('#outputGif');

btn.addEventListener('click', () => {
    var Tags = '';
    var condition = true;
    document.querySelectorAll('.tag').forEach(element => element.value != '' ? Tags += element.value + ',' : condition = false);
    if (condition) {
        console.log(Tags);
    }
    else {
        alert('Please fill every field');
    }
})