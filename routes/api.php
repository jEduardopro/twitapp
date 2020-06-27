<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Symfony\Component\Process\Process;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('webhook/github', function () {
//   return response()->json(["path"=>base_path()]);
    $githubPayload = request()->getContent();
    $githubHash = request()->header('X-Hub-Signature');

    $localToken = config('app.webhook_secret');
    $localHash = 'sha1=' . hash_hmac('sha1', $githubPayload, $localToken, false);

    // $data = json_encode(request()->all());
    // file_put_contents(public_path() . '/webhooks/' . time() . '.json', $data);

    if (hash_equals($githubHash, $localHash)) {
        try {
            $process = new Process(['pull.sh']);
            $process->run();
            return response()->json(true);
        } catch (\Throwable $th) {
            return response(['message_error' => $th->getMessage(), 'code' => $th->getCode()], 422);
        }
    } else {
        return response()->json(false, 401);
    }
});
