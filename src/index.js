import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {isMetaMaskInstalled , isDesiredChain , getAccount , getWebsiteDataFromContract , uploadWebsiteDataToContract} from './blockchain'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div><RootComponent/></div>
);

function RootComponent(){

  let [isDesiredChainBool , setIsDesiredChainBool] = useState(true);
  if(!isMetaMaskInstalled())
  {
    return <MetamaskNotInst/>;
  }
  isDesiredChain().then((x) => {setIsDesiredChainBool(x);})
  if(!isDesiredChainBool)
  {
    return <NotDesiredChain/>;
  }
  return <WebsiteComp/>;
}

function MetamaskNotInst(){
  return(
    <div  className="sk">
      <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      <h1 id="mmni">You have not installed Metamask, <br></br>please install Metamask and <br></br>
      reload the page for accessing the website.</h1>
    </div>
  )
}

function NotDesiredChain(){
  return (
    <div  className="sk">
      <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      <h1 id="mmni">Please connect to the<br></br><a href="https://mumbai.polygonscan.com/">polygon mumbai testnet network </a><br></br> on metamask
        and reload the page <br></br>for accessing the website.
      </h1>
    </div>
  )
}

function WebsiteComp(){
  return(
    <div id="nomargin">
      <UsrComp/>
      <DevComp/>
    </div>
    
  )
}

function UsrComp(){
  return(
    <div className="sk">
      <TopHalf/>
      <BottomHalf/>
    </div>
  )
}

function TopHalf(){
  return(
    <div>
      <div className='float-child1'>
        <Heading/>
      </div>
      <div className='float-child2'>
        <Sidebar/>
      </div> 
    </div>
  )
}

function BottomHalf(){
  return(
    <div>
      <SearchBar/>
    </div>
  )
}

function Heading(){
  return(
  <div id="heading">
    <h1>DECENTRALIZED WEB HOSTING</h1>
  </div>
  )
}

function Sidebar(){
  let [address , setAddress] = useState("");

  getAccount().then((x) => {setAddress(x);})

  return(
    <div id="sidebar" >
      <h4>CONNECTED WALLET ADDRESS: {address}</h4>
    </div>
  )
}

function SearchBar(){

  const [htmlDataURL , setHTMLDdataURL] = useState("");
  
      //setHTMLDdataURL(reader.result);
  const [websiteAddress , setWebsiteAddress] = useState("");

  const handleChange = (e)=> {
    if(e.target.value !== "")
    {
      setWebsiteAddress(e.target.value);
    }
  }
  const onButtonClick = () => {
    getWebsiteDataFromContract(websiteAddress).then((WebsiteData)=>{
      setHTMLDdataURL(WebsiteData);
    });
  }
  


  return(
    <div>
      <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      <div id="title">Search<br></br></div>
        <input  onChange={handleChange} type="text" id="search" name="fname" placeholder="Enter wallet address associated with the website "></input>
        <button type="submit" onClick={onButtonClick} className="srchbutton"><i className="fa fa-search"></i></button>
      
      <p id="text">To upload your website scrolldown.</p>
       <iframe src = {htmlDataURL} id="ifrm" width="720px" height="590px"></iframe>
    </div>
  )
}



//title : Deploy your Website
//Currently we only support single html file. You can use tools like gulp to pack your website to a single file
function DevComp(){
  return(
    <div className="sk2">
      {/* <div id="title">Upload your website here</div> */}
      <Upload/>
    </div>
  )
}

function Upload(){

 
  const HandleFileInput = (e) => {
    const reader = new FileReader()
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      uploadWebsiteDataToContract(reader.result);

    }
  }

  return(
    <div className="meher">
      <div id="upldtxt">Upload your website here</div>
      <label>
        <div id="search2" className="upright">click here to upload your site</div>
        <input type="file" onChange={HandleFileInput} className="upright" id="search" placeholder="upload your website file" accept="text/html" style={{display:'none'}}></input>
      </label>
     
      <div id="text2"><br></br>At present we only support single html file. In order to package<br></br>your website into single html file use tools like gulp.js <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>.</div>
    </div>
  )
}


