import { useEffect, useRef } from "react";
import * as d3 from "d3";

const CircleTree = ({ data }) => {
    const svgRef = useRef(null);

    // Define dimensions
    const width = document.body.clientWidth;
    const height = document.body.clientHeight;
    const radius = Math.min(width, height) / 3; // Increase the radius to shift points towards the center

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove(); // Clear existing content

        const treeLayout = d3.tree().size([2 * Math.PI, radius]);

        // Convert data to hierarchy
        const root = d3.hierarchy(data);
        treeLayout(root);

        const g = svg
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2},${height / 2})`);

        // Add links
        const link = g.selectAll("path")
            .data(root.links())
            .enter()
            .append("path")
            .attr("class", "link")
            .attr("d", d3.linkRadial()
                .angle(d => d.x)
                .radius(d => d.y))
            .attr("stroke", "black")
            .style("display", "none"); // Hide links initially

        // Add nodes
        const node = g
            .selectAll("g.node")
            .data(root.descendants())
            .enter()
            .append("g")
            .attr("class", "node")
            .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0)`);

        node.append("circle")
            .attr("r", 20)
            .attr("fill", "steelblue")
            .attr("id", d => `node-${d.data.name.replace(/\s+/g, '-')}`)
            .on("click", (event, d) => {
                if (d.children) {
                    showChildren(d);
                }
            });

        // Add labels
        node.append("text")
            .attr("dy", ".31em")
            .attr("x", d => d.x < Math.PI === !d.children ? 6 : -6)
            .attr("text-anchor", d => d.x < Math.PI === !d.children ? "start" : "end")
            .attr("transform", d => d.x >= Math.PI ? "rotate(180)" : null)
            .text(d => d.data.name);

        // Initially hide all nodes except the root
        node.style("display", d => d.depth === 0 ? "block" : "none")
            .attr("id", d => `node-${d.data.name.replace(/\s+/g, '-')}`);
        link.attr("id", d => `link-${d.target.data.name.replace(/\s+/g, '-')}`);

        function showChildren(d) {
            d.children.forEach(child => {
                const childNode = g.append("g")
                    .attr("class", `node node-${child.data.name.replace(/\s+/g, '-')}`)
                    .attr("transform", `rotate(${child.x * 180 / Math.PI - 90}) translate(${child.y},0)`);

                childNode.append("circle")
                    .attr("r", 20)
                    .attr("fill", "steelblue")
                    .attr("id", `node-${child.data.name.replace(/\s+/g, '-')}`)
                    .on("click", (event) => {
                        if (child.children) {
                            showChildren(child);
                        }
                    });

                childNode.append("text")
                    .attr("dy", ".31em")
                    .attr("x", child.x < Math.PI === !child.children ? 6 : -6)
                    .attr("text-anchor", child.x < Math.PI === !child.children ? "start" : "end")
                    .attr("transform", child.x >= Math.PI ? "rotate(180)" : null)
                    .text(child.data.name);

                link.filter(l => l.source === d)
                    .style("display", "block");
            });
        }
    }, [data, height, radius, width]);

    return <svg ref={svgRef}></svg>;
};

export default CircleTree;
