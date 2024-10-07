import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { getCsrfToken } from './cssrf';

const PicInputForm = () => {
const [image, setImage] = useState(null);
const [previewUrl, setPreviewUrl] = useState(null);
const [csrfToken, setCsrfToken] = useState('');
  
  
     useEffect(() => {
    // Fetch CSRF token when the component mounts
     const fetchCsrfToken = async () => {
        const token = await getCsrfToken();
        console.log(token)
        setCsrfToken(token);
        console.log(csrfToken);

      };
      fetchCsrfToken();
      }, []);
const onImageChange = (e) => {
  const file = e.target.files[0];
  console.log(file);
  if (file) {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  }
  e.target.value = "";
};


  // sending the images in the backend for processing 
  const onsubmitchange=async (event)=>{
    event.preventDefault();
    //creating the form instance
    const submitData= new FormData();
    //inorder to send to the backend instance of form i.e.
    //submitData we append the input type and variable where image
    //is stored. Visit line 5 to see variable
    submitData.append('image',image);

    

    // try catch to send  data and print response
    try{
       const Response=await axios.post('http://localhost:8000/app/upload/',submitData,{

       headers: {
        'Content-Type': 'multipart/form-data',
        'X-CSRFToken': csrfToken,  // Include CSRF token in the headers
    },
    withCredentials: true,  // Ensure cookies are sent with the request
    });
      console.log('response',Response.data);
    }
    catch(error){
      console.log('Error connecting to server',error);
    }
  }
  


return (
  <div className="flex flex-col items-center gap-5">
    {/* {image} check is the image is null or not is yes nothisng is
     shhown && is not the img tag display the image that is {image} 
     form set image */}
    {image && <img alt="preview-image" src={previewUrl} className=" w-60 h-auto mt-20-" />}
    
    <span>printing output span</span>
    <form method="post" onSubmit={onsubmitchange}>
      <input type="file" onChange={onImageChange} className="filetype" />
      <button type="submit" className="border h-10 w-20 bg-backDarkgreen text-white rounded-full active:h-12 active:w-20">Submit</button>
    </form>
  </div>
)
}
export default PicInputForm;