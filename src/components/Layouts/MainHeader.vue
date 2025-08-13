<template>
  <header id="darkModeHeader" class="header-area bg-white mb-4">
    <div class="container-fluid">
      <div class="row align-items-center">
        <div class="col-lg-6 col-md-7">
          <div class="left-header-content">
            <ul
              class="d-lg-flex d-md-flex align-items-center ps-0 mb-0 list-unstyled"
            >
              <li class="mb-3 mb-md-0 mb-lg-0">
                <div
                  class="d-flex justify-content-between align-items-center cw-273"
                >
                <div style="display:flex;gap:1.2rem;align-items:center;flex-wrap:wrap;">
                    <div class="logo logo--sm" role="img" aria-label="LC DEMO logo small"><span class="badge">LC</span><span class="dash">-</span><span class="word">DEMO</span></div>
                </div>
                  <div>
                    <button
                      class="border-0 p-0 bg-transparent js-sidebar-expand flex-grow-1 ms-3 text-sm-end menu-bergur"
                      @click="stateStoreInstance.onChange"
                    >
                      <div
                        id="closeBtn"
                        @click="toggleButtonVisibility('openBtn')"
                        v-show="showOpenBtn"
                      >
                        <vue-feather type="menu"></vue-feather>
                      </div>
                      <div
                        id="openBtn"
                        @click="toggleButtonVisibility('closeBtn')"
                        v-show="showCloseBtn"
                      >
                        <vue-feather type="x"></vue-feather>
                      </div>
                    </button>
                  </div>
                </div>
              </li>
              <li class="ms-lg-3 ms-md-3">
                <form class="src-form position-relative">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search here..."
                  />
                  <vue-feather
                    type="search"
                    class="position-absolute top-50 start-0 translate-middle-y"
                  ></vue-feather>
                </form>
              </li>
            </ul>
          </div>
        </div>

        <div class="col-lg-6 col-md-5">
          <div class="float-lg-end float-md-end">
            <ul
              class="right-header-content list-unstyled d-flex justify-content-lg-end justify-content-md-end justify-content-center align-items-center mb-0 ps-0"
            >
              <li>
                <div class="dropdown date">
                  <button
                    class="btn bg-transparent p-0 border-0 p-0 position-relative badge"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <vue-feather class="t-0" type="calendar"></vue-feather>
                  </button>
                  <div class="dropdown-menu dropdown-lg p-0 rounded-0 border-0">
                    <div class="today-date">
                      <span class="fw-medium">{{ formattedDate }}</span>
                      <vue-feather type="calendar"></vue-feather>
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <div class="dropdown notifications">
                  <button
                    class="btn bg-transparent border-0 p-0 position-relative"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <vue-feather type="bell"></vue-feather>
                    <span
                      class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    >
                      3
                    </span>
                  </button>

                  <div
                    class="dropdown-menu dropdown-lg p-0 rounded-10 border-0 box-shadow"
                  >
                    <h6
                      class="dropdown-item-text m-0 py-3 border-bottom d-flex justify-content-between align-items-center"
                    >
                      Notifications
                      <button
                        class="border-0 fw-norma bg-transparent text-white"
                      >
                        Mark all as read
                      </button>
                    </h6>

                    <div class="notification-menu scroll-bar h-400">
                      <router-link
                        to="/notifications"
                        class="dropdown-item py-3"
                      >
                        <small class="float-end text-body ps-2">
                          1 min ago
                        </small>
                        <div class="d-flex align-items-center">
                          <div
                            class="avatar-md rounded-circle text-center flex-shrink-0"
                          >
                            <vue-feather type="video"></vue-feather>
                          </div>
                          <div class="flex-grow-1 ms-2 text-truncate">
                            <h6 class="my-0 fw-medium text-dark fs-14">
                              Meeting with designers
                            </h6>
                            <small class="text-body mb-0">
                              Lorem ipsum dolor sit amet consectetur,
                              adipisicing elit.
                            </small>
                          </div>
                        </div>
                      </router-link>
                      <router-link
                        to="/notifications"
                        class="dropdown-item py-3"
                      >
                        <small class="float-end text-body ps-2">
                          3 min ago
                        </small>
                        <div class="d-flex align-items-center">
                          <div
                            class="avatar-md rounded-circle text-center flex-shrink-0"
                          >
                            <vue-feather type="shopping-bag"></vue-feather>
                          </div>
                          <div class="flex-grow-1 ms-2 text-truncate">
                            <h6 class="my-0 fw-medium text-dark fs-14">
                              Your order is placed
                            </h6>
                            <small class="text-body mb-0">
                              Lorem ipsum dolor sit amet consectetur,
                              adipisicing elit.
                            </small>
                          </div>
                        </div>
                      </router-link>
                      <router-link
                        to="/notifications"
                        class="dropdown-item py-3"
                      >
                        <small class="float-end text-body ps-2">
                          7 min ago
                        </small>
                        <div class="d-flex align-items-center">
                          <div
                            class="avatar-md rounded-circle text-center flex-shrink-0"
                          >
                            <vue-feather type="camera"></vue-feather>
                          </div>
                          <div class="flex-grow-1 ms-2 text-truncate">
                            <h6 class="my-0 fw-medium text-dark fs-14">
                              UX 3 Task complete
                            </h6>
                            <small class="text-body mb-0">
                              Lorem ipsum dolor sit amet consectetur,
                              adipisicing elit.
                            </small>
                          </div>
                        </div>
                      </router-link>
                      <router-link
                        to="/notifications"
                        class="dropdown-item py-3"
                      >
                        <small class="float-end text-body ps-2">
                          8 min ago
                        </small>
                        <div class="d-flex align-items-center">
                          <div
                            class="avatar-md rounded-circle text-center flex-shrink-0"
                          >
                            <vue-feather type="dollar-sign"></vue-feather>
                          </div>
                          <div class="flex-grow-1 ms-2 text-truncate">
                            <h6 class="my-0 fw-medium text-dark fs-14">
                              Payment Successfull
                            </h6>
                            <small class="text-body mb-0">
                              Lorem ipsum dolor sit amet consectetur,
                              adipisicing elit.
                            </small>
                          </div>
                        </div>
                      </router-link>
                      <router-link
                        to="/notifications"
                        class="dropdown-item py-3"
                      >
                        <small class="float-end text-body ps-2">
                          1 min ago
                        </small>
                        <div class="d-flex align-items-center">
                          <div
                            class="avatar-md rounded-circle text-center flex-shrink-0"
                          >
                            <vue-feather type="video"></vue-feather>
                          </div>
                          <div class="flex-grow-1 ms-2 text-truncate">
                            <h6 class="my-0 fw-medium text-dark fs-14">
                              Meeting with designers
                            </h6>
                            <small class="text-body mb-0">
                              Lorem ipsum dolor sit amet consectetur,
                              adipisicing elit.
                            </small>
                          </div>
                        </div>
                      </router-link>
                      <router-link
                        to="/notifications"
                        class="dropdown-item py-3"
                      >
                        <small class="float-end text-body ps-2">
                          3 min ago
                        </small>
                        <div class="d-flex align-items-center">
                          <div
                            class="avatar-md rounded-circle text-center flex-shrink-0"
                          >
                            <vue-feather type="shopping-bag"></vue-feather>
                          </div>
                          <div class="flex-grow-1 ms-2 text-truncate">
                            <h6 class="my-0 fw-medium text-dark fs-14">
                              Your order is placed
                            </h6>
                            <small class="text-body mb-0">
                              Lorem ipsum dolor sit amet consectetur,
                              adipisicing elit.
                            </small>
                          </div>
                        </div>
                      </router-link>
                      <router-link
                        to="/notifications"
                        class="dropdown-item py-3"
                      >
                        <small class="float-end text-body ps-2">
                          7 min ago
                        </small>
                        <div class="d-flex align-items-center">
                          <div
                            class="avatar-md rounded-circle text-center flex-shrink-0"
                          >
                            <vue-feather type="camera"></vue-feather>
                          </div>
                          <div class="flex-grow-1 ms-2 text-truncate">
                            <h6 class="my-0 fw-medium text-dark fs-14">
                              UX 3 Task complete
                            </h6>
                            <small class="text-body mb-0"
                              >Lorem ipsum dolor sit amet consectetur,
                              adipisicing elit.</small
                            >
                          </div>
                        </div>
                      </router-link>
                      <router-link
                        to="/notifications"
                        class="dropdown-item py-3"
                      >
                        <small class="float-end text-body ps-2">
                          8 min ago
                        </small>
                        <div class="d-flex align-items-center">
                          <div
                            class="avatar-md rounded-circle text-center flex-shrink-0"
                          >
                            <vue-feather type="dollar-sign"></vue-feather>
                          </div>
                          <div class="flex-grow-1 ms-2 text-truncate">
                            <h6 class="my-0 fw-medium text-dark fs-14">
                              Payment Successfull
                            </h6>
                            <small class="text-body mb-0">
                              Lorem ipsum dolor sit amet consectetur,
                              adipisicing elit.
                            </small>
                          </div>
                        </div>
                      </router-link>
                    </div>
                    <router-link
                      to="/"
                      class="dropdown-item text-center text-white bg-primary py-3 d-block border-0"
                    >
                      View all
                    </router-link>
                  </div>
                </div>
              </li>

              <li>
                <div class="dropdown mail">
                  <button
                    class="btn btn-secondary border-0 p-0 position-relative"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <vue-feather type="mail"></vue-feather>
                    <span
                      class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary"
                    >
                      2
                    </span>
                  </button>
                  <div
                    class="dropdown-menu dropdown-lg p-0 rounded-10 border-0 box-shadow"
                  >
                    <h6
                      class="dropdown-item-text m-0 py-3 border-bottom d-flex justify-content-between align-items-center"
                    >
                      Email
                      <button
                        class="border-0 fw-norma bg-transparent text-white"
                      >
                        Mark all as read
                      </button>
                    </h6>

                    <div class="notification-menu scroll-bar h-400">
                      <router-link to="/read-email" class="dropdown-item py-3">
                        <small class="float-end text-body ps-2">
                          1 min ago
                        </small>
                        <div class="d-flex align-items-center">
                          <div
                            class="avatar-md rounded-circle text-center flex-shrink-0"
                          >
                            <vue-feather type="video"></vue-feather>
                          </div>
                          <div class="flex-grow-1 ms-2 text-truncate">
                            <h6 class="my-0 fw-medium text-dark fs-14">
                              Meeting with designers
                            </h6>
                            <small class="text-body mb-0">
                              Lorem ipsum dolor sit amet consectetur,
                              adipisicing elit.
                            </small>
                          </div>
                        </div>
                      </router-link>
                      <router-link to="/read-email" class="dropdown-item py-3">
                        <small class="float-end text-body ps-2">
                          3 min ago
                        </small>
                        <div class="d-flex align-items-center">
                          <div
                            class="avatar-md rounded-circle text-center flex-shrink-0"
                          >
                            <vue-feather type="shopping-bag"></vue-feather>
                          </div>
                          <div class="flex-grow-1 ms-2 text-truncate">
                            <h6 class="my-0 fw-medium text-dark fs-14">
                              Your order is placed
                            </h6>
                            <small class="text-body mb-0">
                              Lorem ipsum dolor sit amet consectetur,
                              adipisicing elit.
                            </small>
                          </div>
                        </div>
                      </router-link>
                      <router-link to="/read-email" class="dropdown-item py-3">
                        <small class="float-end text-body ps-2">
                          7 min ago
                        </small>
                        <div class="d-flex align-items-center">
                          <div
                            class="avatar-md rounded-circle text-center flex-shrink-0"
                          >
                            <vue-feather type="camera"></vue-feather>
                          </div>
                          <div class="flex-grow-1 ms-2 text-truncate">
                            <h6 class="my-0 fw-medium text-dark fs-14">
                              UX 3 Task complete
                            </h6>
                            <small class="text-body mb-0">
                              Lorem ipsum dolor sit amet consectetur,
                              adipisicing elit.
                            </small>
                          </div>
                        </div>
                      </router-link>
                      <router-link to="/read-email" class="dropdown-item py-3">
                        <small class="float-end text-body ps-2">
                          8 min ago
                        </small>
                        <div class="d-flex align-items-center">
                          <div
                            class="avatar-md rounded-circle text-center flex-shrink-0"
                          >
                            <vue-feather type="dollar-sign"></vue-feather>
                          </div>
                          <div class="flex-grow-1 ms-2 text-truncate">
                            <h6 class="my-0 fw-medium text-dark fs-14">
                              Payment Successfull
                            </h6>
                            <small class="text-body mb-0">
                              Lorem ipsum dolor sit amet consectetur,
                              adipisicing elit.
                            </small>
                          </div>
                        </div>
                      </router-link>
                      <router-link to="/read-email" class="dropdown-item py-3">
                        <small class="float-end text-body ps-2">
                          1 min ago
                        </small>
                        <div class="d-flex align-items-center">
                          <div
                            class="avatar-md rounded-circle text-center flex-shrink-0"
                          >
                            <vue-feather type="video"></vue-feather>
                          </div>
                          <div class="flex-grow-1 ms-2 text-truncate">
                            <h6 class="my-0 fw-medium text-dark fs-14">
                              Meeting with designers
                            </h6>
                            <small class="text-body mb-0">
                              Lorem ipsum dolor sit amet consectetur,
                              adipisicing elit.
                            </small>
                          </div>
                        </div>
                      </router-link>
                      <router-link to="/read-email" class="dropdown-item py-3">
                        <small class="float-end text-body ps-2">
                          3 min ago
                        </small>
                        <div class="d-flex align-items-center">
                          <div
                            class="avatar-md rounded-circle text-center flex-shrink-0"
                          >
                            <vue-feather type="shopping-bag"></vue-feather>
                          </div>
                          <div class="flex-grow-1 ms-2 text-truncate">
                            <h6 class="my-0 fw-medium text-dark fs-14">
                              Your order is placed
                            </h6>
                            <small class="text-body mb-0">
                              Lorem ipsum dolor sit amet consectetur,
                              adipisicing elit.
                            </small>
                          </div>
                        </div>
                      </router-link>
                      <router-link to="/read-email" class="dropdown-item py-3">
                        <small class="float-end text-body ps-2">
                          7 min ago
                        </small>
                        <div class="d-flex align-items-center">
                          <div
                            class="avatar-md rounded-circle text-center flex-shrink-0"
                          >
                            <vue-feather type="camera"></vue-feather>
                          </div>
                          <div class="flex-grow-1 ms-2 text-truncate">
                            <h6 class="my-0 fw-medium text-dark fs-14">
                              UX 3 Task complete
                            </h6>
                            <small class="text-body mb-0">
                              Lorem ipsum dolor sit amet consectetur,
                              adipisicing elit.
                            </small>
                          </div>
                        </div>
                      </router-link>
                      <router-link to="/read-email" class="dropdown-item py-3">
                        <small class="float-end text-body ps-2">
                          8 min ago
                        </small>
                        <div class="d-flex align-items-center">
                          <div
                            class="avatar-md rounded-circle text-center flex-shrink-0"
                          >
                            <vue-feather type="dollar-sign"></vue-feather>
                          </div>
                          <div class="flex-grow-1 ms-2 text-truncate">
                            <h6 class="my-0 fw-medium text-dark fs-14">
                              Payment Successfull
                            </h6>
                            <small class="text-body mb-0">
                              Lorem ipsum dolor sit amet consectetur,
                              adipisicing elit.
                            </small>
                          </div>
                        </div>
                      </router-link>
                    </div>
                    <router-link
                      to="/"
                      class="dropdown-item text-center text-white bg-primary py-3 d-block border-0"
                    >
                      View all
                    </router-link>
                  </div>
                </div>
              </li>

              <li>
                <div class="dropdown user-profile">
                  <a
                    href="#"
                    class="d-flex align-items-center user-control text-decoration-none"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <div class="flex-shrink-0">
                      <img
                        class="rounded-circle"
                        src="../../assets/images/user/user-1.jpg"
                        alt="user-1"
                      />
                    </div>
                    <div class="flex-grow-1 ms-3">
                      <div
                        class="d-flex align-items-center justify-content-between"
                      >
                        <div class="me-5 d-none d-lg-block">
                          <h3>Robert Appiah</h3>
                          <span>Admin</span>
                        </div>

                        <i class="ri-arrow-down-s-line"></i>
                      </div>
                    </div>
                  </a>

                  <ul class="dropdown-menu border-0 box-shadow rounded-0">
                    <li class="me-0">
                      <router-link
                        class="dropdown-item d-flex align-items-center text-body"
                        to="/profile"
                      >
                        <vue-feather
                          type="user"
                          class="text-primary"
                        ></vue-feather>
                        <span class="ms-2 text-dark">Profile</span>
                      </router-link>
                    </li>
                    <!-- <li class="me-0">
                      <router-link
                        class="dropdown-item d-flex align-items-center text-body"
                        to="/setting"
                      >
                        <vue-feather
                          type="settings"
                          class="text-primary"
                        ></vue-feather>
                        <span class="ms-2 text-dark">Setting</span>
                      </router-link>
                    </li> -->
                    <li class="me-0">
                      <router-link
                        class="dropdown-item d-flex align-items-center text-body"
                        to="/Sign-In"
                      >
                        <vue-feather
                          type="log-out"
                          class="text-primary"
                        ></vue-feather>
                        <span class="ms-2 text-dark" @click="signOut">Logout</span>
                      </router-link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import useAuth from '@/Use/useAuthentication'
import stateStore from "@/utils/store";
const { signOut } = useAuth()

const formattedDate = ref("")
const currentDate = new Date()

const showOpenBtn = ref(true)
const showCloseBtn = ref(false)

const stateStoreInstance = stateStore

onMounted(() => {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ]

      formattedDate.value = `${currentDate.getDate()} ${
        months[currentDate.getMonth()]
      } ${currentDate.getFullYear()}`
    })

function toggleButtonVisibility(buttonId: string) {
      if (buttonId === "openBtn") {
        showOpenBtn.value = false;
        showCloseBtn.value = true;
        // Perform any other actions you want after clicking "open"
      } else if (buttonId === "closeBtn") {
        showOpenBtn.value = true;
        showCloseBtn.value = false;
        // Perform any other actions you want after clicking "close"
      }
    }

</script>
<script lang="ts">
export default {}
</script>
<style>
    :root{
      /* easy theme variables */
      --accent-1:  #0ea5a4; /* teal */
      --accent-2:  #0369a1; /* deep blue */
      --neutral:   rgba(0,0,0,0.75);
      --text-strong: #06202a;
      --size: 1rem; /* base unit -> scale with font-size */
    }
/* Logo wrapper — transparent by default (no background color) */
.logo{
  display:inline-flex;
  align-items:center;
  gap:.6em;
  font-weight:700;
  font-size:calc(var(--size) * 3.2); /* tune this with --size */
  line-height:1;
  letter-spacing: -0.02em;
  user-select: none;
  -webkit-font-smoothing:antialiased;
  transform-origin:center;
}

/* 'LC' badge */
.logo .badge{
  display:inline-grid;
  place-items:center;
  width:1.35em;
  height:1.35em;
  border-radius:0.4em;
  background: linear-gradient(135deg, var(--accent-1), var(--accent-2));
  box-shadow: 0 6px 18px rgba(3,25,40,0.12), inset 0 -6px 18px rgba(255,255,255,0.06);
  color: white;
  font-weight:800;
  font-size:0.66em;
  flex:0 0 auto;
  display:flex;
  align-items:center;
  justify-content:center;
}

/* small decorative notch to give a custom mark feel */
.logo .badge::after{
  content:"";
  position:relative;
  display:block;
  width:0.22em;
  height:0.22em;
  border-radius:0.06em;
  transform:translate(0.38em, -0.36em) rotate(20deg);
  box-shadow: -0.02em -0.02em 0 0 rgba(255,255,255,0.15);
  opacity:0.9;
}

/* dash */
.logo .dash{
  color:var(--neutral);
  font-weight:800;
  font-size:0.9em;
  transform:translateY(0.02em);
  opacity:0.95;
}

/* DEMO word */
.logo .word{
  color:var(--text-strong);
  font-weight:800;
  font-size:0.92em;
  letter-spacing:0.08em;
  text-transform:uppercase;
  display:inline-block;
}

/* Thin underline accent that sits under DEMO */
.logo .word::after{
  content:"";
  display:block;
  margin-top:0.12em;
  width:1.05ch;
  height:0.12em;
  border-radius:2px;
  background:linear-gradient(90deg, var(--accent-2), var(--accent-1));
  opacity:0.9;
  transform-origin:left center;
}

/* sizes: small / medium / large helpers */
.logo--sm{font-size:calc(var(--size) * 1.6);} /* e.g. favicons */
.logo--md{font-size:calc(var(--size) * 2.6);} /* default */
.logo--lg{font-size:calc(var(--size) * 4);}   /* hero */

/* accessible focus state when used as a link/button */
a.logo:focus{outline:3px solid color-mix(in srgb, var(--accent-1) 55%, white 45%); outline-offset:6px; border-radius:6px}

/* responsive tweak for tiny containers */
@media (max-width:320px){
  .logo{gap:0.35em}
  .logo .word::after{width:0.9ch}
}
</style>