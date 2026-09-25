// import { Outlet } from 'react-router-dom';
// import Sidebar from '../components/admin/Sidebar.jsx';
// import Header from '../components/admin/Header.jsx';

// export default function AdminLayout() {
//   return (
//     <div className="app-wrapper">
//       <Header />
//       <Sidebar />

//       <main className="app-main">
//         <div className="app-content">
//           <div className="container-fluid py-3">
//             <Outlet />
//           </div>
//         </div>
//       </main>

//       <footer className="app-footer">
//         <strong>Tohinoor Admin</strong>
//         <span className="ms-1">پنل مدیریت</span>
//       </footer>
//     </div>
//   );
// }

import { Outlet } from 'react-router-dom';

import Header from '../components/admin/Header.jsx';
import Sidebar from '../components/admin/Sidebar.jsx';

export default function AdminLayout() {
    return (
        <div className="app-wrapper">
            <Header />
            <Sidebar />

            <main className="app-main">
                <div className="app-content">
                    <div className="container-fluid">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
}