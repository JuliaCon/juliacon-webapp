import React, { useState, useLayoutEffect } from "react";
import vegaEmbed from "vega-embed";
import { css } from "emotion";

import spec from "../../assets/vega/schedule";
import data from "../../assets/vega/sched_viz_data";

const ScheduleViz = (props) => {
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
            .insert("talks", data)
            .resize()
            .runAsync()
            .then((v) => {
              setView(v);
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
          return () => view.finalize();
        } catch (error) {
          console.log("OH NO - The Schedule Viz Broke!");
          console.log(error);
        }
      });
    }
  }, [view, props, vizRef]);

  useLayoutEffect(() => {
    const update = props.wcHover ? props.wcHover : [];
    view && view.signal("hoverIDs", update).run();
  });

  return (
    <div
      ref={vizRef}
      className={css`
        max-width: 100%;
        overflow: auto;
      `}
    />
  );
};

export default ScheduleViz;
