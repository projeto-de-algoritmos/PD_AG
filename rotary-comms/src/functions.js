import React from 'react';
import { TextField, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { bellmanFord, longestCommonSubsequence } from './algorithms';

export function renderInputFields (params) {
    const { numNodes, graph, handleChange } = params;
    const inputFields = [];
    for (let i = 0; i < numNodes; i++) {
      const row = [];
      for (let j = 0; j < numNodes; j++) {
        const value = graph[i] && graph[i][j] !== null ? String(graph[i][j]) : '';
        const key = `input-${i}-${j}`;
  
        row.push(
          <td key={key}>
            <TextField
              value={value}
              onChange={(event) => handleChange(event, i, j)}
              type="number"
              label={`Custo (${i}, ${j})`}
              variant="outlined"
              size="small"
              style={{ marginRight: 10, marginBottom: 10, minWidth: '150' }}
            />
          </td>
        );
      }
      inputFields.push(<tr key={`row-${i}`}>{row}</tr>);
    }
    return inputFields;
  };

  export function renderResult (params) {
    const { result, errorMessage } = params;
    console.log(result, errorMessage);
    if (errorMessage !== '') {
      return <Alert severity="error">{errorMessage}</Alert>;
    }

    if (!result) {
      return null;
    }

    return (
      <div>
        <Typography variant="h6">Rotas ótimas:</Typography>
        {result.optimalRoutes.map((routes, i) => (
          <Typography key={i} variant="body1">
            Origem {i}: {JSON.stringify(routes)}
          </Typography>
        ))}

        <Typography variant="h6" style={{ marginTop: 20 }}>
          Padrão comum nas rotas ótimas:
        </Typography>
        {result.commonSubsequence.map((lcs, i) => (
          <Typography key={i} variant="body1">
            Origem {i} e Origem {i + 1}: {JSON.stringify(lcs)}
          </Typography>
        ))}
      </div>
    );
  };

  export function calculateOptimalRoutes (params) {
    const { numNodes, setResult, setErrorMessage } = params;
    
    try {
      const optimalRoutes = [];
      for (let i = 0; i < numNodes; i++) {
        const distances = bellmanFord(i);
        optimalRoutes.push(distances.map((distance, j) => [j, distance]));
      }

      const commonSubsequence = [];
      for (let i = 0; i < numNodes; i++) {
        for (let j = i + 1; j < numNodes; j++) {
          const route1 = optimalRoutes[i].map(([node]) => node);
          const route2 = optimalRoutes[j].map(([node]) => node);
          const lcs = longestCommonSubsequence(route1, route2);
          commonSubsequence.push(lcs);
        }
      }

      setResult({ optimalRoutes, commonSubsequence });
      setErrorMessage('');
    } catch (error) {
      setResult({});
      setErrorMessage(error.message);
    }
  };