import React from "react";
import PropTypes from "prop-types";
import './Video.css';
const YoutubeEmbed = ({ embedId }) => (
  <div className="video-responsive">
    <img src={`http://img.youtube.com/vi/${embedId}/0.jpg`} height="100%" width="100%"/>
  </div>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed;