from flask import Flask, jsonify, send_file
from flask_cors import CORS
from metrics_collector import get_metrics
from cost_tracker import calculate_cost
from database_handler import create_table, insert_metrics
import sqlite3
import pandas as pd

app = Flask(__name__)
CORS(app)

create_table()

@app.route("/metrics")
def metrics():
    data = get_metrics()
    data["cost"] = calculate_cost(data)
    insert_metrics(data["cpu"], data["memory"], data["network"], data["storage"], data["cost"])
    return jsonify(data)

@app.route("/total_cost")
def total_cost():
    conn = sqlite3.connect("metrics.db")
    cur = conn.cursor()
    cur.execute("SELECT SUM(cost) FROM metrics")
    total = cur.fetchone()[0] or 0
    conn.close()
    return jsonify({"total_cost": round(total, 2)})

@app.route("/export")
def export_data():
    conn = sqlite3.connect("metrics.db")
    df = pd.read_sql_query("SELECT * FROM metrics", conn)
    conn.close()
    file_path = "metrics_report.csv"
    df.to_csv(file_path, index=False)
    return send_file(file_path, as_attachment=True)

if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)
