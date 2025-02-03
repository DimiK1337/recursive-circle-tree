import React from "react";
import PropTypes from 'prop-types';
import { Network } from "d3plus-react";

const Graph = ({ data }) => {
    console.log("Graph data:", data); // Log the data to see if it is being passed correctly

    return (
        <Network config={{
            groupBy: "id",
            nodes: data.nodes,
            links: data.links,
            nodeId: "id",
            linkSource: "source",
            linkTarget: "target",
            nodeSize: d => d.size || 10,
            nodeLabel: d => d.name,
            nodeColor: d => d.color || "#ffab00",
            linkColor: "#999",
            linkWidth: 2,
            linkOpacity: 0.6,
            width: window.innerWidth,
            height: window.innerHeight
        }} />
    );
};

Graph.propTypes = {
    data: PropTypes.shape({
        nodes: PropTypes.arrayOf(PropTypes.object).isRequired,
        links: PropTypes.arrayOf(PropTypes.object).isRequired
    }).isRequired
};

export default Graph;
