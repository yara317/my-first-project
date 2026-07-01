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

    // Services
    getServices() {
        return this.get("/services/get.php");
    },

    getDepartments() {
        return this.get("/departments/get.php");
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
    }
};
