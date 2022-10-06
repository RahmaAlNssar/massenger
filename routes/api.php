<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function(){
    Route::post('message',[App\Http\Controllers\MessagesController::class,'store'])->name('api.message.store');
    Route::delete('message/{id}',[App\Http\Controllers\MessagesController::class,'destroy']);
    Route::get('convrsation/{conversation}',[App\Http\Controllers\ConversationsController::class,'show']);
    Route::post('conversation/{conversation}/participient',[App\Http\Controllers\ConversationsController::class,'addParticients']);
    Route::delete('participient/{conversation}',[App\Http\Controllers\ConversationsController::class,'removeParticients']);
    Route::get('convrsations',[App\Http\Controllers\ConversationsController::class,'index']);
    Route::get('/convrsations/{id}/messages', [App\Http\Controllers\MessagesController::class,'index']);
});
Route::post('/login',function(){
    request()->validate([
        'email' => 'required|email',
        'password' => 'required',
   
     ]);

     $user = User::where('email', request()->email)->first();

     if (!$user || !Hash::check(request()->password, $user->password)) {
        return response('Login invalid', 503);
     }

     return $user->createToken(request()->password)->plainTextToken;
  
});

