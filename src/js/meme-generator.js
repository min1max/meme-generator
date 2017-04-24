require ('./jscolor.min');  

    function textChangeListener (evt) {
      var id = evt.target.id;
      var text = evt.target.value;
      var len = evt.target.value.length;

      if (id == "topSize"){
        if (len > 1){
          form.topSize = text;
        }else{
          form.topSize = 12;
        }
      }
      else if (id == "fontColor") {
        form.fontColor = text;
      }
      else if (id == "topLineText") {
        window.topLineText = text;
      } else {
        window.bottomLineText = text;
      }

      redrawMeme(window.imageSrc, window.topLineText, window.topSize, window.bottomLineText, fontColor);
    }



    
    function redrawMeme(image, topLine, topLineSize, bottomLine, color) {
    
      var canvas = document.querySelector('canvas');
      var ctx = canvas.getContext("2d");

      topLineSize = topSize.value;
      color = fontColor.value;

      if (image != null)
        var up = document.getElementsByClassName('upload-wrapper');
        //up.css('display', 'none');

        var iw =  image.width;
        var ih =  image.height;
        //topLineSize = getFont(iw,ih); //(iw/ih)*100;

        if (iw > window.innerWidth) {
          canvas.style.width = '100%';
        }
        if (iw < window.innerWidth) {
          canvas.style.width = 'auto';

        }
        canvas.width = iw;
        canvas.height = ih;
  
        ctx.drawImage(image, 0, 0, iw, ih);
      
      // Text attributes
      //ctx.font = 'bold 40px Impact';
      ctx.font ='bold ' + topLineSize + 'px Impact';
      
      ctx.textAlign = 'center';
      ctx.textBaseline= 'middle'; 
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      ctx.fillStyle = color;
      //ctx.fillStyle = '#61ABA1';

      
      if (topLine != null) {
        var measure = ctx.measureText(topLine);
        //console.log(measure); 
        ctx.fillText(topLine.toUpperCase(), iw/2, topLineSize - (topLineSize/2), iw);
        ctx.strokeText(topLine.toUpperCase(), iw/2,  topLineSize - (topLineSize/2), iw);
      }
      
      if (bottomLine != null) {
        ctx.fillText(bottomLine.toUpperCase(), iw/2, ih - (topLineSize/2), iw);
        ctx.strokeText(bottomLine.toUpperCase(), iw/2, ih - (topLineSize/2), iw);
      }
    }

    function getFont(imageWidth, imageHeight) {
      
        var ratio,size;
        //horizontal
        if (imageWidth>imageHeight){
         ratio = imageWidth/imageHeight; 
         size =  Math.floor(15 * ratio);
        }
        //vertical
        else{
         ratio = imageHeight/imageWidth; 
         size =  Math.floor(30 * ratio);
        }
        return size;
        //return 'bold ' + size + 'px Impact';
    }
    
    function saveFile() {

      window.open(document.querySelector('canvas').toDataURL());

    }
    
    function handleFileSelect(evt) {
      var canvasWidth, canvasHeight;
      var file = evt.target.files[0];
      //console.log(file);
      
      var reader = new FileReader();
      //console.log(reader);
      reader.onload = function(fileObject) {
        var data = fileObject.target.result;
        
        // Create an image object
        var image = new Image();
        image.onload = function() {
          
          window.imageSrc = this;
          canvasWidth = this.width;
          canvasHeight = this.height; 
          console.log(this.width + " " + this.height);
          redrawMeme(window.imageSrc, null, null);
        }
        image.src = data;
      };
      reader.readAsDataURL(file)
    }

    var form = document.getElementById('forma');


    window.topLineText = "";
    var input1 = document.getElementById('topLineText');
    input1.oninput = textChangeListener;

    window.topSize = "";
    var topSize = document.getElementById('topSize');
    topSize.oninput = textChangeListener;


    //fontColor = "";
    var fontColor = document.getElementById('fontColor');
    fontColor.onchange = textChangeListener;
    

    
    window.bottomLineText = "";
    var input2 = document.getElementById('bottomLineText');
    input2.oninput = textChangeListener;

    document.getElementById('file').addEventListener('change', handleFileSelect, false);
    document.querySelector('button').addEventListener('click', saveFile, false);