// ==========================
// STUDENT CONTROLLER CLEAN
// ==========================

// Services (بديل مؤقت عن DB)
const services = [
    { id: 1, name: "تغيير قيد" },
    { id: 2, name: "نقل متماثل" },
    { id: 3, name: "بيان وضع" },
    { id: 4, name: "إلغاء طلب" },
    { id: 5, name: "كشف علامات" },
    { id: 6, name: "استمارة تخرج" },
    { id: 7, name: "ورقة تدريب" }
];

// Storage
function getRequests() {
    return JSON.parse(localStorage.getItem("requests")) || [];
}

function saveRequests(data) {
    localStorage.setItem("requests", JSON.stringify(data));
}

// Detect page
const page = document.body.getAttribute("data-page");

// ==========================
// CREATE REQUEST
// ==========================
if (page === "create-request") {

    const select = document.querySelector("[name='service_id']");

    // تعبئة الخدمات
    if (select) {
        services.forEach(service => {
            let option = document.createElement("option");
            option.value = service.id;
            option.textContent = service.name;
            select.appendChild(option);
        });
    }

    // submit form
    const form = document.querySelector("form");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            let requests = getRequests();

            let newRequest = {
                tracking_no: "REQ-" + Date.now(),
                service_id: select.value,
                field_value: document.querySelector("[name='field_value']").value,
                status: "pending",
                created_at: new Date().toISOString(),
                attachments: [],
                logs: [
                    {
                        action: "Created",
                        date: new Date().toISOString()
                    }
                ]
            };

            requests.push(newRequest);
            saveRequests(requests);

            alert("تم إنشاء الطلب");

            window.location.href = "dashboard.html";
        });
    }
}

// ==========================
// DASHBOARD
// ==========================
if (page === "dashboard") {

    let requests = getRequests();

    document.getElementById("total").innerText = requests.length;

    document.getElementById("pending").innerText =
        requests.filter(r => r.status === "pending").length;

    document.getElementById("review").innerText =
        requests.filter(r => r.status === "review").length;

    document.getElementById("approved").innerText =
        requests.filter(r => r.status === "approved").length;

    document.getElementById("rejected").innerText =
        requests.filter(r => r.status === "rejected").length;
}

// ==========================
// TRACK REQUEST
// ==========================
if (page === "track") {

    window.searchRequest = function () {

        let tracking_no = document.getElementById("tracking_no").value;

        let requests = getRequests();

        let req = requests.find(r => r.tracking_no === tracking_no);

        if (!req) {
            alert("الطلب غير موجود");
            return;
        }

        window.location.href =
            "request-details.html?tracking_no=" + tracking_no;
    };
}

// ==========================
// REQUEST DETAILS
// ==========================
if (page === "details") {

    const params = new URLSearchParams(window.location.search);
    const tracking_no = params.get("tracking_no");

    let requests = getRequests();

    let req = requests.find(r => r.tracking_no === tracking_no);

    if (req) {

        document.getElementById("tracking_no").innerText = req.tracking_no;
        document.getElementById("status").innerText = req.status;

        // service name
        let service = services.find(s => s.id == req.service_id);
        document.getElementById("service").innerText =
            service ? service.name : "";

        // details
        document.getElementById("details").innerHTML =
            <p>${req.field_value}</p>;
            // attachments
        document.getElementById("attachments").innerHTML =
        req.attachments.length
            ? req.attachments.map(a => <p>${a}</p>).join("")
            : "<p>لا يوجد ملفات</p>";

    // logs
    document.getElementById("logs").innerHTML =
        req.logs.map(l =>
            <p>${l.action} - ${l.date}</p>
        ).join("");
}
}

// ==========================
// PROFILE
// ==========================
if (page === "profile") {

let user = {
    name: "Student Name",
    email: "student@email.com",
    student_no: "12345",
    year: "3"
};

document.getElementById("name").innerText = user.name;
document.getElementById("email").innerText = user.email;
document.getElementById("student_no").innerText = user.student_no;
document.getElementById("year").innerText = user.year;
}