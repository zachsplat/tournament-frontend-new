// src/utils/logger.js
// Optional: Implement a logging service or use console.log for frontend logging

const logger = {
  log: (message, ...args) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(message, ...args);
    }
  },
  error: (message, ...args) => {
    if (process.env.NODE_ENV !== 'production') {
      console.error(message, ...args);
    }
    // Optionally, send errors to an external monitoring service
  },
};

export default logger;

