/**
 * Centralized API client
 */
const API = {
    async request(endpoint, options = {}) {
        const url = `${AppConfig.BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
        const config = {
            headers: { "Content-Type": "application/json", ...options.headers },
            ...options
        };

        try {
            const response = await fetch(url, config);
            const result = await response.json();
            return result;
        } catch (error) {
            console.error("API Error:", endpoint, error);
            throw new Error("فشل الاتصال بالسيرفر");
        }
    },

    get(endpoint) {
        return this.request(endpoint, { method: "GET" });
    },

    post(endpoint, body) {
        return this.request(endpoint, { method: "POST", body: JSON.stringify(body) });
    },

    put(endpoint, body) {
        return this.request(endpoint, { method: "PUT", body: JSON.stringify(body) });
    },

    delete(endpoint, body) {
        return this.request(endpoint, { method: "DELETE", body: JSON.stringify(body) });
    },

    // Users
    login(email, password) {
        return this.post("/users/login.php", { email, password });
    },

    register(name, email, password) {
        return this.post("/users/register.php", {
            name,
            email,
            password,
            role: AppConfig.ROLES.STUDENT
        });
    },

    // Requests
    getUserRequests(userId) {
        return this.get(`/requests/get_user.php?user_id=${userId}`);
    },

    getAllRequests() {
        return this.get("/requests/get.php");
    },

    createRequest(data) {
        return this.post("/requests/create.php", data);
    },

    updateRequestStatus(requestId, status) {
        return this.put("/requests/update_status.php", { request_id: requestId, status });
    },

    cancelRequest(requestId, userId) {
        return this.put("/requests/cancel.php", {
            request_id: Number(requestId),
            user_id: Number(userId)
        });
    },

    // Services
    getServices() {
        return this.get("/services/get.php");
    },

    createService(name, description) {
        return this.post("/services/create.php", { name, description });
    },

    updateService(serviceId, name, description) {
        return this.put("/services/update.php", {
            service_id: Number(serviceId),
            name,
            description
        });
    },

    deleteService(serviceId) {
        return this.delete("/services/delete.php", { service_id: Number(serviceId) });
    },

    // Departments
    getDepartments() {
        return this.get("/departments/get.php");
    },

    createDepartment(name) {
        return this.post("/departments/create.php", { name });
    },

    updateDepartment(deptId, name) {
        return this.put("/departments/update.php", {
            dept_id: Number(deptId),
            name
        });
    },

    deleteDepartment(deptId) {
        return this.delete("/departments/delete.php", { dept_id: Number(deptId) });
    },

    // Students
    getStudents() {
        return this.get("/students/get.php");
    },

    updateStudent(studentId, universityNo, studyYear) {
        return this.put("/students/update.php", {
            student_id: studentId,
            university_no: universityNo,
            study_year: studyYear
        });
    },

    // Employees
    getEmployee(userId) {
        return this.get(`/employees/get.php?user_id=${userId}`);
    },

    updateEmployee(userId, name) {
        return this.put("/employees/update.php", { user_id: Number(userId), name });
    },

    // Attachments
    async uploadAttachment(requestId, file) {
        const formData = new FormData();
        formData.append("request_id", requestId);
        formData.append("file", file);

        try {
            const response = await fetch(`${AppConfig.BASE_URL}/attachments/upload.php`, {
                method: "POST",
                body: formData
            });
            return await response.json();
        } catch (error) {
            console.error("API Error:", "/attachments/upload.php", error);
            throw new Error("فشل رفع الملف المرفق");
        }
    },

    // Logs
    createLog(requestId, userId, newStatus, notes = null) {
        return this.post("/logs/create.php", {
            request_id: Number(requestId),
            user_id: Number(userId),
            new_status: newStatus,
            notes
        });
    },

    getLogs(params = {}) {
        const query = new URLSearchParams(params).toString();
        return this.get(`/logs/get.php${query ? `?${query}` : ""}`);
    },

    // Request Details (extra key/value fields for specific services)
    createRequestDetail(requestId, field, value) {
        return this.post("/request_details/create.php", {
            request_id: Number(requestId),
            field,
            value
        });
    },

    getRequestDetails(requestId) {
        return this.get(`/request_details/get.php?request_id=${requestId}`);
    }
};
