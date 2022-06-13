import HomePage from '../giangvien';
import DonVI from '../donvi';
import ChuyenMon from '../chuyenmon';
import Nhiemvu from '../nhiemvu';
import Nghiepvu from '../nghiepvu';
import PhongBan from '../phongban';
import Daotao from '../daotao';
import Report from "../report";
import Trinhdo from "../report/trinhdo";
import Trinhdonangcao from "../report/trinhdonangcao";
import Danhgia from "../report/danhgia";
import Dtbd from "../report/dtbd";
import Sinhvien from "../sinhvien";
import Khoadaotao from "../khoadaotao";
import Canbo from "../canbo";
// import UserPage from '../user';
// import RolePage from '../role';
// import LoginPage from '../account/login';
// import LogoutPage from '../account/logout';
// import ResetPasswordPage from '../account/reset-password';
// import AccountPage from '../account';
// import OptionPage from '../option';
// import LogPage from '../logs';


export default {
    home: {
        path: '/',
        exact: true,
        title: 'Giảng viên',
        component: HomePage,
    },
    report: {
        path: '/report',
        exact: true,
        title: 'Báo cáo',
        component: Report,
    },
    Trinhdo: {
        path: '/trinhdo',
        exact: true,
        title: 'Trình độ',
        component: Trinhdo,
    },
    Trinhdonangcao: {
        path: '/trinhdonangcao',
        exact: true,
        title: 'Trình độ nâng cao',
        component: Trinhdonangcao,
    },
    giangvien: {
        path: '/giangvien',
        exact: true,
        title: 'Giảng viên',
        component: HomePage,
    },
    donvi: {
        path: '/donvi',
        exact: true,
        title: 'Đơn vị',
        component: DonVI,
    },
    Nhiemvu: {
        path: '/nhiemvu',
        exact: true,
        title: 'Nhiệm vụ',
        component: Nhiemvu,
    },
    chuyenmon: {
        path: '/chuyenmon',
        exact: true,
        title: 'Chuyên môn',
        component: ChuyenMon,
    },
    Nghiepvu: {
        path: '/nghiepvu',
        exact: true,
        title: 'Nghiệp vụ',
        component: Nghiepvu,
    },
    PhongBan: {
        path: '/phongban',
        exact: true,
        title: 'Phòng ban',
        component: PhongBan,
    },
    DaoTao: {
        path: '/daotao',
        exact: true,
        title: 'Khóa đào tạo',
        component: Daotao,
    },
    Danhgia: {
        path: '/danhgia',
        exact: true,
        title: 'Đánh giá',
        component: Danhgia,
    },
    dtbd: {
        path: '/dtbd',
        exact: true,
        title: 'Kết quả đào tạo',
        component: Dtbd,
    },
    sinhvien: {
        path: '/sinhvien',
        exact: true,
        title: 'Sinh viên',
        component: Sinhvien,
    },
    khoa: {
        path: '/khoa',
        exact: true,
        title: 'Khoa đào tạo',
        component: Khoadaotao,
    },
    canbo: {
        path: '/canbo',
        exact: true,
        title: 'Cán bộ',
        component: Canbo,
    },

    // login: {
    //     path: '/login',
    //     title: 'Đăng nhập',
    //     component: LoginPage,
    //     noLayout: true,
    // },
    // logout: {
    //     path: '/logout',
    //     title: 'Đăng xuất',
    //     component: LogoutPage,
    //     noLayout: true,
    // },
    // reset: {
    //     path: '/reset-password',
    //     title: 'Khôi phục mật khẩu',
    //     component: ResetPasswordPage,
    //     noLayout: true,
    //     role: "Administrators"
    // },
    // account: {
    //     path: '/account',
    //     title: 'Tài khoản',
    //     component: AccountPage
    // },
    // user: {
    //     path: '/users',
    //     title: 'Người dùng',
    //     component: UserPage,
    //     role: "Administrators"
    // },
    // role: {
    //     path: '/roles',
    //     title: 'Quyền',
    //     component: RolePage,
    //     role: "Administrators"
    // },
    // option: {
    //     path: '/options',
    //     title: 'Thiết lập',
    //     component: OptionPage,
    //     role: "Administrators"
    // },
    // log: {
    //     path: '/logs',
    //     title: 'Log',
    //     component: LogPage,
    //     role: "Administrators"
    // }
}