import { Component } from "react";
import React from "react";
import "./FileUpload.css";

class upload extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group files">
              <label>Upload Your File </label>
              <input type="file" className="form-control" multiple=""></input>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default upload;
