const videoSrc = document.querySelector('#videoSource');
const videoTag = document.querySelector("#preview");
const inputTag = document.querySelector("#upload");
const outputTag = document.querySelector('#outputGif');
const progressBar = document.querySelector('#progressBar');
const dwnlnk = document.querySelector('#download');
const acceptedFileTypes = ['video/mp4','video/wav'];
const overlay = document.querySelector('#hoverOverlay');
const btnSave = document.querySelector('#btnStoreDB');
const modal = document.querySelector('#savePrompt') 
var finished = true;

//Function to convert

function readVideo(event) {
    // Prepare visuals - set progress bar
    progressBar.value = 0;
    progressBar.style.display = 'block';
    outputTag.style.display = 'none';
    document.querySelectorAll('.download').forEach(element => element.style.display = 'none');
    //Get file
    let file = inputTag.files[0];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      let fileName = file.name;

      reader.onload = function(e) {
        videoSrc.src = e.target.result
        videoTag.load()
      }.bind(this)
  
      reader.readAsDataURL(file);
      if(videoTag.getAttribute('listener') !== 'true'){
          videoTag.addEventListener('loadedmetadata', function () {
            //Set progress bar size depending of duration of video
              progressBar.max = Math.round(videoTag.duration);

              // Prepare canvas data
              var vHeight = this.videoHeight;
              var vWidth = this.videoWidth;
              if (vHeight > 400) vHeight = 400;
              if (vWidth > 500) vWidth = 500;
  
              var bitmap = document.querySelector('#workplace');
  
              bitmap.setAttribute('width',vWidth);
              bitmap.setAttribute('height',vHeight);
          
  
              const ctx = bitmap.getContext('2d');

              //Play video so encoder can gather data
              videoTag.muted = true;
              videoTag.loop = false;
              videoTag.play();
  
              const clrSrc = () => {
                ctx.fillStyle = 'rgba(255,255,255,0)';
                ctx.fillRect(0,0,vWidth,vHeight);
              }

              // Generate encoder
              const encoder = new GIFEncoder(vWidth,vHeight);
              encoder.setRepeat(0);
              encoder.setDelay(0);
              encoder.setQuality(20);

              // Method to capture video frame
              const step = async() => {
                if (!finished) {
                  let background = await clrSrc();
                  await new Promise(resolve => {
                  ctx.drawImage(videoTag,0,0,vWidth,vHeight);
                  frameB64Str = bitmap.toDataURL();
                  encoder.addFrame(ctx);
                  progressBar.value = Math.round(videoTag.currentTime);
                  resolve();
                });
                window.requestAnimationFrame(step);
                }
              };

              //Gather data from video
          //if(videoTag.getAttribute('listener') !== 'true') {
            videoTag.addEventListener('play',() => {
              finished = false;
              encoder.start();
              step();
              window.requestAnimationFrame(step);
            });
          //}

               // Create prepared gif file
          //if(videoTag.getAttribute('listener') !== 'true') {
            videoTag.addEventListener('ended', () => {
              encoder.finish();
              finished = true;
              let fileType = 'image/gif';
              let readableStream = encoder.stream();
              let binary_gif = readableStream.getData();
              let b64Str = 'data:'+fileType+';base64,'+encode64(binary_gif);
              document.querySelector('#senderImage').setAttribute('value', b64Str);

              //Generate download button method
                if (videoTag.getAttribute('listener') !== 'true') {
                    dwnlnk.addEventListener('click', (evt) => {
                        const a = document.createElement('a')
                        a.href = b64Str;
                        a.download = inputTag.files[0].name.replace('.mp4', '.gif');
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                    })
                }

                // Button visual effects - set visibility
              document.querySelectorAll('.download').forEach(element => element.style.display = 'inline-block');
              document.querySelector('#btnDownload').appendChild(dwnlnk);
              outputTag.setAttribute('src',b64Str);
              outputTag.style.display = 'block';
              progressBar.style.display = 'none';
              videoTag.setAttribute('listener','true');
            });
          //}
  
        }, false)
      }



    }
  };

//  Run script as soon as file was put info file input
inputTag.addEventListener('change',readVideo);

//  Drag and drop effects

function fileDrop(event) {
  event.stopPropagation();
  event.preventDefault();
  fileHoverLeave();
  let dt = event.dataTransfer;
  let file = dt.files[0];
  if (!acceptedFileTypes.find(element => element == file.type)) {
    alert('Please input accepted video format!');
  }
  else {
    inputTag.files = dt.files;
    var event = new Event('change');
    inputTag.dispatchEvent(event);
  }
}

function fileHover(event) {
  overlay.style.display = 'block';
  event.stopPropagation();
  event.preventDefault();
}

function fileHoverLeave() {
  overlay.style.display = 'none';
}

document.addEventListener('dragenter', fileHover);
document.addEventListener('dragover', fileHover);
document.addEventListener('dragleave', fileHoverLeave);
document.addEventListener('drop', fileDrop);

//  Modal functions

btnSave.addEventListener('click', () => {
    modal.style.display = 'block';
})

window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
})

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
        document.querySelector('#tags').appendChild(tagSpan);
    }
})

function removeTag() {
    this.parentNode.remove();
}
