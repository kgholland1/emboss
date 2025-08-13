import { createWebHashHistory, createRouter, RouterOptions } from "vue-router";

import DocumentManagementPage from "../pages/Dashboard/DocumentManagementPage.vue";
import ReportManagementPage from "../pages/Report/ReportManagementPage.vue";
import DocumentListPage from "../pages/Document/DocumentListPage.vue";
import AddEditDocument from "../pages/Document/AddEditDocument.vue";
import ProjectListPage from "../pages/ProjectManagement/ProjectListPage.vue";
import UserPage from "../pages/ProjectManagement/UserPage.vue";
import ProfilePage from "../pages/Social/ProfilePage.vue";
import SettingPage from "../pages/Social/SettingPage.vue";

import FaqPage from "../pages/FaqPage.vue";
import UsersListPage from "../pages/Users/UsersListPage.vue";
import AddUserPage from "../pages/Users/AddUserPage.vue";
import UserProfilePage from "../pages/Profile/UserProfilePage.vue";
import SignInPage from "../pages/Authentication/SignInPage.vue";
import SignUpPage from "../pages/Authentication/SignUpPage.vue";
import ResetPasswordPage from "../pages/Authentication/ResetPasswordPage.vue";
import ForgetPasswordPage from "../pages/Authentication/ForgetPasswordPage.vue";

import LogOutPage from "../pages/Authentication/LogOutPage.vue";
import AccountSettingsPage from "../pages/Setting/AccountSettingsPage.vue";
import ChangePasswordPage from "../pages/Setting/ChangePasswordPage.vue";
import ConnectionsPage from "../pages/Setting/ConnectionsPage.vue";
import PrivacyPolicyPage from "../pages/Setting/PrivacyPolicyPage.vue";

const routes = [
  {
    path: "/",
    name: "DocumentManagementPage",
    component: DocumentManagementPage,
  },
  {
    path: "/report-list",
    name: "ReportList",
    component: ReportManagementPage,
  },
  {
    path: "/document-list",
    name: "DocumentListPage",
    component: DocumentListPage,
  },
  {
    path: "/add-document/:docId",
    name: "AddEditDocument",
    component: AddEditDocument,
  },
  {
    path: "/project-list",
    name: "ProjectListPage",
    component: ProjectListPage,
  },
  {
    path: "/user",
    name: "UserPage",
    component: UserPage,
  },
  {
    path: "/profile",
    name: "ProfilePage",
    component: ProfilePage,
  },
  {
    path: "/setting",
    name: "SettingPage",
    component: SettingPage,
  },
  {
    path: "/faq",
    name: "FaqPage",
    component: FaqPage,
  },
  {
    path: "/user-list",
    name: "UsersListPage",
    component: UsersListPage,
  },
  {
    path: "/add-user",
    name: "AddUserPage",
    component: AddUserPage,
  },
  {
    path: "/user-profile",
    name: "UserProfilePage",
    component: UserProfilePage,
  },
  {
    path: "/sign-in",
    name: "SignInPage",
    component: SignInPage,
  },
  {
    path: "/sign-up",
    name: "SignUpPage",
    component: SignUpPage,
  },
  {
    path: "/reset-password",
    name: "ResetPasswordPage",
    component: ResetPasswordPage,
  },
  {
    path: "/forget-password",
    name: "ForgetPasswordPage",
    component: ForgetPasswordPage,
  },
  {
    path: "/log-out",
    name: "LogOutPage",
    component: LogOutPage,
  },
  {
    path: "/account-settings",
    name: "AccountSettingsPage",
    component: AccountSettingsPage,
  },
  {
    path: "/change-password",
    name: "ChangePasswordPage",
    component: ChangePasswordPage,
  },
  {
    path: "/connections",
    name: "ConnectionsPage",
    component: ConnectionsPage,
  },
  {
    path: "/privacy-policy",
    name: "PrivacyPolicyPage",
    component: PrivacyPolicyPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkExactActiveClass: "active",
  routes: routes,
  scrollBehavior() {
    return { top: 0, behavior: "smooth" };
  },
} as RouterOptions);

// Global beforeEach guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("lc-userId") === "true"

  if (!isAuthenticated && to.path !== "/sign-in") {
    // Not logged in, send to sign-in
    next("/sign-in")
  } else if (isAuthenticated && to.path === "/sign-in") {
    next("/")
  } else {
    // Allow navigation
    next()
  }
})

export default router;