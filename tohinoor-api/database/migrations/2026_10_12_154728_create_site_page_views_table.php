<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('site_page_views', function (Blueprint $table) {
            $table->id();

            // مسیر صفحه بازدیدشده
            $table->string('path', 255);

            // هش شناسه ناشناس مرورگر
            $table->char('visitor_hash', 64);

            $table->timestamps();

            // بهینه‌سازی گزارش بازدیدکنندگان یکتا
            $table->index(['created_at', 'visitor_hash']);

            // بهینه‌سازی گزارش صفحات پربازدید
            $table->index(['created_at', 'path']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('site_page_views');
    }
};
