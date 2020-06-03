import React, { useState } from "react";
import {
  Button,
  Col,
  form,
  Row,
  FormControl,
  ControlLabel,
  FormGroup,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import { render } from "@testing-library/react";
import {} from "bibliography";

export default function SubmitSearch() {
  const [field, setField] = useState("");
  const [operator, setOperator] = useState("");
  const [value, setValue] = useState("");
  const [datefrom, setDateFrom] = useState(new Date("1990/01/01"));
  const [dateto, setDateTo] = useState(new Date());
  const [submissionresponse, setResponse] = useState("");

  function validateForm() {
    return field.length > 0 && operator.length > 0 && value.length > 0;
  }

  function onUpload(theFile) {
    const data = new FormData();
    data.append("file", theFile);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("called");
    var user = 3; //We will need to change this later to retreive the user currently signed in
    var postbodydata = {
      field: field,
      operator: operator,
      value: value,
      datefrom: datefrom,
      //   pageto: dateto == null ? currentDate : currentDate
    };
    var request = require("request");
    request.post(
      {
        headers: { "content-type": "application/x-www-form-urlencoded" },
        url: "http://localhost:9000/search",
        form: postbodydata,
      },
      function (error, response, body) {
        if (response.statusCode == 200) {
          var resBody = JSON.parse(body);
          setResponse(
            "Article has been submitted with id " + resBody.ResponseText
          );
        }
      }
    );
  }

  return (
    <div className="Article">
      <form class="form-inline" onSubmit={handleSubmit}>
        <div class="description"></div>

        <div class="calendar">
          <label for="date">Date Range from </label>
          <DatePicker
            selected={datefrom}
            onChange={(e) => setDateFrom(e.target.data)}
            selectStart
            startDate={datefrom}
            endDate={dateto}
          />
          <label for="to">to</label>
          <DatePicker
            selected={dateto}
            onChange={(e) => setDateTo(e.target.data)}
            selectEnd
            startDate={datefrom}
            endDate={dateto}
            minDate={datefrom}
          />
        </div>

        <div class="input-search">
          <div class="field">
            <label for="field">Field: </label>
            <select value={field} onChange={(e) => setField(e.target.value)}>
              <option value="" selected disabled hidden>
                Choose here
              </option>
              <option value="article title">Article Title</option>
              <option value="article source">Article Source</option>
              <option value="author">Author</option>
              <option value="method">Method</option>
            </select>
          </div>

          <div class="operator">
            <label for="operator">Operator: </label>
            <select
              value={operator}
              onChange={(e) => setOperator(e.target.value)}
            >
              <option value="" selected disabled hidden>
                Choose here
              </option>
              <option value="contains">Contains</option>
              <option value="does not contain">Does not contain</option>
              <option value="begins with">Beigns with</option>
              <option value="ends with">Ends with</option>
              <option value="is equal to">Is equal to</option>
            </select>
          </div>

          <div class="value">
            <label for="operator">Value: </label>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        </div>

        <Button block bsSize="large" disabled={!validateForm()} type="search">
          Search
        </Button>
      </form>
    </div>
  );
}
