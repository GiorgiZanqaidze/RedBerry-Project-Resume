export const formatPhoneNumber = (value) => {
    // return nothing if no value
    if (!value) return value; 

    const cvLength = value.length;


      if (cvLength < 4) return value; 

      if (cvLength < 7) return `${value.slice(0, 4)} ${value.slice(4)}`; 

      if (cvLength < 9) return `${value.slice(0, 4)} ${value.slice(4, 7)} ${value.slice(7)}`; 
      
      if (cvLength < 12)return `${value.slice(0, 4)} ${value.slice(4, 7)} ${value.slice(7, 9)} ${value.slice(9)}`; 
      
      return `${value.slice(0, 4)} ${value.slice(4, 7)} ${value.slice(7, 9)} ${value.slice(9, 11)} ${value.slice(11, 13)}`; 
  };