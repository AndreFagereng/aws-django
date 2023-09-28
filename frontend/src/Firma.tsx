import { ChangeEvent, Fragment } from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

import { naceList } from "./utils";
import { styles } from "./styles/styles";
import Select from "react-select";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Card from "@mui/material/Card";
import { Slider, Box, TextField, Button, TablePagination, Pagination } from "@mui/material";
import MultiSelect from "./components/MultiSelect";
import FirmaCard, { Firma } from "./components/FirmCard";
import Header from "./Header";
import { Template } from "./EmailTemplate";

type NaceInfo = {
  label: string;
  value: string;
};

type FilterState = {
  hasEmail: boolean;
  hasWebsite: boolean;
  hasPhone: boolean;

  selNaceCode: string;
  selNEmployers: number[];
  selMunicipality: string[];
};

type PaginationState = {
  count: number;
  offset: number;
  currentPage: number;
};

function FirmaOverview() {
  const itemsPerPage = 10;
  const [selectedTemplates, setSelectedTemplates] = useState<Template[]>([]);
  const [employees, setEmployees] = useState<number[]>([0, 100000]);
  const [firma, setFirma] = useState<Firma[]>([]);
  const [pageinationState, setPaginationState] = useState<PaginationState>({
    count: 0,
    offset: 0,
    currentPage: -1,
  });
  const [filterState, setFilterState] = useState<FilterState>({
    hasEmail: false,
    hasWebsite: false,
    hasPhone: false,
    selNaceCode: "",
    selNEmployers: [0, 100000],
    selMunicipality: [],
  });

  //const handlerFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
  //  setFilterState({...filterState, [e.target.name]: e.target.value})
  //}

  let url = `http://localhost:8000/api/firms/custom/?limit=${itemsPerPage}&offset=${pageinationState.offset}&employees=[${filterState.selNEmployers[0]},${filterState.selNEmployers[1]}]`;
  const updateUrl = (str: string, replace: boolean) => {
    if (replace) {
      url.replace(str, "");
    } else {
      url += str;
    }
  };

  filterState.hasEmail ? updateUrl("&email=True", false) : updateUrl("&email=True", true);
  filterState.hasWebsite ? updateUrl("&website=True", false) : updateUrl("&website=True", true);
  filterState.hasPhone ? updateUrl("&telephone=True", false) : updateUrl("&telephone=True", true);
  filterState.selNaceCode.length != 0
    ? updateUrl(`&naering=${filterState.selNaceCode}`, false)
    : updateUrl(`&naering=${filterState.selNaceCode}`, true);
  filterState.selMunicipality?.length != 0
    ? updateUrl(`&municipality=${filterState.selMunicipality.toString()}`, false)
    : updateUrl(`&municipality=${filterState.selMunicipality.toString()}`, true);

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setFirma(res.data.results);
        setPaginationState({ ...pageinationState, count: res.data.count });
      })
      .catch((err) => console.log(err));
  }, [pageinationState.offset, filterState]);

  // Resets ReactPaginate initial page and offset
  // Will be an issue if count is similar for two events
  //useEffect(() => {
  // setPaginationState({ ...pageinationState, currentPage: 0, offset: 0 });
  //}, [pageinationState.count]);

  let templatesOptions = [];
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/template")
      .then((res) => {
        res.data.map((item: Template) => templatesOptions.push({ label: item.name, value: item.name }));
        setSelectedTemplates(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handlePageClick = (a: { selected: number }) => {
    const newOffset = (a.selected * itemsPerPage) % pageinationState.count;
    setPaginationState({ ...pageinationState, offset: newOffset, currentPage: a.selected });
  };

  const handleSlider = (event: Event, newValue: number | number[]) => {
    setEmployees(newValue as number[]);
  };

  const handleSliderOnCommit = () => {
    setFilterState({ ...filterState, selNEmployers: employees });
    setEmployees(employees as number[]);
  };

  let naceOptions: NaceInfo[] = [];
  naceList.map((item) => naceOptions.push({ label: item, value: item }));

  return (
    <>
      <Header></Header>
      <div className="container mt-10">
        <div className="row">
          <div className="col-3">
            <Card className="bg-color-1" style={{ padding: "10px 10px 10px 10px" }}>
              <div style={{ margin: "auto", padding: "20px 0px 20px 0px" }}>
                <MultiSelect
                  onChange={(choice) => {
                    const values: string[] = [];
                    choice.forEach((item: any) => values.push(item.value));
                    setFilterState({ ...filterState, selMunicipality: values });
                  }}
                />
              </div>
              <div style={{ margin: "auto", padding: "20px 0px 20px 0px" }}>
                <Select
                  placeholder="Velg bransje"
                  options={naceOptions}
                  closeMenuOnSelect={false}
                  isMulti
                  styles={styles}
                  onChange={(choice) => {
                    const itemList = choice.map((item) => item.value);
                    setFilterState({ ...filterState, selNaceCode: itemList.join("æsepæ") });
                  }}
                />
              </div>
              <h6 style={{ padding: "20px 0px 0px 0px" }}>Ansatte</h6>
              <div className="row">
                <div className="col">
                  <TextField value={employees[0]} id="outlined-basic" variant="outlined" />
                </div>
                <div className="col">
                  <TextField value={employees[1]} id="outlined-basic" variant="outlined" />
                </div>
              </div>

              <div className="justify-content-center row">
                <Box sx={{ width: 300 }}>
                  <Slider
                    getAriaLabel={() => "Temperature range"}
                    value={employees}
                    onChange={handleSlider}
                    onChangeCommitted={handleSliderOnCommit}
                    valueLabelDisplay="auto"
                    min={0}
                    max={1000}
                    sx={{
                      "& .MuiSlider-thumb": {
                        color: "#3a4750",
                      },
                      "& .MuiSlider-track": {
                        color: "#3a4750",
                      },
                      "& .MuiSlider-rail": {
                        color: "#acc4e4",
                      },
                      "& .MuiSlider-active": {
                        color: "green",
                      },
                    }}
                  />
                </Box>
              </div>
              <h6 style={{ padding: "20px 0px 0px 0px" }}>Vis kun virksomheter med</h6>
              <FormGroup row className="justify-content-center">
                <FormControlLabel
                  label="Epost"
                  control={
                    <Checkbox
                      size="small"
                      onChange={() => setFilterState({ ...filterState, hasEmail: !filterState.hasEmail })}
                    ></Checkbox>
                  }
                ></FormControlLabel>
                <FormControlLabel
                  label="Hjemmeside"
                  control={
                    <Checkbox
                      size="small"
                      onChange={() => setFilterState({ ...filterState, hasWebsite: !filterState.hasWebsite })}
                    ></Checkbox>
                  }
                ></FormControlLabel>
                <FormControlLabel
                  label="Telefon"
                  control={
                    <Checkbox
                      size="small"
                      onChange={() => setFilterState({ ...filterState, hasPhone: !filterState.hasPhone })}
                    ></Checkbox>
                  }
                ></FormControlLabel>
              </FormGroup>
            </Card>
          </div>

          <div className="col">
            <div className="d-flex justify-content-between pl-3 pr-3">
              <FormControlLabel label="Velg alle" control={<Checkbox size="small"></Checkbox>}></FormControlLabel>
              <div className="p-2 border-3 border-b-teal-600 mb-2 float-right">
                {" "}
                <span className="bg-gradient-to-r from-teal-800 to-rose-800 bg-clip-text text-transparent font-bold">
                  Selektert
                </span>{" "}
                {0}
              </div>

              <div className="p-2 border-3 border-b-teal-600 mb-2 float-right ">
                {" "}
                <span className="bg-gradient-to-r from-teal-800 to-rose-800 bg-clip-text text-transparent font-bold">
                  Treff
                </span>{" "}
                <span className="font-semibold">{pageinationState.count}</span>
              </div>
            </div>
            {firma.map((item) => (
              <Fragment key={item.name}>
                <FirmaCard
                  key={item.orgnr}
                  id={item.name}
                  name={item.name}
                  email={item.email}
                  telephone={item.telephone}
                  orgnr={item.orgnr}
                  orgtype={item.orgtype}
                  nace={item.nace}
                  employees={item.employees}
                  website={item.website}
                  address={item.address}
                  postal={item.postal}
                  postalcode={item.postalcode}
                  municipality={item.municipality}
                  contacted={item.contacted}
                  templates={selectedTemplates}
                ></FirmaCard>
              </Fragment>
            ))}
            <div style={{ margin: "auto" }}>
              <ReactPaginate
                forcePage={pageinationState.currentPage}
                breakLabel="..."
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                renderOnZeroPageCount={null}
                pageCount={Math.ceil(pageinationState.count / itemsPerPage)}
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
