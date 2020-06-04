import { Component } from "react";
import React from "react";
import "./FileUpload.css";

const Upload = ({changeControl}) => {

    const fileChanged=event=>{
      changeControl(event.target.files[0]);
    }


    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group files">
              <label>Upload Your File </label>
              <input type="file" className="form-control" onChange={fileChanged} multiple=""></input>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Upload;
