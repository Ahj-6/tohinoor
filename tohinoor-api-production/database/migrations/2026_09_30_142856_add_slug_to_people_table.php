<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('people', function (Blueprint $table) {
            $table->string('slug', 180)
                ->nullable()
                ->after('name_eng');
        });

        $usedSlugs = [];

        DB::table('people')
            ->select('id', 'name_eng')
            ->orderBy('id')
            ->each(function ($person) use (&$usedSlugs) {
                $baseSlug = Str::slug($person->name_eng);

                if ($baseSlug === '') {
                    $baseSlug = 'person-' . $person->id;
                }

                $slug = $baseSlug;
                $counter = 2;

                while (isset($usedSlugs[$slug])) {
                    $slug = $baseSlug . '-' . $counter;
                    $counter++;
                }

                $usedSlugs[$slug] = true;

                DB::table('people')
                    ->where('id', $person->id)
                    ->update([
                        'slug' => $slug,
                    ]);
            });

        Schema::table('people', function (Blueprint $table) {
            $table->string('slug', 180)
                ->nullable(false)
                ->change();

            $table->unique('slug');
        });
    }

    public function down(): void
    {
        Schema::table('people', function (Blueprint $table) {
            $table->dropUnique(['slug']);
            $table->dropColumn('slug');
        });
    }
};
