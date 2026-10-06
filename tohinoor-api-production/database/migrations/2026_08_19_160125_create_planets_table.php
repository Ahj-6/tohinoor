<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('planets', function (Blueprint $table) {
            $table->id();

            $table->string('name', 20);
            $table->string('name_eng', 20)->unique();
            $table->string('name_arabic', 20)->nullable();
            $table->string('name_sanskrit', 20)->nullable();

            $table->string('image', 255)->nullable();
            $table->string('icon', 255)->nullable();
            $table->string('symbol', 255);

            $table->foreignId('nature_id')
                ->nullable()
                ->constrained('natures');

            $table->foreignId('guna_1_id')
                ->nullable()
                ->constrained('gunas');

            $table->foreignId('guna_2_id')
                ->nullable()
                ->constrained('gunas');

            $table->foreignId('element_1_id')
                ->nullable()
                ->constrained('elements');

            $table->foreignId('element_2_id')
                ->nullable()
                ->constrained('elements');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('planets');
    }
};
