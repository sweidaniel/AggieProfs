import React, { createContext, useState, useEffect } from 'react';
import Papa from 'papaparse';

export const CSVDataContext = createContext();

export const CSVDataProvider = ({ children }) => {
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    const csvFilePath = '/path/to/cleaned_dist_data.csv';
    Papa.parse(csvFilePath, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (result) => {
        setCsvData(result.data);
      },
      error: (error) => {
        console.error('Error during CSV import:', error);
      }
    });
  }, []);

  return (
    <CSVDataContext.Provider value={csvData}>
      {children}
    </CSVDataContext.Provider>
  );
};
