# Barber Store

Aplicație full-stack pentru gestionarea unui salon de înfrumusețare, cu frontend React și backend Python Flask.

## Structura proiectului


barber-store/
├── backend/
│ ├── app.py
│ ├── barber.db
│ ├── requirements.txt
│ └── venv/
└── frontend/
├── package.json
├── package-lock.json
├── public/
│ └── index.html
└── src/
├── App.js
├── CalendarPage.js
├── DashboardAdmin.js
├── DashboardClient.js
├── Dashboard.js
├── Home.js
├── index.js
├── Login.js
├── Products.js
├── Register.js
├── ServiceDetail.js
└── Services.js


## Cerințe

- Python 3.10+
- Node.js 18+ / npm 9+
- SQLite (fișierul `barber.db` este inclus)

## Setup Backend

```bash
# Navighează în folderul backend
cd backend

# Creează un mediu virtual (opțional, dar recomandat)
python3 -m venv venv
source venv/bin/activate  # Linux/macOS
# venv\Scripts\activate    # Windows

# Instalează dependențele
pip install -r requirements.txt

# Rulează serverul
python app.py

Backend-ul va porni de obicei pe http://localhost:5000.

Setup Frontend
# Navighează în folderul frontend
cd frontend

# Instalează dependențele Node
npm install

# Rulează aplicația în modul development
npm start

Frontend-ul va fi disponibil pe http://localhost:3000.

Funcționalități
Autentificare / Înregistrare clienți
Dashboard administrativ și pentru clienți
Gestionare servicii și produse
Calendar pentru programări
Integrare Google login
Deploy / Build
# În frontend
npm run build

Acest build poate fi servit cu orice server static sau integrat în backend-ul Flask dacă vrei.

Git
# Clonează repo
git clone https://github.com/ioneli/barber-store.git

# Mergi în folderul proiectului
cd barber-store

# Verifică statusul
git status

# Adaugă modificări
git add .

# Commit modificări
git commit -m "Mesajul tău aici"

# Trimite la remote
git push origin main

autor: Ionel Scutaru
