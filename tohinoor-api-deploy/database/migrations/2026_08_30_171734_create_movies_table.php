<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('movies', function (Blueprint $table) {
            $table->id();

            $table->string('name', 255);
            $table->string('name_eng', 255)->nullable();
            $table->string('director', 150)->nullable();
            $table->year('release_year')->nullable();
            $table->string('image', 255)->nullable();
            $table->longText('description')->nullable();

            $table->smallInteger('display_order')->default(0);
            $table->boolean('status')->default(true);

            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('movies');
    }
};
