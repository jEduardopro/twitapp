@extends('layouts.app')

@section('content')
    <router-view :user_authenticated="{{auth()->user()}}"></router-view>
@endsection
