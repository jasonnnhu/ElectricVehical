// add your JavaScript/D3 to this file
let data = [
  { maker: "TESLA", count: 72442 },
  { maker: "NISSAN", count: 13794 },
  { maker: "CHEVROLET", count: 12567 },
  { maker: "FORD", count: 8009 },
  { maker: "BMW", count: 6842 },
  { maker: "KIA", count: 6753 },
  { maker: "TOYOTA", count: 5534 },
  { maker: "VOLKSWAGEN", count: 4424 },
  { maker: "VOLVO", count: 3746 },
  { maker: "JEEP", count: 3689 },
  { maker: "HYUNDAI", count: 3670 },
  { maker: "AUDI", count: 3246 },
  { maker: "RIVIAN", count: 2934 },
  { maker: "CHRYSLER", count: 2859 },
  { maker: "MERCEDES-BENZ", count: 1189 },
  { maker: "PORSCHE", count: 1065 },
  { maker: "MITSUBISHI", count: 911 },
  { maker: "HONDA", count: 833 },
  { maker: "MINI", count: 821 },
  { maker: "POLESTAR", count: 804 },
  { maker: "FIAT", count: 795 },
  { maker: "SUBARU", count: 690 },
  { maker: "SMART", count: 276 },
  { maker: "MAZDA", count: 269 },
  { maker: "LINCOLN", count: 236 },
  { maker: "JAGUAR", count: 220 },
  { maker: "LUCID", count: 208 },
  { maker: "LEXUS", count: 201 },
  { maker: "CADILLAC", count: 197 },
  { maker: "GENESIS", count: 130 },
  { maker: "LAND ROVER", count: 48 },
  { maker: "ALFA ROMEO", count: 19 },
  { maker: "FISKER", count: 17 },
  { maker: "AZURE DYNAMICS", count: 8 },
  { maker: "TH!NK", count: 5 },
  { maker: "WHEEGO ELECTRIC CARS", count: 3 },
  { maker: "BENTLEY", count: 2 },
  { maker: "DODGE", count: 2 }
];

// Set dimensions and margins for the graph
const margin = {top: 30, right: 30, bottom: 70, left: 60},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

const svg = d3.select("#chart")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Append title to the SVG canvas
svg.append("text")
    .attr("x", width / 2)
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .text("Distribution of Electric Vehicles (EVs) by Makers");

// X-axis scale
const x = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.count)])
    .range([0, width]);

// X-axis
const xAxis = svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x));

// Y-axis scale
const y = d3.scaleBand()
    .range([0, height])
    .domain(data.map(d => d.maker))
    .padding(0.1);

// Y-axis
const yAxis = svg.append("g")
    .call(d3.axisLeft(y));

// Tooltip for bar hover
const tooltip = d3.select("#tooltip");

// Creating and updating bars
svg.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", x(0))
    .attr("y", d => y(d.maker))
    .attr("width", d => x(d.count))
    .attr("height", y.bandwidth())
    .on("mouseover", (event, d) => {
        tooltip.transition()
            .duration(200)
            .style("opacity", 0.9);
        tooltip.html(d.count)
            .style("left", (event.pageX) + "px")
            .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", () => {
        tooltip.transition()
            .duration(500)
            .style("opacity", 0);
    });
