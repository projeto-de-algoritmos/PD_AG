export function bellmanFord(source, graph) {
    const numNodes = graph.length;
    const distances = Array(numNodes).fill(Infinity);
    distances[source] = 0;
  
    for (let i = 0; i < numNodes - 1; i++) {
      for (let u = 0; u < numNodes; u++) {
        for (let v = 0; v < numNodes; v++) {
          if (graph[u][v] !== null) {
            const weight = graph[u][v];
            if (distances[u] + weight < distances[v]) {
              distances[v] = distances[u] + weight;
            }
          }
        }
      }
    }
  
    return distances;
  }
  
  
  export function longestCommonSubsequence(routes) {
    const numRoutes = routes.length;
    const lengths = Array.from({ length: numRoutes + 1 }, () => Array(numRoutes + 1).fill(0));
  
    for (let i = 1; i <= numRoutes; i++) {
      for (let j = 1; j <= numRoutes; j++) {
        if (routes[i - 1].toString() === routes[j - 1].toString()) {
          lengths[i][j] = lengths[i - 1][j - 1] + 1;
        } else {
          lengths[i][j] = Math.max(lengths[i - 1][j], lengths[i][j - 1]);
        }
      }
    }
  
    const commonPatterns = [];
    let i = numRoutes;
    let j = numRoutes;
  
    while (i > 0 && j > 0) {
      if (routes[i - 1].toString() === routes[j - 1].toString()) {
        commonPatterns.unshift(routes[i - 1]);
        i--;
        j--;
      } else if (lengths[i - 1][j] > lengths[i][j - 1]) {
        i--;
      } else {
        j--;
      }
    }
  
    return commonPatterns;
  }
  
  
  