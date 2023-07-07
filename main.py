import tkinter as tk
from tkinter import messagebox

def bellman_ford(graph, source):
    num_nodes = len(graph)
    distances = [float('inf')] * num_nodes
    distances[source] = 0

    for _ in range(num_nodes - 1):
        for u in range(num_nodes):
            for v in range(num_nodes):
                if graph[u][v] is not None:
                    distances[v] = min(distances[v], distances[u] + graph[u][v])

    for u in range(num_nodes):
        for v in range(num_nodes):
            if graph[u][v] is not None and distances[u] + graph[u][v] < distances[v]:
                raise ValueError("O grafo contém ciclo negativo!")

    return distances

def longest_common_subsequence(route1, route2):
    m, n = len(route1), len(route2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if route1[i - 1] == route2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

    lcs_length = dp[m][n]
    lcs = []

    i, j = m, n
    while i > 0 and j > 0:
        if route1[i - 1] == route2[j - 1]:
            lcs.insert(0, route1[i - 1])
            i -= 1
            j -= 1
        elif dp[i - 1][j] > dp[i][j - 1]:
            i -= 1
        else:
            j -= 1

    return lcs

def calculate_optimal_routes():
    graph = [[None] * num_nodes for _ in range(num_nodes)]

    for i in range(num_nodes):
        for j in range(num_nodes):
            entry = entry_fields[i][j].get()
            if entry:
                graph[i][j] = float(entry)

    optimal_routes = []
    for i in range(num_nodes):
        distances = bellman_ford(graph, i)
        optimal_routes.append([(j, distances[j]) for j in range(num_nodes)])

    common_subsequence = [longest_common_subsequence(
        [node[0] for node in optimal_routes[i]],
        [node[0] for node in optimal_routes[j]]
    ) for i in range(num_nodes) for j in range(i + 1, num_nodes)]

    result_text.delete("1.0", tk.END)
    result_text.insert(tk.END, "Rotas ótimas:\n")
    for i, routes in enumerate(optimal_routes):
        result_text.insert(tk.END, f"Origem {i}: {routes}\n")

    result_text.insert(tk.END, "\nPadrão comum nas rotas ótimas:\n")
    for i in range(num_nodes):
        for j in range(i + 1, num_nodes):
            result_text.insert(tk.END, f"Origem {i} e Origem {j}: {common_subsequence.pop(0)}\n")

def create_input_fields():
    global entry_fields
    entry_fields = []

    for i in range(num_nodes):
        row = []
        for j in range(num_nodes):
            entry = tk.Entry(root, width=6)
            entry.grid(row=i + 2, column=j + 1)
            row.append(entry)
        entry_fields.append(row)

def show_instructions():
    instructions = (
        "Insira os custos das arestas no grafo da rede de telecomunicações.\n"
        "Deixe um campo vazio para indicar que não há conexão direta entre os nós.\n"
        "Clique no botão 'Encontrar Rotas' para calcular as rotas ótimas e o padrão comum."
    )
    messagebox.showinfo("Instruções", instructions)

if __name__ == "__main__":
    root = tk.Tk()
    root.title("Roteamento de Rede de Telecomunicações")
    root.geometry("400x400")
    root.resizable(False, False)
    root.configure(bg="#F0F0F0")

    num_nodes = 5  # Número de nós na rede (ajuste conforme necessário)

    label = tk.Label(root, text="Custos das arestas:", bg="#F0F0F0", fg="#333333")
    label.grid(row=1, column=1, columnspan=num_nodes, pady=10)

    create_input_fields()

    find_button = tk.Button(root, text="Encontrar Rotas", command=calculate_optimal_routes, bg="#007BFF", fg="white")
    find_button.grid(row=num_nodes + 3, column=1, columnspan=num_nodes, padx=10, pady=10)

    result_frame = tk.LabelFrame(root, text="Resultados", labelanchor="n")
    result_frame.grid(row=num_nodes + 4, column=1, columnspan=num_nodes, padx=10, pady=10, sticky="nsew")
    result_frame.configure(labelanchor="n")

    result_text = tk.Text(result_frame, width=40, height=10)
    result_text.pack(fill="both", expand=True)

    instructions_button = tk.Button(root, text="Instruções", command=show_instructions, bg="#6C757D", fg="white")
    instructions_button.grid(row=num_nodes + 5, column=1, columnspan=num_nodes, pady=10)

    root.mainloop()
