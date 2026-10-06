<!doctype html>
<html lang="fa" dir="rtl">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>@yield('title', 'پنل مدیریت کوپان')</title>

    {{-- Fonts --}}
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fontsource/source-sans-3@5.0.12/index.css">

    {{-- OverlayScrollbars --}}
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/overlayscrollbars@2.10.1/styles/overlayscrollbars.min.css">

    {{-- Bootstrap Icons --}}
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

    {{-- AdminLTE RTL --}}
    <link rel="stylesheet" href="{{ asset('adminlte/css/adminlte.rtl.css') }}">
    <link rel="stylesheet" href="{{ asset('adminlte/css/style.css') }}">

    @stack('styles')
</head>

<body class="layout-fixed sidebar-expand-lg bg-body-tertiary">

    <div class="app-wrapper">

        @include('admin.layouts.header')

        @include('admin.layouts.sidebar')

        <main class="app-main">

            @yield('content')

        </main>

    </div>

    {{-- OverlayScrollbars --}}
    <script src="https://cdn.jsdelivr.net/npm/overlayscrollbars@2.10.1/browser/overlayscrollbars.browser.es6.min.js">
    </script>

    {{-- Popper --}}
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"></script>

    {{-- Bootstrap --}}
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js"></script>

    {{-- AdminLTE --}}
    <script src="{{ asset('adminlte/js/adminlte.js') }}"></script>

    @stack('scripts')

</body>

</html>
