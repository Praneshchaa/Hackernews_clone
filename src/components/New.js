import axios from "axios";
import React, { useEffect, useState } from "react";
import "../scss/Content.scss";

function Home() {
  const [news, setNews] = useState([]);
  const [singleNews, setSingleNews] = useState([]);

  useEffect(() => {
    axios
      .get(`https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty`)
      .then((response) => {
        setNews(response.data.slice(0, 30));
      })
      .then(() => {
        const promises = news.map((id) =>
          axios.get(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
          )
        );
        //DONE TO ENSURE ALL DATA ELEMENTS ARE FETCHED ON A SYNC

        Promise.all([...promises]).then(function (values) {
          setSingleNews(values);
        });
      });
  }, [singleNews]);

  return (
    <div className="content-body">
      <ol>
        {singleNews.map((newsOne) => {
          return (
            <li>
              <div>
                <div>
                  <a href={newsOne.data.url} className="title">
                    <p style={{ fontSize: "10pt" }}>{newsOne.data.title}</p>
                  </a>
                </div>
                <div style={{ display: "flex" }}>
                  <p
                    style={{
                      marginRight: "5px",
                      fontSize: "7pt",
                      color: "gray",
                    }}
                  >
                    {newsOne.data.score} points
                  </p>
                  <p
                    style={{
                      marginRight: "5px",
                      fontSize: "7pt",
                      color: "gray",
                    }}
                  >
                    {" "}
                    by: {newsOne.data.by}
                  </p>
                  <p
                    style={{
                      marginRight: "5px",
                      fontSize: "7pt",
                      color: "gray",
                    }}
                  >
                    {" "}
                    {Math.round(
                      (Date.now() / 1000 - newsOne.data.time) / 86400
                    ) === 0
                      ? Math.round(
                          (Date.now() / 1000 - newsOne.data.time) / 3600
                        ) === 0
                        ? Math.round(
                            (Date.now() / 1000 - newsOne.data.time) / 60
                          ) + " minutes"
                        : Math.round(
                            (Date.now() / 1000 - newsOne.data.time) / 3600
                          ) + " hours"
                      : Math.round(
                          (Date.now() / 1000 - newsOne.data.time) / 86400
                        ) + " days"}
                    &nbsp; hide |
                  </p>
                  <a
                    style={{
                      marginRight: "5px",
                      fontSize: "7pt",
                      color: "gray",
                      textDecoration: "none",
                    }}
                    href="./"
                  >
                    {newsOne.data.descendants} comments
                  </a>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default Home;
