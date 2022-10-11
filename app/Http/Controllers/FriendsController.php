<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Conversation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FriendsController extends Controller
{
    public function index(){
        $user = Auth::user();
        $friends = User::where('id','!=',$user->id)
        ->where('name','like','%'.request()->name.'%')
        ->with('conversations')->orderBy('name')->paginate();
        // $conversation = $friends->conversations;
        // $countConversation = Conversation::count();

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


        return $friends;


    }

    public function search(){
        $user = Auth::user();
        $friends = User::where('id','!=',$user->id)->orWhere('name','like','%'.request()->name.'%')->with('conversations')->orderBy('name')->paginate();
        return $friends;
    }



}
