@extends('admin.layouts.app')

@section('title', 'دسترسی غیرمجاز')

@section('content')

    <div class="app-content">

        <div class="container-fluid">

            <div class="row justify-content-center">

                <div class="col-12 col-md-8 col-lg-6">

                    <div class="card card-danger card-outline text-center mt-5">

                        <div class="card-body py-5">

                            <div class="mb-4">
                                <i
                                    class="bi bi-shield-lock-fill text-danger"
                                    style="font-size: 4rem;"
                                ></i>
                            </div>

                            <h1 class="display-6 fw-bold mb-3">
                                دسترسی غیرمجاز
                            </h1>

                            <p class="text-muted mb-4">
                                شما اجازه دسترسی به این بخش را ندارید.
                            </p>

                            <a
                                href="{{ route('admin.dashboard') }}"
                                class="btn btn-danger"
                            >
                                <i class="bi bi-house-door me-1"></i>
                                بازگشت به داشبورد
                            </a>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>

@endsection
