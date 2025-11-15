# 📘 Notes App – Frontend (Next.js)

This is the **frontend of the Notes Application**, built using **Next.js 14**, **Redux Toolkit**, **Axios**, **JWT Authentication**, and **Tailwind CSS**.  
Users can sign up, sign in, create notes, view notes, and log out.  
This frontend communicates with a Django REST API backend.

---

## 🚀 Live Demo

Frontend (Vercel):  
👉  https://pplysync-frontend.vercel.app


Backend (Render):  
👉 https://your-backend-url.onrender.com  


---

## 🧩 Tech Stack

- **Next.js (App Router)**
- **Redux Toolkit**
- **Axios**
- **Tailwind CSS**
- **JWT Authentication**
- **TypeScript/JavaScript**

---

## 📁 Project Structure

```
/app
  /signin
  /signup
  /notes
  /lib
/components
/store
  /slices
public
```

---

## ⚙️ Setup Instructions (Local Development)

### **1. Clone the repository**

```bash
git clone https://github.com/<your-username>/notes-frontend.git
cd notes-frontend
```

### **2. Install dependencies**

```bash
npm install
```

### **3. Create environment file**

Create `.env.local` in the project root:

```
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000
```

This points the frontend to your Django backend during local development.

### **4. Start development server**

```bash
npm run dev
```

Your frontend runs at:

👉 http://localhost:3000

---

