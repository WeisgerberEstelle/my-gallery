# my-gallery

A simple art gallery application.  
Visitors can browse artworks, while an authenticated **gallery manager** can **add**, **edit**, and **delete** artworks.

This project was developed as part of a technical assessment.

---

## 🧱 Tech Stack

### Backend (API)
- Ruby **3.4.7**
- Rails **8.1.x** (`~> 8.1.1`)
- PostgreSQL
- Main gems:
  - `devise` (authentication)
  - `devise-jwt` (JWT authentication)
  - `rack-cors` (CORS handling for React)
  - `pg`, `puma`
  - `solid_cache`, `solid_queue`, `solid_cable`

### Frontend
- React **19** (`"react": "^19.2.0"`)
- TypeScript
- Vite
- Tailwind CSS
- Key libraries:
  - `axios` (HTTP requests)
  - `react-router-dom` (routing)
  - `@headlessui/react`, `react-icons`

---

## 📂 Project Structure

The project is divided into two main parts:

- `back-end/` (Rails root): Ruby on Rails API  
- `front-end/`: React application (Vite)

---

## ✅ Requirements

Make sure you have the following installed on your development machine:

- Ruby **3.4.7**
- Rails **8.1**
- Node.js **20.14**
- npm
- PostgreSQL (running locally with a working default user)

---

## 🔧 Installation

### 1. Clone the repository

```bash
git clone https://github.com/WeisgerberEstelle/my-gallery.git
cd my-gallery
```

## 2. Backend Installation and Setup (Rails)

From inside the `back-end` folder, install the Ruby dependencies:

```bash
bundle install
```

### 2.2. Database Configuration (PostgreSQL)

The application uses **PostgreSQL**.

If your local PostgreSQL setup uses the default parameters, no changes are required.

Otherwise, update the `config/database.yml` file or define the necessary environment variables (`user`, `password`, `host`).

---

### 2.3. Create, Migrate, and Seed the Database

Run the following commands:

```bash
bin/rails db:create
bin/rails db:migrate
bin/rails db:seed
```

### 2.4. Start the Rails Server

```bash
bin/rails server
```

## 3. Frontend Installation and Setup (React)

Navigate into the `front-end` folder:

```bash
cd front-end
```

### 3.1. Install Dependencies

```bash
npm install
```

### 3.2. Start the Development Server

```bash
npm run dev
```

The frontend will be available at:

👉 http://localhost:5173


