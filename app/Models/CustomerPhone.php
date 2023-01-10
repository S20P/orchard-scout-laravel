<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Auth, DB; 
use Carbon\Carbon;
use Illuminate\Database\Eloquent\SoftDeletes;

class CustomerPhone extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    use SoftDeletes;

    protected $table = 'customer_phones';
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'customer_id',
        'phone_id',
        'phone_type_id',
    ];

    protected $dates = ['deleted_at'];
    
    protected $appends = [
        'phone_type_name',
    ];

    public function hasPhone()
    {
        return $this->hasOne(Phone::class,'id','phone_id');
    }
    

    public function getPhoneTypeNameAttribute($id)
    {
        $phone_type=PhoneType::where('id',$this->phone_type_id)->first();
        if($phone_type!=null && !empty($phone_type))
        {
            return $phone_type->name;
        }
        else
        {
            return '-';
        }
    }
}
