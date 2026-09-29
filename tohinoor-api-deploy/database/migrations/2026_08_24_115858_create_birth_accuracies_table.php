<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('birth_accuracies', function (Blueprint $table) {
            $table->id();

            $table->string('code', 5)->unique();
            $table->string('name', 100);
            $table->string('name_eng', 100)->unique();
            $table->text('description')->nullable();

            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('birth_accuracies');
    }
};
