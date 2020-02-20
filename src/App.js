// File Imports
import React, { Component } from "react";
import FabricCanvas from "./components/FabricCanvas";
import TemplateList from "./components/TemplateList";
import { facelist } from "./images/templates/templatelist";
import { Col } from "react-bootstrap";
import { Collapse } from "react-bootstrap";
import "./App.css";
import { fabric } from "fabric";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeProperty: null,
      droppppp: null,
      open: false
    };
  }

  addToCanvas = (imgElement, property_type, z_Index) => {
    var imgInstance = new fabric.Image(imgElement, {
      width: 400,
      height: 400,
      the_type: property_type,
      zIndex: z_Index
    });

    this.setState({ activeProperty: imgInstance });
  };

  ondrop = (imgElement, property_type, z_Index) => {
    var imgInstance = new fabric.Image(imgElement, {
      width: 400,
      height: 400,
      the_type: property_type,
      zIndex: z_Index
    });
    this.setState({ droppppp: imgInstance });
  };
  render() {
    return (
      <div className="App">
        <div className="main">
          <div className="row">
            <Col md={6} className="mins" style={{overflowY: "auto", maxHeight: "498px" }}>
              <TemplateList
                data={facelist}
                property_type="face"
                zIndex={0}
                addtocanvas={this.addToCanvas}
                onDrop={this.ondrop}
              />
            </Col>
            <Col
              md={6}
              style={{ margin: "auto" }}
              onDrop={() => {
                this.setState({ activeProperty: this.state.droppppp });
              }}
              onDragOver={e => e.preventDefault()}
            >
              <FabricCanvas activeProperty={this.state.activeProperty} />
            </Col>
            <Col md={6} style={{ width: "100%" }} className="maxs">
              <div style={{ textAlign: "right"}}>
                <div style={{ margin: "10px" }}>
                  {!this.state.open && (
                    <label
                      htmlFor="text-color"
                      onClick={() => this.setState({ open: !this.state.open })}
                      aria-controls="example-fade-text"
                      aria-expanded={this.state.open}
                      style={{
                        border: "1px solid black",
                        borderRadius: "50%",
                        background: "black",
                        margin: 0
                      }}
                    >
                      <img
                        src="https://iconsplace.com/wp-content/uploads/_icons/fa8072/256/png/plus-2-icon-15-256.png"
                        style={{ width: "45px" }}
                        alt="Text-color"
                      />
                    </label>
                  )}
                  {this.state.open && (
                    <label
                      htmlFor="text-color"
                      onClick={() => this.setState({ open: !this.state.open })}
                      aria-controls="example-fade-text"
                      aria-expanded={this.state.open}
                      style={{
                        border: "1px solid black",
                        borderRadius: "50%",
                        background: "black"
                      }}
                    >
                      <img
                        src="https://iconsplace.com/wp-content/uploads/_icons/fa8072/256/png/minus-2-icon-15-256.png"
                        style={{ width: "45px" }}
                        alt="Text-color"
                      />
                    </label>
                  )}
                </div>
                <Collapse
                  in={this.state.open}
                  unmountOnExit={true}
                  style={{ height: "500px" }}
                >
                  <TemplateList
                    data={facelist}
                    property_type="face"
                    zIndex={0}
                    addtocanvas={this.addToCanvas}
                    onDrop={this.ondrop}
                  />
                </Collapse>
              </div>
            </Col>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
