interface Firm {
  name: string;
  type: string;
  employees: number;
  telephone: string;
  website: string;
  email: string;
}

function FirmCard(props: Firm) {
  return (
    <>
      <div
        id={props.name}
        onClick={() => {}}
        className="card mb-3"
        style={{ width: "65%", margin: "auto" }}
      >
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">{props.type}</p>
          <div style={{ display: true ? "none" : "block" }}>
            <hr></hr>
            <p className="card-text">Antall ansatte: {props.employees}</p>
            <p className="card-text">Telefon: {props.telephone}</p>
            <p className="card-text">
              Epost: <a href="https://www.vg.no">{props.email}</a>
            </p>
            <p className="card-text">
              Hjemmeside: <a href={props.website}> {props.website}</a>
            </p>
            <hr></hr>
            <img
              src="https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2018/08/Empire-Flippers-an-online-business-marketplace-1024x564.webp"
              style={{ height: 200 }}
            ></img>
          </div>
          <p className="card-text">
            <small className="text-body-secondary">
              Last updated {1} mins ago
            </small>
          </p>
        </div>
      </div>
    </>
  );
}
