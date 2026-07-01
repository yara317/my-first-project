/**
 * Shared utilities
 */
const Utils = {
    STATUS_LABELS: {
        pending: "قيد الانتظار",
        approved: "مقبول",
        rejected: "مرفوض",
        cancelled: "ملغي"
    },

    ROLE_LABELS: {
        student: "طالب",
        employee: "موظف",
        admin: "مدير",
        officer: "مسؤول"
    },

    formatStatus(status) {
        return this.STATUS_LABELS[status] || status;
    },

    formatRole(role) {
        return this.ROLE_LABELS[role] || role;
    },

    getQueryParam(name) {
        return new URLSearchParams(window.location.search).get(name);
    },

    showLoading(container, message = "جاري التحميل...") {
        if (typeof container === "string") {
            container = document.getElementById(container);
        }
        if (container) {
            container.innerHTML = `<div class="state-message state-loading"><i class="ri-loader-4-line"></i><p>${message}</p></div>`;
        }
    },

    showEmpty(container, message = "لا توجد بيانات", icon = "ri-inbox-line") {
        if (typeof container === "string") {
            container = document.getElementById(container);
        }
        if (container) {
            container.innerHTML = `<div class="state-message state-empty"><i class="${icon}"></i><p>${message}</p></div>`;
        }
    },

    showError(container, message = "فشل تحميل البيانات") {
        if (typeof container === "string") {
            container = document.getElementById(container);
        }
        if (container) {
            container.innerHTML = `<div class="state-message state-error"><i class="ri-error-warning-line"></i><p>${message}</p></div>`;
        }
    },

    renderTableLoading(tbody, cols = 4) {
        if (typeof tbody === "string") {
            tbody = document.getElementById(tbody);
        }
        if (tbody) {
            tbody.innerHTML = `<tr><td colspan="${cols}" class="table-state"><i class="ri-loader-4-line"></i> جاري التحميل...</td></tr>`;
        }
    },

    renderTableEmpty(tbody, cols = 4, message = "لا توجد بيانات") {
        if (typeof tbody === "string") {
            tbody = document.getElementById(tbody);
        }
        if (tbody) {
            tbody.innerHTML = `<tr><td colspan="${cols}" class="table-state">${message}</td></tr>`;
        }
    },

    renderTableError(tbody, cols = 4, message = "فشل تحميل البيانات") {
        if (typeof tbody === "string") {
            tbody = document.getElementById(tbody);
        }
        if (tbody) {
            tbody.innerHTML = `<tr><td colspan="${cols}" class="table-state table-state-error">${message}</td></tr>`;
        }
    },

    countByStatus(requests) {
        return {
            total: requests.length,
            pending: requests.filter(r => r.status === "pending").length,
            approved: requests.filter(r => r.status === "approved").length,
            rejected: requests.filter(r => r.status === "rejected").length
        };
    },

    setText(id, value) {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    }
};
