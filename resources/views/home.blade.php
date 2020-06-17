@extends('layouts.app')

@section('content')
<div class="container-fluid">
    <base-menu></base-menu>
        <div class="main">
            <div class="content">
                <router-view></router-view>
            </div>
        </div>
    <base-search></base-search>
    <base-modal-comment></base-modal-comment>
</div>
@endsection
