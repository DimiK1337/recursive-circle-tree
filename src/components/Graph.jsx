import React, { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import { Network } from "d3plus-react";
import * as d3 from "d3";

const Graph = ({ data = { nodes: [], links: [] }, circleRadius }) => {
    console.log("Graph data:", data);
    const [visibleNodes, setVisibleNodes] = useState(data.nodes.length > 0 ? [data.nodes[0].id] : []); // Initially show only the root node
    const [visibleLinks, setVisibleLinks] = useState([]);
    const svgRef = useRef(null);

    const handleNodeClick = (node) => {
        console.log("Node clicked:", node);
        const children = data.links.filter(link => link.source === node.id).map(link => link.target);
        console.log("Children of clicked node:", children);

        if (visibleNodes.includes(children[0])) {
            // Hide children nodes
            setVisibleNodes(prevNodes => prevNodes.filter(id => !children.includes(id)));
            setVisibleLinks(prevLinks => prevLinks.filter(link => !children.includes(link.target)));
        } else {
            // Show children nodes
            setVisibleNodes(prevNodes => [...prevNodes, ...children]);
            setVisibleLinks(prevLinks => [...prevLinks, ...data.links.filter(link => link.source === node.id)]);
        }
    };

    const filteredNodes = data.nodes.filter(node => visibleNodes.includes(node.id));
    const filteredLinks = visibleLinks.filter(link => visibleNodes.includes(link.source) && visibleNodes.includes(link.target));

    console.log("Filtered nodes:", filteredNodes);
    console.log("Filtered links:", filteredLinks);

    // Calculate positions using a radial layout
    const calculatePositions = (nodes) => {
        const positions = {};
        const angleStep = (2 * Math.PI) / nodes.length;

        nodes.forEach((node, index) => {
            const angle = index * angleStep;
            const radius = node.depth * circleRadius * 2;
            positions[node.id] = {
                x: radius * Math.cos(angle) + window.innerWidth / 2,
                y: radius * Math.sin(angle) + window.innerHeight / 2
            };
        });

        return positions;
    };

    const positions = calculatePositions(filteredNodes);

    console.log("Node positions:", positions);

    return (
        <Network config={{
            groupBy: "id",
            nodes: filteredNodes.map(node => ({
                ...node,
                x: positions[node.id].x,
                y: positions[node.id].y
            })),
            links: filteredLinks,
            nodeId: "id",
            linkSource: "source",
            linkTarget: "target",
            nodeSize: d => d.id === data.nodes[0].id ? circleRadius / 2 : circleRadius, // Adjust the size of the root node
            nodeLabel: d => d.name,
            nodeColor: d => d.color || "#ffab00",
            linkColor: "#999",
            linkWidth: 2,
            linkOpacity: 0.75,
            width: window.innerWidth,
            height: window.innerHeight,
            on: {
                "click.shape": handleNodeClick
            }
        }} />
    );
};

Graph.propTypes = {
    data: PropTypes.shape({
        nodes: PropTypes.arrayOf(PropTypes.object).isRequired,
        links: PropTypes.arrayOf(PropTypes.object).isRequired
    }),
    circleRadius: PropTypes.number.isRequired
};

export default Graph;
