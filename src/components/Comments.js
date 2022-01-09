import axios from "axios";
import React, { useEffect, useState } from "react";
import "../scss/Content.scss";

function Home() {
  const [item, setItem] = useState(0);

  const [singleNews, setSingleNews] = useState([]);

  useEffect(() => {
    axios
      .get(`https://hacker-news.firebaseio.com/v0/maxitem.json?print=pretty`)
      .then((response) => {
        // console.log(response.data);
        setItem(response.data);
      })
      .then(() => {
        let promises = [];
        let i = item - 50;
        console.log(item);
        for (; i <= item; i++) {
          promises.push(
            axios.get(
              `https://hacker-news.firebaseio.com/v0/item/${i}.json?print=pretty`
            )
          );
        }
        Promise.all([...promises]).then(function (values) {
          // console.log(values);
          let filtered = values.filter((value) => {
            // console.log(value.data.type);
            return value.data.type === "comment";
          });

          setSingleNews(filtered);
          console.log(singleNews);
        });
        //DONE TO ENSURE ALL DATA ELEMENTS ARE FETCHED ON A SYNC
      });
  }, [item, singleNews]);

  let i = 1;
  return (
    <div className="content-body">
      {singleNews.map((news) => (
        <ul
          key={news.data.id}
          style={{
            listStyleType: "none",
            paddingLeft: "0rem",
          }}
        >
          <li>
            <div>
              <div style={{ display: "flex" }}>
                <p
                  style={{
                    marginRight: "5px",
                    fontSize: "8pt",
                    color: "gray",
                  }}
                >
                  {i++}. &nbsp; {news.data.by}
                </p>

                <p
                  style={{
                    marginRight: "5px",
                    fontSize: "8pt",
                    color: "gray",
                  }}
                >
                  {" "}
                  {Math.round((Date.now() / 1000 - news.data.time) / 86400) ===
                  0
                    ? Math.round(
                        (Date.now() / 1000 - news.data.time) / 3600
                      ) === 0
                      ? Math.round((Date.now() / 1000 - news.data.time) / 60) +
                        " minutes"
                      : Math.round(
                          (Date.now() / 1000 - news.data.time) / 3600
                        ) + " hours"
                    : Math.round((Date.now() / 1000 - news.data.time) / 86400) +
                      " days"}
                  &nbsp;
                </p>

                <p
                  style={{
                    marginRight: "5px",
                    fontSize: "8pt",
                    color: "gray",
                  }}
                >
                  parent | context | next | on:
                </p>
              </div>

              <div style={{ marginLeft: "16px", marginRight: "5px" }}>
                {
                  new DOMParser().parseFromString(news.data.text, "text/html")
                    .documentElement.textContent
                }
              </div>
            </div>
          </li>
        </ul>
      ))}
    </div>
  );
}

export default Home;
