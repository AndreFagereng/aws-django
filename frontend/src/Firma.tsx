import { Fragment } from "react";
import { useState } from "react";
import React from "react";
import axios from "axios";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";

import { naceList } from "./utils";
import { styles } from "./styles/styles";
import Select from "react-select";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { Collapse, Divider, Slider, Box } from "@mui/material";

type Firma = {
  id: string;
  name: string;
  employees: number;
  orgnr: string;
  orgtype: string;
  nace: string;
  email: string;
  telephone: string;
  website: string;
};

function FirmaCard(firma: Firma, last_updated: string) {
  const [hide, setHide] = useState(true);
  const toggleHide = () => {
    setHide(!hide);
  };

  const emails = JSON.parse(firma.email.toString());

  return (
    <Fragment key={firma.id}>
      {
        <Card
          key={firma.id}
          onClick={() => {
            toggleHide();
          }}
          className="card mb-3"
          style={{ margin: "auto" }}
        >
          <div className="card-body" style={{ cursor: "pointer" }}>
            <h5 className="card-title">{firma.name}</h5>
            <p className="card-text">{firma.nace}</p>
            <Collapse
              in={!hide}
              timeout="auto"
              unmountOnExit
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
                  <div className="container">
                    <div className="row">
                      <div className="col"></div>
                      <div className="col"></div>
                      <div className="col">
                        <div className="row">
                          <p className="card-text">
                            <span style={{ fontWeight: "500" }}>Ansatte: </span>
                            {firma.employees}
                          </p>
                        </div>
                        <div className="row">
                          <p>
                            <span style={{ fontWeight: "500" }}>Proff: </span>
                            <a target="_blank" href={`https://www.proff.no/bransjes%C3%B8k?q=${firma.orgnr}`}>
                              {firma.orgnr}
                            </a>{" "}
                          </p>
                        </div>
                      </div>
                      <div className="col">
                        <div className="row"></div>
                        <div className="row">
                          <p className="card-text">
                            <span style={{ fontWeight: "500" }}>Telefon: </span>
                            <ul>
                              {JSON.parse(firma.telephone).map((item: string) => (
                                <li id={item}>{item}</li>
                              ))}
                            </ul>
                          </p>
                        </div>
                        <div className="row">
                          <p className="card-text">
                            <span style={{ fontWeight: "500" }}>Epost: </span>
                            <ul>
                              {JSON.parse(firma.email).map((item: string) => (
                                <li id={item}>
                                  <a
                                    href={
                                      "mailto:" +
                                      item +
                                      "?subject=Hei " +
                                      firma.name +
                                      "!" +
                                      "&body=" +
                                      "Jeg så at dere jobber innen " +
                                      firma.nace +
                                      "!"
                                    }
                                  >
                                    {item}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </p>
                        </div>
                        <div className="row">
                          <p className="card-text">
                            <span style={{ fontWeight: "500" }}>Hjemmeside: </span>
                            <ul>
                              {JSON.parse(firma.website).map((item: string) => (
                                <li id={item}>
                                  <a target="_blank" href={item}>
                                    {item}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Button variant="contained">Mer</Button>
                <Button variant="outlined">Send epost</Button>
              </div>
            </Collapse>
            <p className="card-text">
              <small className="text-body-secondary">Last updated {1} mins ago</small>
            </p>
          </div>
        </Card>
      }
    </Fragment>
  );
}

function FirmaOverview() {
  const itemsPerPage = 5;
  const [firma, setFirma] = useState<Firma[]>([]);
  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(itemsPerPage);
  const [offset, setOffset] = useState(0);

  const [hasEmail, setHasEmail] = useState(false);
  const [hasWebsite, setHasWebsite] = useState(false);
  const [hasTelephone, setHasTelephone] = useState(false);
  const [selectedNace, setSelectedNace] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([0, 100000]);

  const [employees, setEmployees] = useState<number[]>([0, 50]);

  let url = `http://localhost:8000/api/firms/custom/?limit=${limit}&offset=${offset}&employees=[${selectedEmployees[0]},${selectedEmployees[1]}]`;
  const updateUrl = (str: string, replace: boolean) => {
    if (replace) {
      url.replace(str, "");
    } else {
      url += str;
    }
  };

  hasEmail ? updateUrl("&email=True", false) : updateUrl("&email=True", true);
  hasWebsite ? updateUrl("&website=True", false) : updateUrl("&website=True", true);
  hasTelephone ? updateUrl("&telephone=True", false) : updateUrl("&telephone=True", true);
  selectedNace != "" ? updateUrl(`&naering=${selectedNace}`, false) : updateUrl(`&naering=${selectedNace}`, true);

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setFirma(res.data.results);
        setCount(res.data.count);
      })
      .catch((err) => console.log(err));
  }, [offset, hasEmail, hasWebsite, hasTelephone, selectedNace, selectedEmployees]);

  const handlePageClick = (a: { selected: number }) => {
    const newOffset = (a.selected * itemsPerPage) % count;
    setOffset(newOffset);
  };

  function valuetext(value: number) {
    return `${value}°C`;
  }
  const handleSlider = (event: Event, newValue: number | number[]) => {
    setEmployees(newValue as number[]);
  };

  const handleSliderOnCommit = () => {
    setSelectedEmployees(employees);
  };

  let naceOptions: NaceInfo[] = [];

  interface NaceInfo {
    label: string;
    value: string;
  }

  naceList.map((item) => naceOptions.push({ label: item, value: item }));

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-3">
            <Card style={{ padding: "10px 10px 10px 10px" }}>
              <div style={{ margin: "auto", padding: "20px 0px 20px 0px" }}>
                <Select
                  placeholder="Velg bransje"
                  options={naceOptions}
                  closeMenuOnSelect={false}
                  isMulti
                  styles={styles}
                  onChange={(choice) => {
                    const itemList = choice.map((item) => item.value);
                    setSelectedNace(itemList.join("æsepæ"));
                  }}
                />
              </div>
              <div className="justify-content-center row">
                <h6 style={{ padding: "20px 0px 0px 0px" }}>Ansatte</h6>
                <Box sx={{ width: 300 }}>
                  <Slider
                    getAriaLabel={() => "Temperature range"}
                    value={employees}
                    onChange={handleSlider}
                    onChangeCommitted={handleSliderOnCommit}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    min={0}
                    max={1000}
                  />
                </Box>
              </div>
              <h6 style={{ padding: "20px 0px 0px 0px" }}>Vis kun virksomheter med</h6>
              <FormGroup row className="justify-content-center">
                <FormControlLabel
                  label="Epost"
                  control={<Checkbox size="small" onChange={() => setHasEmail(!hasEmail)}></Checkbox>}
                ></FormControlLabel>
                <FormControlLabel
                  label="Hjemmeside"
                  control={<Checkbox size="small" onChange={() => setHasWebsite(!hasWebsite)}></Checkbox>}
                ></FormControlLabel>
                <FormControlLabel
                  label="Telefon"
                  control={<Checkbox size="small" onChange={() => setHasTelephone(!hasTelephone)}></Checkbox>}
                ></FormControlLabel>
              </FormGroup>
            </Card>
          </div>
          <div className="col">
            {firma.map((item) => (
              <Fragment key={item.name}>
                <FirmaCard
                  id={item.name}
                  name={item.name}
                  email={item.email}
                  telephone={item.telephone}
                  orgnr={item.orgnr}
                  orgtype={item.orgtype}
                  nace={item.nace}
                  employees={item.employees}
                  website={item.website}
                ></FirmaCard>
              </Fragment>
            ))}
            <div style={{ margin: "auto" }}>
              <ReactPaginate
                breakLabel="..."
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                renderOnZeroPageCount={null}
                pageCount={Math.ceil(count / limit)}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                containerClassName={"pagination"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                activeClassName={"active"}
              ></ReactPaginate>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FirmaOverview;
