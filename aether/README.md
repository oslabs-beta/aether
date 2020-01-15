<p>
  <img width="250px" src="./assets/AetherLogo01.png" />
</p>

# aether

Memory leak management tool for visualizing and tracking memory usage in real-time.

The best way to evaluate your memory footprint is to look at heap usage. There is a growing number of tools for debugging and profiling memory usage in Node.JS applications, but there is still a need for a one-stop module with live updates in a chart format.

After installing `aether_memory` tool, you can observe the memory usage and be able to notice if you have a memory leak in your application, by just looking at the graph report. Take a look at the Bubble chart that is rendering all your nodes, arrays, strings and other types of data.

## Features

- Tracking memory footprint of your application to help trace down memory leaks
---
<p>
  <img width="500px" src="./assets/ChartExample.png" />
</p>

- Presenting total memory usage over time in a chart format with live updates every 5 seconds
---
<p>
  <img width="500px" src="./assets/BubbleChartExample.png" />
</p>

- Visualizing all types of values in a pretty Bubble chart format
---
## How it works

`aether_memory` uses `node-heapdump` to take snapshots of the heap with 5 seconds intervals. The physical file is created in 'snapshot' folder and parsed through. After the data is analyzed and displayed and the file gets deleted before the next snapshot is taken, minimizing its own memory footprint and avoiding false results.

---
## Installation

- Fork and clone this repo

or install directly in your application:

```
npm install aether_memory

```
---
## Usage

- In your server invoke  `aether.start()`
- Go to your [localhost:9000](http://localhost:9000/)
- Observe the live memory usage

---
## Technologies

* [node-heapdump](https://github.com/bnoordhuis/node-heapdump)
* [React](https://github.com/facebook/react)
* [Express](https://github.com/expressjs/express)
* [socket.io](https://github.com/socketio/socket.io)
* [React-Router](https://github.com/ReactTraining/react-router)
* [react-bubble-chart-d3](https://github.com/weknowinc/react-bubble-chart-d3)
* [chartjs](https://github.com/chartjs)
* [Webpack](https://github.com/webpack/webpack)
---
## Contributing and Issues

We are always looking to improve. For major changes, please open an issue first to discuss what you would like to change, pull requests are welcome.

---
## Authors

- **Anna Konstantinovich** - [@anreko](https://github.com/anreko)
- **Denis Belioglo** - [@DenisB27](https://github.com/DenisB27)
- **Sejan Miah** - [@sejdemi](https://github.com/sejdemi)
- **Vessy Shestorkina** - [@Ve33y](https://github.com/Ve33y)
---

## License
This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/)