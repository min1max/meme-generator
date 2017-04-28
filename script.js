  
    function textChangeListener (evt) {
      var id = evt.target.id;
      var text = evt.target.value;
      
      if (id == "topLineText") {
        window.topLineText = text;
      } else {
        window.bottomLineText = text;
      }
      
      redrawMeme(window.imageSrc, window.topLineText, window.bottomLineText);
    }



    
    function redrawMeme(image, topLine, bottomLine) {
      // Get Canvas2DContextˇˇ
      var canvas = document.querySelector('canvas');
      var ctx = canvas.getContext("2d");
      if (image != null)

        var iw =  image.width;
        var ih =  image.height;

        if (iw > window.innerWidth) {
          canvas.width = window.innerWidth;
          canvas.height = ih;
        }
        if (iw < window.innerWidth) {

        canvas.width = iw;
        canvas.height = ih;
        }
        //console.log(image.width);
        ctx.drawImage(image, 0, 0, iw, ih);
      
      // Text attributes
      ctx.font = 'bold 40pt Impact';
      //ctx.font = '30pt Arial';
      ctx.textAlign = 'center';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      ctx.fillStyle = 'white';
      //topLine.toUpperCase();
      
      if (topLine != null) {
        //ctx.toUpperCase(topLine);
        var measure = ctx.measureText(topLine);
        console.log(measure); 
        ctx.fillText(topLine.toUpperCase(), canvas.width / 2, 40);
        ctx.strokeText(topLine.toUpperCase(), canvas.width / 2,  -(canvas.height - 20));
      }
      
      if (bottomLine != null) {
        //bottomLine.toUpperCase();
        ctx.fillText(bottomLine.toUpperCase(), canvas.width / 2, canvas.height - 20);
        ctx.strokeText(bottomLine.toUpperCase(), canvas.width / 2, canvas.height - 20);
      }
    }
    
    function saveFile() {
      window.open(document.querySelector('canvas').toDataURL());
    }
    

    function handleFileSelect(evt) {
      var canvasWidth, canvasHeight;
      var file = evt.target.files[0];
      console.log(file);
      
      var reader = new FileReader();
      console.log(reader);
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

  var _URL = window.URL || window.webkitURL;

  /*$("#file").change(function(e) {
      var file, img;


      if ((file = this.files[0])) {
          img = new Image();
          img.onload = function() {
              console.log(this.width + " " + this.height);
          };
          img.onerror = function() {
              console.log( "not a valid file: " + file.type);
          };
          img.src = _URL.createObjectURL(file);


      }

  });*/
    
    window.topLineText = "";
    window.bottomLineText = "";
    var input1 = document.getElementById('topLineText');
    var input2 = document.getElementById('bottomLineText');
    input1.oninput = textChangeListener;
    input2.oninput = textChangeListener;
    document.getElementById('file').addEventListener('change', handleFileSelect, false);
    //document.getElementById('file').addEventListener('drop', handleFileDrop, false);
    document.querySelector('button').addEventListener('click', saveFile, false);