

export const getError= (error) => {
  return error.response && error.data.message
  ? error.response.data.message
  : error.message
   
  
};
