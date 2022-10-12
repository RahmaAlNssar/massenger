<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Recipient;
use App\Models\Conversation;
use App\Models\Participient;
use Illuminate\Http\Request;
use App\Events\MessageCreated;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class MessagesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id = '')
    {

        $user = Auth::user();
       $conversation = $user->conversations()->with(['participients'=>function($builder) use($user){
        return $builder->where('user_id','!=',$user->id);
       }])->where('id',$id)->first();
       $countConversation = $user->conversations()->count();
       $messages = [];

       if($conversation){

        $messages = $conversation->messages()->with('user')->paginate();

        foreach($messages as $msg){

            $msg->update(['read_at'=>now()]);
            DB::table('recipients')->where('message_id',$msg->id)->update(['read_at'=>now()]);

        }


       }

       return [
        'conversation'=>$conversation,
        'messages'=>$messages,
        'countConversation'=>$countConversation
        ];


    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
       $request->validate([
        'message'=>['required','string'],
        'conversation_id'=>[
            Rule::requiredIf(function() use($request){
                return !$request->post('user_id');
            }),
            'int',
            'exists:conversations,id'],
        'user_id'=>[
            Rule::requiredIf(function() use($request){
                return !$request->post('conversation_id');
            }),
            'int',
            'exists:users,id']
       ]);
    //    $user = User::find(1);
    $user = Auth::user();
       $conversation_id = $request->post('conversation_id');

       $user_id = $request->post('user_id');

       DB::beginTransaction();
       try{



                if($conversation_id){
                    $conversation = $user->conversations()->findOrFail($conversation_id);
                }else{
                    $conversation = Conversation::where('type','peer')
                    ->whereHas('participients',function($builder) use($user_id,$user){
                    $builder->join('participients as participients2','participients2.conversation_id','=','participients.conversation_id')
                   ->where('participients.user_id','=',$user_id)
                   ->where('participients2.user_id','=',$user->id);
                })->first();

                }


                if(!$conversation){
                    $conversation = Conversation::create([
                        'user_id'=>$user->id,
                        'type'=>'peer',
                    ]);
                    $conversation->participients()->attach([
                        $user->id=>['joined_at'=>now()],
                        $user_id=>['joined_at'=>now()]
                    ]);
                }



           $message = $conversation->messages()->create([
            'user_id'=>$user->id,
            'body'=>$request->message
           ]);
           $conversation->update(['last_message_id'=>$message->id]);
           DB::statement('INSERT INTO recipients (user_id,message_id)
           SELECT user_id, ? FROM participients
           WHERE conversation_id = ?',[$message->id,$conversation->id]);

        DB::commit();

        broadcast(new MessageCreated($message));

       }catch(Throwable $e){
        DB::rollBcak();
        throw $e;
       }
       return $message->load(['user','recipients'=>function($builder) use($user){
        $builder->where('user_id','!=',$user->id)->whereNull('read_at')->count();
       }]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        DB::beginTransaction();
        try{
           $dd = auth()->user()->conversations()->where('id',$id)->messages()->recipients()->update(['read_at'=>now()]);
         DB::commit();
         }catch(Throwable $e){
        DB::rollBcak();
        throw $e;
       }
       return $dd;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Recipient::where([
            'user_id'=>2,
            'message_id'=>$id
        ])->delete();
    }

    public function updateRead($id){

            $user = Auth::user();
           $conversation = $user->conversations()->with(['participients'=>function($builder) use($user){
            return $builder->where('user_id','!=',$user->id);
           }])->where('id',$id)->first();

           if($conversation){

            $messages = $conversation->messages()->with('user')->paginate();

            foreach($messages as $msg){

                $msg->update(['read_at'=>now()]);
                DB::table('recipients')->where('message_id',$msg->id)->update(['read_at'=>now()]);

            }

           }


           return ['msg'=>"success"];


    }
}
