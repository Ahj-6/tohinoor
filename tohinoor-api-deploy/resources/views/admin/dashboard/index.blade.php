@extends('admin.layouts.app')

@section('title', 'داشبورد | کوپان')

@section('content')

    <div class="app-content">

        <div class="container-fluid py-4">

            <div class="row mb-4">

                <div class="col-12">

                    <h1 class="mb-0">
                        داشبورد
                    </h1>

                </div>

            </div>


            <div class="row">

                {{-- Products --}}
                <div class="col-lg-3 col-md-6 mb-3">

                    <div class="small-box text-bg-secondary">

                        <div class="inner">

                            <h3>{{ $categoriesCount }}</h3>

                            <p>
                                دسته‌بندی‌ها
                            </p>

                        </div>

                        <div class="small-box-icon">
                            <i class="bi bi-tags"></i>
                        </div>

                    </div>

                </div>


                {{-- Categories --}}
                <div class="col-lg-3 col-md-6 mb-3">

                    <div class="small-box text-bg-success">

                        <div class="inner">

                            <h3>{{ $packageTypesCount }}</h3>

                            <p>
                                انواع بسته‌بندی
                            </p>

                        </div>

                        <div class="small-box-icon">
                            <i class="bi bi-boxes"></i>
                        </div>

                    </div>

                </div>


                {{-- Shape Types --}}
                <div class="col-lg-3 col-md-6 mb-3">

                    <div class="small-box text-bg-warning">

                        <div class="inner" style="color: white">

                            <h3>{{ $shapesCount }}</h3>

                            <p>
                                انواع فرم
                            </p>

                        </div>

                        <div class="small-box-icon">
                            <i class="bi bi-grid-3x3-gap"></i>
                        </div>

                    </div>

                </div>


                {{-- Sales Types --}}
                <div class="col-lg-3 col-md-6 mb-3">

                    <div class="small-box text-bg-danger">

                        <div class="inner">

                            <h3>{{ $saleTypesCount }}</h3>

                            <p>
                                انواع فروش
                            </p>

                        </div>

                        <div class="small-box-icon">
                            <i class="bi bi-shop"></i>
                        </div>

                    </div>

                </div>

                {{-- Products --}}
                <div class="col-lg-12 col-md-12 mb-3">

                    <div class="small-box text-bg-primary">

                        <div class="inner">

                            <h3>{{ $productVariantsCount }}</h3>

                            <p>
                                محصولات
                            </p>

                        </div>

                        <div class="small-box-icon">
                            <i class="bi bi-box-seam"></i>
                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>

@endsection
