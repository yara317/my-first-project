/**
 * Shared layout components: Sidebar, Header, Footer
 */
const AppLayout = {
    STUDENT_NAV: [
        { id: "dashboard", href: "dashboard.html", icon: "ri-dashboard-line", label: "لوحة التحكم" },
        { id: "create", href: "create-request.html", icon: "ri-add-line", label: "طلب جديد" },
        { id: "requests", href: "my-request.html", icon: "ri-file-list-line", label: "طلباتي" },
        { id: "track", href: "track-request.html", icon: "ri-search-line", label: "تتبع طلب" },
        { id: "profile", href: "profile.html", icon: "ri-user-line", label: "الملف الشخصي" }
    ],

    STAFF_NAV: [
        { id: "dashboard", href: "dashboard.html", icon: "ri-dashboard-line", label: "لوحة التحكم" },
        { id: "requests", href: "request-list.html", icon: "ri-file-list-3-line", label: "الطلبات" },
        { id: "history", href: "request-history.html", icon: "ri-history-line", label: "السجل" },
        { id: "profile", href: "profile.html", icon: "ri-user-settings-line", label: "الملف الشخصي" }
    ],

    // "admin" here is a display-only layout variant (distinct from AppConfig.ROLES,
    // which only tracks the DB role student/employee). Auth access control for
    // /admin/* pages is enforced separately via Auth.requireAdmin().
    ADMIN_NAV: [
        { id: "dashboard", href: "dashboard.html", icon: "ri-dashboard-line", label: "لوحة التحكم" },
        { id: "departments", href: "manage-departments.html", icon: "ri-building-2-line", label: "الأقسام" },
        { id: "services", href: "manage-services.html", icon: "ri-service-line", label: "الخدمات" }
    ],

    renderSidebar(role, activePage) {
        const isStudent = role === AppConfig.ROLES.STUDENT;
        const isAdmin = role === "admin";
        const navItems = isAdmin ? this.ADMIN_NAV : (isStudent ? this.STUDENT_NAV : this.STAFF_NAV);
        const title = isAdmin ? "لوحة الإدارة" : (isStudent ? "نظام الخدمات" : "لوحة الموظف");
        const icon = isAdmin ? "ri-admin-line" : (isStudent ? "ri-graduation-cap-line" : "ri-shield-user-line");

        const links = navItems.map(item => `
            <a href="${item.href}" class="${item.id === activePage ? "active" : ""}">
                <i class="${item.icon}"></i> ${item.label}
            </a>
        `).join("");

        return `
            <aside class="sidebar" id="appSidebar">
                <div class="sidebar-brand">
                    <i class="${icon}"></i>
                    <span>${title}</span>
                </div>
                <nav class="sidebar-nav">${links}</nav>
                <div class="sidebar-footer">
                    <button type="button" class="btn-logout" onclick="Auth.logout()">
                        <i class="ri-logout-box-r-line"></i> تسجيل الخروج
                    </button>
                </div>
            </aside>
        `;
    },

    /**
     * Renders the top app header.
     * Right side (start): hamburger toggle (mobile only) + page title/greeting with a
     * dedicated #userName span so the current user's name is always addressable.
     * Left side (end): a compact profile/logout icon group.
     */
    renderHeader(options = {}) {
        const user = Auth.getUser();
        const name = options.userName || user?.name || "مستخدم";
        const pageTitle = options.title || "لوحة التحكم";
        const showBadge = options.showBadge !== false;
        const profileHref = options.profileHref || "profile.html";

        return `
            <header class="app-header">
                <button type="button" class="app-header-toggle" onclick="AppLayout.toggleSidebar()" aria-label="فتح القائمة" aria-controls="appSidebar" aria-expanded="false">
                    <i class="ri-menu-line"></i>
                </button>

                <div class="app-header-greeting">
                    <span class="app-header-title">${pageTitle}</span>
                    <span class="app-header-sep">|</span>
                    <span class="app-header-hello">مرحباً، <span id="userName">${name}</span></span>
                </div>

                ${showBadge ? `
                    <div class="app-header-actions">
                        <a href="${profileHref}" class="header-icon-btn" title="الملف الشخصي" aria-label="الملف الشخصي">
                            <i class="ri-user-line"></i>
                        </a>
                        <button type="button" class="header-icon-btn header-icon-btn-danger" id="logoutBtn" onclick="Auth.logout()" title="تسجيل الخروج" aria-label="تسجيل الخروج">
                            <i class="ri-logout-box-r-line"></i>
                        </button>
                    </div>
                ` : ""}
            </header>
        `;
    },

    renderFooter() {
        const year = new Date().getFullYear();
        return `
            <footer class="app-footer">
                <p>نظام إدارة خدمات الجامعة &copy; ${year}</p>
            </footer>
        `;
    },

    /**
     * Toggles the mobile sidebar drawer (used by the header's hamburger button).
     */
    toggleSidebar() {
        const sidebar = document.getElementById("appSidebar");
        const toggleBtn = document.querySelector(".app-header-toggle");
        if (!sidebar) return;

        const isOpen = sidebar.classList.toggle("open");
        this.setBackdrop(isOpen);
        if (toggleBtn) toggleBtn.setAttribute("aria-expanded", String(isOpen));
    },

    closeSidebar() {
        const sidebar = document.getElementById("appSidebar");
        const toggleBtn = document.querySelector(".app-header-toggle");
        if (sidebar) sidebar.classList.remove("open");
        if (toggleBtn) toggleBtn.setAttribute("aria-expanded", "false");
        this.setBackdrop(false);
    },

    /**
     * Shows/hides the semi-transparent overlay behind the mobile sidebar drawer,
     * creating it on first use and closing the drawer when clicked.
     */
    setBackdrop(show) {
        let backdrop = document.getElementById("sidebarBackdrop");
        if (!backdrop) {
            backdrop = document.createElement("div");
            backdrop.id = "sidebarBackdrop";
            backdrop.className = "sidebar-backdrop";
            backdrop.addEventListener("click", () => this.closeSidebar());
            document.body.appendChild(backdrop);
        }
        backdrop.classList.toggle("visible", show);
    },

    /**
     * Initialize layout on a page
     * @param {Object} options - { role, active, title, subtitle, showBadge, layout: 'sidebar'|'centered' }
     */
    init(options) {
        const { role, active, title, subtitle, userName, showBadge = true, profileHref, layout = "sidebar" } = options;

        if (layout === "sidebar") {
            const sidebarEl = document.getElementById("app-sidebar");
            if (sidebarEl) {
                sidebarEl.innerHTML = this.renderSidebar(role, active);
            }

            const headerEl = document.getElementById("app-header");
            if (headerEl) {
                headerEl.innerHTML = this.renderHeader({ title, subtitle, userName, showBadge, profileHref });
            }

            const footerEl = document.getElementById("app-footer");
            if (footerEl) {
                footerEl.innerHTML = this.renderFooter();
            }
        }
    }
};
