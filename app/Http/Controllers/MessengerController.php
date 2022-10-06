<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Conversation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessengerController extends Controller
{
    public function index($id = null){
        $user = Auth::user();
        $friends = User::where('id','!=',$user->id)->orderBy('name')->paginate();
        // $chats = $user->conversations()->with(['lastMessage','participients'=>function($builder) use($user){
        //     $builder->where('id','!=',$user->id);
        // }])->get();
        // $messages = [];
        // $chat = new Conversation();
        // $other_user = '';
        // if($id){
        //     $chat = $chats->where('id',$id)->first();
        //     if($chat){
        //         $messages = $chat->messages()->with('user')->paginate();
        //         $other_user =  $chat->participients()->where("user_id",'!=',$user->id)->first();
        //     }
         
        // }
  
        return view('messenger',[
            'friends'=>$friends,
            // 'chats'=>$chats,
            // 'chat'=>$chat,
            // 'other_user'=>$other_user,
            // 'messages'=>$messages
        ]);
    }
}
