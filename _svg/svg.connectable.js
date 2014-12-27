;(function() {

    var isInited = false;
    var marker = null;
    SVG.extend(SVG.Element, {
        connectable: function(options, elmTarget) {

            if (elmTarget === undefined) {
                elmTarget = options;
                options = {};
            }

            var elmSource = this;
            var line = options.container.line().attr("marker-end", "url(#triangle)");
            var markers = options.markers;

            // Source and target positions
            var sPos = {};
            var tPos = {};

            function updateLine() {

                sPos = elmSource.transform();
                tPos = elmTarget.transform();

                var x1 = sPos.x;
                var y1 = sPos.y;
                var x2 = tPos.x;
                var y2 = tPos.y;

                var dx = x2 - x1;
                var dy = y2 - y1;

                if (Math.abs(dy) < 150) {
                    if (dx < 0) {
                        x1 -= 25;
                        x2 += 30;
                    } else {
                        x2 -= 30;
                        x1 += 25;
                    }
                } else {
                    if (dy < 0) {
                        y1 -= 25;
                        y2 += 30;
                    } else {
                        y2 -= 30;
                        y1 += 25;
                    }
                }

                line.attr({
                    x1: x1,
                    y1: y1,
                    x2: x2,
                    y2: y2
                });
            }

            if (isInited === false) {
                marker = markers.marker(10, 10);
                marker.attr({
                    id: "triangle",
                    viewBox: "0 0 10 10",
                    refX: "0",
                    refY: "5",
                    markerUnits: "strokeWidth",
                    markerWidth: "4",
                    markerHeight: "5"
                });

                marker.path().attr({
                    d: "M 0 0 L 10 5 L 0 10 z"
                });

                isInited = true;
            }


            updateLine();

            elmSource.dragmove = updateLine;
            elmTarget.dragmove = updateLine;

            return elmSource;
        }
    });
}).call(this);
