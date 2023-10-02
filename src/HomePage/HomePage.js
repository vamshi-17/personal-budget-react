import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import Chart from 'chart.js/auto';
import axios from 'axios';

function HomePage() {

    var data = {
        datasets: [
            {
                data: [],
                backgroundColor: [
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fc6b19',
                '#ff5733',
                '#117a65',
                '#9b59b6'
                ],
            }
        ],
        labels: []
      };

    const [hasExecuted, setHasExecuted] = useState(false);
    const pieChartOptions = {
        responsive: true,
        maintainAspectRatio: false, 
        width: 300,
        height: 300
      };

    useEffect(() => {
        if (!hasExecuted) {
          axios.get('http://localhost:4200/budget')
            .then((response) => {
              if (response.data != null) {
                for (var i = 0; i < response.data.budget.length; i++) {
                  data.labels.push(response.data.budget[i].title);
                  data.datasets[0].data.push(response.data.budget[i].budget);
                }
                createD3Chart(data);
                createChart();
              }
            });
            setHasExecuted(true);
        }
      }, [hasExecuted]);

      const createChart = () => {
        var ctx = document.getElementById("myPieChart");
        const myPieChart = new Chart(ctx, {
            type: 'pie',
            data: data,
            options: pieChartOptions
        });
      }
      
  return (
    <main className="container center" id="main" aria-label="main">

        <div className="page-area">

          <article>
           <h1>Stay on track</h1>
          <p>
             Do you know where you are spending your money? If you really stop to
            track it down, you would get surprised! Proper budget management
          depends on real data... and this app will help you with that!
           </p>
         </article>

         <article>
           <h1>Alerts</h1>
           <p>
             What if your clothing budget ended? You will get an alert. The goal
             is to never go over the budget.
           </p>
         </article>

         <article>
           <h1>Results</h1>
           <p>
             People who stick to a financial plan, budgeting every expense, get
             out of debt faster! Also, they to live happier lives... since they
             expend without guilt or fear... because they know it is all good and
             accounted for.
           </p>
         </article>

         <article>
           <h1>Free</h1>
           <p>This app is free!!! And you are the only one holding your data!</p>
         </article>

         <article>
           <h1>Stay on track</h1>
           <p>
             Do you know where you are spending your money? If you really stop to
             track it down, you would get surprised! Proper budget management
             depends on real data... and this app will help you with that!
           </p>
         </article>

         <article>
           <h1>Alerts</h1>
           <p>
             What if your clothing budget ended? You will get an alert. The goal
             is to never go over the budget.
           </p>
         </article>
        <article>
          <div className="charts">
            <h1>Doughnut-Chart</h1>
            <div className="donut-chart" width="300" height="300"></div>
          </div>
         </article>
        <article>
        <div className="text-box">
            <h1>Pie-Chart</h1>
            <p>
                <canvas id="myPieChart"></canvas>
            </p>
        </div>
        </article>
        </div>
    </main>
  );
}



function createD3Chart(data) {

  const width = 300;

  const height = 300;
  
  const radius = Math.min(width, height) / 2;

  const svg = d3.select('.donut-chart')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .append('g')
  .attr('transform', `translate(${width / 2},${height / 2})`);

  const color = d3.scaleOrdinal()
    .domain(data.labels)
    .range(data.datasets[0].backgroundColor);

  const pie = d3.pie()
    .value(d => d);

  const path = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 70);

  const arc = svg.selectAll('.arc')
    .data(pie(data.datasets[0].data))
    .enter()
    .append('g')
    .attr('class', 'arc');

  arc.append('path')
    .attr('d', path)
    .attr('fill', (d, i) => color(data.labels[i]));

  arc.append('text')
    .attr('transform', d => `translate(${path.centroid(d)})`)
    .attr('dy', '.35em')
    .text((d, i) => data.labels[i]);
}

export default HomePage;
