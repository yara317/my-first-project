/**
 * Authentication & role-based access control
 */
const Auth = {
    getUser() {
        const userId = localStorage.getItem("user_id");
        if (!userId) return null;

        return {
            user_id: userId,
            role: localStorage.getItem("role"),
            name: localStorage.getItem("name"),
            email: localStorage.getItem("email"),
            employee_type: localStorage.getItem("employee_type") || null
        };
    },

    setUser(user) {
        localStorage.setItem("user_id", user.user_id);
        localStorage.setItem("role", user.role);
        localStorage.setItem("name", user.name);
        localStorage.setItem("email", user.email);

        if (user.employee_type) {
            localStorage.setItem("employee_type", user.employee_type);
        } else {
            localStorage.removeItem("employee_type");
        }
    },

    logout() {
        localStorage.clear();
        window.location.href = AppConfig.PATHS.login;
    },

    isLoggedIn() {
        return !!localStorage.getItem("user_id");
    },

    hasRole(role) {
        return localStorage.getItem("role") === role;
    },

    /**
     * True only for employee accounts whose employee_type is "admin".
     * Officers (employee_type "officer") are routed to the regular staff area.
     */
    isAdmin() {
        return this.hasRole(AppConfig.ROLES.EMPLOYEE) &&
            localStorage.getItem("employee_type") === AppConfig.EMPLOYEE_TYPES.ADMIN;
    },

    redirectByRole() {
        const role = localStorage.getItem("role");
        if (role === AppConfig.ROLES.STUDENT) {
            window.location.href = AppConfig.PATHS.studentDashboard;
        } else if (role === AppConfig.ROLES.EMPLOYEE) {
            window.location.href = this.isAdmin()
                ? AppConfig.PATHS.adminDashboard
                : AppConfig.PATHS.staffDashboard;
        }
    },

    /**
     * Protect pages by role. Call on DOMContentLoaded.
     * @param {string} requiredRole - "student" or "employee"
     */
    requireRole(requiredRole) {
        if (!this.isLoggedIn()) {
            window.location.href = AppConfig.PATHS.login;
            return false;
        }

        if (!this.hasRole(requiredRole)) {
            alert("ليس لديك صلاحية للوصول إلى هذه الصفحة");
            this.redirectByRole();
            return false;
        }

        return true;
    },

    /**
     * Strictly protect /admin/* pages: requires an employee account with
     * employee_type "admin". Call on DOMContentLoaded of every admin page.
     */
    requireAdmin() {
        if (!this.isLoggedIn()) {
            window.location.href = AppConfig.PATHS.login;
            return false;
        }

        if (!this.isAdmin()) {
            alert("هذه الصفحة مخصصة لمدير النظام فقط");
            this.redirectByRole();
            return false;
        }

        return true;
    },

    /**
     * Redirect logged-in users away from auth pages
     */
    redirectIfLoggedIn() {
        if (this.isLoggedIn()) {
            this.redirectByRole();
            return true;
        }
        return false;
    }
};
