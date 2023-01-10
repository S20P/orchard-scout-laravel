@extends('layouts.app')
@section('breadcrumb')
<h1 class="d-flex text-dark fw-bolder fs-3 align-items-center my-1">{{__('Crop Locations')}}</h1>
<span class="h-20px border-gray-300 border-start mx-4"></span>
<ul class="breadcrumb breadcrumb-separatorless fw-bold fs-7 my-1">
    <li class="breadcrumb-item text-muted">
        <a href="{{route('home')}}" class="text-muted text-hover-primary">{{__('Home')}}</a>
    </li>
    <li class="breadcrumb-item">
        <span class="bullet bg-gray-300 w-5px h-2px"></span>
    </li>
    <li class="breadcrumb-item text-muted">
        <a href="{{route('crop-locations.index')}}" class="text-muted text-hover-primary">{{__('Crop Locations')}}</a>
    </li>
    <li class="breadcrumb-item">
        <span class="bullet bg-gray-300 w-5px h-2px"></span>
    </li>
    <li class="breadcrumb-item text-dark">{{__('Edit')}}</li>
</ul>
@endsection
@section('main-content')
<div class="post d-flex flex-column-fluid" id="kt_post">
    <div id="kt_content_container" class="container-xxl">
        @include('layouts.errors')
        <div class="card mb-5 mb-xl-10">
            <div id="kt_account_settings_profile_details" class="collapse show">
                <form id="edit_frm" name='add_frm' class="form" method="post" action="{{ route('crop-locations.update',$data->id) }}">
                    @csrf
                    @method('PUT')
                    <div class="card-body border-top p-9">
                        <div class="row mb-6">
                            <label class="col-lg-4 col-form-label fw-bold fs-6">
                                <span class="required">{{ __('Customer')}}</span>
                                <i class="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip"
                                    title="{{ __('Customer')}}"></i>
                            </label>
                            <div class="col-lg-8 fv-row">
                                <select
                                    class="form-select form-select-solid form-select-lg  @error('customer_id') is-invalid @enderror"
                                    id='customer_id' name="customer_id" data-control="select2">
                                    <option value=''>Select customer</option>
                                    @if (!empty($Customers) && count($Customers) > 0)
                                    @foreach ($Customers as $Customer)
                                        <option value='{{$Customer->id}}' @if($data->customer_id==$Customer->id)
                                            {{'selected'}}
                                        @endif>{{$Customer->name}}</option>
                                    @endforeach
                                    @endif
                                </select>
                                @error('customer_id')
                                <span class="invalid-feedback" role="alert">
                                    {{ $message }}
                                </span>
                                @enderror
                            </div>
                        </div>
                        <div class="row mb-6">
                            <label class="col-lg-4 col-form-label fw-bold fs-6">
                                <span class="required">{{ __('Address')}}</span>
                                <i class="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip"
                                    title="{{ __('Address')}}"></i>
                            </label>
                            <div class="col-lg-8 fv-row">
                                <select
                                    class="form-select form-select-solid form-select-lg  @error('address_id') is-invalid @enderror"
                                    id='address_id' name="address_id" data-control="select2">
                                    <option value=''>{{__('Select address')}}</option>
                                    @if (!empty($customer_addresses) && count($customer_addresses) > 0)
                                    @foreach ($customer_addresses as $customer_address)
                                        <option value='{{$customer_address->address_id}}' @if($data->address_id==$customer_address->address_id)
                                            {{'selected'}}
                                        @endif>{{$customer_address->address_type_name}} {{$customer_address->hasAddress->address_1}}</option>
                                    @endforeach
                                    @endif
                                </select>
                                @error('address_id')
                                <span class="invalid-feedback" role="alert">
                                    {{ $message }}
                                </span>
                                @enderror
                            </div>
                        </div>
                        <div class="row mb-6">
                            <label class="col-lg-4 col-form-label fw-bold fs-6">
                                <span class="required">{{__('Name')}}</span>
                                <i class="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip"
                                    title="{{__('Name')}}"></i>
                            </label>
                            <div class="col-lg-8 fv-row">
                                <input type="text" name="name"
                                    class="form-control form-control-lg form-control-solid @error('name') is-invalid @enderror"
                                    placeholder="{{__('Name')}}" value='{{$data->name}}' />
                                @error('name')
                                <span class="invalid-feedback" role="alert">
                                    {{ $message }}
                                </span>
                                @enderror
                            </div>
                        </div>
                        <div class="row mb-6">
                            <label class="col-lg-4 col-form-label fw-bold fs-6">
                                <span class="">{{__('Description')}}</span>
                                <i class="fas fa-exclamation-circle ms-1 fs-7" data-bs-toggle="tooltip"
                                    title="{{__('Description')}}"></i>
                            </label>
                            <div class="col-lg-8 fv-row">
                                <textarea data-kt-autosize="true" name="description"
                                    class="form-control form-control-lg form-control-solid @error('description') is-invalid @enderror"
                                    placeholder="{{__('Description')}}">{{$data->description}}</textarea>
                                @error('description')
                                <span class="invalid-feedback" role="alert">
                                    {{ $message }}
                                </span>
                                @enderror
                            </div>
                        </div>
                    </div>
                    <div class="card-footer d-flex justify-content-end py-6 px-9">
                        <button type="reset"
                            class="btn btn-light btn-active-light-primary me-2">{{__('Discard')}}</button>
                        <button type="submit" class="btn btn-primary" id="kt_account_profile_details_submit">{{__('Save Changes')}}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection
@section('pagespecificscripts')
<script src="{{url('js/module/crop-locations.js')}}"></script>
@endsection