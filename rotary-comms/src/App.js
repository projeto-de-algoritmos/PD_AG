import React from 'react';
import RotaryCommunications from './RotaryCommunications';

function App() {
  return (
    <div>
      <Card>
        <RotaryCommunications />
      </Card>
    </div>
  );
}

function Card({ children }) {
  return (
    <div style={cardStyle}>
      {children}
    </div>
  );
}

const cardStyle = {
  border: '1px solid #3F51B5',
  borderRadius: '20px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#ffffff',
  padding: '10px',
  margin: '30px',
};

export default App;