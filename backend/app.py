from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)  # permite request-uri din frontend

# ---------------- DATABASE ----------------
def get_db():
    conn = sqlite3.connect("barber.db")
    conn.row_factory = sqlite3.Row
    return conn

# ---------------- CREATE TABLE ----------------
@app.before_request
def create_tables():
    db = get_db()
    db.execute("""
    CREATE TABLE IF NOT EXISTS appointments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_name TEXT,
        phone TEXT,
        barber TEXT,
        date TEXT,
        hour TEXT,
        service TEXT,
        duration INTEGER
    )
    """)
    db.commit()

# ---------------- GET APPOINTMENTS ----------------
@app.route("/appointments", methods=["GET"])
def get_appointments():
    db = get_db()
    appointments = db.execute("SELECT * FROM appointments").fetchall()
    return jsonify([dict(a) for a in appointments])

# ---------------- CREATE APPOINTMENT ----------------
@app.route("/appointments", methods=["POST"])
def create_appointment():
    data = request.json

    name = data.get("name")
    phone = data.get("phone")
    barber = data.get("barber")
    date = data.get("date")
    hour = data.get("hour")
    service = data.get("service", "Standard")
    duration = data.get("duration", 30)

    if not name or not phone or not barber or not date or not hour:
        return {"error": "Lipsesc câmpuri obligatorii"}, 400

    db = get_db()
    db.execute(
        "INSERT INTO appointments (client_name, phone, barber, date, hour, service, duration) VALUES (?, ?, ?, ?, ?, ?, ?)",
        (name, phone, barber, date, hour, service, duration)
    )
    db.commit()

    return {"message": "Programare creată"}

# ---------------- DELETE APPOINTMENT ----------------
@app.route("/appointments/<int:id>", methods=["DELETE"])
def delete_appointment(id):
    db = get_db()
    db.execute("DELETE FROM appointments WHERE id=?", (id,))
    db.commit()
    return {"message": "Programare ștearsă"}

# ---------------- AVAILABLE SLOTS ----------------
@app.route("/available_slots", methods=["POST"])
def available_slots():
    data = request.json
    barber = data.get("barber")
    date_str = data.get("date")
    duration = data.get("duration", 30)

    if not barber or not date_str:
        return {"error": "Lipsesc câmpuri"}, 400

    db = get_db()
    appointments = db.execute(
        "SELECT * FROM appointments WHERE barber=? AND date=?",
        (barber, date_str)
    ).fetchall()

    # toate orele între 09:00 și 17:00
    slots = []
    start_hour = 9
    end_hour = 17
    current = datetime.strptime(f"{date_str} {start_hour}:00", "%Y-%m-%d %H:%M")
    end_time = datetime.strptime(f"{date_str} {end_hour}:00", "%Y-%m-%d %H:%M")

    while current + timedelta(minutes=duration) <= end_time:
        slot_free = True
        for appt in appointments:
            appt_start = datetime.strptime(f"{appt['date']} {appt['hour']}", "%Y-%m-%d %H:%M")
            appt_end = appt_start + timedelta(minutes=appt['duration'])
            slot_end = current + timedelta(minutes=duration)
            if current < appt_end and slot_end > appt_start:
                slot_free = False
                break
        if slot_free:
            slots.append(current.strftime("%H:%M"))
        current += timedelta(minutes=30)

    return jsonify(slots)

# ---------------- RUN ----------------
if __name__ == "__main__":
    app.run(debug=True)

