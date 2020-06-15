import React, { useState } from "react";
import {
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  MenuItem,
  DropdownButton,
} from "react-bootstrap";
import FileUpload from "../../components/FileUpload";
import AlertDialog from "../../components/AlertDialog";
import bibtexParse from "bibtex-parse-js";

export default function SubmitArticle() {
  const [article, setArticle] = useState("");
  const [editor, setEditor] = useState("");
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [journal, setJournal] = useState("");
  const [year, setYear] = useState("");
  const [volume, setVolume] = useState("");
  const [number, setNumber] = useState("");
  const [pages, setPages] = useState("");
  const [month, setMonth] = useState("");
  const [publisher, setPublisher] = useState("");
  const [series, setSeries] = useState("");
  const [edition, setEdition] = useState("");
  const [submissionresponse] = useState("");
  const [popupWindow, setPopup] = useState(false);
  const [popupWindowMessage, setPopupMessage] = useState("");
  const [popupWindowTitle, setPopupTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [dropdown, setDropdown] = useState("article");

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
        if (bib.length !== 0) {
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
    var entryType = bib[0].entryType;
    if (entryType === "article" || entryType === "book") {
      setArticle(bib[0].citationKey);
      setAuthor(tags.author === null ? "" : tags.author);
      setTitle(tags.title === null ? "" : tags.title);
      setYear(tags.year === null ? "" : tags.year);
      setVolume(tags.volume === null ? "" : tags.volume);
      setNumber(tags.number === null ? "" : tags.number);
      setMonth(
        tags.month === null
          ? ""
          : (new Date(tags.month + " 1, 2012").getMonth() + 1).toString()
      );
      if (entryType === "article") {
        setDropdown("article");
        setJournal(tags.journal === null ? "" : tags.journal);
        setPages(tags.pages === null ? "" : tags.pages);
      } else if (entryType === "book") {
        setDropdown("book");
        setArticle(bib[0].citationKey);
        setPublisher(tags.publisher === null ? "" : tags.publisher);
        setEdition(tags.edition === null ? "" : tags.edition);
        setEditor(tags.editor === null ? "" : tags.editor);
        setSeries(tags.series === null ? "" : tags.series);
      }
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("called");
    var thePages = pages.split(["-"], 2);
    var user = 3; //We will need to change this later to retreive the user currently signed in
    var postbodydata;
    if (dropdown === "article")
      postbodydata = {
        type: dropdown,
        article: article,
        author: author,
        title: title,
        journal: journal,
        year: year,
        volume: volume,
        number: number,
        userId: user,
        pagefrom: thePages[0],
        pageto: thePages[1] === null ? thePages[0] : thePages[1],
        month: month,
      };
    if (dropdown === "book") {
      postbodydata = {
        type: dropdown,
        article: article,
        author: author,
        title: title,
        year: year,
        volume: volume,
        number: number,
        userId: user,
        month: month,
        editor: editor,
        publisher: publisher,
        series: series,
        edition: edition,
      };
    }
    var request = require("request");
    request.post(
      {
        headers: { "content-type": "application/x-www-form-urlencoded" },
        url: "http://localhost:9000/article/submitarticle",
        form: postbodydata,
      },
      function (error, response, body) {
        if (response.statusCode === 200) {
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
      <DropdownButton title={dropdown}>
        <MenuItem
          onSelect={() => {
            setDropdown("article");
          }}
        >
          Article
        </MenuItem>
        <MenuItem
          onSelect={() => {
            setDropdown("book");
          }}
        >
          Book
        </MenuItem>
      </DropdownButton>
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
          {dropdown === "book" && (
            <div>
              <ControlLabel>editor</ControlLabel>
              <FormControl
                value={editor}
                onChange={(e) => setEditor(e.target.value)}
              />
            </div>
          )}
          <ControlLabel>title</ControlLabel>
          <FormControl
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {dropdown === "book" && (
            <div>
              <ControlLabel>edition</ControlLabel>
              <FormControl
                value={edition}
                onChange={(e) => setEdition(e.target.value)}
              />
            </div>
          )}
          {dropdown === "article" && (
            <div>
              <ControlLabel>journal</ControlLabel>
              <FormControl
                value={journal}
                onChange={(e) => setJournal(e.target.value)}
              />
            </div>
          )}
          {dropdown === "book" && (
            <div>
              <ControlLabel>publisher</ControlLabel>
              <FormControl
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
              />
            </div>
          )}
          {dropdown === "book" && (
            <div>
              <ControlLabel>series</ControlLabel>
              <FormControl
                value={series}
                onChange={(e) => setSeries(e.target.value)}
              />
            </div>
          )}
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
          {dropdown === "article" && (
            <div>
              <ControlLabel>pages</ControlLabel>
              <FormControl
                value={pages}
                onChange={(e) => setPages(e.target.value)}
              />
            </div>
          )}
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
