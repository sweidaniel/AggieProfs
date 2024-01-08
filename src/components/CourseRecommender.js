import React, { useState, useEffect,useContext } from 'react';
import { useParams } from 'react-router-dom';
import {CSVDataContext} from './CSVFile';


function CourseRecommendationForm() {
  const [courseNumber, setCourseNumber] = useState('');
  const [department, setDepartment] = useState('');
  const [receivedData, setReceivedData] = useState({ classes: [] }); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const params = useParams();

  const csvData = useContext(CSVDataContext);

  function aggregateProfessorData(classes) {
    const professorAggregates = {};
  
    classes.forEach(cls => {
      const { prof, A, B, C, D, F, I, S, U, Q, X, gpa } = cls;
  
      if (!professorAggregates[prof]) {
        professorAggregates[prof] = {
          totalA: 0,
          totalB: 0,
          totalC: 0,
          totalD: 0,
          totalF: 0,
          totalI: 0,
          totalS: 0,
          totalU: 0,
          totalQ: 0,
          totalX: 0,
          totalGPA: 0,
          count: 0,
        };
      }
  
      professorAggregates[prof].totalA += parseInt(A, 10);
      professorAggregates[prof].totalB += parseInt(B, 10);
      professorAggregates[prof].totalC += parseInt(C, 10);
      professorAggregates[prof].totalD += parseInt(D, 10);
      professorAggregates[prof].totalF += parseInt(F, 10);
      professorAggregates[prof].totalI += parseInt(I, 10);
      professorAggregates[prof].totalS += parseInt(S, 10);
      professorAggregates[prof].totalU += parseInt(U, 10);
      professorAggregates[prof].totalQ += parseInt(Q, 10);
      professorAggregates[prof].totalX += parseInt(X, 10);
      professorAggregates[prof].totalGPA += parseFloat(gpa);
      professorAggregates[prof].count += 1;
    });
  
    // Now, we will convert these aggregates into an array and calculate average GPA
    const aggregatedData = Object.keys(professorAggregates).map(prof => {
      const aggregate = professorAggregates[prof];
      const averageGPA = aggregate.totalGPA / aggregate.count;
      return {
        prof,
        A: (aggregate.totalA / aggregate.count).toFixed(0),
        B: (aggregate.totalB / aggregate.count).toFixed(0),
        C: (aggregate.totalC / aggregate.count).toFixed(0),
        D: (aggregate.totalD / aggregate.count).toFixed(0),
        F: (aggregate.totalF / aggregate.count).toFixed(0),
        I: (aggregate.totalI / aggregate.count).toFixed(0),
        S: (aggregate.totalS / aggregate.count).toFixed(0),
        U: (aggregate.totalU / aggregate.count).toFixed(0),
        Q: (aggregate.totalQ / aggregate.count).toFixed(0),
        X: (aggregate.totalX / aggregate.count).toFixed(0),
        gpa: averageGPA.toFixed(3), // rounding to 3 decimal places
      };
    });
  
    return aggregatedData;
  }
  const aggregatedProfessorData = aggregateProfessorData(receivedData.classes);

  useEffect(() => {
    if (params.courseName) {
      const [dept, number] = params.courseName.split('-');
      setDepartment(dept);
      setCourseNumber(number);
      handleFetchClick();
      fetchGradeData(dept, number);

    }
  }, [params.courseName]);


  function getRecommendedProfessor(data) {
    let recommendedProf = '';
    let maxAverageGPA = 0;

    data.forEach(item => {
      if (parseFloat(item.gpa) > maxAverageGPA) {
        maxAverageGPA = parseFloat(item.gpa);
        recommendedProf = item.prof;
      }
    });

    return recommendedProf;
  }
  

  function generateTable(data) {
    if (!data || !Array.isArray(data.classes) || data.classes.length === 0) {
      return <p>No data available</p>;
    }
  
    // Get column headers from the first item's keys
    const headers = Object.keys(data.classes[0]).filter(header => header !== 'dept' && header !== 'number');

  
    return (
      <table>
        <thead>
          <tr>
            {headers.map(header => (
              <th key={header}>{header.toUpperCase().replace(/_/g, ' ')}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.classes.map((item, index) => (
            <tr key={index}>
              {headers.map(header => (
                <td key={`${header}-${index}`}>{item[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  
  
  
  


  const fetchGradeData = async (dept = department, number = courseNumber) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/modifiedRequest?dept=${dept}&number=${number}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const aggregatedData = aggregateProfessorData(data.classes);
      setReceivedData({ classes: aggregatedData });
    } catch (e) {
      console.error('Fetch error:', e);
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleFetchClick = () => {
    if (department && courseNumber) {
      fetchGradeData(department, courseNumber);
    } else {
      setError('Please enter both department and course number');
    }
  };
  

  const recommendedProfessor = getRecommendedProfessor(aggregatedProfessorData);
  
  return (
    <div>
      <h1>Course Data for {department} {courseNumber}</h1>


      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {receivedData && (
  <div>
    <p>Average of a professor's data</p>
  <p>Recommended Professor based on GPA: {recommendedProfessor}</p>
  {receivedData.classes && generateTable({ classes: receivedData.classes })} 
  {/* Make sure to pass an object with 'classes' */}
</div>

      )}
    </div>
  );
}

export default CourseRecommendationForm;
