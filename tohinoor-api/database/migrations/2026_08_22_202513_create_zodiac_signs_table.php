<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('zodiac_signs', function (Blueprint $table) {
            $table->id();

            $table->string('name', 20);
            $table->string('name_eng', 20)->unique();
            $table->string('name_arabic', 20)->nullable();
            $table->string('name_sanskrit', 20)->nullable();

            $table->string('image', 255)->nullable();
            $table->string('icon', 255)->nullable();
            $table->string('symbol', 255);

            $table->foreignId('planet_id')
                ->constrained('planets');

            $table->foreignId('element_id')
                ->constrained('elements');

            $table->foreignId('quality_id')
                ->constrained('qualities');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('zodiac_signs');
    }
};
