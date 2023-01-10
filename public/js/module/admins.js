    jQuery(document).ready(function() {

        item_list();

        function item_list() {

        if (jQuery(document).find('#dataTableList').length > 0) {
            $("#dataTableList").dataTable().fnDestroy();
            var Ot = jQuery(document).find('#dataTableList').DataTable({
                processing: true,
                serverSide: true,
                filter: true,
                "searching": true,
                "responsive": true,
                ajax: {
                    url: userListIndex,
                    data: function(d) {
                        d.name = $('#name').val();
                        d.email = $('#email').val();
                        d.is_deleted_at = $('#is_deleted_at').val();
                    }
                },
                "lengthMenu": [
                    [25, 50, 100, 200],
                    [25, 50, 100, 200]
                ],
                columns: [
                    { data: 'DT_RowIndex', name: 'DT_RowIndex' },
                    { data: 'name', name: 'name' },
                    { data: 'email', name: 'email' },
                    { data: 'role', name: 'role' },
                    { data: 'action', name: 'action', orderable: false, searchable: false },
                ],
                columnDefs: [{
                    targets: -1,
                    orderable: false,
                }]
            });
            $('#name').keyup(function() {
                Ot.draw();
                jQuery(document).find('.row.clear_filter_row').show();
            });
            $('#email').keyup(function() {
                Ot.draw();
                jQuery(document).find('.row.clear_filter_row').show();
            });
            $('#roles').change(function() {
                Ot.draw();
                jQuery(document).find('.row.clear_filter_row').show();
            });
            jQuery(document).find('input[name="data_tbl_search"]').on('keyup', function() {
                Ot.search(this.value).draw();
            });
            jQuery(document).on('click', '.clear_filter_btn', function(e) {
                $('#name').val('');
                $('#email').val('');
                $('#roles').val('');
                Ot.search('').draw();
                jQuery(document).find('.row.clear_filter_row').hide();
            });
            $('.filter-apply-btn').click(function() {
                Ot.draw();
            });
            $('.filter-clear-btn').click(function() {     
                $('#is_deleted_at').val('false').trigger('change'); 
                $('#is_deleted_at').attr('value', 'false'); 
                $('#is_deleted_at').attr('checked', false);                
                $("#is_deleted_at").prop('checked', false); 
                Ot.draw();
            });
        }
    }
        $("#role").change(function() {
            if ($(this).val() == 2) {
                $('.permission-section').show();
            } else {
                $('.permission-section').hide();
            }
        });
        $("#role").trigger("change");
        $(document).on('click', ".delete_user", function() {
            var id = $(this).data('id');
            Swal.fire({
                text: "Are you sure you want to delete selected admin?",
                icon: "warning",
                showCancelButton: !0,
                buttonsStyling: !1,
                confirmButtonText: "Yes, delete!",
                cancelButtonText: "No, cancel",
                customClass: {
                    confirmButton: "btn fw-bold btn-danger",
                    cancelButton: "btn fw-bold btn-active-light-primary"
                }
            }).then((function(isConfirm) {
                if (isConfirm.isConfirmed) {
                    $.ajax({
                        type: "POST",
                        url: id,
                        data: ({ submit_type: 'ajax', '_token': config.data.csrf, _method: 'DELETE' }),
                        success: function(data) {
                            if (data.status == 1) {
                                Swal.fire({
                                    text: "You have deleted selected admin!.",
                                    icon: "success",
                                    buttonsStyling: !1,
                                    confirmButtonText: "Ok, got it!",
                                    customClass: {
                                        confirmButton: "btn fw-bold btn-primary"
                                    }
                                });
                                // toastr.error("Oops ! Error: Deleted Successfully.!!!");
                                item_list();
                            } else {
                                Swal.fire({
                                    text: "Failed...!!!",
                                    icon: "error",
                                    buttonsStyling: !1,
                                    confirmButtonText: "Ok, got it!",
                                    customClass: {
                                        confirmButton: "btn fw-bold btn-primary"
                                    }
                                });
                            }
                        },
                    });
                } else {
                    Swal.fire({
                        text: "Failed...!!!",
                        icon: "error",
                        buttonsStyling: !1,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn fw-bold btn-primary"
                        }
                    });
                }
            }))
        });
        jQuery("form[name='add_frm']").validate({
            errorElement: 'span',
            ignore: [],
            errorClass: 'invalid-feedback',
            rules: {
                name: { required: true, maxlength: 255 },
                email: { required: true, email: true, maxlength: 255 },
                password: { required: true, minlength: 8 },
                'confirm-password': {
                    required: true,
                    equalTo: ".password",
                    minlength: 8
                },
                role: "required",
            },
            messages: {
                'name': {
                    required: "The name field is required.",
                },
                'email': {
                    required: "The email field is required.",
                },
                'password': {
                    required: "The password field is required.",
                },
                'confirm-password': {
                    required: "The confirm password field is required.",
                },
                'role': {
                    required: "The role field is required.",
                },
                'permissions': {
                    required: "The permissions field is required when role is admin",
                },
            },
            highlight: function(element, errorClass, validClass) {
                if ($(element).attr("type") == "radio") {
                    jQuery('input[name="' + $(element).attr("name") + '"]').each(function() {
                        $(this).addClass('is-invalid');
                    });
                } else if ($(element).attr("type") == "hidden") {
                    $(element).prev().addClass('is-invalid');
                    $(element).addClass('is-invalid');
                } else {
                    $(element).addClass('is-invalid');
                }
            },
            unhighlight: function(element, errorClass, validClass) {
                $(element).removeClass('is-invalid');
            },
            errorPlacement: function(error, element) {
                if (element.attr("name") == "permissions") {
                    error.insertAfter($(document).find('.permission-tabel'));
                } else {
                    error.insertAfter($(element));
                }
            },
        });

        jQuery("form[name='edit_frm']").validate({
            errorElement: 'span',
            ignore: [],
            errorClass: 'invalid-feedback',
            rules: {
                name: { required: true, maxlength: 255 },
                email: { required: true, email: true, maxlength: 255 },
                password: { equalTo: ".confirm-password", },
                role: "required",
            },
            messages: {
                'name': {
                    required: "The name field is required.",
                },
                'email': {
                    required: "The email field is required.",
                },
                'password': {
                    required: "The password field is required.",
                },
                'confirm-password': {
                    required: "The confirm password field is required.",
                },
                'role': {
                    required: "The role field is required.",
                },
                'permissions': {
                    required: "The permissions field is required when role is admin",
                },
            },
            highlight: function(element, errorClass, validClass) {
                if ($(element).attr("type") == "radio") {
                    jQuery('input[name="' + $(element).attr("name") + '"]').each(function() {
                        $(this).addClass('is-invalid');
                    });
                } else if ($(element).attr("type") == "hidden") {
                    $(element).prev().addClass('is-invalid');
                    $(element).addClass('is-invalid');
                } else {
                    $(element).addClass('is-invalid');
                }
            },
            unhighlight: function(element, errorClass, validClass) {
                $(element).removeClass('is-invalid');
            },
            errorPlacement: function(error, element) {
                if (element.attr("name") == "permissions") {
                    error.insertAfter($(document).find('.permission-tabel'));
                } else {
                    error.insertAfter($(element));
                }
            },
        });

        $("#is_deleted_at").on('change', function() {
            if ($(this).is(':checked')) {
                $(this).attr('value', 'true');
            } else {
                $(this).attr('value', 'false');
            }
        });
        
        $(document).on('click', ".delete_request", function() {
            var id = $(this).data('id');
            Swal.fire({
                text: "Are you sure you want to revert selected Request?",
                icon: "warning",
                showCancelButton: !0,
                buttonsStyling: !1,
                confirmButtonText: "Yes, Revert!",
                cancelButtonText: "No, cancel",
                customClass: {
                    confirmButton: "btn fw-bold btn-danger",
                    cancelButton: "btn fw-bold btn-active-light-primary"
                }
            }).then((function(isConfirm) {
                if (isConfirm.isConfirmed) {
                    $.ajax({
                        type: "POST",
                        url: id,
                        data: ({ submit_type: 'ajax', '_token': config.data.csrf, _method: 'POST' }),
                        success: function(data) {
                            if (data.status == 1) {
                                Swal.fire({
                                    text: "You have reverted selected Request!.",
                                    icon: "success",
                                    buttonsStyling: !1,
                                    confirmButtonText: "Ok, got it!",
                                    customClass: {
                                        confirmButton: "btn fw-bold btn-primary"
                                    }
                                });
                                item_list();
                            }
                        },
                    });
                } else {
                    Swal.fire({
                        text: "Failed...!!!",
                        icon: "error",
                        buttonsStyling: !1,
                        confirmButtonText: "Ok, got it!",
                        customClass: {
                            confirmButton: "btn fw-bold btn-primary"
                        }
                    });
                }
            }))
        });

    });