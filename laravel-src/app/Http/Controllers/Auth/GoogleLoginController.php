<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class GoogleLoginController extends Controller
{
    /**
     * Socialiteによる Google OAuthの認証画面の生成 TODO:関数名
     * @return \Illuminate\Http\RedirectResponse|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function getGoogleAuth()
    {
        return Socialite::driver('google')->redirect();
    }
    /**
     * Google OAuthのログイン 認証成功 ハンドリング
     * @return \Illuminate\Http\RedirectResponse|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function authGoogleCallback()
    {
        // Socialiteによる Google OAuthの結果解析 (ユーザー情報取得)
        $googleUser = Socialite::driver('google')->stateless()->user();
        // Google 認証でのメアドの人
        $user = User::where(['email' => $googleUser->email])->first();
        // 見つからない => 401
        if (is_null($user)) return redirect(route('login'), 401);
        // 認証
        Auth::login($user, true);
        // 認証後の画面へ
        return redirect(route('dashboard'));
    }
}
