import sqlite3

def create_table():
    conn = sqlite3.connect("metrics.db")
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS metrics (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cpu REAL,
            memory REAL,
            network REAL,
            storage REAL,
            cost REAL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    conn.close()

def insert_metrics(cpu, memory, network, storage, cost):
    conn = sqlite3.connect("metrics.db")
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO metrics (cpu, memory, network, storage, cost) VALUES (?, ?, ?, ?, ?)",
        (cpu, memory, network, storage, cost)
    )
    conn.commit()
    conn.close()
