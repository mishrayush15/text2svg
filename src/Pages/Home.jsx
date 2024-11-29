import React, { useState, useEffect } from "react";
import { useFirebase } from "../Context/Firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { gemini } from "../GeminiAi/Gemini";

const Home = () => {
    const firebase = useFirebase();
    const navigate = useNavigate();

    const [promptValue, setPromptValue] = useState("");
    const [showResponse, setShowResponse] = useState(false);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState('')

    const user = firebase.user;

    const Logout = async () => {
        try {
            await firebase.SignOut();
            navigate("/login/google");
        } catch (error) {
            window.location.reload();
        }
    };

    //-- Validator --
    useEffect(() => {
        if (!firebase.isLoggedin) navigate("/login/google");
    }, [firebase.isLoggedin, navigate]);

    // Sending query to Gemini API
    const sendPromptToGemini = async () => {
        setShowResponse(false)
        setLoading(true);
        const response = await gemini(promptValue);
        const svgCodeMatch = response.match(/<svg[^>]*>[\s\S]*<\/svg>/);
        if (svgCodeMatch && svgCodeMatch[0]) {
            setResponse(svgCodeMatch[0]);
        } else {
            setResponse('');
            console.log('No SVG code found in the response.');
        }
        setLoading(false);
        setShowResponse(true);
        setPromptValue("")
    }

    // Downloading SVG file
    const downloadSVG = () => {
        const blob = new Blob([response], { type: 'image/svg+xml' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = 'text2svg.svg'; 
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <>
            {user ? (
                <>

                    <Navbar onLogout={Logout} user={user} />


                    {loading ? (
                        <div className="mt-64 flex-col gap-4 w-full flex items-center justify-center">
                            <div
                                className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
                            >
                                <div
                                    className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
                                ></div>
                            </div>
                        </div>
                    ) : null}


                    {showResponse ? (
                        <div className="mt-24 mx-auto w-[90%] sm:w-[700px] p-4 bg-gray-100 border rounded-lg shadow-lg text-center max-h-[400px] overflow-y-auto relative">
                            <div className="mt-24 mx-auto w-[90%] sm:w-[400px] p-4 text-center max-h-[400px] overflow-y-auto flex justify-center items-center">
                                <div
                                    className="w-full h-auto"
                                    dangerouslySetInnerHTML={{ __html: response }} // Insert the SVG code directly
                                />
                            </div>




                            <button onClick={downloadSVG} className=" mt-12 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600">
                                Download
                            </button>
                        </div>



                    ) : <div className="w-full mt-72 gap-x-2 flex justify-center items-center">
                        <div
                            className="w-5 bg-[#d991c2] animate-pulse h-5 rounded-full"
                        ></div>
                        <div
                            className="w-5 animate-pulse h-5 bg-[#9869b8] rounded-full"
                        ></div>
                        <div
                            className="w-5 h-5 animate-pulse bg-[#6756cc] rounded-full"
                        ></div>
                    </div>
                    }


                    <div className="fixed border-2 bottom-8 left-1/2 transform -translate-x-1/2 sm:w-[700px] w-[90%] p-4 bg-white rounded-lg flex items-center">
                        <input
                            onChange={(e) => {
                                setPromptValue(e.target.value);
                            }}
                            value={promptValue}
                            type="text"
                            className="w-full h-10 p-2 border-none focus:outline-none focus:ring-0"
                            placeholder="Enter the prompt here"
                        />

                        <button
                            onClick={() => {
                                sendPromptToGemini();
                            }}
                            className="ml-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
                        >
                            <span className="text-xl">📤</span>
                        </button>
                    </div>
                </>
            ) : null}
        </>
    );
};

export default Home;
