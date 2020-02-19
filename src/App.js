// File Imports
import React, { Component } from "react";
import FabricCanvas from "./components/FabricCanvas";
import TemplateList from "./components/TemplateList";
import {
  bglist,
  facelist,
  eyeslist,
  faciallist,
  hairlist
} from "./images/templates/templatelist";
import { Col, Tabs, Tab, Jumbotron, Button } from "react-bootstrap";
import "./App.css";
import { fabric } from "fabric";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeProperty: null,
      droppppp: null
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
    this.setState({droppppp: imgInstance})
  };
  render() {
    return (
      <div className="App">
        <div className="main">
          <div className="row">
            <Col md={6}>
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
              onDrop={() => {this.setState({activeProperty: this.state.droppppp})}}
              onDragOver={e => e.preventDefault()}
            >
              <FabricCanvas activeProperty={this.state.activeProperty} />
            </Col>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
