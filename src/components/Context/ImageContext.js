import React, { createContext, useState } from "react";

export const ImageSearchContext = createContext();
//Creating context for the searched images from API so that these can be used in any child components directly
const ImageContext = ({ children }) => {
  const [searchedImages, setSearchedImages] = useState([]);
  return (
    <ImageSearchContext.Provider value={{ searchedImages, setSearchedImages }}>
      {children}
    </ImageSearchContext.Provider>
  );
};

export default ImageContext;
