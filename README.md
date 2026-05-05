# Angular Enterprise Dashboard

A production-ready, enterprise-grade admin dashboard built with **Angular 21** and **Angular Material**. This project demonstrates scalable architecture, advanced routing, role-based access control (RBAC), and seamless backend integration.

## 🚀 Features

- **Enterprise-Level Architecture**: Modular folder structure with core, shared, and feature-based modules.
- **Authentication & RBAC**: 
  - JWT-based authentication flow.
  - Role-based route protection (Admin/Manager/User).
  - Conditional UI rendering based on user permissions.
- **Dynamic Analytics**: Interactive dashboards using **Chart.js** and `ng2-charts`.
- **User Management**: Complete CRUD operations with Material Data Table, server-side-like filtering, sorting, and pagination.
- **Modern UI/UX**: Premium design using Angular Material 3, responsive layout with a collapsible sidebar, and polished glassmorphism effects.
- **Secure Communication**: Automated JWT handling via HTTP Interceptors.

## 🛠️ Tech Stack

- **Frontend**: Angular 21, TypeScript, RxJS.
- **UI Components**: Angular Material.
- **Charts**: Chart.js / ng2-charts.
- **Styles**: SCSS (Material 3 Theming).
- **Icons**: Material Symbols.

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/angular-enterprise-dashboard.git
   cd angular-enterprise-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   Update `src/environments/environment.ts` with your API base URL.
   ```typescript
   export const environment = {
     production: false,
     apiBaseUrl: 'http://localhost:5000/api'
   };
   ```

4. **Run the application:**
   ```bash
   npm start
   ```
   Open `http://localhost:4200` in your browser.

## 📂 Folder Structure

```text
src/app
├── core/           # Singleton services, guards, and interceptors
├── shared/         # Reusable components, pipes, and directives
├── layout/         # Shell components (Sidebar, Navbar, Footer)
├── features/       # Feature-specific modules (Dashboard, Users, Auth)
└── assets/         # Global assets and styles
```

---

## 👨‍💻 Author

**Your Name**  
- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [Your Profile](https://linkedin.com/in/your-profile)
