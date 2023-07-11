import React, { useState } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import { calculateOptimalRoutes, renderInputFields, renderResult } from './functions.js';

function RotaryCommunications() {
    const [numNodes, setNumNodes] = useState(0);
    const [editavel, setEditavel] = useState(true)
    const [graph, setGraph] = useState(() => {
        const initialGraph = Array.from({ length: numNodes }, () => Array(numNodes).fill(null));
        return initialGraph;
      });      
    const [result, setResult] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (event, row, col) => {
        const value = event.target.value;
        const updatedGraph = [...graph];
        updatedGraph[row][col] = updatedGraph[row] && !isNaN(parseFloat(value)) ? parseFloat(value) : null;
        setGraph(updatedGraph);
    };

    const isAllFilled = () => {
        return graph.length > 0 && graph.every(row => row.length > 0 && row.every(value => value !== null && value !== ''));
    };
      
    const handleClickBotao = () => {
        setEditavel(false);
    };

    const handleChangenumNodes = (event) => {
      var value = event.target.value;
      if (value > 9) {
          value = 9;
      } else if (value < 1) {
          value = 1;
      }
      
      setNumNodes(value);
      
      setGraph((prevGraph) => {
          const updatedGraph = prevGraph.map((row, rowIndex) => {
            if (rowIndex < numNodes) {
              return row.slice(0, numNodes).concat(
                Array(numNodes - row.length).fill(null)
              );
            }
            return row;
          });
          while (updatedGraph.length <= numNodes) {
            updatedGraph.push(Array(numNodes).fill(null));
          }

          while (updatedGraph.length > value) {
            updatedGraph.pop();
          }
      
          updatedGraph.forEach((row) => {
            while (row.length > value) {
              row.pop();
            }
          });
      
          return updatedGraph;
        });
  }; 

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h5" style={{ marginBottom: 20 }}>
                Roteamento de Rede de Telecomunicações
            </Typography>
            
            <div style={{ textAlign: 'center', marginTop: 20 }}>
                <label htmlFor="numNodes">Insira a quantidade de nós da rede de comunicações:</label>
                <br />
                <br />
                <TextField
                    id="numNodes"
                    value={numNodes}
                    onChange={(event) => handleChangenumNodes(event)}
                    type="number"
                    label="Quantidade de Nós"
                    variant="outlined"
                    size="small"
                    style={{ marginBottom: 10 }}
                    disabled={!editavel}
                />
                <br />
                <Button onClick={handleClickBotao} disabled={numNodes < 1 || !editavel} variant="contained" color="primary">
                    Confirmar
                </Button>
            </div>
            
            <div style={{ margin: '20px auto', textAlign: 'center' }}>
                {renderInputFields({ numNodes, graph, handleChange })}
            </div>
            
            <Button
                variant="contained"
                disabled={!isAllFilled() || editavel}
                color="primary"
                onClick={() => calculateOptimalRoutes({ numNodes, setResult, setErrorMessage })}
            >
                Encontrar Rotas
            </Button>

            <div style={{ marginTop: 20 }}>{result && renderResult({ result, errorMessage })}</div>
        </div>

    );
}
  
export default RotaryCommunications;
  