import React, { useState } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import { calculateOptimalRoutes, renderInputFields, renderResult } from './functions.js';

function RotaryCommunications() {
    const [numNodes, setNumNodes] = useState(0);
    const [editavel, setEditavel] = useState(true)
    const [graph, setGraph] = useState(() => {
        const initialGraph = Array.from({ length: numNodes }, () => Array(numNodes).fill(null));
        console.log(initialGraph);
        return initialGraph;
      });      
    const [result, setResult] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (event, row, col) => {
        const value = event.target.value;
        const updatedGraph = [...graph];
        console.log(updatedGraph);
        updatedGraph[row][col] = updatedGraph[row] && !isNaN(parseFloat(value)) ? parseFloat(value) : null;
        setGraph(updatedGraph);
    };

    const handleClickBotao = () => {
        setEditavel(false);
    };

    const handleChangenumNodes = (event) => {
        var value = event.target.value;
        if (value > 9) {
            value = 9;
        } else if (value < 0) {
            value = 0;
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
        
            return updatedGraph;
          });
        
        console.log(graph);
        
    };

    return (
        <div>
        <Typography variant="h5" style={{ marginBottom: 20 }}>
            Roteamento de Rede de Telecomunicações
        </Typography>
        <div>
            <label  style={{ marginTop: 20 }}>Insira a quantidade de nós da rede de comunicações:</label>
            <br></br>
            <br></br>
            <TextField
                    value={numNodes}
                    onChange={(event) => handleChangenumNodes(event)}
                    type="number"
                    label={`Quantidade de Nós`}
                    variant="outlined"
                    size="small"
                    style={{ marginRight: 70, marginBottom: 10 }}
                    disabled={!editavel}
                    
            />
            <br></br>
            <Button onClick={handleClickBotao} variant="contained" color="primary">
            Confirmar
            </Button>
        </div>
        <br></br>
        <div className="center" style={{ marginRight: 70, marginBottom: 250 }}>{renderInputFields({ numNodes, graph, handleChange })}</div>
        <br></br>
        <Button variant="contained" color="primary" onClick={() => calculateOptimalRoutes({ numNodes, setResult, setErrorMessage })}>
            Encontrar Rotas
        </Button>

        <div style={{ marginTop: 20 }}>{result && renderResult({ result, errorMessage })}</div>
        </div>
    );
}
  
export default RotaryCommunications;
  