import numpy as np

def bellman_ford(graph, source):
    num_nodes = len(graph)
    distances = [float('inf')] * num_nodes
    distances[source] = 0

    for _ in range(num_nodes - 1):
        for u in range(num_nodes):
            for v in range(num_nodes):
                if graph[u][v] is not None:
                    distances[v] = min(distances[v], distances[u] + graph[u][v])

    return distances

def longest_common_subsequence(route1, route2):
    m, n = len(route1), len(route2)
    dp = np.zeros((m+1, n+1), dtype=int)

    for i in range(1, m+1):
        for j in range(1, n+1):
            if route1[i-1] == route2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])

    common_subsequence = []
    i, j = m, n
    while i > 0 and j > 0:
        if route1[i-1] == route2[j-1]:
            common_subsequence.append(route1[i-1])
            i -= 1
            j -= 1
        elif dp[i-1][j] > dp[i][j-1]:
            i -= 1
        else:
            j -= 1

    common_subsequence.reverse()
    return common_subsequence

def main():
    # Exemplo de grafo de rede de telecomunicações
    # O valor None indica que não há conexão direta entre os nós
    graph = [
        [0, 5, 3, None, None],
        [5, 0, 7, 2, None],
        [3, 7, 0, 4, 6],
        [None, 2, 4, 0, 5],
        [None, None, 6, 5, 0]
    ]

    num_nodes = len(graph)

    # Calcular as rotas ótimas e os custos mínimos usando Bellman-Ford
    optimal_routes = []
    for i in range(num_nodes):
        distances = bellman_ford(graph, i)
        optimal_routes.append([(j, distances[j]) for j in range(num_nodes)])

    # Encontrar o padrão comum nas rotas ótimas usando LCS
    common_subsequence = []
    for i in range(num_nodes):
        for j in range(i+1, num_nodes):
            route1 = [node[0] for node in optimal_routes[i]]
            route2 = [node[0] for node in optimal_routes[j]]
            common_subsequence.append(longest_common_subsequence(route1, route2))

    print("Rotas ótimas:")
    for i in range(num_nodes):
        print(f"Origem {i}: {optimal_routes[i]}")

    print("\nPadrão comum nas rotas ótimas:")
    for i in range(num_nodes):
        for j in range(i+1, num_nodes):
            print(f"Origem {i} e Origem {j}: {common_subsequence.pop(0)}")

if __name__ == "__main__":
    main()
