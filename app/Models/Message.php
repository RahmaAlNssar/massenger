<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Message extends Model
{
    use HasFactory,SoftDeletes;

    protected $fillable =['user_id','conversation_id','body','type','read_at'];

    public function user()
    {
         return $this->belongsTo(User::class);
   }

   public function conversation()
    {
         return $this->belongsTo(Conversation::class);
   }

   public function recipients()
   {
        return $this->belongsToMany(User::class, 'recipients')->withPivot(['read_at','deleted_at']);
  }
}
