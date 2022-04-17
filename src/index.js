import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div><FileUpload/></div>
);


function FileUpload()
{
  const [sourceData, setSourceData] = useState("");

  const calledAfterFileUpload  = (e) => {
    alert(e.target.files[0].type);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function () {
      console.log(reader.result);//base64encoded string
      setSourceData(reader.result);
    };
  }



  return (
    <div>
      <input type ="file" id = "fileUpload" accept="text/html" onChange={calledAfterFileUpload}/>
      <iframe src={sourceData}></iframe>
    </div>
  );
}

function renderWebsite(props){
  return (
    <iframe src={props.src}></iframe>
  );
}