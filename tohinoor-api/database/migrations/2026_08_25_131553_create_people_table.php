<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('people', function (Blueprint $table) {
            $table->id();

            $table->string('name', 150);
            $table->string('name_eng', 150);

            $table->string('image', 255)->nullable();

            $table->foreignId('gender_id')
                ->nullable()
                ->constrained('genders');

            $table->date('birth_date')->nullable();
            $table->time('birth_time')->nullable();

            $table->foreignId('country_id')
                ->nullable()
                ->constrained('countries');

            $table->foreignId('city_id')
                ->nullable()
                ->constrained('cities');

            $table->string('time_zone', 255)->nullable();

            $table->foreignId('zodiac_sign_id')
                ->nullable()
                ->constrained('zodiac_signs');

            $table->foreignId('birth_accuracy_id')
                ->nullable()
                ->constrained('birth_accuracies');

            $table->longText('biography')->nullable();
            $table->string('wikipedia_url', 255)->nullable();

            $table->boolean('status')->default(true);

            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('people');
    }
};
