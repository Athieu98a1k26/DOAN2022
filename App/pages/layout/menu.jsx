// import React from 'react';
// import { connect } from '../../lib/connect';
// import { toggleSidebar } from '../../actions/app';
// import { Link } from 'react-router-dom';
// import Icon from '../../controls/icon';
// import classnames from 'classnames';

// var menuItems = [
//     {
//         title: 'THIẾT LẬP',
//         subItems: [
//             {
//                 title: 'Người dùng',
//                 path: '/users',
//                 role: 'Administrators'
//             },
//             {
//                 title: 'Cài đặt chung',
//                 path: '/options',
//                 role: 'Administrators'
//             }
//         ],
//         icon: 'cogs',
//         role: 'Administrators'
//     }
// ]


// class SidebarMenu extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             hoverIndex: null,
//             toggleIndex: null,
//             bottom: null
//         }
//     }

//     componentDidMount() {
//         if (this.refs.scrollbar) {
//             $(this.refs.scrollbar).scrollbar().scrollLock();
//         }
//     }

//     onRequestClose = () => {
//         if (this.props.onRequestClose) {
//             this.props.onRequestClose();
//         }
//     }

//     handleToggleSub = (index) => {
//         this.setState({
//             toggleIndex: index
//         });
//     }

//     handleCloseSub = () => {
//         this.setState({
//             toggleIndex: null,
//             hoverIndex: null
//         })
//     }

//     isMatch = path => {
//         if (path == '/') {
//             return location.pathname == '/';
//         }
//         path = path.replace(/\/$/, '');
//         return location.pathname == path || location.pathname.indexOf(path + '/') == 0;
//     }

//     render() {
//         const mobileSidebarOpen = this.props.mobileSidebarOpen;

//         const sidebarClasses = classnames('sidebar main-sidebar', {
//             'toggled': mobileSidebarOpen
//         });

//         return (
//             <div className={sidebarClasses}>
//                 <div ref="scrollbar" className="scrollbar-inner">
//                     <ul className="navigation">
//                         {
//                             menuItems.map((menuItem, index) => {
//                                 if (menuItem.cap && !this.context.user.hasCap(menuItem.cap)) {
//                                     return null;
//                                 }
//                                 if (menuItem.role && !this.context.user.isInRole(menuItem.role)) {
//                                     return null;
//                                 }
//                                 if (menuItem.subItems) {
//                                     let items = menuItem.subItems.filter(item =>
//                                         (!item.cap || this.context.user.hasCap(item.cap)) &&
//                                         (!item.role || this.context.user.isInRole(item.role)));
//                                     if (items.length == 0) return null;

//                                     let hasActive = items.find(item => this.isMatch(item.path));

//                                     let classes = classnames('navigation__sub', {
//                                         'navigation__sub--active': hasActive,
//                                         'navigation__sub--toggled': hasActive || this.state.toggleIndex == index
//                                     });

//                                     return (
//                                         <li className={classes} key={index}>
//                                             <a onClick={() => this.handleToggleSub(index)}>
//                                                 <Icon name={menuItem.icon} />
//                                                 {menuItem.title}
//                                             </a>
//                                             <ul>
//                                                 {
//                                                     items.map((subItem, subIndex) => {
//                                                         let classes = this.isMatch(subItem.path) ? 'navigation__active' : '';
//                                                         return (
//                                                             <li key={subItem.path} className={classes}>
//                                                                 <Link to={subItem.path}>
//                                                                     <Icon name={subItem.icon} />
//                                                                     {subItem.title}
//                                                                 </Link>
//                                                             </li>
//                                                         );
//                                                     })
//                                                 }
//                                             </ul>
//                                         </li>
//                                     )
//                                 }
//                                 else if (menuItem.path) {
//                                     let classes = this.isMatch(menuItem.path) ? 'navigation__active' : '';
//                                     return (
//                                         <li key={menuItem.path} className={classes}>
//                                             <Link to={menuItem.path}>
//                                                 <Icon name={menuItem.icon} />
//                                                 {menuItem.title}
//                                             </Link>
//                                         </li>
//                                     );
//                                 }
//                             })
//                         }
//                     </ul>
//                 </div>
//             </div>
//         );
//     }
// }

// export default connect(SidebarMenu, state => ({
//     app: state.app
// }), { toggleSidebar });