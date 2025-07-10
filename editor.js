
const canvas = new fabric.Canvas('imageCanvas');
const imageLoader = document.getElementById('imageLoader');

imageLoader.addEventListener('change', handleImage, false);

function handleImage(e) {
  const reader = new FileReader();
  reader.onload = function(event) {
    fabric.Image.fromURL(event.target.result, function(img) {
      canvas.clear();
      img.scaleToWidth(canvas.width);
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
    });
  };
  reader.readAsDataURL(e.target.files[0]);
}

function applyFilter(type) {
  const ctx = canvas.getContext('2d');
  const imgEl = canvas.backgroundImage.getElement();

  Caman(imgEl, function () {
    this.revert(false);
    if (type === 'grayscale') this.greyscale();
    else if (type === 'sepia') this.sepia();
    else if (type === 'vivid') {
      this.brightness(10).contrast(20).saturation(30);
      this.stackBlur(3);
    }
    this.render(() => {
      fabric.Image.fromURL(this.toBase64(), function(img) {
        canvas.clear();
        img.scaleToWidth(canvas.width);
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
      });
    });
  });
}

function removeBackground() {
  const bgUrl = canvas.backgroundImage.getSrc();
  alert("This demo would call remove.bg API with your image URL: " + bgUrl + "\nYou can add the API integration in backend.");
}

function downloadImage() {
  const dataURL = canvas.toDataURL({format: 'png'});
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = 'napar-edited.png';
  link.click();
}
