import axios from "axios";
import React, { useState, useEffect } from "react";

function App() {
const [options, setOptions] = useState([]);
const [to, setTo] = useState("en");
const [from, setFrom] = useState("en");
const [input, setInput] = useState("");
const [output, setOutput] = useState("");

//Function for lang translation

const langTranslate = () => {
  const langParam = {
    q : input,
    source : from,
    target : to,
    api_key : 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
  };

//Axios.post method to detect the language text
axios.post ('https://libretranslate.de/translate', langParam)
  .then((postResult) =>{
    console.log(postResult.data);
    setOutput(postResult.data.translatedText);
  });
};

//Fetch Lang. options from API
useEffect(()=>{
  axios.get('https://libretranslate.de/languages',{
    Headers: {accept: 'application/json'},
  })
    .then((postResult) => {
      console.log(postResult.data);
      setOptions(postResult.data);
    });

}, []);


  return (
    <div className="container mt-2">
      <div className="card">
        <div className="card-header bg-primary text-light">
          <span className='h5'>React App to translate text in any languages using <em>LibreTranslate</em> API</span>
        </div>

        <div className="card-body">
          <form>
            <div className="row">
              <div className="col-sm-6">
                {/* Dropdown Menu for convert language From */}
                <div className="input-group mb-3">
                  <span className="input-group-text bg-black text-light" id="basic-addon1">Lang. From</span>
                  <select className="form-select" aria-label="Default select example" id="langFrom" onChange={(e)=> setFrom(e.target.value)}>
                    {options.map((opt)=>(
                      <option key={opt.code} value={opt.code}>{opt.name}</option>
                    ))}
                  </select>
                </div>
              </div>

          {/* Dropdown Menu for convert language To */}
              <div className="col-sm-6">
                <div className="input-group mb-3">
                  <span className="input-group-text bg-black text-light" id="basic-addon1">Lang. To</span>
                  <select className="form-select" aria-label="Default select example" id="langTo" onChange={(e)=> setTo(e.target.value)}>
                    {options.map((opt)=>(
                      <option key={opt.code} value={opt.code}>{opt.name}</option>
                    ))}
                  </select>
                </div>
              </div>

            {/* Textarea for input text */}
              <div className="col-sm-6">
                <div class="form-floating">
                  <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea" value={input} onChange={(e)=>setInput(e.target.value)}></textarea>
                  <label for="floatingTextarea">Message</label>
                </div>
              </div>
          {/* Textarea for output/translated text */}
              <div className="col-sm-6">
                <div class="form-floating">
                  <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea" value={output} rows={'30'} readOnly></textarea>
                  <label for="floatingTextarea">Output</label>
                </div>
              </div>

              <div className="col">
                <button type="button" class="btn btn-success mt-3" onClick={langTranslate}>Translate</button>&nbsp;&nbsp;
                <button type="reset" class="btn btn-danger mt-3">Cancel</button>
              </div>

            </div>
          </form>

        </div>{/* card-body closed */}
      </div>{/* card-div closed */}
    </div>
  );
}

export default App;