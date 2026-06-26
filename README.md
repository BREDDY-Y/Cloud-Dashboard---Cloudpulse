# CloudPulse: Real-Time Infrastructure Monitoring & FinOps Engine

A decoupled, lightweight infrastructure monitoring system designed to simulate machine-level hardware telemetry (CPU cycles, RAM footprint, disk sectors, and network I/O activity) while mapping operational cost tracking metrics in real-time.

---

##  Architecture Design & Component Data Flow

CloudPulse adheres to a strictly decoupled client-server architecture pattern. This design isolates heavy metric aggregation loops from client-side visual thread rendering:


┌────────────────────────┐      REST API (JSON)      ┌─────────────────────────┐
│     Client UI Layer    │ ◄──────────────────────── │   Python / Flask API    │
│  (Glassmorphic Layout) │ ────────────────────────► │ (app.py Routing Engine) │
└────────────────────────┘    3-Second Intervals     └─────────────────────────┘
│                                                     │
│ Async Rendering Matrix                              │ Local ACID Persistence
▼                                                     ▼
┌────────────────────────┐                           ┌─────────────────────────┐
│  Chart.js Time-Series  │                           │  SQLite Database Engine │
│  (Sliding Window: 20)  │                           │       (metrics.db)      │
└────────────────────────┘                           └─────────────────────────┘


### Process Lifecycle:
1. **Telemetry Stream Data Generation (`metrics_collector.py`):** Simulates multi-vector computational load states across infrastructure boundaries.
2. **FinOps Cost Extrapolation Layer (`cost_tracker.py`):** Processes utilization data dynamically through a multi-variable pricing algorithm to derive financial metrics.
3. **Transactional Logging Data Store (`database_handler.py`):** Commits sequential telemetry records into a persistent SQLite engine with native timestamp tags.
4. **Application Endpoints Layer (`app.py`):** Bootstraps a lightweight Flask app context to expose historical structures securely via CORS-compliant JSON arrays.
5. **Dashboard Presentation Layer (`index.html` / `script.js`):** Spins up an asynchronous client polling script executing every 3000ms. It populates progress meters and updates a sliding 20-node visual line chart using Chart.js.

---

##  Core Specifications & Schema Layout

### REST API Endpoints

#### 1. Fetch Live Performance Telemetry Snapshots
* **Endpoint URL:** `/metrics`
* **HTTP Method:** `GET`
* **Response Content-Type:** `application/json`
* **Sample Payload Output (200 OK):**
```json
{
  "cpu": 64.20,
  "memory": 45.15,
  "storage": 72.80,
  "network": 22.40,
  "cost": 2.21
}

2. Get Aggregated Project Spend Log
Endpoint URL: /total_cost
HTTP Method: GET
Sample Payload Output (200 OK):

JSON
{
  "total_cost": 314.12
}

Relational Storage Schema Setup
The application natively handles state tracking initialization on startup, constructing the relational database footprint inside metrics.db:
SQL
CREATE TABLE IF NOT EXISTS metrics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cpu REAL NOT NULL,
    memory REAL NOT NULL,
    network REAL NOT NULL,
    storage REAL NOT NULL,
    cost REAL NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);


 Project Directory Structure

 CloudPulse/
│
├── backend/
│   ├── app.py                  # Main API service adapter & application gateway
│   ├── cost_tracker.py         # Multi-variable utility financial algorithm
│   ├── database_handler.py     # SQLite schema management & insertion layer
│   ├── metrics_collector.py    # Multi-vector infrastructure simulation stream
│   └── metrics.db              # Active transactional logging relational storage
│
└── frontend/
    ├── index.html              # Responsive glassmorphic tracking UI layout
    ├── script.js               # Async API worker mechanism & Chart.js graph loop
    └── style.css               # Core presentation styles & canvas theme parameters



Local Environment Bootstrap (Zero to Live)
Prerequisites

Ensure a Python 3.9+ runtime environment is present on the host machine.
1. Initialize and Spin Up Backend API
Open a terminal prompt interface panel, change paths into the backend folder location, install your required packages, and boot the proxy gateway application:
bash/terminal-
cd backend
pip install Flask Flask-CORS pandas
python app.py
The microservice backend daemon will initialize, binding natively on loopback proxy socket channel: http://127.0.0.1:5000.

 Launch Client Interface Dashboard To eliminate local asset cross-origin security execution errors (CORS block policies) when fetching asynchronous data directly via local filesystems, launch a light web server directly inside the frontend terminal layer:
 Bash/terminal
 cd ../frontend
python -m http.server 5000
Open a browser client page and target your tracking dashboard portal view at: http://127.0.0.1:5000

 Applied FinOps Operational LogicCalculated spending matrices match linear capacity distribution thresholds computed programmatically across active usage parameters:
 {Hourly Cost} = ({CPU}*0.02) + ({Memory}*0.015) + ({Storage}*0.01) + ({Network}*0.005)

 This setup replicates adaptive scaling charges typically applied across enterprise public cloud service architectures.