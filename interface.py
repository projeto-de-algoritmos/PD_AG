import numpy as np
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

    # Verificar se há ciclo negativo
    for u in range(num_nodes):
        for v in range(num_nodes):
            if graph[u][v] is not None and distances[u] + graph[u][v] < distances[v]:
                raise ValueError("O grafo contém ciclo negativo!")

    return distances

def longest_common_subsequence(route1, route2):
    # (Implementação da técnica LCS, conforme apresentado anteriormente)
    # ...
    s

def find_routes():
    graph = np.zeros((num_nodes, num_nodes), dtype=float)
    
    for i in range(num_nodes):
        for j in range(num_nodes):
            entry = entry_fields[i][j].get()
            if entry == "":
                graph[i][j] = None
            else:
                graph[i][j] = float(entry)

    optimal_routes = []
    for i in range(num_nodes):
        distances = bellman_ford(graph, i)
        optimal_routes.append([(j, distances[j]) for j in range(num_nodes)])

    common_subsequence = []
    for i in range(num_nodes):
        for j in range(i+1, num_nodes):
            route1 = [node[0] for node in optimal_routes[i]]
            route2 = [node[0] for node in optimal_routes[j]]
            common_subsequence.append(longest_common_subsequence(route1, route2))

    result_text.delete("1.0", tk.END)
    result_text.insert(tk.END, "Rotas ótimas:\n")
    for i in range(num_nodes):
        result_text.insert(tk.END, f"Origem {i}: {optimal_routes[i]}\n")

    result_text.insert(tk.END, "\nPadrão comum nas rotas ótimas:\n")
    for i in range(num_nodes):
        for j in range(i+1, num_nodes):
            result_text.insert(tk.END, f"Origem {i} e Origem {j}: {common_subsequence.pop(0)}\n")

def create_input_fields():
    global entry_fields
    entry_fields = []

    for i in range(num_nodes):
        row = []
        for j in range(num_nodes):
            entry = tk.Entry(root, width=6)
            entry.grid(row=i+2, column=j+1)
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

    num_nodes = 5  # Número de nós na rede (ajuste conforme necessário)

    label = tk.Label(root, text="Custos das arestas:")
    label.grid(row=1, column=1, columnspan=num_nodes)

    create_input_fields()

    find_button = tk.Button(root, text="Encontrar Rotas", command=find_routes)
    find_button.grid(row=num_nodes+3, column=1, columnspan=num_nodes)

    result_text = tk.Text(root, width=40, height=10)
    result_text.grid(row=num_nodes+4, column=1, columnspan=num_nodes)

    instructions_button = tk.Button(root, text="Instruções", command=show_instructions)
    instructions_button.grid(row=num_nodes+5, column=1, columnspan=num_nodes)

    root.mainloop()
