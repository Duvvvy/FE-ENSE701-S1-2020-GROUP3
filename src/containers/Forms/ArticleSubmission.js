import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import FileUpload from "../../components/FileUpload";
import { render } from "@testing-library/react";
import AlertDialog from "../../components/AlertDialog";
import bibtexParse from "bibtex-parse-js";

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
  const [selectedFile, setSelectedFile] = useState(null);

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

  function onUpload() {
    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsText(selectedFile);

      reader.onload = async (e) => {
        var file = e.target.result;
        var bib = bibtexParse.toJSON(file);
        if (bib.length != 0) {
          processBibtex(bib);
        } else {
          setPopupTitle("Internal Server Error");
          setPopupMessage(
            "The file you are trying to upload in not in bibtex format."
          );
          setPopup(true);
        }
      };
    } else {
      setPopupTitle("Internal Server Error");
      setPopupMessage("No file selected.");
      setPopup(true);
    }
  }

  function processBibtex(bib) {
    var tags = bib[0].entryTags;
    if (bib[0].entryType == "article") {
      console.log(bib[0]);
      setArticle(bib[0].citationKey);
      setAuthor(tags.author);
      setTitle(tags.title);
      setJournal(tags.journal);
      setYear(tags.year);
      setVolume(tags.volume);
      setNumber(tags.number);
      setPages(tags.pages);
      setMonth(tags.month);
    }
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
        <FileUpload changeControl={setSelectedFile} />;
      </div>
      <div>
        <button
          type="button"
          className="btn btn-success btn-block"
          onClick={() => onUpload()}
        >
          Upload
        </button>
      </div>
    </div>
  );
}
