import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProfessorPage() {
  const { id } = useParams();
  const [professor, setProfessor] = useState(null);

  useEffect(() => {
    fetch(`/api/professors/${id}`)
      .then(response => response.json())
      .then(data => setProfessor(data))
      .catch(error => console.error('Error fetching professor data: ', error));
  }, [id]); // Dependency array ensures fetch occurs when ID changes

  if (!professor) {
    return <div>Loading...</div>; // Or any other loading state representation
  }

  return (
    <div>
      <h1>Professor Details</h1>
      <p><strong>Name:</strong> {professor.name}</p>
      <p><strong>Department:</strong> {professor.department}</p>
      <p><strong>Rating:</strong> {professor.rating}</p>
      <p><strong>Number of Ratings:</strong> {professor.num_ratings}</p>
      <p><strong>Would Take Again Percentage:</strong> {professor.would_take_again_pct}</p>
      <p><strong>Level of Difficulty:</strong> {professor.level_of_difficulty}</p>
    </div>
  );
}

export default ProfessorPage;
