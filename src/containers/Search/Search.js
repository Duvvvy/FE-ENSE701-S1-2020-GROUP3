import React, { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./search.css";

import {Checkbox} from "react-bootstrap";
import ObjectList from "react-object-list";
import "react-object-list/dist/react-object-list.css";
import Grid from '@material-ui/core/Grid';

import AlertDialog from "../../components/AlertDialog";
import HelpDialog from "../../components/HelpDialog";

export default function SubmitSearch() {
  const [field, setField] = useState("title");
  const [operator, setOperator] = useState("contains");
  const [value, setValue] = useState("");
  const [datefrom, setDateFrom] = useState(new Date("1990/01/01"));
  const [dateto, setDateTo] = useState(new Date());
  const [results, setResult] = useState([]);
  const [column, setColumn] = useState("id");
  const [asc, setAsc] = useState('true');

  const [popupWindow, setPopup] = useState(false);
  const [popupWindowMessage, setPopupMessage] = useState("");
  const [popupWindowTitle, setPopupTitle] = useState("");

  const [popupHelpWindow, setPopupHelp] = useState(false);

  const [idChecked, setIdChecked] = useState(true);
  const [articleChecked, setArticleChecked] = useState(true);
  const [titleChecked, setTitleChecked] = useState(true);
  const [authorChecked, setAuthorChecked] = useState(true);
  const [journalChecked, setJournalChecked] = useState(true);
  const [journalNumberChecked, setJournalNumberChecked] = useState(true);
  const [journalVolumeChecked, setJournalVolumeChecked] = useState(true);
  const [pagesFromChecked, setPagesFromChecked] = useState(true);
  const [pagesToChecked, setPagesToChecked] = useState(true);
  const [journalMonthChecked, setJournalMonthChecked] = useState(true);
  const [journalYearChecked, setJournalYearChecked] = useState(true);
  const columns = [];

  function validateForm() {
    return field.length > 0 && operator.length > 0 && value.length > 0;
  }

  function showColumns() {
    if(idChecked) {
      columns.push({dataKey: 'id', header: 'ID'})
    }
    if(articleChecked) {
      columns.push({dataKey: 'article', header: 'Article'})
    }
    if(titleChecked) {
      columns.push({dataKey: 'title', header: 'Title'})
    }
    if(authorChecked) {
      columns.push({dataKey: 'author', header: 'Author'})
    }
    if(journalChecked) {
      columns.push({dataKey: 'journal', header: 'Journal'})
    }
    if(journalNumberChecked) {
      columns.push({dataKey: 'journalnumber', header: 'Number'})
    }
    if(journalVolumeChecked) {
      columns.push({dataKey: 'journalvolume', header: 'Volume'})
    }
    if(pagesFromChecked) {
      columns.push({dataKey: 'pagesfrom', header: 'Page From'})
    }
    if(pagesToChecked) {
      columns.push({dataKey: 'pagesto', header: 'Page To'})
    }
    if(journalMonthChecked) {
      columns.push({dataKey: 'journalmonth', header: 'Month'})
    }
    if(journalYearChecked) {
      columns.push({dataKey: 'journalyear', header: 'Year'})
    }
  }

  function ArticleList() {
    if(results !=="") {
      return(
      <ObjectList
      columns={columns}
        //columns={[
          //{dataKey: 'id', header: 'ID'},
          // {dataKey: 'article', header: 'Article'},
          // {dataKey: 'title', header: 'Title'},
          // {dataKey: 'author', header: 'Author'},
          // {dataKey: 'journal', header: 'Journal'},
          // {dataKey: 'journalnumber', header: 'Number'},
          // {dataKey: 'journalvolume', header: 'Volume'},
          // {dataKey: 'pagesfrom', header: 'Page From'},
          // {dataKey: 'pagesto', header: 'Page To'},
          // {dataKey: 'journalmonth', header: 'Month'},
          // {dataKey: 'journalyear', header: 'Year'},
        //]}
        data={results}
        meta={{
          totalCount: results.length,
        }}
        favouritesEnabled={false}
      />
      )
    }
  }

  function handleHelp(event) {
    event.preventDefault();
    setPopupHelp(true);
  }

  function columnCheck() {
    showColumns()
    return (
      <div className = "check">
        <div>
          <label>ID|</label>
            <Checkbox
              checked={idChecked}
              onChange={handleId}
              />
          </div>

        <div>
          <label>Article|</label>
            <Checkbox
              checked={articleChecked}
              onChange={handleArticle}
              />
          </div>

          <div>
          <label>Title|</label>
            <Checkbox
              checked={titleChecked}
              onChange={handleTitle}
              />
          </div>

          <div>
          <label>Author|</label>
            <Checkbox
              checked={authorChecked}
              onChange={handleAuthor}
              />
          </div>

          <div>
          <label>Journal|</label>
            <Checkbox
              checked={journalChecked}
              onChange={handleJournal}
              />
          </div>

          <div>
          <label>Number|</label>
            <Checkbox
              checked={journalNumberChecked}
              onChange={handleNumber}
              />
          </div>

          <div>
          <label>Volume|</label>
            <Checkbox
              checked={journalVolumeChecked}
              onChange={handleVolume}
              />
          </div>

          <div>
          <label>Page From|</label>
            <Checkbox
              checked={pagesFromChecked}
              onChange={handlePageFrom}
              />
          </div>

          <div>
          <label>Page To|</label>
            <Checkbox
              checked={pagesToChecked}
              onChange={handlePageTo}
              />
          </div>

          <div>
          <label>Month|</label>
            <Checkbox
              checked={journalMonthChecked}
              onChange={handleMonth}
              />
          </div>

          <div>
          <label>Year|</label>
            <Checkbox
              checked={journalYearChecked}
              onChange={handleYear}
              />
          </div>
        </div>
    );
  }

  function handleId() {
    setIdChecked(!idChecked)
  }
  function handleArticle() {
    setArticleChecked(!articleChecked)
  }
  function handleTitle() {
    setTitleChecked(!titleChecked)
  }
  function handleAuthor() {
    setAuthorChecked(!authorChecked)
  }
  function handleJournal() {
    setJournalChecked(!journalChecked)
  }
  function handleNumber() {
    setJournalNumberChecked(!journalNumberChecked)
  }
  function handleVolume() {
    setJournalVolumeChecked(!journalVolumeChecked)
  }

  function handlePageFrom() {
    setPagesFromChecked(!pagesFromChecked)
  }
  function handlePageTo() {
    setPagesToChecked(!pagesToChecked)
  }
  function handleMonth() {
    setJournalMonthChecked(!journalMonthChecked)
  }
  function handleYear() {
    setJournalYearChecked(!journalYearChecked)
  }


  function handleSubmit(event) {
    event.preventDefault();
    console.log("called");
    var user = 3; //We will need to change this later to retreive the user currently signed in
    var postbodydata = {
      field: field,
      operator: operator,
      value: value,

      datefromyear: datefrom.getFullYear(),
      datefrommonth: datefrom.getMonth(),
      datefromday: datefrom.getDay(),

      datetoyear: dateto.getFullYear(),
      datetomonth: dateto.getMonth(),
      datetoday: dateto.getDay(),

      column: column,
      asc: asc,

    };

    console.log(postbodydata);
    fetch('http://localhost:9000/articlesearch/search', {
      method: 'POST',
      headers:{ "content-type": "application/json" },
      body: JSON.stringify(postbodydata)
    }).then(response => response.json())
    .then(response => {
      console.log(response.searchResult)
      setResult(response.searchResult)  
      if(response.searchResult == 0){//Keep as == as it would break if it was ===
        setPopupTitle("Article");
        setPopupMessage("No Article(s) Found");
        setPopup(true);
      }   
    })
  }

  return (
    <div className="Article">
      <form className="form-inline" >
        <div className="description">
          {field}  {operator} {value}
        </div>

        <div className="calendar">
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <label>Date Range from </label>
              <DatePicker
              selected={datefrom}
              onChange={date => setDateFrom(date)}
              />
            </Grid>
            <Grid item xs={4}>
              <label>to</label>
              <DatePicker
                selected={dateto}
                onChange={date => setDateTo(date)}
              />
            </Grid>
            <Grid item xs>

            </Grid>
          </Grid>
        </div>

        <div className="input-search">
          <Grid container spaceing={3}>
            <Grid item xs>
              <div className="field">
                <label>Field: </label>
                <select 
                  value={field} 
                  onChange={(e) => setField(e.target.value)}
                  >
                  <option value="title">Article Title</option>
                  <option value="author">Article Author</option>
                  <option value="researchmethod">Research Method</option>
                  <option value="participants">Research Participants</option>
                  <option value="method">Method</option>
                  <option value="methodology">Methodology</option>
                </select>
              </div>
            </Grid>

            <Grid item xs>
              <div className="operator">
                <label>Operator: </label>
                <select 
                  value={operator} 
                  onChange={(e) => setOperator(e.target.value)}
                  >
                  <option value="contains">Contains</option>
                  <option value="does not contain">Does not contain</option>
                  <option value="begins with">Beigns with</option>
                  <option value="ends with">Ends with</option>
                  <option value="is equal to">Is equal to</option>
                </select>
              </div>
            </Grid>

            <Grid item xs>
              <div className="value">
                <label>Value: </label>
                <input
                    type = "text"
                    value={value}
                    size="20"
                    onChange={(e) => setValue(e.target.value)}
                    />
              </div>

              <div className="help">
                <button type="help" onClick={handleHelp}>
                  ?
                </button>
              </div>
            </Grid>

            <Grid item xs>
            <div className="sort">
          <div className="asc">
            <select 
              value={asc} 
              onChange={(e) => setAsc(e.target.value)}
              >
              <option value='true'>Ascending</option>
              <option value='false'>Descending</option>
            </select>
          </div>

          <div className="column">
            <select 
              value={column} 
              onChange={(e) => setColumn(e.target.value)}
              >
              <option value="id">Id</option>
              <option value="article">Article</option>
              <option value="author">Author</option>
              <option value="title">Title</option>
              <option value="journal">Journal</option>
              <option value="journalnumber">Journal Number</option>
              <option value="journalvolume">Journal Volume</option>
              <option value="journalmonth">Month</option>
              <option value="journalyear">Year</option>
              <option value="pagesfrom">Page From</option>
              <option value="pagestwo">Page Two</option>
            </select>
          </div>
        </div>
            </Grid>

            <Grid item xs={1}>
            <button disabled={!validateForm()} type="search" onClick={handleSubmit}>
        Search
        </button> 
            </Grid>
          </Grid>
        </div>
        <AlertDialog
          popupWindow={popupWindow}
          toggle={setPopup}
          title={popupWindowTitle}
          message={popupWindowMessage}
        ></AlertDialog>

          <HelpDialog
          popupWindow={popupHelpWindow}
          toggle={setPopupHelp}
        ></HelpDialog>
          

      </form>

      <div className="checkColumn">
        {columnCheck()}
      </div>

      <div className="article">
            {ArticleList()}
      </div>
    </div>
  );
}
