import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import HackerNews from "./components/HackerNews";

const App = () => {

    const [progress, setProgress] = useState(0);
    const hitsPerPage = 6;

    return (
        <>
            <LoadingBar
                height={3}
                color="#f11946"
                progress={progress}
            />

            <Routes>
                <Route exact path="/" element={<HackerNews setProgress={setProgress} hitsPerPage={hitsPerPage} />} />
            </Routes>
        </>
    )
}

export default App;