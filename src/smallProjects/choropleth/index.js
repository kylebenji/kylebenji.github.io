const mapHeight = 600;
const mapWidth = 1000;

const educationFile =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
const countyFile =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";

//creating svg
const svg = d3.select("svg").attr("height", mapHeight).attr("width", mapWidth);

//map
const path = d3.geoPath();

//map and scale
const data = new Map();
const colorScale = d3
  .scaleThreshold()
  .domain(d3.range(2.6, 75.1, (75.1 - 2.6) / 8))
  .range(d3.schemeGreens[9]);

//tooltip
const tooltip = d3
  .select("body")
  .append("div")
  .attr("class", "tooltip")
  .attr("id", "tooltip");

//legend
const legendX = d3.scaleLinear().domain([2.6, 75.1]).range([600, 860]);

const legendXAxis = d3
  .axisBottom()
  .scale(legendX)
  .tickValues(colorScale.domain())
  .tickFormat((x) => Math.round(x) + "%");

const legend = svg
  .append("g")
  .attr("id", "legend")
  .attr("transform", "translate(0,40)");

legend
  .append("g")
  .selectAll("rect")
  .data(
    colorScale.range().map(function (color) {
      const d = colorScale.invertExtent(color);
      console.log(d);
      if (d[0] === null) {
        d[0] = legendX.domain()[0];
      }
      if (d[1] === null) {
        d[1] = legendX.domain()[1];
      }
      return d;
    })
  )
  .enter()
  .append("rect")
  .style("fill", function (d) {
    return colorScale(d[0]);
  })
  .attr("x", (d) => legendX(d[0]))
  .attr("y", 0)
  .attr("width", (d) =>
    d[0] && d[1] ? legendX(d[1]) - legendX(d[0]) : legendX(null)
  )
  .attr("height", 6);

legend.append("g").call(legendXAxis).select(".domain").remove();

//render on data load
function ready(education, us) {
  console.log(us);
  console.log(education);
  education.map((d) => {
    data.set(d.fips, {
      state: d.state,
      county: d.area_name,
      eduPercent: d.bachelorsOrHigher,
    });
  });
  console.log(data);

  svg
    .append("g")
    .attr("class", "counties")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.counties).features)
    .enter()
    .append("path")
    .attr("class", "county")
    .attr("d", path)
    .attr("fill", (d) => colorScale(data.get(d.id).eduPercent))
    .attr("data-fips", (d) => d.id)
    .attr("data-education", (d) => data.get(d.id).eduPercent)
    .on("mouseover", (event, d) => {
      const info = data.get(d.id);

      tooltip.style("opacity", 0.9).attr("data-education", info.eduPercent);
      tooltip
        .html(`<p>${info.county}, ${info.state}: ${info.eduPercent}%</p>`)
        .style("left", event.pageX + "px")
        .style("top", event.pageY - 28 + "px");
    })
    .on("mouseout", function () {
      d3.select(this).transition().duration(500);
      tooltip.style("opacity", 0);
    });
}

// Load external data and boot
Promise.all([d3.json(educationFile), d3.json(countyFile)]).then((loadData) => {
  ready(loadData[0], loadData[1]);
});
