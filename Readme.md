# AI-Powered Health Access Hub

An AI-enabled healthcare platform that connects **patients**, **doctors**, **assistants**, **pathologists**, and **government admins**. It allows seamless booking, management, and communication across medical services using AI chatbots, Firebase backend, and role-based dashboards.

---

## Features

### User Types
- **Patients**: Book appointments, upload symptoms, view prescriptions & diagnostic reports.
- **Doctors**: View/manage patient appointments, write prescriptions, access history.
- **Assistants**: Confirm/cancel appointments, suggest medicine substitutes.
- **Pathologists**: Upload reports for assigned patients.
- **Government Admins**: Oversee platform usage, validate doctor credentials.

### AI Chatbots
- **Symptom Intake Bot**:
  - Accepts symptoms and images.
  - Suggests potential diagnoses.
- **Health Assistant Bot**:
  - Responds to general health queries.
  - Suggests **Indian home remedies**.
  - Learns from user input and updates knowledge.

### Modules
-  Firebase Authentication (Email/Phone/Username)
-  Appointment Scheduling & Confirmation
-  Medicine Substitution Suggestions
-  Assistant and Doctor Dashboards
-  Pathology Report Uploading
-  AI Chat Integration (planned)
-  Patient Survey Forms
-  Real-Time Toast Notifications & Role-Based Routing

---

## Tech Stack

| Layer         | Stack                               |
|---------------|--------------------------------------|
| **Frontend**  | React + TypeScript + Tailwind CSS    |
| **Backend**   | Firebase Firestore + Auth            |
| **AI/ML**     | Python + TensorFlow / PyTorch (API)  |
| **UI Kit**    | shadcn/ui                            |
| **Icons**     | lucide-react                         |
| **Hosting**   | Netlify or Firebase Hosting          |

---

## Authentication Flow

- Users can **login** with:
  - Email
  - Phone number
  - Username

- Firebase Auth is used with:
  - `users` Firestore collection storing `role`, `name`, and other metadata.
  - Role-based access control in routes (`<ProtectedRoute />`).
  - `AuthContext` provides global auth state.

---

## Role-Based Dashboards

| Role       | Dashboard Path              | Features                                                |
|------------|-----------------------------|---------------------------------------------------------|
| Patient    | `/dashboard/patient`        | Book appointments, chat with AI, view reports          |
| Doctor     | `/dashboard/doctor`         | Manage appointments, prescribe medicine                |
| Assistant  | `/dashboard/assistant`      | View requests, confirm/cancel, suggest substitutes     |
| Pathology  | `/dashboard/pathology`      | Upload lab/scan reports                                |
| Admin      | `/dashboard/admin` (future) | Monitor platform usage                                 |

---

## Demo Accounts

Try the system with demo users:

| Role       | Email                      | Password  |
|------------|----------------------------|-----------|
| Patient    | `patient@demo.com`         | `demo123` |
| Doctor     | `doctor@demo.com`          | `demo123` |
| Assistant  | `assistant@demo.com`       | `demo123` |
| Pathology  | `pathology@demo.com`       | `demo123` |

---

## AI Chatbot (Planned Setup)

### 1. Symptom Intake Bot
- Input: Text + Image
- Output: Disease suggestions
- Model: CNN + NLP hybrid
- API: Flask/FastAPI backend connected to React frontend

### 2. General Health Bot
- Trained on home remedies from Indian sources
- Responds to user lifestyle, nutrition, and mild illness queries
- Supports feedback loop learning

## Screenshot

### 1. Patient
![patient](./frontend/screenshot/patient.png)

### 2. Doctor
![Doctor](./frontent/screenshot/doctor.png)

### 3. Assistant
![assistant](./frontent/screenshot/Assistant.png)

### 3. Pathology
![Pathology](./frontent/screenshot/pathology.png)


---