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
              value={i===j ? 0 : value}
              onChange={(event) => handleChange(event, i, j)}
              type="number"
              label={`Custo (${i}, ${j})`}
              variant="outlined"
              size="small"
              disabled={i===j}
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
    if (errorMessage !== '') {
      return <Alert severity="error">{errorMessage}</Alert>;
    }

    if (!result) {
      return null;
    }

    return (
      <div>
        <Typography variant="h6">Rotas ótimas:</Typography>
        {result.results.map((routes, i) => (
          <Typography key={i} variant="body1">
            Origem {i}: {JSON.stringify(routes)}
          </Typography>
        ))}

        <Typography variant="h6" style={{ marginTop: 20 }}>
          Padrão comum nas rotas ótimas:
        </Typography>
        {result.commonSubsequence.length ?
            result.commonSubsequence.map((lcs, i) => (
          <Typography key={i} variant="body1">
            Origem {i} e Origem {i + 1}: {JSON.stringify(lcs)}
          </Typography>
        )) : <Typography variant="body1">
                Nenhum padrão possível
            </Typography>
        }
      </div>
    );
  };

  export function calculateOptimalRoutes(params) {
    const { numNodes, graph, setResult, setErrorMessage } = params;
    const results = [];
    try {
  
        for (let source = 0; source < numNodes; source++) {
            const shortestPaths = bellmanFord(source, graph);
        
            for (let target = 0; target < numNodes; target++) {
                if (target !== source) {
                    const { route, weight } = findShortestRoute(graph, shortestPaths, source, target);
                    results.push({ source, target, route, weight });
                }
            }
        }
    
        const routes = results.map(result => result.route);
        const commonSubsequence = longestCommonSubsequence(routes);
  
        setResult({ results, commonSubsequence });
        setErrorMessage('');
    } catch (error) {
        setResult({});
        setErrorMessage(error.message);
    }
  }
  
  function findShortestRoute(graph, shortestPaths, source, target) {
    const route = [];
    let currentNode = target;
    route.push(currentNode);
    let weight = 0;
  
    while (currentNode !== source) {
      for (let prevNode = 0; prevNode < graph.length; prevNode++) {
        if (graph[prevNode][currentNode] !== null) {
          const edgeWeight = graph[prevNode][currentNode];
          if (shortestPaths[currentNode] === shortestPaths[prevNode] + edgeWeight) {
            currentNode = prevNode;
            route.unshift(currentNode);
            weight += edgeWeight;
            break;
          }
        }
      }
    }
  
    return { route, weight };
  }
  