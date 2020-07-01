import React, { Component } from "react";
import vegaEmbed from "vega-embed";
import spec from "../../assets/vega/wordCloud";
import data from "../../assets/vega/wordcloud_viz_data";

export default class WordCloudViz extends Component {
  constructor(props) {
    super(props);

    this.view = null;
  }

  updateView(v) {
    this.view = v;
  }

  componentDidMount() {
    // console.log(spec);

    vegaEmbed("#wordcloud", spec, {
      mode: "vega",
      actions: false,
      renderer: "svg",
    }).then((res) => {
      try {
        res.view
          .insert("corpus", data)
          .runAsync()
          .then((view) => {
            // console.log(view)
            this.updateView(view);
            // update the global state with the current mouseover
            view.addEventListener("mouseover", (name, value) => {
              if (value && value.datum.talks) {
                this.props.setHover(value.datum.talks);
              } else {
                this.props.setHover([]);
              }
            });

            view.addEventListener("mouseout", (name, value) => {
              this.props.setHover([]);
            });
          });
      } catch (error) {
        console.log("OH NO - The Word Cloud Viz Broke!");
        console.log(error);
      }
    });
  }

  componentDidUpdate() {
    this.view.signal("hoverID", this.props.schedHover).run();
  }

  render() {
    return <div id="wordcloud"></div>;
  }
}
