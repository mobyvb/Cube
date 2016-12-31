function Room(scene, resolution, imageList) {
  this.scene = scene;
  this.resolution = resolution;
  this.imageList = imageList;
  this.setImageData();
  this.createWalls();
}

Room.prototype = {
  setImageData: function() {
    var self = this;
    self.imageData = {};
    self.colors = {};
    var canvas = document.getElementById('image-analyzer');
    var ctx = canvas.getContext('2d');

    self.imageList.forEach(function(imageName) {
      var imageEl = document.getElementById(imageName);
      ctx.drawImage(imageEl, 0, 0, self.resolution, self.resolution);
      self.imageData[imageName] = [];

      for (var x=0; x<self.resolution; x++) {
        var nextRow = [];

        for (var y=0; y<self.resolution; y++) {
          var pixelData = ctx.getImageData(x, y, 1, 1).data;
          var colorStr = 'rgb(' + pixelData[0] + ',' + pixelData[1] + ',' + pixelData[2] + ')';
          var color;

          if (self.colors[colorStr]) {
            color = self.colors[colorStr];
          } else {
            color = new THREE.Color(colorStr);
            self.colors[colorStr] = color;
          }

          nextRow.push(color);
        }

        self.imageData[imageName].push(nextRow);
      }
    });
  },

  createWalls: function() {
    // TODO use a loop

    var side = this.imageList[0];
    var sideData = this.imageData[side];

    for (var x=0; x<this.resolution; x++) {

      for (var y=0; y<this.resolution; y++) {
        var color = sideData[x][y];
        var geometry = new THREE.PlaneGeometry(1, 1);
        var material = new THREE.MeshBasicMaterial( { color: color } );
        var plane = new THREE.Mesh( geometry, material );
        plane.rotation.x = 0;

        plane.position.set(x, y, -0.5);
        scene.add(plane);
      }
    }

    side = this.imageList[1];
    sideData = this.imageData[side];

    for (var x=0; x<this.resolution; x++) {

      for (var z=0; z<this.resolution; z++) {
        var color = sideData[x][z];
        var geometry = new THREE.PlaneGeometry(1, 1);
        var material = new THREE.MeshBasicMaterial( { color: color } );
        var plane = new THREE.Mesh( geometry, material );
        plane.rotation.x = Math.PI/2;

        plane.position.set(x, this.resolution-0.5, z);
        scene.add(plane);
      }
    }

    side = this.imageList[2];
    sideData = this.imageData[side];

    for (var y=0; y<this.resolution; y++) {

      for (var z=0; z<this.resolution; z++) {
        var color = sideData[y][z];
        var geometry = new THREE.PlaneGeometry(1, 1);
        var material = new THREE.MeshBasicMaterial( { color: color } );
        var plane = new THREE.Mesh( geometry, material );
        plane.rotation.y = -Math.PI/2;

        plane.position.set(this.resolution-0.5, y, z);
        scene.add(plane);
      }
    }

    side = this.imageList[3];
    sideData = this.imageData[side];

    for (var x=0; x<this.resolution; x++) {

      for (var z=0; z<this.resolution; z++) {
        var color = sideData[x][z];
        var geometry = new THREE.PlaneGeometry(1, 1);
        var material = new THREE.MeshBasicMaterial( { color: color } );
        var plane = new THREE.Mesh( geometry, material );
        plane.rotation.x = -Math.PI/2;

        plane.position.set(x, -0.5, z);
        scene.add(plane);
      }
    }

    side = this.imageList[4];
    sideData = this.imageData[side];

    for (var y=0; y<this.resolution; y++) {

      for (var z=0; z<this.resolution; z++) {
        var color = sideData[y][z];
        var geometry = new THREE.PlaneGeometry(1, 1);
        var material = new THREE.MeshBasicMaterial( { color: color } );
        var plane = new THREE.Mesh( geometry, material );
        plane.rotation.y = Math.PI/2;

        plane.position.set(-0.5, y, z);
        scene.add(plane);
      }
    }

    side = this.imageList[5];
    sideData = this.imageData[side];

    for (var x=0; x<this.resolution; x++) {

      for (var y=0; y<this.resolution; y++) {
        var color = sideData[x][y];
        var geometry = new THREE.PlaneGeometry(1, 1);
        var material = new THREE.MeshBasicMaterial( { color: color } );
        var plane = new THREE.Mesh( geometry, material );
        plane.rotation.x = Math.PI;

        plane.position.set(x, y, this.resolution-0.5);
        scene.add(plane);
      }
    }
  }
};
