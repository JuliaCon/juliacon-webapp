import React, { Component } from "react";
import vegaEmbed from "vega-embed";
import spec from "../../assets/vega/schedule";
import data from "../../assets/vega/sched_viz_data";

export default class ScheduleViz extends Component {
  constructor(props) {
    super(props);
    this.view = null;
  }

  updateView(v) {
    this.view = v;
  }

  componentDidMount() {
    vegaEmbed("#schedule", spec, {
      mode: "vega",
      actions: false,
      renderer: "svg",
    }).then((res) => {
      try {
        res.view
          .insert("talks", data)
          .resize()
          .runAsync()
          .then((view) => {
            this.updateView(view);
            console.log(view);
            // update the global state with the current mouseover
            view.addEventListener("mouseover", (name, value) => {
              if (value && value.datum.index) {
                this.props.setHover(value.datum.index);
              } else {
                this.props.setHover(null);
              }
            });

            view.addEventListener("mouseout", (name, value) => {
              this.props.setHover(null);
            });
          });
      } catch (error) {
        console.log("OH NO - The Schedule Viz Broke!");
        console.log(error);
      }
    });
  }

  componentDidUpdate() {
    var update = this.props.wcHover ? this.props.wcHover : [];
    this.view.signal("hoverIDs", update).run();
  }

  render() {
    return <div id="schedule"></div>;
  }
}
