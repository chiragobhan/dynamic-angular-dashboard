# Dynamic Angular Dashboard

A responsive **Dynamic Angular Dashboard** with user authentication, API integration, state management using Angular Signals, and performance optimizations.

---

## Features
- **User Authentication** → JWT-based login & logout
- **Dynamic Data Table** → Fetches data from [JSONPlaceholder](https://jsonplaceholder.typicode.com/posts)
- **Filter/Search, Sorting, Pagination** → Built with Angular Material Table
- **State Management** → Uses Angular Signals
- **Lazy Loading & Performance Optimizations** → Uses OnPush Change Detection and async pipe
- **Dark Mode Toggle** 
- **Auth Unit Test** 

---

## Setup & Installation

### **Step 1: Clone the Repository**
```sh
git clone https://github.com/chiragobhan/dynamic-angular-dashboard.git
cd dynamic-angular-dashboard
```

### **Step 2: Install Dependencies**
```sh
npm install
```

### **Step 3: Run JSON Server (Mock Backend)**
We use `json-server` to simulate an API for user authentication. Users are stored in `db.json`:
```json
{
  "users": [
    { "id": 1, "username": "admin", "password": "password", "token": "mock-jwt-token" },
    { "id": 2, "username": "testuser", "password": "test123", "token": "mock-jwt-token" }
  ]
}
```
#### **Start JSON Server**
```sh
npx json-server --watch db.json --port 3000
```

### **Step 4: Run the Angular App**
```sh
ng serve
```
Then open `http://localhost:4200/` in your browser.

---

## How It Works
### **Authentication** 
- Users login via `json-server` API (Mock backend)
- JWT token is stored in `localStorage`
- `AuthGuard` protects routes, and prevents logged-out users from accessing `/dashboard`

### **State Management** 
- **Angular Signals** manage authentication state
- Reactive `signal()` ensures instant UI updates on login/logout

### **Lazy Loading & Performance** 
- The **dashboard content** is lazy-loaded and uses OnPush Change Detection
- **API requests** are optimized via Angular’s `async pipe`
- **Pagination, Sorting, and Filtering** happen on the frontend for better UX

### **Dark Mode Toggle** 
- Uses `localStorage` to persist user theme
- Applied via `document.body.classList.toggle('dark-theme')`

---

## Running Tests 
To run unit tests:
```sh
ng test
```
This will open the **Karma test runner** and execute auth unit test.

---

## Images 

### Login Page | Light Mode  
<img src="https://github.com/user-attachments/assets/cfa66e10-114c-4466-8c87-7e93b6f23103" width="1000">  

### Login Page | Dark Mode  
<img src="https://github.com/user-attachments/assets/6bc82649-1587-46c4-b4df-5c8a19a7bb29" width="1000">  

### Dashboard Page | Light Mode  
<img src="https://github.com/user-attachments/assets/959b1942-fcae-4c3f-a72a-d846c4aa895e" width="1000">  

### Dashboard Page | Dark Mode  
<img src="https://github.com/user-attachments/assets/79e988bf-cc71-48c4-874b-be14f3b180b3" width="1000">  

---  

**Disclaimer:** This project is an assignment completed for [Pillway](https://www.pillway.com/). All **logos and branding elements** belong to **Pillway** and are used solely for demonstration purposes.