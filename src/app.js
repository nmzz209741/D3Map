import * as d3 from 'd3'

let margin = {
  top: 10,
  right: 20,
  bottom: 10,
  left: 20,
}, width = 1200 - margin.left - margin.right,
  height = 800 - margin.top - margin.bottom

let svg = d3.select('#root')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)

svg = svg.append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`)

d3.json('/data/us-states.json').then(function (data) {
  console.info(data)
  const aProjection = d3.geoAlbersUsa().translate([600,300])
  const geoPath = d3.geoPath().projection(aProjection);
  d3.select('svg').selectAll('path').data(data.features)
    .enter()
    .append('path')
    .attr('d', geoPath)
    .attr('class', 'us-states');
})

