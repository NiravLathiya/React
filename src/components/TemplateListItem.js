import React from "react";
import { Col } from "react-bootstrap";

export default class TemplateListItem extends React.Component {
  localAddToCanvas = e => {
    e.preventDefault();
    this.props.addToCanvas(
      e.target,
      this.props.property_type,
      this.props.zIndex
    );
  };
  render() {
    return (
      <Col xs={6} md={4} className="col-6" style={{ marginBottom: "10px" }}>
        <a href="" className="thumbnail" onClick={this.localAddToCanvas}>
          <img
            alt=""
            src={this.props.url}
            style={{ width: "100%" }}
            draggable="true"
            onDrag={e => {
              e.preventDefault();
              this.props.drop(
                e.target,
                this.props.property_type,
                this.props.zIndex
              )
            }}
          />
        </a>
      </Col>
    );
  }
}
