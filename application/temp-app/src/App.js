import logo from './logo.svg';
import './App.css';

import React, {useEffect} from 'react'

function App() {
    

//    useEffect(() => {
//     const response = fetch("http://localhost:5000/user/Piper", {
//         method: "GET", // *GET, POST, PUT, DELETE, etc.
//         mode: "no-cors", // no-cors, *cors, same-origin
//         cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//         credentials: "same-origin", // include, *same-origin, omit
//         headers: {
//           "Content-Type": "application/json",
//           // 'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         redirect: "follow", // manual, *follow, error
//         referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//         //body: JSON.stringify({}), // body data type must match "Content-Type" header
//         
//     });
//     if (response.ok){
//         console.log('Happy')
//         console.log(response)
//     }else{
//         console.log('Sad')
//         console.log(response.json())
//     }
//        
//        
//        
//        
//        
//    }, []);
    
    
//////////////////    Works    /////////////////////////
//    useEffect(() => {
//            fetch("http://localhost:5000/user/Piper",{method: "GET"} ).then(response =>
//              response.json().then(data => {
//                console.log(data)
//              })
//            );
//        }, []);
    
    
 //   useEffect(() => {
 //           fetch("/user/Piper",{method: "GET"} ).then(response =>
 //             response.json().then(data => {
 //               console.log(data)
 //             })
 //           );
 //       }, []);

    useEffect(() => {
            fetch("/user/AppleMan",{
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                      // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify({'name':'AppleMan','email':'apples@gmail.com','password':'apples'}),
                  } ).then(response =>
              response.json().then(data => {
                console.log(data)
              })
            );
        }, []);
    
    return (
        <div className="App">
            Check console to see info
        </div>
    );
}

export default App;
