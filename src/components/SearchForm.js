import { useState } from "react";
import styled from "styled-components";
//import images
import Glass from "../img/search.png";
import background from "../imgs/background.jpg";

const SearchForm = () => {
  const [formInptu, setFormInptu] = useState("");
  const [loading, setLoading] = useState(false);
  const [listOfBooks, setListOfBooks] = useState([]);

  const searchBooks = (e) => {
    e.preventDefault();
    setListOfBooks([]);
    setLoading(true);
    if (formInptu === "") {
      return;
    }

    fetch("http://openlibrary.org/search.json?q=" + formInptu)
      .then((data) => data.json())
      .then((response) => {
        let newResult = [];
        setFormInptu("");
        for (let i = 0; i < response.docs.length; i++) {
          console.log(response.docs[i + 1]);
          newResult.push({
            title: response.docs[i].title ? response.docs[i].title : "",
            publishDate: response.docs[i].publish_date
              ? response.docs[i].publish_date
              : "",
            authorName: response.docs[i].author_name
              ? response.docs[i].author_name
              : "",
            cover: response.docs[i].isbn
              ? `http://covers.openlibrary.org/b/isbn/${response.docs[i].isbn[0]}-M.jpg?default=false`
              : "",
              publishYear : response.docs[i].publish_year ? response.docs[i].publish_year.sort().reverse()[0] : 0
          });
        }
        setLoading(false);
        setListOfBooks(newResult);
      })
      .catch((err) => {
        console.log(err.message);
        alert(err.message);
      });
  };

  const handleChange = (e) => {
    let x = [...listOfBooks];
    if (e.target.value === "TitleA-Z") {
      x.sort((a, b) => a.title.localeCompare(b.title));
    } else if (e.target.value === "TitleZ-A") {
      x.sort((a, b) => b.title.localeCompare(a.title));
    } else if (e.target.value === "DateA-Z") {
      x.sort((a, b) => {
        return b.publishYear - a.publishYear;
      });
    } else if (e.target.value === "DateZ-A") {
      x.sort((a, b) => {
        return a.publishYear - b.publishYear;
      });
      
    }
    setListOfBooks(x);
  };

  return (
    <>
      <Container>
        <Search>
          <form>
            <Input
              value={formInptu}
              type="text"
              id="search"
              name="search"
              placeholder="Search..."
              onChange={(e) => setFormInptu(e.target.value)}
            />
            <Btn type="submit" onClick={searchBooks}>
              Search
            </Btn>
            {listOfBooks.length ? (
              <>
                <label htmlFor="Sort">Sort By:</label>
                <select
                  id="dropdown"
                  name="Sort"
                  id="Sort"
                  className="select"
                  onChange={handleChange}
                >
                  <option value="N/A">Select</option>
                  <option value="TitleA-Z">Title A-Z</option>
                  <option value="TitleZ-A">Title Z-A</option>
                  <option value="DateA-Z">Realese Year A-Z</option>
                  <option value="DateZ-A">Realese Year Z-A</option>
                </select>
                <div className="select_arrow"></div>
              </>
            ) : (
              ""
            )}
          </form>
        </Search>
      </Container>
      {loading && <h2>Loading ..</h2>}
      <div className="cards">
        {listOfBooks.map(({ authorName, cover, publishDate, title }, i) => (
          <div className="card" key={i}>
            <img
              src={cover}
              alt={`${title} book cover image`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "./imgs/cover.jpg";
                e.target.style.width = "180";
                e.target.style.height = "260px";
              }}
            />
            <div className="container">
              <h3>{title}</h3>
              {authorName.length
                ? authorName.map((name, j) => <p key={j}>{name}</p>)
                : ""}
              {publishDate.length
                ? publishDate.map(
                    (date, j) => j < 3 && <span key={j}>{date} </span>
                  )
                : ""}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const Search = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(5px);
  padding: 20px 20px;
  form {
    display: flex;
    flex-direction: column;
  }

  form label {
    margin-top: 5rem;
    font-size: 1rem;
    font-family: "Inter", sans-serif;
    color: #444343;
  }
`;
const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  background: url(${background});
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: white;
  background-image: url(${Glass});
  background-position: 10px 10px;
  background-repeat: no-repeat;
  padding: 12px 20px 12px 40px;
  margin-bottom: 10px;
`;

const Btn = styled.button`
  font-family: Arial;
  color: #ffffff;
  font-size: 20px;
  background: #000000;
  padding: 10px 20px 10px 20px;
  text-decoration: none;

  hover {
    background: #3cb0fd;
    background-image: -webkit-linear-gradient(top, #3cb0fd, #3498db);
    background-image: -moz-linear-gradient(top, #3cb0fd, #3498db);
    background-image: -ms-linear-gradient(top, #3cb0fd, #3498db);
    background-image: -o-linear-gradient(top, #3cb0fd, #3498db);
    background-image: linear-gradient(to bottom, #3cb0fd, #3498db);
    text-decoration: none;
  }
`;
export default SearchForm;
