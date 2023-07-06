import { Fragment } from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";

class Firma {
  id: string;
  name: string;
  employees: number;
  type: string;
  email: string;
  telephone: string;
  website: string;

  public constructor(
    id: string,
    name: string,
    employees: number,
    type: string,
    email: string,
    telephone: string,
    website: string
  ) {
    this.id = id;
    this.name = name;
    this.employees = employees;
    this.type = type;
    this.email = email;
    this.telephone = telephone;
    this.website = website;
  }
}

function FirmaCard(firma: Firma, last_updated: string) {
  const [hide, setHide] = useState(true);
  const toggleHide = () => {
    setHide(!hide);
  };

  return (
    <Fragment key={firma.id}>
      {
        <div
          key={firma.id}
          onClick={() => {
            toggleHide();
          }}
          className="card mb-3"
          style={{ width: "65%", margin: "auto" }}
        >
          <div className="card-body" style={{ cursor: "pointer" }}>
            <h5 className="card-title">{firma.name}</h5>
            <p className="card-text">{firma.type}</p>
            <div
              style={{
                display: hide ? "none" : "flex",
                justifyContent: "space-around",
              }}
              className="bg-light"
            >
              <div style={{ margin: "auto" }}>
                <img
                  src="https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2018/08/Empire-Flippers-an-online-business-marketplace-1024x564.webp"
                  style={{ height: 150 }}
                ></img>
              </div>
              <div style={{ textAlign: "left", margin: "auto" }}>
                <p className="card-text">Antall ansatte: {firma.employees}</p>
                <p className="card-text">Telefon: {firma.telephone}</p>
                <p className="card-text">Epost: {firma.email}</p>
                <p className="card-text">
                  Hjemmeside:{" "}
                  <a target="_blank" href={firma.website}>
                    {" "}
                    {firma.website}
                  </a>
                </p>
              </div>
            </div>
            <p className="card-text">
              <small className="text-body-secondary">
                Last updated {1} mins ago
              </small>
            </p>
          </div>
        </div>
      }
    </Fragment>
  );
}

function FirmaOverview() {
  const itemsPerPage = 2;
  const [firma, setFirma] = useState<Firma[]>([]);
  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(itemsPerPage);
  const [offset, setOffset] = useState(0);
  const url = `http://localhost:8000/api/firms/?limit=${limit}&offset=${offset}`;

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setFirma(res.data.results);
        setCount(res.data.count);
      })
      .catch((err) => console.log(err));
  }, [offset]);

  const handlePageClick = (a: { selected: number }) => {
    console.log(a.selected);
    const newOffset = (a.selected * itemsPerPage) % count;
    console.log(newOffset);
    setOffset(newOffset);
    console.log("wts");
  };

  return (
    <>
      {firma.map((item) => (
        <Fragment key={item.name}>
          <FirmaCard
            id={item.name}
            name={item.name}
            email={item.email}
            telephone={item.telephone}
            type={item.type}
            employees={item.employees}
            website={item.website}
          ></FirmaCard>
        </Fragment>
      ))}
      <div style={{ margin: "auto", width: "65%" }}>
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
    </>
  );
}

export default FirmaOverview;
