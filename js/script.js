const restApiUrl = "http://localhost:8080/api";

export default restApiUrl;

function fetchUserProfile() {
    const token = localStorage.getItem("token");

    if (!token) {
        showOutOfProfileMenu();
        return;
    }
    axios
        .get(`${restApiUrl}/auth/profile`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
            handleProfileSuccess(response.data);
        })
        .catch((error) => {
            handleProfileError(error);
        });
}
function handleProfileSuccess(userData) {
    console.log('Профиль пользывателя загружен:', userData);
    showInProfileMenu(userData);
    localStorage.setItem('user', JSON.stringify(userData));
}

function showInProfileMenu(data) {
    showHeader();
    showFooter();
    console.log(data)
    const profileMenu = document.querySelector(".profileMenu");
    profileMenu.innerHTML = `
     <a href="/pages/cart/cart.html">
       <i class="bi bi-cart3 fs-2 mx-3"></i>
    </a>
     <a href="/pages/profile/profile.html">
       <i class="bi bi-person-circle fs-2 "></i>
    </a>
    <span class="username">
     ${data.username}
     </span>
     <span class="logoutBtn btn btn-danger">
          Log out
     </span>

    `;
    const logoutBtn = document.querySelector(".logoutBtn");
    logoutBtn.addEventListener("click", logoutUser)
}

function handleProfileError(error) {
    if (error.response) {
        const { status, data } = error.response;

        if (status === 401) {
            console.warn('Неавтаризован: Токен истек или недействителен');
            alert('Сесия истекла, Пожалуйста, войдите снова.');
            localStorage.removeItem('token');
            showOutOfProfileMenu();
        } else {
            console.error(`Ошибка сервера (${status}):`, data);
            alert('Произошла ошибка на сервере. Пожалуйста, попробуйте позже.');
        }
    } else {
        console.error('Сетевая ошибка', error.message);
        alert('Проблема с сетью. Проверьте ваше подключение к интернету.');
    }
}

function logoutUser() {
    const token = localStorage.getItem('token');
    if (token) {
        axios
            .post('http://localhost:8080/api/auth/logout', null, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
                console.log('Logout successful!');
                localStorage.removeItem('token');
                window.location.href = '/index.html';
            })
            .catch(error => {
                console.error('Ошибка при выходе:', error.response ? error.response.data : error.message);
            });
    } else {
        console.log('No token found, user might already be logged out');
    }
}


function showOutOfProfileMenu() {
    showHeader();
    showFooter();
    const profileMenu = document.querySelector(".profileMenu");
    profileMenu.innerHTML = `
               <a class="nav-link" href="/pages/login/login.html">
                      Log in
               <a/>
    `
}
function showHeader() {
    const header = document.createElement("header");
    header.innerHTML = `
       <header>
        <div class="bg-danger text-dark">
            <p class="text-center p-3 text-white">
                Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! <a href="/pages/shop/shop.html">Shop
                    now</a>
            </p>
        </div>
        <nav class="navbar navbar-expand-lg container">
            <div class="container-fluid">
                <a class="navbar-brand" href="/index.html">E-commerce</a>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">

                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/index.html">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/pages/contact/contact.html">Contact</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/pages/about/about.html">About</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/pages/registration/registration.html">Sign up</a>
                        </li>
                        <li class="nav-item">
                            <a href="/pages/shop/shop.html" class="btn btn-danger text-white btn-shop">Shop</a>
                        </li>
                    </ul>

                    <form class="d-flex align-items-center me-4" role="search">
                        <input class="form-control" type="search" placeholder="Search" aria-label="Search"
                            style="width: 220px;">
                        <i class="bi bi-search ms-2 fs-5"></i>
                    </form>
                    <!-- <div class="d-flex align-items-center">
                        <a href="/pages/cart/cart.html" class="me-3 text-dark">
                            <i class="bi bi-cart3 fs-4"></i>
                        </a>
                        <a href="/pages/profile/profile.html" class="me-2 text-dark">
                            <i class="bi bi-person fs-4"></i>
                        </a>
                        <span class="username">Emin</span>
                        <button class="logoutBtn btn btn-danger ms-2">
                            Log out
                        </button>
                    </div> -->
                    <div class="profileMenu d-flex align-items-center">
                        <a class="nav-link bg-danger text-light p-2 rounded" href="/pages/login/login.html">
                            Log in
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    </header>

    `
    document.body.insertBefore(header, document.body.firstChild);
}

function showFooter() {
    const footer = document.createElement("footer");
    footer.innerHTML = `
      <footer class="bg-danger text-light pt-5 pb-4">
        <div class="container">
            <div class="row gy-4">
                <div class="col-md-3">
                    <h5 class="fw-bold mb-3">Exclusive</h5>
                    <p class="mb-1">Subscribe</p>
                    <p class="small mb-3">Get 10% off your first order</p>
                    <div class="input-group">
                        <input type="text" class="form-control bg-transparent border-light text-light"
                            placeholder="Enter your email">
                        <span class="input-group-text bg-transparent border-light text-light">
                            <i class="bi bi-cursor-fill"></i>
                        </span>
                    </div>
                </div>

                <div class="col-md-3">
                    <h5 class="fw-bold mb-3">Support</h5>
                    <p class="mb-1">111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
                    <p class="mb-1">exclusive@gmail.com</p>
                    <p class="mb-0">+88015-88888-9999</p>
                </div>

                <div class="col-md-2">
                    <h5 class="fw-bold mb-3">Account</h5>
                    <ul class="list-unstyled">
                        <li><a href="#" class="text-light text-decoration-none">My Account</a></li>
                        <li><a href="#" class="text-light text-decoration-none">Login / Register</a></li>
                        <li><a href="#" class="text-light text-decoration-none">Cart</a></li>
                        <li><a href="#" class="text-light text-decoration-none">Wishlist</a></li>
                        <li><a href="#" class="text-light text-decoration-none">Shop</a></li>
                    </ul>
                </div>

                <div class="col-md-2">
                    <h5 class="fw-bold mb-3">Quick Link</h5>  
                    <ul class="list-unstyled">
                        <li><a href="#" class="text-light text-decoration-none">Privacy Policy</a></li>
                        <li><a href="#" class="text-light text-decoration-none">Terms Of Use</a></li>
                        <li><a href="#" class="text-light text-decoration-none">FAQ</a></li>
                        <li><a href="#" class="text-light text-decoration-none">Contact</a></li>
                    </ul>
                </div>

                <div class="col-md-2">
                    <h5 class="fw-bold mb-3">Download App</h5>
                    <p class="small text-light-50 mb-2">Save $3 with App New User Only</p>

                    <div class="d-flex align-items-center gap-2">
                        <img src="/images/footer/QRKOd.jpg" alt="QR Code" width="90">
                        <img src="/images/footer/Google.png" alt="Google Play" width="130">
                        <img class="md-3" src="/images/footer/apple store.png" alt="Apple Store" width="130">
                    </div>
                    <div class="d-flex justify-content-center gap-4 mt-3">
                        <i class="bi bi-facebook fs-4"></i>
                        <i class="bi bi-twitter fs-4"></i>
                        <i class="bi bi-instagram fs-4"></i>
                        <i class="bi bi-linkedin fs-4"></i>
                    </div>
                </div>
            </div>

            <hr class="border-light mt-5">
            <p class="text-center small mb-0">© Copyright Rimel 2025. All rights reserved</p>
        </div>
    </footer>

    `;

    document.body.appendChild(footer);
}


console.log("script.js")
fetchUserProfile();