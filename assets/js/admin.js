/**
 * Admin panel controller: dashboard stats, department & service management.
 * Consumes the centralized API client (api.js) and only touches the DOM
 * of the admin pages that include this script.
 */
const AdminPanel = {
    departments: [],
    services: [],

    // ===== Dashboard =====
    async loadDashboardStats() {
        try {
            const [deptsRes, servicesRes, studentsRes, requestsRes] = await Promise.all([
                API.getDepartments(),
                API.getServices(),
                API.getStudents(),
                API.getAllRequests()
            ]);

            Utils.setText("totalDepartments", (deptsRes.data || []).length);
            Utils.setText("totalServices", (servicesRes.data || []).length);
            Utils.setText("totalStudents", (studentsRes.data || []).length);
            Utils.setText("totalRequests", (requestsRes.data || []).length);
        } catch (err) {
            Utils.setText("totalDepartments", "-");
            Utils.setText("totalServices", "-");
            Utils.setText("totalStudents", "-");
            Utils.setText("totalRequests", "-");
        }
    },

    // ===== Departments =====
    async loadDepartments() {
        const tbody = document.getElementById("deptTableBody");
        Utils.renderTableLoading(tbody, 3);
        try {
            const result = await API.getDepartments();
            this.departments = result.data || [];
            this.renderDepartments();
        } catch (err) {
            Utils.renderTableError(tbody, 3);
        }
    },

    renderDepartments() {
        const tbody = document.getElementById("deptTableBody");
        if (!tbody) return;

        if (this.departments.length === 0) {
            Utils.renderTableEmpty(tbody, 3, "لا توجد أقسام بعد");
            return;
        }

        tbody.innerHTML = this.departments.map(d => `
            <tr data-id="${d.dept_id}">
                <td>${d.dept_id}</td>
                <td class="dept-name">${d.name}</td>
                <td class="table-actions">
                    <button type="button" class="btn btn-outline" onclick="AdminPanel.startEditDepartment(${d.dept_id})">
                        <i class="ri-edit-line"></i> تعديل
                    </button>
                    <button type="button" class="btn btn-danger" onclick="AdminPanel.deleteDepartment(${d.dept_id})">
                        <i class="ri-delete-bin-line"></i> حذف
                    </button>
                </td>
            </tr>
        `).join("");
    },

    async createDepartment(e) {
        e.preventDefault();
        const input = document.getElementById("deptName");
        const name = input.value.trim();
        if (!name) return;

        const submitBtn = e.target.querySelector("button[type=submit]");
        submitBtn.disabled = true;

        try {
            const result = await API.createDepartment(name);
            if (result.status === 200 || result.status === 201) {
                input.value = "";
                await this.loadDepartments();
            } else {
                alert(result.message || "فشل إضافة القسم");
            }
        } catch (err) {
            alert(err.message || "فشل الاتصال بالسيرفر");
        } finally {
            submitBtn.disabled = false;
        }
    },

    startEditDepartment(deptId) {
        const dept = this.departments.find(d => d.dept_id == deptId);
        const row = document.querySelector(`#deptTableBody tr[data-id="${deptId}"]`);
        if (!dept || !row) return;

        row.querySelector(".dept-name").innerHTML =
            `<input type="text" class="form-control" id="editDeptName-${deptId}" value="${dept.name}">`;

        row.querySelector(".table-actions").innerHTML = `
            <button type="button" class="btn btn-success" onclick="AdminPanel.saveDepartment(${deptId})">
                <i class="ri-check-line"></i> حفظ
            </button>
            <button type="button" class="btn btn-outline" onclick="AdminPanel.renderDepartments()">
                <i class="ri-close-line"></i> إلغاء
            </button>
        `;
    },

    async saveDepartment(deptId) {
        const input = document.getElementById(`editDeptName-${deptId}`);
        const name = input.value.trim();
        if (!name) {
            alert("اسم القسم مطلوب");
            return;
        }

        try {
            const result = await API.updateDepartment(deptId, name);
            if (result.status === 200) {
                await this.loadDepartments();
            } else {
                alert(result.message || "فشل تحديث القسم");
            }
        } catch (err) {
            alert(err.message || "فشل الاتصال بالسيرفر");
        }
    },

    async deleteDepartment(deptId) {
        if (!confirm("هل تريد حذف هذا القسم؟ قد يؤثر ذلك على الطلبات المرتبطة به.")) return;

        try {
            const result = await API.deleteDepartment(deptId);
            if (result.status === 200) {
                await this.loadDepartments();
            } else {
                alert(result.message || "فشل حذف القسم");
            }
        } catch (err) {
            alert(err.message || "فشل الاتصال بالسيرفر");
        }
    },

    // ===== Services =====
    async loadServices() {
        const tbody = document.getElementById("serviceTableBody");
        Utils.renderTableLoading(tbody, 4);
        try {
            const result = await API.getServices();
            this.services = result.data || [];
            this.renderServices();
        } catch (err) {
            Utils.renderTableError(tbody, 4);
        }
    },

    renderServices() {
        const tbody = document.getElementById("serviceTableBody");
        if (!tbody) return;

        if (this.services.length === 0) {
            Utils.renderTableEmpty(tbody, 4, "لا توجد خدمات بعد");
            return;
        }

        tbody.innerHTML = this.services.map(s => `
            <tr data-id="${s.service_id}">
                <td>${s.service_id}</td>
                <td class="service-name">${s.name}</td>
                <td class="service-description">${s.description || "-"}</td>
                <td class="table-actions">
                    <button type="button" class="btn btn-outline" onclick="AdminPanel.startEditService(${s.service_id})">
                        <i class="ri-edit-line"></i> تعديل
                    </button>
                    <button type="button" class="btn btn-danger" onclick="AdminPanel.deleteService(${s.service_id})">
                        <i class="ri-delete-bin-line"></i> حذف
                    </button>
                </td>
            </tr>
        `).join("");
    },

    async createService(e) {
        e.preventDefault();
        const nameInput = document.getElementById("serviceName");
        const descInput = document.getElementById("serviceDescription");
        const name = nameInput.value.trim();
        const description = descInput.value.trim();
        if (!name || !description) return;

        const submitBtn = e.target.querySelector("button[type=submit]");
        submitBtn.disabled = true;

        try {
            const result = await API.createService(name, description);
            if (result.status === 200 || result.status === 201) {
                nameInput.value = "";
                descInput.value = "";
                await this.loadServices();
            } else {
                alert(result.message || "فشل إضافة الخدمة");
            }
        } catch (err) {
            alert(err.message || "فشل الاتصال بالسيرفر");
        } finally {
            submitBtn.disabled = false;
        }
    },

    startEditService(serviceId) {
        const service = this.services.find(s => s.service_id == serviceId);
        const row = document.querySelector(`#serviceTableBody tr[data-id="${serviceId}"]`);
        if (!service || !row) return;

        row.querySelector(".service-name").innerHTML =
            `<input type="text" class="form-control" id="editServiceName-${serviceId}" value="${service.name}">`;
        row.querySelector(".service-description").innerHTML =
            `<input type="text" class="form-control" id="editServiceDesc-${serviceId}" value="${service.description || ""}">`;

        row.querySelector(".table-actions").innerHTML = `
            <button type="button" class="btn btn-success" onclick="AdminPanel.saveService(${serviceId})">
                <i class="ri-check-line"></i> حفظ
            </button>
            <button type="button" class="btn btn-outline" onclick="AdminPanel.renderServices()">
                <i class="ri-close-line"></i> إلغاء
            </button>
        `;
    },

    async saveService(serviceId) {
        const nameInput = document.getElementById(`editServiceName-${serviceId}`);
        const descInput = document.getElementById(`editServiceDesc-${serviceId}`);
        const name = nameInput.value.trim();
        const description = descInput.value.trim();

        if (!name || !description) {
            alert("اسم الخدمة والوصف مطلوبان");
            return;
        }

        try {
            const result = await API.updateService(serviceId, name, description);
            if (result.status === 200) {
                await this.loadServices();
            } else {
                alert(result.message || "فشل تحديث الخدمة");
            }
        } catch (err) {
            alert(err.message || "فشل الاتصال بالسيرفر");
        }
    },

    async deleteService(serviceId) {
        if (!confirm("هل تريد حذف هذه الخدمة؟ قد يؤثر ذلك على الطلبات المرتبطة بها.")) return;

        try {
            const result = await API.deleteService(serviceId);
            if (result.status === 200) {
                await this.loadServices();
            } else {
                alert(result.message || "فشل حذف الخدمة");
            }
        } catch (err) {
            alert(err.message || "فشل الاتصال بالسيرفر");
        }
    }
};
