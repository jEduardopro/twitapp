@extends('layouts.app')

@section('content')
    <router-view :user_authenticated="{{auth()->user()->with(['followers','following'])->first()}}"></router-view>
@endsection
