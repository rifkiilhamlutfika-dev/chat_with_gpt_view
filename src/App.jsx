import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [textInput, setInput] = useState("");
  const [responseApi, setResponseApi] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [processApi, setProcessApi] = useState(false);

  const responseGPT = async () => {
    setProcessApi(true);
    setResponseApi("");
    setIsLoading(true);
    await axios
      .get(`https://chat-with-gpt-api.vercel.app/?text=${textInput}`)
      .then((res) => {
        console.log(res);
        setResponseApi(res.data.data.choices[0].message.content);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
        setProcessApi(false);
      });
  };

  const handleKeyEnter = (e) => {
    if (e.key == "Enter") responseGPT();
  };

  return (
    <>
      <div className="container">
        <p>RILKA_DEV X GPT 4o</p>
        <input
          type="text"
          className="input-text"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={!processApi ? handleKeyEnter : undefined}
        />
        <button onClick={responseGPT} disabled={processApi}>
          SEND
        </button>
        {isLoading && (
          <>
            <div className="chat-response">
              Bentar Masih Menunggu Jawaban Dari Dia...
            </div>
          </>
        )}
        <div className="chat-response">{responseApi}</div>
      </div>
    </>
  );
}

export default App;
