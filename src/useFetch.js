import { useState,useEffect } from "react";

// custom hook
// 특정 URL에서 데이터를 비동기로 가져오는 작업 수행
const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true); //  true: 처음 로딩  상태임으르 나타냄
    const [error, setError] = useState(null);
    
    // useEffect function is called whenever the page is rendered
    // If we want to make this function work only when they are rendered, add the empty array as a second parameter
    // If we want to call this function only when the name value is changed from the initial value to the new value, add an array with the "name" value
    useEffect(() => {
        // to stop the fetch when we change route
        const abortCont = new AbortController();

        setTimeout(() => {
        fetch(url, { signal: abortCont.signal }) 
          .then(res => {
            console.log(res);
            if(!res.ok) {
               throw Error('could not fetch the data for that resource'); 
            }
            return res.json(); // fetch로 받은 데이터를 json으로 변경 (기본적으로 fetch로 받은 데이터는 텍스트 데이터를 반환)
          })
          .then(data => {    // 반환된 json데이터를 저장
            setData(data);
            setIsPending(false);
            setError(null);
          })
          .catch((err => {
            if(err.name == 'AbortError'){
                console.log('fetch aborted');
            }else {
                setIsPending(false);
                setError(err.message);
            }
          }))
        }, 1000);
        
        // clean up function
        return () => abortCont.abort();

    }, [url]); // url이 바뀔때마다 이 useEffect 함수가 실행됨 

    return { data, isPending, error }
}


export default useFetch;