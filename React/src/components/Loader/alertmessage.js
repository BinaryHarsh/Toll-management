import { toast } from 'react-toastify';

export const showToast = (message, options = {}) => {
  toast(message, {
    position: 'top-center',
    autoClose: 2000, // Duration in milliseconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    ...options, // You can override default options with custom options
  });
};



export const error = (message, options = {}) => {
    toast.error(message, {
      position: 'top-center',
      autoClose: 2000, // Duration in milliseconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style:{
        fontSize:'16px',
        // width: determineWidth(message),
        ...options.style
      },
      ...options, // You can override default options with custom options
    });
  };
  const determineWidth = (message) => {
    // You can implement your own logic to calculate the width dynamically
    // For example, you can set a minimum and maximum width or calculate based on the length of the message
    const minimumWidth = '250px';
    const maximumWidth = '500px';
    const calculatedWidth = `${Math.min(Math.max(message.length * 10, parseInt(minimumWidth)), parseInt(maximumWidth))}px`;
    return calculatedWidth;
  };

export const success = (message, options = {}) => {
    toast.success(message, {
      position: 'top-center',
      autoClose: 2000, // Duration in milliseconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style:{
        fontSize:'16px',
        width: determineWidth(message),
        ...options.style
      },
      ...options, // You can override default options with custom options
    });
  };

