import { useEffect, useState } from "react";

const useDebounce = (text: string, delay: number = 500) => { 

    const [debouncedText, setDebouncedText] = useState(text);
    
    useEffect(() => {
        const handler = setTimeout(() => {
        setDebouncedText(text);
        }, delay);
    
        return () => {
        clearTimeout(handler);
        };
    }, [text, delay]);
    
    return debouncedText;
 }

 export default useDebounce;