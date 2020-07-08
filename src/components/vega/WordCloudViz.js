import React, { useState, useLayoutEffect } from "react";
import vegaEmbed from "vega-embed";
import spec from "../../assets/vega/wordCloud";
import data from "../../assets/vega/wordcloud_viz_data";

const WordCloudViz = (props) => {
  const vizRef = React.createRef();

  const [view, setView] = useState(null);

  useLayoutEffect(() => {
    if (!view) {
      vegaEmbed(vizRef.current, spec, {
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
          return () => view.finalize();
        } catch (error) {
          console.log("OH NO - The Word Cloud Viz Broke!");
          console.log(error);
        }
      });
    }
  }, [view, props, vizRef]);

  useLayoutEffect(() => {
    view && view.signal("hoverID", props.schedHover).run();
  });

  return <div ref={vizRef}></div>;
};

export default WordCloudViz;
