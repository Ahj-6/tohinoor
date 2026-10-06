<nav class="app-header navbar navbar-expand bg-body">

    <div class="container-fluid">

        {{-- Sidebar Toggle --}}
        <ul class="navbar-nav">

            <li class="nav-item">
                <a
                    class="nav-link"
                    data-lte-toggle="sidebar"
                    href="#"
                    role="button"
                >
                    <i class="bi bi-list"></i>
                </a>
            </li>

        </ul>


        {{-- Admin Title --}}
        <ul class="navbar-nav me-auto">

            <li class="nav-item">
                <span class="nav-link">
                    ادمین پنل مدیریت کوپان
                </span>
            </li>


            {{-- User Menu --}}
            <li class="nav-item dropdown">

                <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <i class="bi bi-person-circle me-1"></i>

                    {{ Auth::user()->name }}
                </a>

                <ul class="dropdown-menu dropdown-menu-end">

                    <li>
                        <span class="dropdown-item-text text-muted">
                            {{ Auth::user()->email }}
                        </span>
                    </li>

                    <li>
                        <hr class="dropdown-divider">
                    </li>

                    <li>
                        <form
                            method="POST"
                            action="{{ route('logout') }}"
                        >
                            @csrf

                            <button
                                type="submit"
                                class="dropdown-item text-danger"
                            >
                                <i class="bi bi-box-arrow-right me-2"></i>
                                خروج از حساب
                            </button>
                        </form>
                    </li>

                </ul>

            </li>

        </ul>

    </div>

</nav>
