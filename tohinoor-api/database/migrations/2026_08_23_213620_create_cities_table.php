<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cities', function (Blueprint $table) {
            $table->id();

            $table->foreignId('country_id')
                ->constrained('countries');

            $table->string('name', 100);
            $table->string('name_eng', 100);

            $table->decimal('latitude', 10, 7);
            $table->decimal('longitude', 10, 7);

            $table->timestamps();
            $table->softDeletes();

            $table->unique(['country_id', 'name_eng']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cities');
    }
};
