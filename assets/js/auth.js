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
            email: localStorage.getItem("email")
        };
    },

    setUser(user) {
        localStorage.setItem("user_id", user.user_id);
        localStorage.setItem("role", user.role);
        localStorage.setItem("name", user.name);
        localStorage.setItem("email", user.email);
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

    redirectByRole() {
        const role = localStorage.getItem("role");
        if (role === AppConfig.ROLES.STUDENT) {
            window.location.href = AppConfig.PATHS.studentDashboard;
        } else if (role === AppConfig.ROLES.EMPLOYEE) {
            window.location.href = AppConfig.PATHS.staffDashboard;
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
