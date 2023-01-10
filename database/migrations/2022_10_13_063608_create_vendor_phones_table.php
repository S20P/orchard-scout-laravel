<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vendor_phones', function (Blueprint $table) {
            $table->id();
            $table->integer('vendor_id')->unsigned();
            $table->integer('phone_id')->unsigned();
            $table->integer('phone_type_id')->unsigned()->nullable(true);
            $table->foreign('vendor_id')->references('id')->on('vendors')->onDelete('RESTRICT')->onUpdate('cascade');
            $table->foreign('phone_id')->references('id')->on('phones')->onDelete('RESTRICT')->onUpdate('cascade');
            $table->foreign('phone_type_id')->references('id')->on('phone_types')->onDelete('RESTRICT')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('vendor_phones');
    }
};
