import { Card, Checkbox, Collapse, Divider, FormControlLabel, FormGroup } from "@mui/material";
import axios from "axios";
import { Fragment, useState } from "react";
import EmailModal from "./EmailModal";
import { Template } from "../EmailTemplate";
import {
  EmailIcon,
  EmployeesIcon,
  GeoLocationIcon,
  LocationIcon,
  PhoneIcon,
  ProffIcon,
  WebsiteIcon,
} from "../icons/icons";

export type Firma = {
  id: string;
  name: string;
  employees: number;
  orgnr: string;
  orgtype: string;
  nace: string;
  email: string;
  telephone: string;
  website: string;
  address: string;
  postal: string;
  postalcode: string;
  municipality: string;
  contacted: boolean;
  templates: Template[];
};

export default function FirmaCard(firma: Firma) {
  //const firma = props.firma;
  //const opt = props.options;
  const [hide, setHide] = useState(true);
  const [contacted, setContacted] = useState(firma.contacted);
  const toggleHide = () => {
    setHide(!hide);
  };
  const contactUrl = "http://localhost:8000/api/contacted/update_contacted/";
  const postContacted = () => {
    setContacted(!contacted);
    axios
      .post(contactUrl, {
        user_id: "andre",
        orgnr: firma.orgnr,
        contacted: contacted,
      })
      .catch((err) => console.log(err));
  };

  return (
    <Fragment key={firma.id}>
      {
        <Card
          key={firma.id}
          className="mb-1 position-relative"
          style={{ margin: "auto", backgroundColor: contacted ? "#F5F5F5" : "" }}
        >
          <div className="p-2">
            <div>
              <div className="position-absolute top-0 start-0">
                <FormGroup>
                  <Checkbox size="small" />
                </FormGroup>
              </div>

              <div
                onClick={() => {
                  toggleHide();
                }}
                style={{ cursor: "pointer" }}
              >
                <h1 className="font-semibold text-teal-700 text-lg">{firma.name}</h1>
                <p className="card-text">{firma.nace}</p>
              </div>
              <div className="position-absolute float-left top-0 end-0">
                <FormGroup>
                  <FormControlLabel
                    checked={contacted}
                    disabled={false}
                    className={contacted ? "text-teal-800 font-bold" : "opacity-50"}
                    control={<Checkbox onClick={postContacted} size="small" />}
                    label="Kontaktet"
                  />
                </FormGroup>
              </div>

              <Collapse
                in={!hide}
                timeout="auto"
                easing={{
                  enter: "cubic-bezier(0.4, 0, 0.2, 1)",
                  exit: "cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <div
                  style={{
                    justifyContent: "space-around",
                  }}
                >
                  <Divider />

                  <div style={{ textAlign: "left", margin: "auto" }}>
                    <div
                      onClick={() => {
                        toggleHide();
                      }}
                      className="container cus"
                      style={{ cursor: "pointer" }}
                    >
                      <div className="row">
                        <div className="col">
                          <div className="d-flex mt-2">
                            <LocationIcon></LocationIcon>
                            <p className="card-text">
                              {JSON.parse(firma.address) + ", " + firma.postalcode + " " + firma.postal}
                            </p>
                          </div>
                          <div className="d-flex  mt-2">
                            <GeoLocationIcon></GeoLocationIcon>
                            <p className="card-text">{firma.municipality}</p>
                          </div>
                        </div>
                        <div className="col">
                          <div className="row">
                            <div className="d-flex mt-2">
                              <EmployeesIcon></EmployeesIcon>
                              <p className="card-text">
                                <span style={{ opacity: "0.7" }}>Ansatte: </span>
                                {firma.employees}
                              </p>
                            </div>
                          </div>
                          <div className="row mt-2">
                            <div className="d-flex">
                              <ProffIcon></ProffIcon>
                              <p>
                                <span style={{ opacity: "0.7" }}>Proff: </span>
                                <a target="_blank" href={`https://www.proff.no/bransjes%C3%B8k?q=${firma.orgnr}`}>
                                  {firma.orgnr}
                                </a>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col">
                          <div className="row mt-2">
                            <div className="d-flex">
                              {firma.telephone.length !== 2 ? <PhoneIcon></PhoneIcon> : null}
                              <ul>
                                {JSON.parse(firma.telephone).map((item: string) => (
                                  <li key={item} id={item}>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="row mt-2">
                            <div className="d-flex">
                              {firma.email.length !== 2 ? <EmailIcon></EmailIcon> : null}
                              <ul>
                                {JSON.parse(firma.email).map((item: string) => (
                                  <li key={item} id={item}>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="row mt-2">
                            <div className="d-flex">
                              {firma.email.length !== 2 ? <WebsiteIcon></WebsiteIcon> : null}
                              <ul>
                                {JSON.parse(firma.website).map((item: string) => (
                                  <li key={item} id={item}>
                                    <a target="_blank" href={item}>
                                      {item}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <EmailModal
                    name={firma.name}
                    emails={firma.email}
                    nace={firma.nace}
                    templates={firma.templates}
                    onButtonClick={() => {
                      setContacted(true);
                    }}
                  ></EmailModal>
                </div>
              </Collapse>
            </div>
            <p className="card-text text-sm"> {firma.orgtype}</p>
            <div className=" ml-2 mb-1 position-absolute bottom-0 left-0 border-xl">
              {firma.email.length !== 2 ? <span className="m-1 font-semibold text-xs text-rose-800">EPOST</span> : null}
              {firma.telephone.length !== 2 ? (
                <span className="m-1 font-semibold text-xs text-rose-800">TELEFON</span>
              ) : null}
              {firma.website.length !== 2 ? (
                <span className="m-1 font-semibold text-xs text-rose-800">HJEMMESIDE</span>
              ) : null}
            </div>
          </div>
        </Card>
      }
    </Fragment>
  );
}
