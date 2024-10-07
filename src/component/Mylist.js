
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getCsrfToken } from './cssrf';

const Mylist = () => {
    const [images, setImages] = useState([]);
    const [csrfToken, setCsrfToken] = useState('');
  
  
  useEffect(() => {
    // Fetch CSRF token when the component mounts
    const fetchCsrfToken = async () => {
        const token = await getCsrfToken();
        setCsrfToken(token);
    };
    fetchCsrfToken();
  }, []);
    const fetchUserImages = async () => {
        
        try {
            const response = await axios.get('http://localhost:8000/app/get-user-images/', {
                headers: {
                    'X-CSRFToken': csrfToken,
                },
                withCredentials: true,
            });
            setImages(response.data);  // Set images in the state
        } catch (error) {
            console.log('Error fetching images:', error);
        }
    };

    useEffect(() => {
        fetchUserImages();
    }, []);

    return (
        <div className="image-gallery">
            {images.length > 0 ? (
                images.map((imageData, index) => (
                    <div key={index}>
                        <img src={`http://localhost:8000/media/${imageData.image}`} alt={`User Image ${index}`} />
                    </div>
                ))
            ) : (
                <p>No images uploaded yet.</p>
            )}
        </div>
    );
};

export default Mylist;
