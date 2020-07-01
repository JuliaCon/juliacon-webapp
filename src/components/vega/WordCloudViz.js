import React, { useState, useLayoutEffect } from "react";
import vegaEmbed from "vega-embed";
import spec from "../../assets/vega/wordCloud";
import data from "../../assets/vega/wordcloud_viz_data";

const WordCloudViz = (props) => {
  const [view, setView] = useState(null);
  const [rendered, setRendered] = useState(false);

  useLayoutEffect(() => {
    if (!rendered) {
      vegaEmbed("#wordcloud", spec, {
        mode: "vega",
        actions: false,
        renderer: "svg",
      }).then((res) => {
        try {
          res.view
            .insert("corpus", data)
            .runAsync()
            .then((v) => {
              // console.log(view)
              setView(v);
              // update the global state with the current mouseover
              v.addEventListener("mouseover", (name, value) => {
                if (value && value.datum.talks) {
                  props.setHover(value.datum.talks);
                } else {
                  props.setHover([]);
                }
              });

              v.addEventListener("mouseout", (name, value) => {
                props.setHover([]);
              });
            });
        } catch (error) {
          console.log("OH NO - The Word Cloud Viz Broke!");
          console.log(error);
        }
      });
      setRendered(true);
    }
  }, [rendered, props]);

  useLayoutEffect(() => {
    view && view.signal("hoverID", props.schedHover).run();
  });

  return <div id="wordcloud"></div>;
};

export default WordCloudViz;
