import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";

const HelpDialog = ({ toggle, popupWindow}) => {
  return (
    <div>
      <Dialog
        open={popupWindow}
        //onClose={() => toggle()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Help</DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Method: TDD, BDD, pair programming, planning poker, daily standup meetings, story boards, user story mapping, 
            continuous integration, retrospectives, burn down charts, requirements prioritisation, version control, code sharing
          </Typography>
          <Typography gutterBottom>
            Methodology: Spiral, XP, Rational Unified Process, Crystal, Clean room, Feature Driven Development, Model Driven Development,
            Domain Driven Development, Formal methods, Problem Driven Development, Cloud computing, Service Oriented Development, 
            Aspect Oriented Development, Valuse Driven Development , Product Driven Development, Agile
          </Typography>
          <Typography gutterBottom>
            Research Method: Case study, Field Observation, Experiment, Interview, Survey
          </Typography>
          <Typography gutterBottom>
            Research Participants: undergraduate students, postgraduate students, practitioners
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => toggle(false)} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HelpDialog;
