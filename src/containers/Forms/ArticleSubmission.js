import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import FileUpload from "../../components/FileUpload";

export default function Signup() {
  const [article, setArticle] = useState("");
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [journal, setJournal] = useState("");
  const [year, setYear] = useState("");
  const [volume, setVolume] = useState("");
  const [number, setNumber] = useState("");
  const [pages, setPages] = useState("");
  const [month, setMonth] = useState("");

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
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
          Submit
        </Button>
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
