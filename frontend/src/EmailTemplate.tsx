import { Alert, AlertTitle, Box, Button, FormHelperText, Modal, TextField } from "@mui/material";
import Header from "./Header";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import React, { FunctionComponent, MouseEventHandler } from "react";
import Message from "./components/AlertMessage";
import AlertMessage from "./components/AlertMessage";

const style = {
  //position: "absolute" as "absolute",
  //top: "50%",
  //left: "50%",
  //transform: "translate(-50%, -50%)",
  //width: 600,
  //width: "50%",
  marginTop: "10%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,

  p: 2,
};

interface IconButtonProps {
  templateId: number;
  onClick?: MouseEventHandler;
}

function EditIcon({ templateId, onClick }: IconButtonProps) {
  return (
    <a href="#">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-5 h-5 cursor"
        onClick={onClick}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
        />
      </svg>
    </a>
  );
}

function DeleteIcon({ templateId, onClick }: IconButtonProps) {
  return (
    <a href="#">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        name="asd"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5"
        onClick={onClick}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        />
      </svg>
    </a>
  );
}

export interface Template {
  id: number;
  name: string;
  subject: string;
  body: string;
  last_modified: string;
}

enum AlertType {
  OK,
  ERROR,
}

interface MessageType {
  showMessage: boolean;
  type: AlertType;
}

const EmailTemplateModal = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const [show, setShow] = useState<MessageType>({ showMessage: false, type: AlertType.OK });

  let url = "http://localhost:8000/api/template/";

  useEffect(() => {
    getTemplates();
  }, []);

  const showMessage = (alertType: AlertType) => {
    setShow({ showMessage: true, type: alertType });

    setTimeout(() => {
      setShow({ ...show, showMessage: false });
    }, 3000);
  };

  async function getTemplates() {
    axios
      .get(url)
      .then((res) => {
        setTemplates(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function postTemplate() {
    await axios
      .post(url, {
        name: name,
        subject: subject,
        body: body,
      })
      .then(() => showMessage(AlertType.OK))
      .catch((err) => {
        console.log(err);
      });
    handleClose();
    getTemplates();
    setName("");
    setSubject("");
    setBody("");
  }

  async function deleteTemplate(id: number) {
    await axios.delete(url + id.toString() + "/").catch((err) => console.log(err));
    setTemplates(templates.filter((item) => item.id !== id));
  }

  const handleName = (newValue: string) => {
    setName(newValue as string);
  };
  const handleSubject = (newValue: string) => {
    setSubject(newValue as string);
  };
  const handleBody = (newValue: string) => {
    setBody(newValue as string);
  };

  return (
    <>
      <Modal
        className="w-10/12 xl:w-1/3 m-auto"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="">
            <div className="h-100 d-flex flex-column align-items-center justify-content-center">
              <h1 className="text-4xl font-bold mt-10">E-post mal</h1>
              <div className="w-100 mt-10 p-2">
                <TextField
                  value={name}
                  onChange={(e) => handleName(e.target.value)}
                  required
                  label="Navn"
                  className=""
                  fullWidth
                />
                <FormHelperText id="component-helper-text" className="pl-1">
                  Navn på mal
                </FormHelperText>
                <TextField
                  onChange={(e) => handleSubject(e.target.value)}
                  required
                  value={subject}
                  label="Emne"
                  className="pt-2"
                  fullWidth
                />
                <FormHelperText id="component-helper-text" className="pl-1">
                  E-post emne
                </FormHelperText>
                <TextField
                  onChange={(e) => handleBody(e.target.value)}
                  value={body}
                  required
                  label="Tekst"
                  className="pt-2"
                  fullWidth
                  multiline
                  rows={10}
                />
                <FormHelperText id="component-helper-text" className="pl-1">
                  E-post tekst
                </FormHelperText>
              </div>
            </div>
            <div className="h-100 d-flex align-items-center justify-content-center gap-3">
              <Button
                disabled={subject === "" || body === "" || name === "" ? true : false}
                onClick={() => {
                  postTemplate();
                }}
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                Lagre
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      {show.showMessage && (
        <AlertMessage
          message="Opprettet ny mal!"
          severity={show.type == AlertType.ERROR ? "error" : "success"}
        ></AlertMessage>
      )}
      <div className="w-3/4 m-auto">
        <header className="d-flex justify-content-between mt-5">
          <h1 className="text-4xl">Epost maler</h1>
          <div>
            <Button onClick={handleOpen} variant="contained" className="">
              Ny mal
            </Button>
          </div>
        </header>
        <hr className="mt-3"></hr>

        <div className="mt-5 relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    ></input>
                    <label htmlFor="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Navn
                </th>
                <th scope="col" className="px-6 py-3">
                  Sist Endret
                </th>
                <th scope="col" className="px-6 py-3">
                  Brukt
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {templates.map((item) => (
                <Fragment key={item.id}>
                  <tr
                    key={item.id.toString()}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-table-search-1"
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        ></input>
                        <label htmlFor="checkbox-all-search" className="sr-only">
                          checkbox
                        </label>
                      </div>
                    </td>

                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {item.id}
                    </th>
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{item.last_modified}</td>
                    <td className="px-6 py-4">Ja</td>
                    <td className="flex items-center px-6 py-4 space-x-6">
                      <EditIcon
                        templateId={item.id}
                        onClick={(e) => {
                          console.log(e.target);
                        }}
                      ></EditIcon>
                      <DeleteIcon templateId={item.id} onClick={() => deleteTemplate(item.id)}></DeleteIcon>
                    </td>
                  </tr>
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default function Template() {
  return (
    <>
      <Header></Header>
      <EmailTemplateModal></EmailTemplateModal>
    </>
  );
}
