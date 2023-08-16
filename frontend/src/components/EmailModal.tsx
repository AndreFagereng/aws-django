import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import Select from "react-select";
import { ChangeEvent, useState } from "react";
import { toTitleCase } from "../utils";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,

  p: 2,
};

interface EmailModalProps {
  emails: string;
  name: string;
  nace: string;
  onButtonClick: () => void;
}

interface EmailOption {
  label: string;
  value: string;
}

export default function EmailModal(props: EmailModalProps) {

  let emailOptions: EmailOption[] = [];
  JSON.parse(props.emails).map((item: string) => emailOptions.push({ label: item, value: item }));

  const [open, setOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(emailOptions.at(0));
  const initialSubject: string = "Hei " + toTitleCase(props.name) + "!";
  const initialBody: string =
    "Dere er registrert innenfor " + "'" + props.nace + "'" + " i brønnøysundsregisteret.%0D%0A%0D%0A%0D%0A";
  const [subject, setSubject] = useState(initialSubject);
  const [body, setBody] = useState(initialBody);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const disable = () => {
    return emailOptions.length > 0 ? false : true;
  };
  const handleSubject = (e: ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
  };
  const handleBody = (e: ChangeEvent<HTMLInputElement>) => {
    setBody(e.target.value);
  };

  const createMailToString = () => {
    return "mailto:" + selectedEmail?.label + "?subject=" + subject + "&body=" + body;
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        Send epost
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="container">
            <div className="d-flex justify-content-center">
              <h1 style={{ fontSize: "1.5em" }}>Mal</h1>
            </div>
            <div className="row">
              <p style={{ padding: "0 0 0 0" }}>Velg epost</p>
              <Select
                placeholder="Velg epost"
                options={emailOptions}
                className="p-0"
                defaultValue={emailOptions.at(0)}
                closeMenuOnSelect={true}
                onChange={(choice) => {
                  if (choice != null) {
                    setSelectedEmail(choice);
                  }
                }}
              />
            </div>
            <div className="row mt-4">
              <TextField
                id="standard-multiline-static"
                onChange={handleSubject}
                label="Emne"
                multiline
                rows={2}
                defaultValue={disable() ? "" : initialSubject}
                placeholder="Emne / Subject"
                variant="filled"
              />
            </div>
            <div className="row mt-4">
              <TextField
                id="standard-multiline-static"
                onChange={handleBody}
                label="Tekst"
                multiline
                rows={5}
                defaultValue={disable() ? "" : initialBody}
                placeholder="Tekst / Body"
                variant="filled"
              />
            </div>
            <div className="row d-flex justify-content-center">
              <Button
                className="mt-4 w-50"
                onClick={(e) => {
                  props.onButtonClick();
                  //window.location.href = createMailToString().toString();
                  window.open(createMailToString().toString(), "_blanc")
                }}
                variant="outlined"
                disabled={disable()}
              >
                Åpne epostprogram
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
