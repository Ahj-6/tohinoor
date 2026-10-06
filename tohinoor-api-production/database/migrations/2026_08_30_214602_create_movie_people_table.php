<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('movie_people', function (Blueprint $table) {
            $table->id();

            $table->foreignId('movie_id')
                ->constrained('movies');

            $table->foreignId('person_id')
                ->constrained('people');

            $table->timestamps();

            $table->unique(['movie_id', 'person_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('movie_people');
    }
};
