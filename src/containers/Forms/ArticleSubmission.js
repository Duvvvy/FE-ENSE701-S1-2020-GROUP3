import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import FileUpload from "../../components/FileUpload";
import { render } from "@testing-library/react";
import AlertDialog from "../../components/AlertDialog";

export default function SubmitArticle() {
  const [article, setArticle] = useState("");
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [journal, setJournal] = useState("");
  const [year, setYear] = useState("");
  const [volume, setVolume] = useState("");
  const [number, setNumber] = useState("");
  const [pages, setPages] = useState("");
  const [month, setMonth] = useState("");
  const [submissionresponse, setResponse] = useState("");
  const [popupWindow, setPopup] = useState(false);
  const [popupWindowMessage, setPopupMessage] = useState("");
  const [popupWindowTitle, setPopupTitle] = useState("");

  function validateForm() {
    return (
      article.length > 0 &&
      author.length > 0 &&
      title.length > 0 &&
      journal.length > 0 &&
      year.length > 0 &&
      volume.length > 0 &&
      number.length > 0 &&
      pages.length > 0 &&
      month.length > 0
    );
  }

  function onUpload(theFile) {
    const data = new FormData();
    data.append("file", theFile);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("called");
    var thePages = pages.split(["-"], 2);
    var user = 3; //We will need to change this later to retreive the user currently signed in
    var postbodydata = {
      article: article,
      author: author,
      title: title,
      journal: journal,
      year: year,
      volume: volume,
      number: number,
      userId: user,
      pagefrom: thePages[0],
      pageto: thePages[1] == null ? thePages[0] : thePages[1],
      month: month,
    };
    var request = require("request");
    request.post(
      {
        headers: { "content-type": "application/x-www-form-urlencoded" },
        url: "http://localhost:9000/article/submitarticle",
        form: postbodydata,
      },
      function (error, response, body) {
        if (response.statusCode == 200) {
          var resBody = JSON.parse(body);
          setPopupTitle("Success");
          setPopupMessage(
            "Article has been submitted with id " + resBody.ResponseText
          );
          setPopup(true);
        } else {
          setPopupTitle("Internal Server Error");
          setPopupMessage(
            "Article has not been submitted, please contact support."
          );
          setPopup(true);
        }
      }
    );
  }

  return (
    <div className="Article">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="ArticleForm" bsSize="small">
          <ControlLabel>article</ControlLabel>
          <FormControl
            value={article}
            onChange={(e) => setArticle(e.target.value)}
          />
          <ControlLabel>author</ControlLabel>
          <FormControl
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <ControlLabel>title</ControlLabel>
          <FormControl
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <ControlLabel>journal</ControlLabel>
          <FormControl
            value={journal}
            onChange={(e) => setJournal(e.target.value)}
          />
          <ControlLabel>year</ControlLabel>
          <FormControl value={year} onChange={(e) => setYear(e.target.value)} />
          <ControlLabel>volume</ControlLabel>
          <FormControl
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
          />
          <ControlLabel>number</ControlLabel>
          <FormControl
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <ControlLabel>pages</ControlLabel>
          <FormControl
            value={pages}
            onChange={(e) => setPages(e.target.value)}
          />
          <ControlLabel>month</ControlLabel>
          <FormControl
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
        </FormGroup>
        <AlertDialog
          popupWindow={popupWindow}
          toggle={setPopup}
          title={popupWindowTitle}
          message={popupWindowMessage}
        ></AlertDialog>
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
          Submit
        </Button>
        <h2>{submissionresponse}</h2>
      </form>
      <br></br>
      <div>
        <h2>Or</h2>
        <FileUpload />;
      </div>
      <div>
        <button
          type="button"
          className="btn btn-success btn-block"
          onClick={() => onUpload(FileUpload.selectedFile)}
        >
          Upload
        </button>
      </div>
    </div>
  );
}
