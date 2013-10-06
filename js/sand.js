function Sand(dimension) {
    this.sandPatternImage = new Image();
    this.sandPatternImage.src = "sand_pattern.png";

    this.dimension = dimension;
    this.refresh();
}

Sand.prototype.refresh = function() {
    this.vertices = this.generateSandPattern();
};

Sand.prototype.generateSandPattern = function() {
    var dimension = this.dimension,
        maxX = dimension.width,
        minY = dimension.height * 0.4,
        maxY = dimension.height * 0.6,
        vX = 0, vY = minY,
        startX = 0, vertex,
        resetY = function(dY) {
            return (dimension.height - dY);
        },
        vertices = [{
            x: startX,
            y: resetY(_.random(minY, maxY))
        }], closeLoop = function() {
                var len = vertices.length,
                    dY = dimension.height;
                vertices.push({
                    x: vertices[len-1].x,
                    y: dY
                }, {
                    x: vertices[0].x,
                    y: dY
                });
            };

    while (vX < maxX) {
        vX += _.random(15, 20);
        vY = _.random(minY, maxY);

        vertex = {
            x: vX,
            y: resetY(vY)
        };

        vertices.push(vertex);
    }

    closeLoop();

    return vertices;
    //return [{"x":0,"y":149},{"x":19,"y":187},{"x":36,"y":252},{"x":52,"y":154},{"x":71,"y":220},{"x":86,"y":262},{"x":104,"y":279},{"x":121,"y":127},{"x":141,"y":260},{"x":161,"y":103},{"x":179,"y":231},{"x":196,"y":156},{"x":212,"y":185},{"x":232,"y":246},{"x":247,"y":205},{"x":267,"y":149},{"x":287,"y":105},{"x":304,"y":281},{"x":323,"y":222},{"x":340,"y":143},{"x":356,"y":189},{"x":371,"y":102},{"x":391,"y":174},{"x":406,"y":154},{"x":424,"y":200},{"x":441,"y":128},{"x":461,"y":228},{"x":481,"y":125},{"x":500,"y":170},{"x":516,"y":215},{"x":531,"y":139},{"x":546,"y":128},{"x":564,"y":163},{"x":579,"y":274},{"x":598,"y":229},{"x":617,"y":187},{"x":633,"y":201},{"x":648,"y":287},{"x":648,"y":480},{"x":0,"y":480}];
};

Sand.prototype.getLineWithX = function(x) {
    var index = 0,
        vertices = this.vertices,
        verticesLength = vertices.length, p1, p2, dimH = this.dimension.height;
    for(index = 0; index < verticesLength-1; index++) {
        p1 = vertices[index];
        p2 = vertices[index+1];

        if(p1.x <= x && p2.x >= x) {
            return {
                x1: p1.x,
                x2: p2.x,
                y1: p1.y,
                y2: p2.y
            }
        }
    }
}

Sand.prototype.draw = function(context) {
    var vertices = this.vertices,
        startVertex = vertices[0],
        pattern;

    context.save();

    context.beginPath();
    context.moveTo(vertices[0].x, vertices[0].y);
    for(var i=1; i<vertices.length; i++) {
        context.lineTo(vertices[i].x, vertices[i].y);
    }
    context.closePath();

    pattern = context.createPattern(this.sandPatternImage, 'repeat');
    context.fillStyle = pattern;
    context.fill();
    context.restore();
};