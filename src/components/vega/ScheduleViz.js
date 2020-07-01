import React, { useState, useLayoutEffect } from "react";
import vegaEmbed from "vega-embed";
import spec from "../../assets/vega/schedule";
import data from "../../assets/vega/sched_viz_data";

const ScheduleViz = (props) => {
  const [view, setView] = useState(null);
  const [rendered, setRendered] = useState(false);

  useLayoutEffect(() => {
    if (!rendered) {
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
            .then((v) => {
              setView(v);
              console.log(v);
              // update the global state with the current mouseover
              v.addEventListener("mouseover", (name, value) => {
                if (value && value.datum.index) {
                  props.setHover(value.datum.index);
                } else {
                  props.setHover(null);
                }
              });

              v.addEventListener("mouseout", (name, value) => {
                props.setHover(null);
              });
            });
        } catch (error) {
          console.log("OH NO - The Schedule Viz Broke!");
          console.log(error);
        }
      });
      setRendered(true);
    }
  }, [rendered, props]);

  useLayoutEffect(() => {
    var update = props.wcHover ? props.wcHover : [];
    view && view.signal("hoverIDs", update).run();
  });

  return <div id="schedule"></div>;
};

export default ScheduleViz;
