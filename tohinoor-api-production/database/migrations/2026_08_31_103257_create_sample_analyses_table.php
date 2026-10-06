<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sample_analyses', function (Blueprint $table) {
            $table->id();

            $table->string('title', 255);

            $table->foreignId('person_id')
                ->constrained('people');

            $table->foreignId('user_id')
                ->constrained('users');

            $table->string('pdf', 255);

            $table->longText('description')->nullable();

            $table->smallInteger('display_order')
                ->default(0);

            $table->boolean('status')
                ->default(true);

            $table->timestamps();
            $table->softDeletes();

            $table->index('person_id');
            $table->index('user_id');
            $table->index('display_order');
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sample_analyses');
    }
};
