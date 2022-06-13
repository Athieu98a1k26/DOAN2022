import qs from "qs";
import React from "react";
import { Redirect, Route, Routes, Switch, Link } from "react-router-dom";
import * as actions from "../../actions/account";
import * as appActions from '../../actions/app';
import { connect, Context as HttpContext } from "../../lib/connect";
import ErrorPage from "./error";
// import Footer from './footer';
import Header1 from './header';
// import SidebarMenu from './menu';
import NotFoundPage from "./notfound";
import routes from "./routes";
import { Layout, Menu, Breadcrumb } from 'antd';
import SplashPage from "./splash";

const { Header, Content, Footer } = Layout;

class LayoutPage extends React.Component {
  constructor(props) {
    super(props);
    const { location } = this.props;
    const options = qs.parse(location.search.replace("?", ""));

    this.state = {
      loaded: props.account.loaded,
      networkError: null,
      mobileSidebarOpen: false,
      search:
        !!options.keyword == true && location.pathname == "/search"
          ? options.keyword
          : "",
    };

    this.routes = Object.values(routes);
  }

  componentDidMount() {
    // this.props.actions.getEnums();
    // this.props.actions.getOptions();
    this.props.actions.getToken();
  }

  componentDidUpdate(preProps) {
    if (
      !this.props.account.loggedIn &&
      // this.props.account?.loaded &&
      this.props.account.token
    ) {
      if (!this.loadingAccount) {
        this.loadingAccount = true;
        this.props.actions
          .getProfile()
          .then(() => {
            this.props.actions.getOptions();
            this.loadingAccount = false;
          })
          .catch((error) => {
            if (error.status == 401 || error.status == 400) {
              this.props.actions.logout();
            } else {
              this.setState({ networkError: error });
            }
            this.loadingAccount = false;
          });
      }
    }
  }

  toggleMobileSidebar = () => {
    this.setState({ mobileSidebarOpen: !this.state.mobileSidebarOpen });
  };

  render() {
    // return (
    //   <div className="content__page">
    //     <Header
    //       history={history}
    //       onSearch={search => this.setState({ search })}
    //       location={location}
    //       toggleSidebar={this.toggleMobileSidebar}
    //       mobileSidebarOpen={this.state.mobileSidebarOpen}
    //     />
    //     <GiangVien />

    //   </div>
    // );


    const notfound = {
      component: NotFoundPage,
      title: "Not found",
    };

    return (
      <Switch>
        {this.routes.map(({ path, exact, ...layoutProps }) => (
          <Route
            key={path}
            path={path}
            exact={exact}
            render={(props) => this.renderPage(layoutProps, props)}
          />
        ))}
        <Route render={(props) => this.renderPage(notfound, props)} />
      </Switch>
    );
  }

  renderPage = (
    { component, noLayout, noSidebar, title, cap, role, allowAnonymous },
    routeProps
  ) => {
    document.title = title;

    component = React.createElement(component, {
      ...routeProps,
    });

    if (
      (this.props.account.token && !this.props.account.loggedIn && !this.props.account.user)
    ) {
      if (location.pathname == "/login") {
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: location.pathname,
                search: location.search,
              },
            }}
          />
        );
      }
    }

    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
          >
            <Menu.Item>
              <Link to='/khoa'>Khoa đào tạo</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to='/canbo'>Cán bộ</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to='/'>Giảng viên</Link>
            </Menu.Item>

            <Menu.Item>
              <Link to='/sinhvien'>Sinh viên</Link>
            </Menu.Item>

            <Menu.Item>
              <Link to='/donvi'>Đơn vị</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to='/chuyenmon'>Chuyên môn</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to='/nhiemvu'>Học hàm</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to='/nghiepvu'>Mức đánh giá</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to='/phongban'>Phòng ban</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to='/daotao'>Khóa đào tạo</Link>
            </Menu.Item>
            <Menu.SubMenu title="Báo cáo">
              <Menu.Item>
                <Link to='/report'>CBQL</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to='/trinhdo'>Trình độ GV</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to='/trinhdonangcao'>Trình độ nâng cao</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to='/danhgia'>Đánh giá</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to='/dtbd'>Kết quả đào tạo bồi dưỡng</Link>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.Item>
              <Link to='/logout'>Đăng xuất</Link>
            </Menu.Item>

          </Menu>

        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div style={{ margin: '16px 0' }}>
          </div>
          <div className="site-layout-content">
            <div className="content__page">
              <div>{component}</div>
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>QLCB Design ©2022 Created by me</Footer>
      </Layout>
    );

    return (
      <main className="main">


        <section className={`content ${noSidebar ? "content--full" : ""}`}>

          <div className="content__page">
            <Header
              history={history}
              onSearch={search => this.setState({ search })}
              location={location}
              toggleSidebar={this.toggleMobileSidebar}
              mobileSidebarOpen={this.state.mobileSidebarOpen}
            />
            <div>{component}</div>
          </div>
        </section>
      </main>
    );
  };
}

const LayoutWrap = connect(
  LayoutPage,
  (state) => ({
    account: state.account,
    app: state.app,
  }),
  { ...actions }
);

export default (props) => (
  <HttpContext {...props}>
    <LayoutWrap {...props} />
  </HttpContext>
);
