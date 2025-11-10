const restApiUrl = "http://localhost:8080/api";


function fetchUserProfile() {
    const token = localStorage.getItem("token");

    if (!token) {
        showOutOfProfileMenu();
        return;
    }
    axios
    .get()
}
