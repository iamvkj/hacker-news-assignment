import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import HackerNewsItems from "./HackerNewsItems";
import Spinner from "./Spinner";

const HackerNews = (props) => {

    const location = useLocation();

    const [items, setItems] = useState([]);
    const [query, setQuery] = useState("general");
    const [text, setText] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true); // loading state
    const [nbHits, setnbHits] = useState(0);

    const capitalizeFirstLetterOfTitle = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (text) {
            setQuery(text);
            setText("");
        }
    }

    const fetchNews = async () => {
        props.setProgress(10);
        const url = `https://hn.algolia.com/api/v1/search?query=${query}&page=${page}&hitsPerPage=${props.hitsPerPage}`;
        setLoading(true);
        const res = await fetch(url);
        props.setProgress(30);
        const data = await res.json();
        props.setProgress(70);
        setItems(data.hits);
        setnbHits(data.nbHits)
        setLoading(false);
        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `HackerNews - ${capitalizeFirstLetterOfTitle(query)}`;
        window.scrollTo(0, 0);
        fetchNews();
        // eslint-disable-next-line
    }, [query, location]);

    const handlePrevClick = async () => {
        setPage(page - 1);
        fetchNews();
    }

    const handleNextClick = async () => {
        setPage(page + 1);
        fetchNews();
    }

    return (
        <>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand" style={{ fontSize: "30px", marginLeft: "20px" }}>HackerNews</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <form className="d-flex" onSubmit={handleSubmit} style={{ marginRight: "20px" }}>
                        <input
                            className="form-control me-2"
                            type="text"
                            name="text"
                            id="text"
                            placeholder="Search latest news..."
                            required
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <button className="btn btn-outline-success" type="submit" onClick={handleSubmit}>Search</button>
                    </form>
                </div>
            </nav>

            <div className="container">
                <h1 className="text-center" style={{ margin: "35px 0px", marginTop: "90px" }}>HackerNews - Top {capitalizeFirstLetterOfTitle(query)} Headline</h1>
            </div>

            {loading && <Spinner />}

            <div className="container">
                <div className="row">
                    {
                        items.map((element) => {
                            return (
                                <div className="col-md-4" key={element.objectID}>
                                    <HackerNewsItems
                                        title={element.title ? element.title.slice(0, 60) : ""}
                                        points={element.points}
                                        num_comments={element.num_comments}
                                        author={element.author ? element.author : "Unknown"}
                                        created_at={element.created_at} url={element.url}
                                    />
                                </div>
                            )
                        }
                        )}
                </div>
            </div>
            <div className="container d-flex justify-content-between pt-3 pb-3">
                <button className="btn btn-dark" type="button" onClick={() => handlePrevClick()} disabled={page <= 1}>
                    &larr; Previous
                </button>
                <button className="btn btn-dark" type="button" onClick={() => handleNextClick()} disabled={page + 1 > Math.ceil(nbHits / props.hitsPerPage)}>
                    Next &rarr;
                </button>
            </div>
        </>
    )
}

export default HackerNews;