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

    renderSidebar(role, activePage) {
        const isStudent = role === AppConfig.ROLES.STUDENT;
        const navItems = isStudent ? this.STUDENT_NAV : this.STAFF_NAV;
        const title = isStudent ? "نظام الخدمات" : "لوحة الموظف";
        const icon = isStudent ? "ri-graduation-cap-line" : "ri-shield-user-line";

        const links = navItems.map(item => `
            <a href="${item.href}" class="${item.id === activePage ? "active" : ""}">
                <i class="${item.icon}"></i> ${item.label}
            </a>
        `).join("");

        return `
            <aside class="sidebar">
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

    renderHeader(options = {}) {
        const user = Auth.getUser();
        const name = options.userName || user?.name || "مستخدم";
        const subtitle = options.subtitle || "";
        const showBadge = options.showBadge !== false;

        return `
            <header class="page-header">
                <div class="page-header-text">
                    <h1>${options.title || "مرحباً"}</h1>
                    ${subtitle ? `<p>${subtitle}</p>` : ""}
                </div>
                ${showBadge ? `
                    <div class="user-badge">
                        <i class="ri-user-smile-line"></i>
                        <span>${name}</span>
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
     * Initialize layout on a page
     * @param {Object} options - { role, active, title, subtitle, showBadge, layout: 'sidebar'|'centered' }
     */
    init(options) {
        const { role, active, title, subtitle, showBadge = true, layout = "sidebar" } = options;

        if (layout === "sidebar") {
            const sidebarEl = document.getElementById("app-sidebar");
            if (sidebarEl) {
                sidebarEl.innerHTML = this.renderSidebar(role, active);
            }

            const headerEl = document.getElementById("app-header");
            if (headerEl) {
                headerEl.innerHTML = this.renderHeader({ title, subtitle, showBadge });
            }

            const footerEl = document.getElementById("app-footer");
            if (footerEl) {
                footerEl.innerHTML = this.renderFooter();
            }
        }
    }
};
