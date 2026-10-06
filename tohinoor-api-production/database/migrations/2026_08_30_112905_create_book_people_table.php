<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('book_people', function (Blueprint $table) {
            $table->id();

            $table->foreignId('book_id')
                ->constrained('books');

            $table->foreignId('person_id')
                ->constrained('people');

            $table->timestamps();

            $table->unique(['book_id', 'person_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('book_people');
    }
};
