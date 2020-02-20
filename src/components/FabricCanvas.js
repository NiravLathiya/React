import React from "react";
import { fabric } from "fabric";
import { Button } from "react-bootstrap";

class FabricCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: false };
  }
  componentDidMount() {
    // Make a New Canvas
    this.the_canvas = this.__canvas = new fabric.Canvas("main-canvas");
    this.the_canvas.setHeight(400);
    this.the_canvas.setWidth(410);
  }
  componentWillReceiveProps = newprops => {
    // If Updated Item is not the same as the old one
    // 		=> Update the canvas with newer item
    if (newprops.activeProperty !== this.props.activeProperty) {
      this.updateCanvasforImage(
        this.props.activeProperty,
        newprops.activeProperty
      );
    }
  };

  updateCanvasforImage = (prev, next) => {
    if (next) {
      let to_remove;
      // Find the same kind of element
      this.the_canvas.forEachObject(object => {
        if (object.the_type === next.the_type) {
          to_remove = object;
        }
      });

      this.the_canvas.remove(to_remove);

      if (next.the_type === "bg") {
        this.the_canvas.setBackgroundImage(next);
        this.the_canvas.renderAll();
        return;
      }
      this.the_canvas.add(next);
      this.the_canvas.moveTo(next, next.zIndex);
    }
  };

  saveToCanvas = () => {
    let link = document.createElement("a");
    link.href = this.the_canvas.toDataURL({ format: "png" });
    link.download = "Image.png";
    link.click();
  };
  Addtext = () => {
    this.the_canvas.add(
      new fabric.IText("Tap and Type", {
        left: 50,
        top: 100,
        fontFamily: "arial black",
        fill: "green",
        fontSize: 30
      })
    );
    this.setState({ text: true });
  };
  bold = () => {
    if (
      this.the_canvas.getActiveObject() &&
      this.the_canvas.getActiveObject().get("fontWeight") === "normal"
    ) {
      this.the_canvas.getActiveObject().set("fontWeight", "bold");
    } else {
      if (
        this.the_canvas.getActiveObject() &&
        this.the_canvas.getActiveObject().get("fontWeight") === "bold"
      ) {
        console.log(
          "hello",
          this.the_canvas.getActiveObject().get("fontWeight")
        );
        this.the_canvas.getActiveObject().set("fontWeight", "normal");
      }
    }
    this.the_canvas.renderAll();
  };
  italic = () => {
    if (
      this.the_canvas.getActiveObject() &&
      this.the_canvas.getActiveObject().get("fontStyle") === ""
    ) {
      console.log("hello");
      this.the_canvas.getActiveObject().set("fontStyle", "italic");
    } else {
      if (
        this.the_canvas.getActiveObject() &&
        this.the_canvas.getActiveObject().get("fontStyle") === "italic"
      ) {
        console.log(
          "hello",
          this.the_canvas.getActiveObject().get("fontStyle")
        );

        this.the_canvas.getActiveObject().set("fontStyle", "");
      }
    }

    this.the_canvas.renderAll();
  };
  undeline = () => {
    if (
      this.the_canvas.getActiveObject() &&
      this.the_canvas.getActiveObject().get("textDecoration") === ""
    ) {
      this.the_canvas.getActiveObject().set("textDecoration", "underline");
    } else {
      if (
        this.the_canvas.getActiveObject() &&
        this.the_canvas.getActiveObject().get("textDecoration") === "underline"
      ) {
        this.the_canvas.getActiveObject().set("textDecoration", "");
      }
    }
    this.the_canvas.renderAll();
  };

  render() {
    return (
      <div>
        <div className="main-canvas-container">
          <canvas id="main-canvas"></canvas>
          <div className="main-button">
            <Button
              bsStyle="success"
              onClick={this.saveToCanvas}
              bsSize="large"
              style={{ width: "100%", marginRight: "10px" }}
            >
              Download Image
            </Button>
            <Button
              bsStyle="success"
              onClick={this.Addtext}
              bsSize="large"
              style={{ width: "100%" }}
            >
              Add Text
            </Button>
          </div>
        </div>
        {this.state.text && (
          <div className="set-button">
            <div style={{ margin: "auto", marginTop: "10px" }}>
              <label htmlFor="text-bg-color">
                <img
                  src="https://iconsplace.com/wp-content/uploads/_icons/ffa500/256/png/background-color-icon-11-256.png"
                  style={{ width: "45px" }}
                  alt="background-color"
                />
              </label>
              &nbsp;
              <input
                type="color"
                defaultValue=""
                id="text-bg-color"
                size="10"
                onChange={e => {
                  if (this.the_canvas.getActiveObject()) {
                    this.the_canvas
                      .getActiveObject()
                      .setBackgroundColor(e.target.value);
                  }

                  this.the_canvas.renderAll();
                }}
              />
            </div>
            <Button
              onClick={this.bold}
              bsSize="large"
              style={{
                height: "45px",
                width: "50px",
                margin: '10px auto',
                borderRadius: "50%",
                backgroundColor: "#116d80",
                color: "#fff",
                border: "none"
              }}
            >
              <strong>B</strong>
            </Button>
            <Button
              onClick={this.italic}
              bsSize="large"
              style={{
                height: "45px",
                width: "50px",
                margin: '10px auto',
                borderRadius: "50%",
                backgroundColor: "#116d80",
                color: "#fff",
                border: "none"
              }}
            >
              <em>i</em>
            </Button>
            <Button
              onClick={this.undeline}
              bsSize="large"
              style={{
                height: "45px",
                width: "50px",
                margin: '10px auto',
                borderRadius: "50%",
                backgroundColor: "#116d80",
                color: "#fff",
                border: "none"
              }}
            >
              <u>U</u>
            </Button>
            <input
              type="number"
              defaultValue=""
              id="text-bg-color"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                margin: "auto",
                textAlign: "center"
              }}
              size="10"
              min="0"
              onChange={e => {
                if (this.the_canvas.getActiveObject()) {
                  this.the_canvas.getActiveObject().setFontSize(e.target.value);
                }
                this.the_canvas.renderAll();
              }}
            />
            <div style={{ margin: "auto", marginTop: "10px" }}>
              <label htmlFor="text-color">
                <img
                  src="https://iconsplace.com/wp-content/uploads/_icons/000080/256/png/border-color-icon-9-256.png"
                  style={{ width: "45px" }}
                  alt="Text-color"
                />
              </label>
              &nbsp;
              <input
                type="color"
                defaultValue=""
                id="text-color"
                size="10"
                onChange={e => {
                  if (this.the_canvas.getActiveObject()) {
                    this.the_canvas.getActiveObject().setFill(e.target.value);
                  } else {
                    console.log('hellosasasas')
                  }
                  this.the_canvas.renderAll();
                }}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default FabricCanvas;
