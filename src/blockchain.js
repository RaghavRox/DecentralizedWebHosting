// function FileUpload()
// {
//   const [sourceData, setSourceData] = useState("");

//   const calledAfterFileUpload  = (e) => {
//     alert(e.target.files[0].type);
//     var reader = new FileReader();
//     reader.readAsDataURL(e.target.files[0]);
//     reader.onload = function () {
//       console.log(reader.result);//base64encoded string
//       setSourceData(reader.result);
//     };
//   }

//   metamask();


//   return (
//     <div>
//       <input type ="file" id = "fileUpload" accept="text/html" onChange={calledAfterFileUpload}/>
//       <iframe src={sourceData}></iframe>
//     </div>
//   );
// }

// function renderWebsite(props){
//   return (
//     <iframe src={props.src}></iframe>
//   );
// }


// async function metamask()
// {
//   if (typeof window.ethereum !== 'undefined') {
//     const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//     const account = accounts[0];
//     console.log(account , typeof account);
//   }
// }