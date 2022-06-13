
//Multiply Matrix
function multiplyMatrix(a, b) {
    var aNumRows = a.length, 
        aNumCols = a[0].length,
        bNumCols = b[0].length,
        matrix = new Array(aNumRows);  // initialize array of rows
    for (var r = 0; r < aNumRows; ++r) {
      matrix[r] = new Array(bNumCols); // initialize the current row
      for (var c = 0; c < bNumCols; ++c) {
        matrix[r][c] = 0;             // initialize the current cell
        for (var i = 0; i < aNumCols; ++i) {
          matrix[r][c] += a[r][i] * b[i][c];             //Multiplies matrix
        }
      }
    }
    return matrix;
}
  
  //Pen Transformation
  var pen = {
      yOffset: 0,
      yOffsetMatrix: new Array(),
      rotation: 0,
      rotationMatrix: new Array(),
      minimumOffset: 300,
      calculatedMatrix: new Array(),
      moveDown: function(){
          this.yOffset = window.pageYOffset/1.45;
          this.yOffsetMatrix = [[1,0,0],[0,1,this.yOffset],[0,0,1]];
      },
      scrollRotate: function(){
          if (window.pageYOffset < this.minimumOffset){
              this.rotation  = 145;
          }else if ((145 + (window.pageYOffset-this.minimumOffset)/6) < 330){
              this.rotation = 145 + (window.pageYOffset-this.minimumOffset)/6;
          }else{
              this.rotation  = 330;
          }
          var rotationRad = this.rotation*Math.PI/180
          this.rotationMatrix = [[Math.cos(rotationRad),-Math.sin(rotationRad),0],[Math.sin(rotationRad),Math.cos(rotationRad),0],[0,0,1]];
      },
      movePen: function(){
          
          let image = document.getElementById("pen");
          this.moveDown();
          this.scrollRotate();
          this.calculatedMatrix = multiplyMatrix(this.yOffsetMatrix, this.rotationMatrix);
          image.style.transform = "matrix("+this.calculatedMatrix[0][0]+","+this.calculatedMatrix[1][0]+","+this.calculatedMatrix[0][1]+","+this.calculatedMatrix[1][1]+","+this.calculatedMatrix[0][2]+","+this.calculatedMatrix[1][2]+")";
          
        }
  }
  
  //Runs when page scrolls
  window.onscroll = function () {
      pen.movePen();
  };
  