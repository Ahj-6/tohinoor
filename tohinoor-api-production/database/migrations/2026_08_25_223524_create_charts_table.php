<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('charts', function (Blueprint $table) {
            $table->id();

            $table->foreignId('person_id')
                ->constrained('people');

            $table->foreignId('chart_type_id')
                ->constrained('chart_types');

            $table->string('image', 255);

            $table->timestamps();
            $table->softDeletes();

            $table->unique(['person_id', 'chart_type_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('charts');
    }
};
