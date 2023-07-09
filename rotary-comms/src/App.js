import React, { useState } from 'react';
import { AppBar, Button, TextField, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import './App.css';

function RotaryCommunications(props) {
  const [numNodes, setNumNodes] = useState(0);
  //const [graph, setGraph] = useState(Array(numNodes).fill(Array(numNodes).fill(null)));
  const [editavel, setEditavel] = useState(true)
  const [graph, setGraph] = useState(() => {
    const initialGraph = Array(numNodes).fill(null).map(() => Array(numNodes).fill({ value: null }));
    return initialGraph;
  });
  const [result, setResult] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event, row, col) => {
    const value = event.target.value;
    const updatedGraph = [...graph];
    console.log(updatedGraph);
    updatedGraph[row][col] = value !== '' ? parseFloat(value) : null;
    setGraph(updatedGraph);
  };

  const handleChangenumNodes = (event) => {
    const value = event.target.value;
    setNumNodes(value);
  };

  const bellmanFord = (source) => {
    const distances = Array(numNodes).fill(Infinity);
    distances[source] = 0;

    for (let _ = 0; _ < numNodes - 1; _++) {
      for (let u = 0; u < numNodes; u++) {
        for (let v = 0; v < numNodes; v++) {
          if (graph[u][v] !== null) {
            distances[v] = Math.min(distances[v], distances[u] + graph[u][v]);
          }
        }
      }
    }

    for (let u = 0; u < numNodes; u++) {
      for (let v = 0; v < numNodes; v++) {
        if (graph[u][v] !== null && distances[u] + graph[u][v] < distances[v]) {
          throw new Error('O grafo contém ciclo negativo!');
        }
      }
    }

    return distances;
  };

  const longestCommonSubsequence = (route1, route2) => {
    const m = route1.length;
    const n = route2.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (route1[i - 1] === route2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }

    const lcs = [];
    let i = m;
    let j = n;

    while (i > 0 && j > 0) {
      if (route1[i - 1] === route2[j - 1]) {
        lcs.unshift(route1[i - 1]);
        i--;
        j--;
      } else if (dp[i - 1][j] > dp[i][j - 1]) {
        i--;
      } else {
        j--;
      }
    }

    return lcs;
  };

  const calculateOptimalRoutes = () => {
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
      setResult('');
      setErrorMessage(error.message);
    }
  };

  const renderResult = () => {
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

  const renderInputFields = () => {
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
              style={{ marginRight: 10, marginBottom: 10 }}
            />
          </td>
        );
      }
      inputFields.push(<tr key={`row-${i}`}>{row}</tr>);
    }
    return (
      <table>
        <tbody>{inputFields}</tbody>
      </table>
    );
  };
  
  const handleClickBotao = () => {
    setEditavel(false);
  };

  return (
    <div>
      <Typography variant="h5" style={{ marginBottom: 20 }}>
        Roteamento de Rede de Telecomunicações
      </Typography>
      <label htmlFor="campo-texto">Insira a quantidade de nós da rede de comunicações:</label>
      <TextField
              value={numNodes}
              onChange={(event) => handleChangenumNodes(event)}
              type="number"
              label={`Quantidade de Nós`}
              variant="outlined"
              size="small"
              style={{ marginRight: 30, marginBottom: 10 }}
              disabled={!editavel}
      />

      <Button onClick={handleClickBotao} variant="contained" color="primary">
        Confirmar
      </Button>

      <div className="center">{renderInputFields()}</div>

      <Button variant="contained" color="primary" onClick={calculateOptimalRoutes}>
        Encontrar Rotas
      </Button>

      <div style={{ marginTop: 20 }}>{renderResult()}</div>
    </div>
  );
}

export default RotaryCommunications;
