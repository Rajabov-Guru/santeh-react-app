import MainPage from "../pages/main/MainPage";
import About from "../pages/main/About";
import Contacts from "../pages/main/Contacts";
import Montage from "../pages/main/Montage";
import Partners from "../pages/main/Partners";
import Categories from "../pages/main/Categories";
import ProductPage from "../pages/main/ProductPage";
import Category from "../pages/main/Category";
import DashboardCategory from "../pages/dashboard/DashboardCategory";
import DashboardCategories from "../pages/dashboard/DashboardCategories";
import DashboardProducts from "../pages/dashboard/DashboardProducts";
import AddCategory from "../pages/dashboard/AddCategory";
import AddProduct from "../pages/dashboard/AddProduct";
import EditCategory from "../pages/dashboard/EditCategory";
import EditProduct from "../pages/dashboard/EditProduct";
import Login from "../pages/dashboard/Login";
import SearchResult from "../pages/SearchResult";

export const paths = {
    MAIN_ROUTE : '/',
    ABOUT_ROUTE:'/about',
    CONTACTS:'/contacts',
    MONTAGE:'/montage',
    PARTNERS:'/partners',
    CATEGORIES_ROUTE : '/categories',
    CATEGORY_ROUTE : '/categories/:id',
    PRODUCTS_ROUTE  : '/products',
    PRODUCT_PAGE:'/products/:id',
    SEARCH_RESULT:'/search/:query',
    DASHBOARD:'/dashboard',
    DASHBOARD_LOGIN:'/dashboard/login',
    DASHBOARD_CATEGORIES:'/dashboard/categories',
    DASHBOARD_ADD_CATEGORIES:'/dashboard/categories/add',
    DASHBOARD_EDIT_CATEGORIES:'/dashboard/categories/edit/:id',
    DASHBOARD_CATEGORY:'/dashboard/categories/:id',
    DASHBOARD_PRODUCTS:'/dashboard/products',
    DASHBOARD_ADD_PRODUCTS:'/dashboard/products/add',
    DASHBOARD_EDIT_PRODUCTS:'/dashboard/products/edit/:id',
    // LOGIN_ROUTE: '/login',
    // ADMIN_ROUTE : '/admin',
}

export const routes = [
    {
        path:paths.MAIN_ROUTE,
        Component:MainPage
    },
    {
        path:paths.CATEGORIES_ROUTE,
        Component:Categories
    },
    {
        path:paths.CATEGORY_ROUTE,
        Component:Category
    },
    {
        path:paths.ABOUT_ROUTE,
        Component:About
    },
    {
        path:paths.CONTACTS,
        Component:Contacts
    },
    {
        path:paths.MONTAGE,
        Component:Montage
    },
    {
        path:paths.PARTNERS,
        Component:Partners
    },
    {
        path:paths.PRODUCT_PAGE,
        Component:ProductPage
    },
    {
        path:paths.SEARCH_RESULT,
        Component:SearchResult
    },
    {
        path: paths.DASHBOARD_LOGIN,
        Component:Login
    },
    {
        path:paths.DASHBOARD_CATEGORIES,
        Component:DashboardCategories
    },
    {
        path:paths.DASHBOARD_CATEGORY,
        Component:DashboardCategory
    },
    {
        path:paths.DASHBOARD_PRODUCTS,
        Component:DashboardProducts
    },
    {
        path:paths.DASHBOARD_ADD_CATEGORIES,
        Component:AddCategory
    },
    {
        path:paths.DASHBOARD_ADD_PRODUCTS,
        Component:AddProduct
    },
    {
        path:paths.DASHBOARD_EDIT_CATEGORIES,
        Component:EditCategory
    },
    {
        path:paths.DASHBOARD_EDIT_PRODUCTS,
        Component:EditProduct
    }
]


export const navigates = [
    {
        path:paths.MAIN_ROUTE,
        label:'Главная',
        code:0
    },
    {
        path:paths.CATEGORIES_ROUTE,
        label:'Каталог',
        code:1
    },
    {
        path:paths.ABOUT_ROUTE,
        label:'О компании',
        code:2
    },
    // {
    //     path:paths.CONTACTS,
    //     label:'Контакты',
    //     code:3
    // },
    {
        path:paths.MONTAGE,
        label:'Монтаж',
        code:4
    },
    {
        path:paths.PARTNERS,
        label:'Партнеры',
        code:5
    },
]