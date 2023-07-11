export function bellmanFord(source, numNodes, graph) {
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
  }
  
  export function longestCommonSubsequence(route1, route2) {
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
      } else if (dp[i - 1][j] >dp[i][j - 1]) {
        i--;
      } else {
        j--;
      }
    }
  
    return lcs;
  }
  