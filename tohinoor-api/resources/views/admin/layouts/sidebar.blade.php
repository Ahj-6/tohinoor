<aside class="app-sidebar bg-body-secondary shadow" data-bs-theme="dark">

    <div class="sidebar-brand">

        <a href="{{ route('admin.dashboard') }}" class="brand-link">

            <span class="brand-text fw-light">
                COOPAN ADMIN
            </span>

        </a>

    </div>

    <div class="sidebar-wrapper">

        <nav class="mt-2">

            <ul class="nav sidebar-menu flex-column" data-lte-toggle="treeview" role="menu">

                {{-- Dashboard --}}
                <li class="nav-item">

                    <a href="{{ route('admin.dashboard') }}"
                        class="nav-link {{ request()->routeIs('admin.dashboard') ? 'active' : '' }}">

                        <i class="nav-icon bi bi-speedometer2"></i>

                        <p>
                            داشبورد
                        </p>

                    </a>

                </li>

                {{-- Products --}}
                <li class="nav-item">
                    <a href="{{ route('admin.products.index') }}"
                        class="nav-link"  {{ request()->routeIs('admin.products.*') ? 'active' : '' }}">
                        <i class="nav-icon bi bi-box-seam"></i>
                        <p>محصولات</p>
                    </a>
                </li>

                {{-- Categories --}}
                <li class="nav-item">
                    <a href="{{ route('admin.categories.index') }}"
                        class="nav-link {{ request()->routeIs('admin.categories.*') ? 'active' : '' }}">
                        <i class="nav-icon bi bi-tags"></i>
                        <p>
                            دسته‌بندی‌ها
                        </p>
                    </a>
                </li>

                {{-- Package Types --}}
                <li class="nav-item">

                    <a href="{{ route('admin.package-types.index') }}"
                        class="nav-link {{ request()->routeIs('admin.package-types.*') ? 'active' : '' }}">

                        <i class="nav-icon bi bi-boxes"></i>

                        <p>
                            انواع بسته‌بندی
                        </p>

                    </a>

                </li>

                {{-- Shapes --}}
                <li class="nav-item">

                    <a href="{{ route('admin.shapes.index') }}"
                        class="nav-link {{ request()->routeIs('admin.shapes.*') ? 'active' : '' }}">

                        <i class="nav-icon bi bi-grid-3x3-gap"></i>

                        <p>
                            انواع فرم
                        </p>

                    </a>

                </li>

                {{-- Sales Types --}}
                <li class="nav-item">

                    <a href="{{ route('admin.sales-types.index') }}"
                        class="nav-link {{ request()->routeIs('admin.sales-types.*') ? 'active' : '' }}">

                        <i class="nav-icon bi bi-shop"></i>

                        <p>
                            انواع فروش
                        </p>

                    </a>

                </li>
            </ul>

        </nav>

    </div>

</aside>
