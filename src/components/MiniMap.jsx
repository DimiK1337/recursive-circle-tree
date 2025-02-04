import React from "react";
import PropTypes from 'prop-types';

const MiniMap = ({ data }) => {
    const renderNode = (node, depth = 0) => (
        <div key={node.name} className="mini-map-node" style={{ marginLeft: depth * 20 }}>
            {node.name}
            {node.children && node.children.map(child => renderNode(child, depth + 1))}
        </div>
    );

    return (
        <div className="mini-map">
            {renderNode(data)}
        </div>
    );
};

MiniMap.propTypes = {
    data: PropTypes.object.isRequired
};

export default MiniMap;
