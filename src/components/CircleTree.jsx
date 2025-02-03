import { useEffect, useState } from "react";
import Graph from "./Graph";

const CircleTree = ({ data }) => {
    const [graphData, setGraphData] = useState({ nodes: [], links: [] });

    useEffect(() => {
        console.log("CircleTree data:", data); // Log the data to see if it is being passed correctly

        const nodes = [];
        const links = [];

        function traverse(node, parent = null) {
            console.log("Traversing node:", node); // Log each node being traversed
            nodes.push({
                id: node.name,
                name: node.name,
                size: 30,
                color: "#ffab00"
            });

            if (parent) {
                console.log("Creating link from parent:", parent.name, "to child:", node.name); // Log each link being created
                links.push({
                    source: parent.name,
                    target: node.name
                });
            }

            if (node.children) {
                node.children.forEach(child => traverse(child, node));
            }
        }

        traverse(data);
        console.log("Transformed graph data:", { nodes, links }); // Log the transformed data

        setGraphData({ nodes, links });
    }, [data]);

    return <Graph data={graphData} />;
};

export default CircleTree;
