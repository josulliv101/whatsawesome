"use client";

import * as d3 from "d3";
import { format } from "date-fns";
import Link from "next/link";
import { CSSProperties, useEffect, useRef } from "react";

export default function BubbleAvatars({ data = [] }: { data: Array<any> }) {
  const ref = useRef(null);
  const refIsMounted = useRef(false);
  var width = 814;
  var height = 400;

  useEffect(() => {
    console.log("useEffect", ref?.current, refIsMounted);
    if (!!refIsMounted.current) {
      console.log("useEffect2", ref?.current, refIsMounted);
      return;
    }

    refIsMounted.current = true;

    // set the dimensions and margins of the graph

    // append the svg object to the body of the page
    // var svgOrig = d3
    //   .select("#my_dataviz")
    //   .append("svg")
    //   .attr("xmlns", "http://www.w3.org/2000/svg")
    //   .attr("width", width)
    //   .attr("height", height);

    // var defs = svgOrig.append("defs");
    /*
    data.forEach(({ id, name, pic, size }) => {
      defs
        .append("pattern")
        .attr("id", id)
        .attr("patternContentUnits", "objectBoundingBox")
        .attr("height", "100%")
        .attr("width", "100%")
        .append("image")
        .attr("xlink:href", pic)
        .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
        .attr("height", 1)
        .attr("width", 1)
        .attr("preserveAspectRatio", "none");
    });
*/
    // Initialize the circle: all located at the center of the svg area
    // var node = svgOrig.append("g").selectAll("circle").data(data);
    // .enter();
    // .append("circle");

    // console.log("node", node);
    /*
    // Features of the forces applied to the nodes:
    var simulation = d3
      .forceSimulation()
      .force(
        "center",
        d3
          .forceCenter()
          .x(width / 2)
          .y(height / 2)
      ) // Attraction to the center of the svg area
      .force("charge", d3.forceManyBody().strength(1)) // Nodes are attracted one each other of value is > 0
      .force(
        "collide",
        d3
          .forceCollide()
          .strength(0.1)
          .radius((d) => d.size * 1.5 + 2)
          .iterations(1)
      ); // Force that avoids circle overlapping

    // Apply these forces to the nodes and update their positions.
    // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
    simulation.nodes(data).on("tick", function (d) {
      node
        .attr("cx", function (d) {
          return d.x;
        })
        .attr("cy", function (d) {
          return d.y;
        });
    });


    */
    const w = ref.current ? (ref.current as HTMLDivElement).clientWidth : width;
    var svg = d3.select("#svg_container").selectAll(".circle").data(data);
    console.log("svg bind data", svg, ref);
    console.log("w", w);

    // var node = svg.selectAll("circle").enter();

    // Features of the forces applied to the nodes:
    var simulation = d3
      .forceSimulation()
      .force(
        "center",
        d3
          .forceCenter()
          .x((w / 2) * 1)
          .y(height / 2 + 0)
      ) // Attraction to the center of the svg area
      .force("charge", d3.forceManyBody().strength(1)) // Nodes are attracted one each other of value is > 0
      .force(
        "collide",
        d3
          .forceCollide()
          .strength(0.1)
          .radius((d: any) => d.size * 1.5 + 2)
          .iterations(1)
      ) // Force that avoids circle overlapping
      .force("charge", d3.forceY(0).strength(0.05));

    // Apply these forces to the nodes and update their positions.
    // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
    //
    // @ts-ignore
    simulation.nodes(data).on("tick", (d: any, a: any, b: any) => {
      // @ts-ignore
      // console.log("args", d, args, this);
      svg
        .attr("cx", function (d) {
          return d.x;
        })
        .attr("cy", function (d) {
          return d.y * 1;
        })
        .attr("opacity", 1);
    });

    // What happens when a circle is dragged?
    // @ts-ignore
    function dragstarted(d) {
      console.log("d1", d);
      // @ts-ignore
      d3.select(this).raise().attr("stroke", "blue");
      if (!d.active) simulation.alphaTarget(0.3).restart();
      //   d.fx = d.x;
      //   d.fy = d.y;
    }
    // @ts-ignore
    function dragged(event, d) {
      d.x = event.x;
      d.y = event.y;
      // @ts-ignore
      d3.select(this).attr("cx", d.x).attr("cy", d.y);
    }
    // @ts-ignore
    function dragended(d) {
      console.log("d3", d);
      // @ts-ignore
      d3.select(this).attr("stroke", "white");
      if (!d.active) simulation.alphaTarget(0.03);
      // if (!d.active) simulation.alphaTarget(0.3).restart();
      //   d.fx = null;
      //   d.fy = null;
    }
  }, []);

  return (
    <div ref={ref} className="flex w-full items-center justify-center border">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        // width="100%"
        // height="100%"
        // viewBox="0 0 100% 100%"
        id="svg_container"
        preserveAspectRatio="xMidYMid meet"
        viewBox={`0 0 ${
          ref.current ? (ref.current as HTMLDivElement).clientWidth : width
        } ${height}`}
        // style={{ height: "660px", width: "100%" }}
      >
        <defs>
          {data.map(({ id, pic }) => (
            <pattern
              key={id}
              id={id}
              // patternUnits="objectBoundingBox"
              patternContentUnits="objectBoundingBox"
              width="100%"
              height="100%"
            >
              <image
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xlinkHref={pic}
                height={1}
                width={1}
                preserveAspectRatio="none"
                imageRendering="true"
              />
            </pattern>
          ))}

          <pattern />
        </defs>
        <g>
          {data.map(({ id, pic, size }, index) => (
            <circle
              key={id}
              className="circle"
              r={size * 1.5}
              cx={width / 2}
              cy={height / 2}
              fill={`url(#${id})`}
              stroke="#fff"
              strokeOpacity={0.9}
              strokeWidth={4}
              opacity={0}
              preserveAspectRatio="true"
            />
            //<Link key={id} href={`/profile/${id}`}></Link>
          ))}
        </g>
      </svg>
    </div>
  );
}
