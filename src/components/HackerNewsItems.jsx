import React from "react";

const HackerNewsItems = (props) => {

    const { objectID, title, points, num_comments, author, url, created_at } = props;

    return (
        <>
            <div className="my-3">
                <div className="card" key={objectID} style={{ height: "190px" }}>
                    <div style={{ display: "flex", justifyContent: "flex-end", position: "absolute", right: "0" }}>
                        <span className="badge rounded-pill bg-dark">Points: {points}</span>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Number of Comments: {num_comments}</h6>
                        <p className="card-text"><small className="text-danger">By {author} on {new Date(created_at).toGMTString()}</small></p>
                        <a className="btn btn-sm btn-dark" href={url} target="_blank" rel="noopenner noreferrer">Read More</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HackerNewsItems;