// an example simple directive with a template in a separate file 
define(['./clock', 'd3'], function(clock, d3) {
  'use strict';
  return function() {

    var radians = 0.0174532925,
      clockRadius = 150,
      margin = 50,
      width = (clockRadius + margin) * 2,
      height = (clockRadius + margin) * 2,
      hourHandLength = 2 * clockRadius / 3,
      minuteHandLength = clockRadius,
      secondHandLength = clockRadius - 12,
      secondHandBalance = 0,
      secondTickStart = clockRadius,
      secondTickLength = -10,
      hourTickStart = clockRadius,
      hourTickLength = -18,
      secondLabelRadius = clockRadius + 16,
      secondLabelYOffset = 5,
      hourLabelRadius = clockRadius - 40,
      hourLabelYOffset = 7;

    var hourScale = d3.scale.linear()
      .range([0, 330])
      .domain([0, 11]);

    var minuteScale = d3.scale.linear()
      .range([0, 354])
      .domain([0, 59]);

    var secondScale = d3.scale.linear()
      .range([0, 354])
      .domain([0, 59]);

    var handData = [{
      type: 'hour',
      value: 0,
      length: -hourHandLength,
      scale: hourScale
    }, {
      type: 'minute',
      value: 0,
      length: -minuteHandLength,
      scale: minuteScale
    }, {
      type: 'second',
      value: 0,
      length: -secondHandLength,
      scale: secondScale,
      balance: secondHandBalance
    }];


    function applyProperties(scope, element, clockFaceId) {

      var attributes = {
        'attribute1': 'background-color',
        'attribute2': 'border-color',
        'attribute3': 'seconds-tick-enabled'
      };

      for (var propt in attributes) {
        var elemPropValue = element.attr(attributes[propt]),
          elemProp = attributes[propt],
          elementId = element.attr('id');

        if (elemProp === 'background-color') {
          d3.select('#' + elementId + ' .outercircle').attr('fill', elemPropValue);
        }
        if (elemProp === 'border-color') {
          d3.select('#' + elementId + ' .outercircle').attr('stroke', elemPropValue);
          d3.selectAll('#' + elementId + ' .hour-tick').attr('stroke', elemPropValue);
        }
        if (elemProp === 'seconds-tick-enabled' && elemPropValue === 'false') {
          d3.select('#' + elementId + ' .second-hand').attr('display', 'none');
        }
      }
    }

    function drawClock(scope, element) { //create all the clock elements
      updateData(scope, element); //draw them in the correct starting position
      var elemId = element.attr('id'),
        clockFaceId = elemId + '-face';

      var svg = d3.select('#' + elemId).append("svg")
        .attr('class', 'inner-container')
        .attr("width", width)
        .attr("height", height);

      var face = svg.append('g')
        .attr('id', clockFaceId)
        .attr('transform', 'translate(' + (clockRadius + margin) + ',' + (clockRadius + margin) + ')');

      face.append("svg:circle").attr("r", clockRadius).attr("fill", "none").attr("class", "clock outercircle").attr("stroke", "black").attr("stroke-width", 5);

      face.selectAll('#' + clockFaceId + ' .hour-tick')
        .data(d3.range(0, 12)).enter()
        .append('line')
        .attr('class', 'hour-tick')
        .attr('x1', 0)
        .attr('x2', 0)
        .attr('y1', hourTickStart)
        .attr('y2', hourTickStart + hourTickLength)
        .attr('transform', function(d) {
          return 'rotate(' + hourScale(d) + ')';
        });

      face.selectAll('#' + clockFaceId + '  .hour-label')
        .data(d3.range(3, 13, 3))
        .enter()
        .append('text')
        .attr('class', 'hour-label')
        .attr('text-anchor', 'middle')
        .attr('x', function(d) {
          return hourLabelRadius * Math.sin(hourScale(d) * radians);
        })
        .attr('y', function(d) {
          return -hourLabelRadius * Math.cos(hourScale(d) * radians) + hourLabelYOffset;
        })
        .text(function(d) {
          return d;
        });


      var hands = face.append('g').attr('class', 'clock-hands');

      face.append('g').attr('class', 'face-overlay')
        .append('circle').attr('class', 'hands-cover')
        .attr('x', 0)
        .attr('y', 0)
        .attr('r', clockRadius / 30);

      hands.selectAll('line')
        .data(handData)
        .enter()
        .append('line')
        .attr('class', function(d) {
          return d.type + '-hand';
        })
        .attr('x1', 0)
        .attr('y1', function(d) {
          return d.balance ? d.balance : 0;
          //return 0;
        })
        .attr('x2', 0)
        .attr('y2', function(d) {
          return d.length + 26;
        })
        .attr('transform', function(d) {
          return 'rotate(' + d.scale(d.value) + ')';
        });


      applyProperties(scope, element, clockFaceId);
    }


    function moveHands(scope, id) {
      d3.selectAll('#' + id + ' .clock-hands').selectAll('line')
        .data(handData)
        .transition()
        .attr('transform', function(d) {
          return 'rotate(' + d.scale(d.value) + ')';
        });
    }

    function updateData(scope, element) {

      var today = new Date();
      today.setHours(today.getHours() + parseFloat(element.attr('offset')));

      handData[0].value = (today.getHours() % 12) + today.getMinutes() / 60;
      handData[1].value = today.getMinutes();
      handData[2].value = today.getSeconds();
    }

    return {

      link: function(scope, element, attrs) {
        drawClock(scope, element);
        setInterval(function() {
          updateData(scope, element);
          moveHands(scope, element.attr('id'));
        }, 1000);
      }
    };
  };
});
