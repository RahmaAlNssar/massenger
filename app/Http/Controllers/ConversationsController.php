<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Conversation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class ConversationsController extends Controller
{
    public function index(){
        $user = Auth::user();
     $conversations =   $user->conversations()->with(['lastMessage','participients'=>function($builder) use($user){
        $builder->where('id','!=',$user->id);
    }
    // ,'messages'=>function($builder) use($user){
    //     $builder->whereNull('read_at')->where('user_id','!=',$user->id);
    // }
    ])


    ->paginate();
    $message = 0;
    foreach($conversations as $conversation){
        $conversation_message = $conversation->messages()->where("user_id","!=",$user->id)->get();
        foreach($conversation_message as $message){
           $message = $message->whereHas("recipients",function($builder) use($user){
                $builder->whereNull("read_at")->where("user_id","!=",$user->id);
            })->count();

        }
    }

    return ['conversations'=>$conversations,'message'=>$message];
    }

    public function show(Conversation $conversation){
       return $conversation->load('participients');
    }

    public function addParticients(Conversation $conversation,Request $request){
        $request->validate([
            'user_id'=>['int','exists:users,id','required']
        ]);
        $conversation->participients()->attach($request->user_id,['joined_at'=>now()]);
    }

    public function removeParticients(Conversation $conversation,Request $request){
        $request->validate([
            'user_id'=>['int','exists:users,id','required']
        ]);
        $conversation->participients()->detach($request->user_id);
    }


}
