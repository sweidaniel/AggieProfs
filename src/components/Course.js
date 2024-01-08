import React, { useEffect, useState } from 'react';
import CourseRecommendationForm from './CourseRecommender';
import Papa from 'papaparse'; // Ensure Papa is imported

const CoursePage = () => {
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
    <div>
      <CourseRecommendationForm csvData={csvData} />
    </div>
  );
};

export default CoursePage;
