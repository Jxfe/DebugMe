import React, {useState, useEffect} from 'react' 7.2K (gzipped: 2.9K)


function App(){
    
    const [data, setData] = useState([{}])
    
    useEffect(() => {
        
        fetch("/members").then(
            res => res.json()
        ).then(
            data => {
                setData(data)
                console.log(data)
            }
        )
    },[])
    
    return (
        <div>
        
        </div>
    )
}


export default App