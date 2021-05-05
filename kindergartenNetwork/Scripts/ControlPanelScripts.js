var ControlPanelScripts = function () {
    /****************/
    var closeModal = function () {
        $(".closeModal").off("click").click(function () {
            $(".contentDiv").find(".portle-body").html('');
            $(".contentDiv").hide();
            $(".tableDiv").show();

        });
    };
    var scrollToTop = function () {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };
    var uploadImg = function (uploader, input) {
        var flag = true;
        $(uploader).off('change').change(function () {
            if (flag === true) {
                flag = false;
                var myFile = this.files[0];
                var size = 0;
                if (myFile !== undefined)
                    size = parseInt(this.files[0].size);
                if (size !== undefined)
                    size = size / 5120;
                var file = $(this).val();
                var extension = file.substr((file.lastIndexOf('.') + 1)).toLowerCase();
                var type = false;
                if (extension === 'jpg' || extension === 'jpeg' || extension === 'png' || extension === 'gif' || extension === 'bmp')
                    type = true;
                if (size <= 5120 && type === true) {
                    //$('.error-message-image').slideUp(500);
                    var fd = new FormData();

                    fd.append("choose-file", myFile);
                    $.ajax({
                        url: '/ControlPanel/UploadNewsImg',
                        type: 'POST',
                        data: fd,
                        cache: false,
                        contentType: false,
                        processData: false,
                        dataType: "json",
                        xhr: function () {

                            var xhr = new window.XMLHttpRequest();
                            xhr.upload.addEventListener('progress',
                                function (e) {
                                    // THIS IS ONLY RUNS ONCE!!!
                                    if (e.lengthComputable) {
                                        //    $('#progressbar').css('width', (e.loaded / e.total) * 100 + '%');
                                        console.log((e.loaded / e.total) * 100);
                                    }
                                },
                                false);
                            return xhr;

                        },
                        beforeSend: function () {
                        },
                        success: function (data) {
                            flag = true;
                            $(input).val(data.Filename);
                        }
                    });
                } else {
                    flag = true;
                    if (size > 5120) {
                        gsNotifyMsg("حجم الصورة غير مقبول", "error");
                    } else if (type === false && size > 0) {
                        gsNotifyMsg("الرجاء اختيار صورة بصيغة صحيحة", "error");
                    } else {
                        gsNotifyMsg("الرجاء اختيار صورة", "error");
                    }
                }
            };
        });
    };
    var uploadAlbums = function () {
        var flag = true;
        $("#imgUploadUser").off('change').change(function () {
            if (flag === true) {
                flag = false;
                var myFile = this.files[0];
                var size = 0;
                if (myFile !== undefined)
                    size = parseInt(this.files[0].size);
                if (size !== undefined)
                    size = size / 5120;
                var file = $(this).val();
                var extension = file.substr((file.lastIndexOf('.') + 1)).toLowerCase();
                var type = false;
                if (extension === 'jpg' || extension === 'jpeg' || extension === 'png' || extension === 'gif' || extension === 'bmp')
                    type = true;
                if (size <= 2024 && type === true) {
                    var fd = new FormData();
                    fd.append("choose-file", myFile);
                    $.ajax({
                        url: '/ControlPanel/UploadAlbumImg',
                        type: 'POST',
                        data: fd,
                        cache: false,
                        contentType: false,
                        processData: false,
                        dataType: "json",
                        xhr: function () {

                            var xhr = new window.XMLHttpRequest();
                            xhr.upload.addEventListener('progress',
                                function (e) {
                                    // THIS IS ONLY RUNS ONCE!!!
                                    if (e.lengthComputable) {
                                        //    $('#progressbar').css('width', (e.loaded / e.total) * 100 + '%');
                                        console.log((e.loaded / e.total) * 100);
                                    }
                                },
                                false);
                            return xhr;

                        },
                        beforeSend: function () {
                        },
                        success: function (data) {
                            flag = true;
                            $("#hdImage").val(data.Filename);
                        }
                    });
                } else {
                    flag = true;
                    if (size > 2024) {
                        gsNotifyMsg("حجم الصورة غير مقبول", "error");
                    } else if (type === false && size > 0) {
                        gsNotifyMsg("الرجاء اختيار صورة بصيغة صحيحة", "error");
                    } else {
                        gsNotifyMsg("الرجاء اختيار صورة", "error");
                    }
                }
            };
        });
    };
    var uploadFile = function () {
        var flag = true;
        $("#fileUpload").off('change').change(function () {
            if (flag === true) {
                flag = false;
                var my_file = this.files[0];
                var size = 0;
                if (my_file !== undefined)
                    size = parseInt(this.files[0].size);
                if (size !== undefined)
                    size = size / 5120;
                var file = $(this).val();
                var extension = file.substr((file.lastIndexOf('.') + 1)).toLowerCase();
                //var type = false;
                //if (extension == 'jpg' || extension == 'jpeg' || extension == 'png' || extension == 'gif' || extension == 'bmp')
                type = true;
                if (size <= 51200 && type === true) {
                    //$('.error-message-image').slideUp(500);
                    var fd = new FormData();

                    fd.append("choose-file", my_file);
                    $.ajax({
                        url: '/ControlPanel/UpLoadFile',
                        type: 'POST',
                        data: fd,
                        cache: false,
                        contentType: false,
                        processData: false,
                        dataType: "json",
                        xhr: function () {

                            var xhr = new window.XMLHttpRequest();
                            xhr.upload.addEventListener('progress',
                                function (e) {
                                    // THIS IS ONLY RUNS ONCE!!!
                                    if (e.lengthComputable) {
                                        //    $('#progressbar').css('width', (e.loaded / e.total) * 100 + '%');
                                        console.log((e.loaded / e.total) * 100);
                                    }
                                },
                                false);
                            return xhr;

                        },
                        beforeSend: function () {
                        },
                        success: function (data) {
                            flag = true;
                            $("#hdFileName").val(data.Filename);
                        }
                    });
                } else {
                    flag = true;
                    var message = "";
                    if (size > 51200) {
                        message = "حجم الصورة غير مقبول";
                    }
                    //else if (type == false && size > 0) {
                    //    message = "الرجاء اختيار صورة بصيغة (JPG, PNG)";
                    //} 
                    else {
                        message = "الرجاء اختيار صورة";
                    }
                    gsNotifyMsg(message, "error");
                }
            };
        });
    };
    var uploadAvatar = function () {
        var flag = true;
        $("#hdAvatar").off('change').change(function () {
            if (flag === true) {
                flag = false;
                var my_file = this.files[0];
                var size = 0;
                if (my_file !== undefined)
                    size = parseInt(this.files[0].size);
                if (size !== undefined)
                    size = size / 5120;
                var file = $(this).val();
                var extension = file.substr((file.lastIndexOf('.') + 1)).toLowerCase();
                var type = false;
                if (extension === 'jpg' ||
                    extension === 'jpeg' ||
                    extension === 'png' ||
                    extension === 'gif' ||
                    extension === 'bmp')
                    type = true;
                if (size <= 2024 && type === true) {
                    //$('.error-message-image').slideUp(500);
                    var fd = new FormData();

                    fd.append("choose-file", my_file);
                    $.ajax({
                        url: '/Management/UploadUserImg',
                        type: 'POST',
                        data: fd,
                        cache: false,
                        contentType: false,
                        processData: false,
                        dataType: "json",
                        xhr: function () {

                            var xhr = new window.XMLHttpRequest();
                            xhr.upload.addEventListener('progress',
                                function (e) {
                                    // THIS IS ONLY RUNS ONCE!!!
                                    if (e.lengthComputable) {
                                        //    $('#progressbar').css('width', (e.loaded / e.total) * 100 + '%');
                                        console.log((e.loaded / e.total) * 100);
                                    }
                                },
                                false);
                            return xhr;

                        },
                        beforeSend: function () {
                        },
                        success: function (data) {
                            flag = true;
                            $("#hdAvatar").attr("value", data.Filename);
                            $("#imgAvatar").attr("src", "/Content/UploadedFile/Account/Avatar/Thumbnail/" + data.Filename);
                            $.ajax({
                                type: "POST",
                                cache: false,
                                url: "/ControlPanel/SaveUserAvatar",
                                data: { "Id": $(".tbAccountId").attr("data-accountId"), "Avatar": data.Filename },
                                dataType: "json",
                                success: function (data) {

                                    if (data.cStatus === "success") {
                                        gsNotifyMsg(data.cMsg, data.cStatus);
                                        clubsDataTableUpdate();
                                    } else if (data.cStatus === "notValid") {
                                        notValidOperations(data.cMsg);
                                    } else {
                                        notValidOperations(data.cMsg);
                                    }
                                },
                            });
                        }
                    });
                } else {
                    flag = true;
                    if (size > 2024) {
                        gsNotifyMsg("حجم الصورة غير مقبول", "error");
                    } else if (type === false && size > 0) {
                        gsNotifyMsg("الرجاء اختيار صورة بصيغة صحيحة", "error");
                    } else {
                        gsNotifyMsg("الرجاء اختيار صورة", "error");
                    }
                }
            };
        });
    };
    var upLoadMemberClubFile = function () {
        var flag = true;
        $("#fileUpload").off('change').change(function () {
            if (flag === true) {
                flag = false;
                var my_file = this.files[0];
                var size = 0;
                if (my_file !== undefined)
                    size = parseInt(this.files[0].size);
                if (size !== undefined)
                    size = size / 5120;
                var file = $(this).val();
                var extension = file.substr((file.lastIndexOf('.') + 1)).toLowerCase();
                //var type = false;
                //if (extension == 'jpg' || extension == 'jpeg' || extension == 'png' || extension == 'gif' || extension == 'bmp')
                type = true;
                if (size <= 2024 && type === true) {
                    //$('.error-message-image').slideUp(500);
                    var fd = new FormData();

                    fd.append("choose-file", my_file);
                    $.ajax({
                        url: '/ControlPanel/UpLoadMemberClubFile',
                        type: 'POST',
                        data: fd,
                        cache: false,
                        contentType: false,
                        processData: false,
                        dataType: "json",
                        xhr: function () {

                            var xhr = new window.XMLHttpRequest();
                            xhr.upload.addEventListener('progress',
                                function (e) {
                                    // THIS IS ONLY RUNS ONCE!!!
                                    if (e.lengthComputable) {
                                        //    $('#progressbar').css('width', (e.loaded / e.total) * 100 + '%');
                                        console.log((e.loaded / e.total) * 100);
                                    }
                                },
                                false);
                            return xhr;

                        },
                        beforeSend: function () {
                        },
                        success: function (data) {
                            flag = true;
                            $("#hdFileName").val(data.Filename);
                        }
                    });
                } else {
                    flag = true;
                    var message = "";
                    if (size > 2024) {
                        message = "حجم الصورة غير مقبول";
                    }
                    //else if (type == false && size > 0) {
                    //    message = "الرجاء اختيار صورة بصيغة (JPG, PNG)";
                    //} 
                    else {
                        message = "الرجاء اختيار صورة";
                    }
                    gsNotifyMsg(message, "error");
                }
            };
        });
    };
    var uploadMemberClubImg = function () {
        var flag = true;
        $("#imgUpload").off('change').change(function () {
            if (flag === true) {
                flag = false;
                var my_file = this.files[0];
                var size = 0;
                if (my_file !== undefined)
                    size = parseInt(this.files[0].size);
                if (size !== undefined)
                    size = size / 5120;
                var file = $(this).val();
                var extension = file.substr((file.lastIndexOf('.') + 1)).toLowerCase();
                var type = false;
                if (extension === 'jpg' || extension === 'jpeg' || extension === 'png' || extension === 'gif' || extension === 'bmp')
                    type = true;
                if (size <= 5120 && type === true) {
                    //$('.error-message-image').slideUp(500);
                    var fd = new FormData();

                    fd.append("choose-file", my_file);
                    $.ajax({
                        url: '/ControlPanel/UploadMemberClubImg',
                        type: 'POST',
                        data: fd,
                        cache: false,
                        contentType: false,
                        processData: false,
                        dataType: "json",
                        xhr: function () {

                            var xhr = new window.XMLHttpRequest();
                            xhr.upload.addEventListener('progress',
                                function (e) {
                                    // THIS IS ONLY RUNS ONCE!!!
                                    if (e.lengthComputable) {
                                        //    $('#progressbar').css('width', (e.loaded / e.total) * 100 + '%');
                                        console.log((e.loaded / e.total) * 100);
                                    }
                                },
                                false);
                            return xhr;

                        },
                        beforeSend: function () {
                        },
                        success: function (data) {
                            flag = true;
                            $("#hdImage").val(data.Filename);
                        }
                    });
                } else {
                    flag = true;
                    if (size > 5120) {
                        gsNotifyMsg("حجم الصورة غير مقبول", "error");
                    } else if (type === false && size > 0) {
                        gsNotifyMsg("الرجاء اختيار صورة بصيغة صحيحة", "error");
                    } else {
                        gsNotifyMsg("الرجاء اختيار صورة", "error");
                    }
                }
            };
        });
    };

    /* ***** News ******* */
    var newsDataTable = function (category) {
        $('#tblNews').dataTable({
            "language": {
                "url": "/Content/assets/global/plugins/DataTables-1.10.12/languages/ar.json"
            },
            "bServerSide": true,
            "sAjaxSource": "/ControlPanel/GetNewsDataTable",
            "bProcessing": true,
            "dom": '<"bottom"t<"col-sm-3 "l><"col-sm-4"i><"col-sm-5"p>><"clear">',
            "aaSorting": [[6, 'asc']],
            "fnServerParams": function (aoData) {
                aoData.push({ "name": "NewsSearch", "value": $("#txtNewsSearch").val() });
                aoData.push({ "name": "Category", "value": category });
                aoData.push({ "name": "InsertedBy", "value": $("#ddlUsers").val() });
                aoData.push({ "name": "FromDate", "value": $("#tbFromDate").val() });
                aoData.push({ "name": "ToDate", "value": $("#tbToDate").val() });
            },
            "bStateSave": true,
            "aoColumns": [
                { "sType": "html", "sWidth": '10%', "mDataProp": "Image", "bSortable": false, "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '45%', "mDataProp": "Title", "bSortable": false, "sClass": "titlejustify" },
                //{ "sType": "html", "sWidth": '20%', "mDataProp": "NameAr", "bSortable": false },
                { "sType": "html", "sWidth": '15%', "mDataProp": "PublishDate", "bSortable": false },
                { "sType": "html", "sWidth": '10%', "mDataProp": "InsertedByName", "bSortable": false },
                { "sType": "html", "sWidth": '7%', "mDataProp": "IsActive", "bSortable": false, "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '8%', "mDataProp": "Status", "bSortable": false, "sClass": "tdCenter" },
                //{ "sType": "html", "sWidth": '8%', "mDataProp": "LangId", "bSortable": false, "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '5%', "mDataProp": "Id", "sClass": "tdCenter" }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    $('td:eq(6)', nRow).html('<div class="btn-group">' +
                        '<a class="btn btnx  dark btn-outline btn-xs" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">' +
                        '<i class="fa fa-cog fa-fw fa-xs"></i>' +
                        '</a>' +
                        ' <ul class="dropdown-menu pull-right">' +
                        '<li>' +
                        '<a href="javascript:;" class="lnk btnSaveNews"data-categoryId="' + aData.CategoryId + '" data-id="' + aData.Id + '"><i class="fa fa-edit fa-fw"></i> ' + Messages.edit + '</a>' +
                        ' </li>' +
                        ' <li>' +
                        '<a href="javascript:;" class="lnk btnDeleteNews" data-id ="' + aData.Id + '"><i class="fa fa-trash fa-fw"></i> ' + Messages.delete + '</a>' +
                        ' </li>' +
                        '</ul>' +
                        ' </div>');
                    $('td:eq(0)', nRow).html('<img  style="width: 100px;" alt="" src="/Content/UploadedFile/News/Thumbnail/' + aData.Image + ' " onError="this.onerror=null;this.src=\'/Content/UploadedFile/Account/Avatar/NoImage.png\';"/>');
                
                if (aData.LangId === 1) {
                    $('td:eq(6)', nRow).html('<span>' + Messages.ar +'</span>');

                }
                else if (aData.LangId === 2) {
                    $('td:eq(6)', nRow).html('<span>' + Messages.en +'</span>');

                }
                if (aData.IsActive === true) {
                    $('td:eq(4)', nRow).html("<span class='font-green-meadow fa fa-fw fa-check-circle-o fa-lg'></span>");
                } else {
                    $('td:eq(4)', nRow).html("<span class='font-red-thunderbird fa fa-fw fa-times-circle-o fa-lg'></span>");
                }
                if (aData.Status === 1) {
                    $('td:eq(5)', nRow).html("<span>فعال</span>");
                } else if (aData.Status === 2) {
                    $('td:eq(5)', nRow).html("<span>قيد الانتظار</span>");
                } else if (aData.Status === 3) {
                    $('td:eq(5)', nRow).html("<span>مرفوض</span>");
                }
                $(nRow).dblclick(function () {
                    saveNewsModal($(this).find(".btnSaveNews").attr("data-id"), $(this).find(".btnSaveNews").attr("data-categoryId"), $("#SaveModal"));
                });
            },
            "fnDrawCallback": function (oSettings) {
                getSaveNewsModal();
                deleteNews();
            },
            "bFilter": false
            //"sPaginationType": "bootstrap"
        });
    };
    var newsDataTableUpdate = function () {
        var oTable = $('#tblNews').dataTable();
        oTable.fnDraw(false);
    };
    var handleSummernote = function () {
        $('.tbSummerNote').summernote({
            callbacks: {
                onImageUpload: function (files) {
                    that = $(this);
                    data = new FormData();
                    data.append("file", files[0]);
                    $.ajax({
                        data: data,
                        type: "POST",
                        url: '/ControlPanel/UploadNewsImg',
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: function (data) {
                            $(that).summernote('insertImage', "/Content/UploadedFile/News/Large/" + data.Filename);
                        }
                    });
                }
            },
            fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New'],
            dialogsInBody: true,
            dialogsFade: false,
            toolbar: [
                ['style', ['style']],
                ['font', ['bold', 'italic', 'underline', 'clear']],
                ['fontsize', ['fontsize']],

                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['height', ['height']],
                ['table', ['table']],
                ['insert', ['link', 'picture', 'video', 'hr']],
                ['view', ['fullscreen', 'codeview']],
                ['help', ['help']],
            ],
            height: 300
        });
        //API:
        //var sHTML = $('#summernote_1').code(); // get code
        //$('#summernote_1').destroy(); // destroy
    }
    var saveNewsModal = function (id, categoryId, bsModal) {
        bsModal.html('');
        $(".page-content").LoadingOverlay("show");
        setTimeout(function () {
            bsModal.load('/ControlPanel/SaveNewsModal?id=' + id + '&categoryId=' + categoryId, '', function () {
                $(".contentDiv").show();
                $(".tableDiv").hide();
                resetbooststrapSelect();
                handleBootstrapSelect();
                handleSummernote();
                handleDatePickers();
                closeModal();
                saveNews();
                uploadImg($("#imgUploadUser"), $("#hdImage"));
                $('#tbPublishDate').datetimepicker({
                    format: 'YYYY-MM-DD HH:mm'
                });
                $("#tbNewsKeyWords").tagsinput();
                $(".page-content").LoadingOverlay("hide", true);
                $("#cbIsInHome").change(function () {
                    if ($(this).is(':checked')) {
                        $("#ddlHomePosition").closest(".formElement").show();
                    }
                    else {
                        $("#ddlHomePosition").closest(".formElement").hide();
                    }
                });
            });
        }, 100);
    }
    var getSaveNewsModal = function () {
        var bsModal = $("#SaveModal");
        $(".btnSaveNews").off('click').click(function () {
            var id = $(this).attr("data-id");
            var categoryId = $(this).attr("data-categoryId");
            bsModal.html('');
            $(".page-content").LoadingOverlay("show");
            setTimeout(function () {
                bsModal.load('/ControlPanel/SaveNewsModal?id=' + id + '&categoryId=' + categoryId, '', function () {
                    $(".contentDiv").show();
                    $(".tableDiv").hide();
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                    handleSummernote();
                    handleDatePickers();
                    closeModal();
                    saveNews();
                    uploadImg($("#imgUploadUser"), $("#hdImage"));
                    $('#tbPublishDate').datetimepicker({ format: 'YYYY-MM-DD HH:mm' });
                    $("#tbNewsKeyWords").tagsinput();
                    $(".page-content").LoadingOverlay("hide", true);
                    $("#cbIsInHome").change(function () {
                        if ($(this).is(':checked')) {
                            $("#ddlHomePosition").closest(".formElement").show();
                        }
                        else {
                            $("#ddlHomePosition").closest(".formElement").hide();
                        }
                    });
                });
            }, 100);
        });
    };
    var saveNews = function () {
        $('#SaveNews').on("submit", function (event) {
            var form = this;
            gsDisablSubmitButton(form);
            var postData = $(form).serializeArray();
            var formUrl = $(form).attr("action");
            postData.push({ name: "Keywords", value: $("#tbNewsKeyWords").val() });
            postData.push({ name: "HomePosition", value: $("#ddlHomePosition").val() });
            $.ajax({
                type: "POST",
                cache: false,
                url: formUrl,
                data: postData,
                dataType: "json",
                success: function (data) {
                    gsEnableSubmitButton(form);
                    if (data.cStatus === "success") {
                        completedSuccessfuly(data.cMsg);
                        newsDataTableUpdate();
                        $("#newsId").val(data.id);
                        $(".scroll-to-top").click();
                    } else if (data.cStatus === "notValid") {
                        notValidOperations(data.cMsg);
                        $(".scroll-to-top").click();
                    }
                    else {
                        notValidOperations(data.cMsg);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    gsNotifyMsg('' + Messages.noResultFound + '', "error");
                    gsEnableSubmitButton(form);
                }
            });
        });
    };

    var deleteNews = function () {
        $(".btnDeleteNews").off('click').click(function () {
            var id = $(this).attr('data-Id');
            gsConfirm('' + Messages.deleteConfirm + '', function (result) {
                if (result) {
                    $.ajax({
                        type: "POST",
                        cache: false,
                        url: '/ControlPanel/DeleteNews',
                        dataType: "JSON",
                        data: { 'id': id },
                        success: function (data) {
                            if (data.cStatus === "success") {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                                newsDataTableUpdate();

                            } else {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            gsNotifyMsg('' + Messages.noResultFound + '', "error");
                        }
                    });
                }
            });
        });
    };
    var newsSearchAutoComplete = function () {
        //if (!$('#txtNewsSearch').hasClass('tt-input')) {
        //    var catId = $("#tblNews").attr("data-categoryId");
        //    var news = new Bloodhound({
        //        datumTokenizer: function (d) { return d.tokens; },
        //        queryTokenizer: Bloodhound.tokenizers.whitespace,
        //        remote: {
        //            url: '/ControlPanel/SearchAutoCompleteNews',
        //            replace: function (url, uriEncodedQuery) {
        //                return url + "/" + uriEncodedQuery + "?categoryId=" + catId;
        //            }
        //        }
        //    });
        //    news.initialize();

        //    $('#txtNewsSearch').typeahead({
        //        hint: true,
        //        highlight: true,
        //        minLength: 1,
        //        dir: true
        //    }, {
        //            name: 'search-news',
        //            displayKey: 'Title',
        //            source: news.ttAdapter(),
        //            limit: 20,
        //            dir: true,
        //            templates: {
        //                empty: [
        //                    '<div class="empty-message">',
        //                    '' + Messages.noResultFound + '',
        //                    '</div>'
        //                ].join('\n'),
        //                suggestion: Handlebars.compile([
        //                    '<div class="media">',
        //                    '<div class="pull-left">',
        //                    '<div class="media-object">',
        //                    '</div>',
        //                    '</div>',
        //                    '<div class="media-body">',
        //                    ' ',
        //                    ' <h5 class="media-heading">{{Title}} </h5>',
        //                    '</div>',
        //                    '</div>',
        //                ].join(''))
        //            },

        //        }).on('typeahead:selected', function ($e, datum) {
        //            $("#txtNewsSearch").attr('data-id', datum.Id);
        //        });
        //}
    };
    var newsSearch = function () {
        $("#btnSearch").off('click').click(function () {
            newsDataTableUpdate();
        });
    };
    var resetNewsDataTable = function () {
        $("#btnClearForm").off("click").click(function () {
            $("#txtNewsSearch").removeAttr("data-id");
            $("#ddlNewsCategory").val("0");
            $("#txtNewsSearch").val("");
            gsResetInsertForm("SearchForm");
            newsDataTableUpdate();
        });
    };
    /********Category**********/
    var categoriesDataTable = function () {
        $('#tblCategories').dataTable({
            "language": {
                "url": "/Content/assets/global/plugins/DataTables-1.10.12/languages/ar.json"
            },
            "paging": false,
            "info": false,
            "bServerSide": true,
            "sAjaxSource": "/ControlPanel/getCategoriesDataTable",
            "bProcessing": true,
            "dom": '<"bottom"t<"col-sm-3 "l><"col-sm-4"i><"col-sm-5"p>><"clear">',
            "aaSorting": [[1, 'asc']],
            //"fnServerParams": function (aoData) {
            //    aoData.push({ "name": "Name", "value": $("#txtNewsSearch").val() },
            //        { "name": "NewsTypeId", "value": $("#ddlNewsType").val() });
            //},
            "bStateSave": true,
            "aoColumns": [
                { "sType": "html", "sWidth": '90%', "mDataProp": "NameAr", "bSortable": false, "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '10%', "mDataProp": "Id", "sClass": "tdCenter" }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    $('td:eq(1)', nRow).html('<div class="btn-group">' +
                        '<a class="btn btnx  dark btn-outline btn-xs" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">' +
                        '<i class="fa fa-cog fa-fw fa-xs"></i>' +
                        '</a>' +
                        ' <ul class="dropdown-menu pull-right">' +
                        '<li>' +
                        '<a href="javascript:;" class="lnk btnSaveCategory" data-id="' + aData.Id + '"><i class="fa fa-edit fa-fw"></i> ' + Messages.edit + '</a>' +
                        ' </li>' +
                        ' <li>' +
                        '<a href="javascript:;" class="lnk btnDeleteCategory" data-id ="' + aData.Id + '"><i class="fa fa-trash fa-fw"></i> ' + Messages.delete + '</a>' +
                        ' </li>' +
                        '</ul>' +
                        ' </div>');
                $(nRow).dblclick(function () {
                    saveCategoryModel($(this).find(".btnSaveCategory").attr("data-id"), $("#basicModal"));
                });
            },
            "fnDrawCallback": function (oSettings) {
                getSaveCategoryModal();
                deleteCategory();
            },
            "bFilter": false
            //"sPaginationType": "bootstrap"
        });
    };
    var categoriesDataTableUpdate = function () {
        var oTable = $('#tblCategories').dataTable();
        oTable.fnDraw(false);
    };
    var saveCategoryModel = function (id, bsModal) {
        bsModal.html('');
        setTimeout(function () {
            bsModal.load('/ControlPanel/SaveCategoryModal?id=' + id, '', function () {
                bsModal.modal('show');
                resetbooststrapSelect();
                handleBootstrapSelect();
                saveCategory();
            });
        }, 100);
    }
    var getSaveCategoryModal = function () {
        var bsModal = $("#basicModal");
        $(".btnSaveCategory").off('click').click(function () {
            var id = $(this).attr("data-id");
            bsModal.html('');
            setTimeout(function () {
                bsModal.load('/ControlPanel/SaveCategoryModal?id=' + id, '', function () {
                    bsModal.modal('show');
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                    saveCategory();
                });
            }, 100);
        });
    };
    var saveCategory = function () {
        $('#SaveCategoryForm').on("submit", function (event) {
            var form = this;
            var postData = $(form).serializeArray();
            var formUrl = $(form).attr("action");
            $.ajax({
                type: "POST",
                cache: false,
                url: formUrl,
                data: postData,
                dataType: "json",
                success: function (data) {
                    gsEnableSubmitButton(form);
                    if (data.cStatus === "success") {
                        completedSuccessfuly(data.cMsg);
                        categoriesDataTableUpdate();
                    } else if (data.cStatus === "notValid") {
                        notValidOperations(data.cMsg);
                    }
                    else {
                        notValidOperations(data.cMsg);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    gsNotifyMsg('' + Messages.noResultFound + '', "error");
                    gsEnableSubmitButton(form);
                }
            });
        });
    };
    var deleteCategory = function () {
        $(".btnDeleteCategory").off('click').click(function () {
            var id = $(this).attr('data-Id');
            gsConfirm('' + Messages.deleteConfirm + '', function (result) {
                if (result) {
                    $.ajax({
                        type: "POST",
                        cache: false,
                        url: '/ControlPanel/DeleteCategory',
                        dataType: "JSON",
                        data: { 'id': id },
                        success: function (data) {
                            if (data.cStatus === "success") {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                                categoriesDataTableUpdate();

                            } else {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            gsNotifyMsg('' + Messages.noResultFound + '', "error");
                        }
                    });
                }
            });
        });
    };
    /************/
    var albumsDataTable = function () {
        $('#tblAlbums').dataTable({
            "language": {
                "url": lang === "ar" ? "/Content/assets/global/plugins/DataTables-1.10.12/languages/ar.json" : ""
            },
            "bServerSide": true,
            "sAjaxSource": "/ControlPanel/getAlbumsDataTable",
            "bProcessing": true,
            "dom": '<"bottom"t<"col-sm-12"p>><"clear">',
            "aaSorting": [[3, 'asc']],
            "fnServerParams": function (aoData) {
                aoData.push({ "name": "Id", "value": $("#txtAlbumSearch").attr("data-id") });
            },
            "bStateSave": true,
            "aoColumns": [
                { "sType": "html", "sWidth": '10%', "mDataProp": "Thumbinal", "bSortable": false, "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '45%', "mDataProp": "NameAr", "bSortable": false },
                { "sType": "html", "sWidth": '45%', "mDataProp": "NameEn", "bSortable": false },
                { "sType": "html", "sWidth": '10%', "mDataProp": "Id", "sClass": "tdCenter" }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                $('td:eq(3)', nRow).html('<div class="btn-group">' +
                    '<a class="btn btnx  dark btn-outline btn-xs" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">' +
                    '<i class="fa fa-cog fa-fw fa-xs"></i>' +
                    '</a>' +
                    ' <ul class="dropdown-menu pull-right">' +
                    '<li>' +
                    '<a href="javascript:;" class="lnk btnSaveAlbum" data-id="' + aData.Id + '"><i class="fa fa-edit fa-fw"></i> ' + Messages.edit + '</a>' +
                    ' </li>' +
                    '<li>' +
                    '<a href="javascript:;" class="lnk btnUploadImages" data-id="' + aData.Id + '"><i class="fa fa-edit fa-fw"></i> ' + Messages.uploadImages + '</a>' +
                    ' </li>' +
                    ' <li>' +
                    '<a href="javascript:;" class="lnk btnDeleteAlbum" data-id ="' + aData.Id + '"><i class="fa fa-trash fa-fw"></i> ' + Messages.delete + '</a>' +
                    ' </li>' +
                    '</ul>' +
                    ' </div>');
                $('td:eq(0)', nRow).html('<img  style="width: 100px;" alt="" src="/Content/UploadedFile/Albums/Thumbnail/' + aData.Thumbinal + ' " onError="this.onerror=null;this.src=\'/Content/UploadedFile/Albums/Thumbinal/NoImage.png\';"/>');

                $(nRow).dblclick(function () {
                    saveAlbumsModel($(this).find(".btnSaveAlbum").attr("data-id"), $("#basicModal"));
                });
                $(nRow).off("click").click(function () {
                    $("#hdAlbumId").val(aData.Id);
                    mediaDataTableUpdateWithReSort();
                });
            },
            "fnDrawCallback": function (oSettings) {
                getSaveAlbumsModal();
                deleteAlbum();
            },
            "bFilter": false
            //"sPaginationType": "bootstrap"
        });
    };
    var albumsDataTableUpdate = function () {
        var oTable = $('#tblAlbums').dataTable();
        oTable.fnDraw(false);
    };
    var saveAlbumsModel = function (id, bsModal) {
        bsModal.html('');
        setTimeout(function () {
            bsModal.load('/ControlPanel/SaveAlbumsModal?id=' + id, '', function () {
                bsModal.modal('show');
                resetbooststrapSelect();
                handleBootstrapSelect();
                saveAlbum();
                uploadAlbums();
            });
        }, 100);
    }
    var getSaveAlbumsModal = function () {
        var bsModal = $("#basicModal");
        $(".btnSaveAlbum").off('click').click(function () {
            var id = $(this).attr("data-id");
            bsModal.html('');
            setTimeout(function () {
                bsModal.load('/ControlPanel/SaveAlbumsModal?id=' + id, '', function () {
                    bsModal.modal('show');
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                    saveAlbum();
                    uploadAlbums();
                });
            }, 100);
        });
    };
    var saveAlbum = function () {
        $('#SaveAlbumForm').on("submit", function (event) {
            var form = this;
            var postData = $(form).serializeArray();
            var formUrl = $(form).attr("action");
            $.ajax({
                type: "POST",
                cache: false,
                url: formUrl,
                data: postData,
                dataType: "json",
                success: function (data) {
                    gsEnableSubmitButton(form);
                    if (data.cStatus === "success") {
                        completedSuccessfuly(data.cMsg);
                        albumsDataTableUpdate();
                        gsResetInsertForm(form);
                    } else if (data.cStatus === "notValid") {
                        notValidOperations(data.cMsg);
                    }
                    else {
                        notValidOperations(data.cMsg);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    gsNotifyMsg('' + Messages.noResultFound + '', "error");
                    gsEnableSubmitButton(form);
                }
            });
        });
    }
    var deleteAlbum = function () {
        $(".btnDeleteAlbum").off('click').click(function () {
            var id = $(this).attr('data-Id');
            gsConfirm('' + Messages.deleteConfirm + '', function (result) {
                if (result) {
                    $.ajax({
                        type: "POST",
                        cache: false,
                        url: '/ControlPanel/DeleteAlbum',
                        dataType: "JSON",
                        data: { 'id': id },
                        success: function (data) {
                            if (data.cStatus === "success") {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                                albumsDataTableUpdate();

                            } else {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            gsNotifyMsg('' + Messages.noResultFound + '', "error");
                        }
                    });
                }
            });
        });
    };
    var albumSearchAutoComplete = function () {
        if (!$('#txtAlbumSearch').hasClass('tt-input')) {
            var album = new Bloodhound({
                datumTokenizer: function (d) { return d.tokens; },
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                remote: {
                    url: '/ControlPanel/SearchAutoCompleteAlbum/%QUERY',
                    wildcard: '%QUERY'
                }
            });
            album.initialize();

            $('#txtAlbumSearch').typeahead({
                hint: true,
                highlight: true,
                minLength: 1,
                dir: true
            }, {
                    name: 'search-album',
                    displayKey: 'NameAr',
                    source: album.ttAdapter(),
                    limit: 20,
                    dir: true,
                    templates: {
                        empty: [
                            '<div class="empty-message">',
                            '' + Messages.noResultFound + '',
                            '</div>'
                        ].join('\n'),
                        suggestion: Handlebars.compile([
                            '<div class="media">',
                            '<div class="pull-left">',
                            '<div class="media-object">',
                            '</div>',
                            '</div>',
                            '<div class="media-body">',
                            ' ',
                            ' <h5 class="media-heading">{{NameAr}} </h5>',
                            '</div>',
                            '</div>',
                        ].join(''))
                    },

                }).on('typeahead:selected', function ($e, datum) {
                    $("#txtAlbumSearch").attr('data-id', datum.Id);
                });
        }
    };
    var albumSearch = function () {
        $("#btnSearch").off('click').click(function () {
            albumsDataTableUpdate();
        });
    };
    var resetAlbumDataTable = function () {
        $("#btnClearForm").off("click").click(function () {
            $("#txtAlbumSearch").removeAttr("data-id");
            $("#txtAlbumSearch").val("");
            albumsDataTableUpdate();
        });
    };
    /***********/
    var attachmentsDataTable = function () {
        $('#tblAttachments').dataTable({
            "language": {
                "url": lang === "ar" ? "/Content/assets/global/plugins/DataTables-1.10.12/languages/ar.json" : ""
            },
            "bServerSide": true,
            "sAjaxSource": "/ControlPanel/getAttachmentsDataTable",
            "bProcessing": true,
            "dom": '<"bottom"t<"col-sm-3 "l><"col-sm-4"i><"col-sm-5"p>><"clear">',
            "aaSorting": [[5, 'asc']],
            "fnServerParams": function (aoData) {
                aoData.push({ "name": "Id", "value": $("#txtAttachmentSearch").attr("data-Id") },
                    { "name": "Type", "value": $("#ddlType").val() });
            },
            "bStateSave": true,
            "aoColumns": [
                { "sType": "html", "sWidth": '5%', "mDataProp": "Icon", "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '20%', "mDataProp": lang === "ar" ?  "NameAr" : "NameEn" },
                { "sType": "html", "sWidth": '25%', "mDataProp": "FileDescription" },
                { "sType": "html", "sWidth": '25%', "mDataProp": "InsertedDate", "bSortable": false },
                { "sType": "html", "sWidth": '20%', "mDataProp": "UserName" },
                { "sType": "html", "sWidth": '5%', "mDataProp": "Id", "sClass": "tdCenter" }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    $('td:eq(5)', nRow).html('<div class="btn-group">' +
                        '<a class="btn btnx  dark btn-outline btn-xs" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">' +
                        '<i class="fa fa-cog fa-fw fa-xs"></i>' +
                        '</a>' +
                        ' <ul class="dropdown-menu pull-right">' +
                        '<li>' +
                        '<a href="javascript:;" class="lnk btnSaveAttachment" data-id="' + aData.Id + '"><i class="fa fa-edit fa-fw"></i> ' + Messages.edit + '</a>' +
                        ' </li>' +
                        ' <li>' +
                        '<a href="javascript:;" class="lnk btnDeleteAttachment" data-id ="' + aData.Id + '"><i class="fa fa-trash fa-fw"></i> ' + Messages.delete + '</a>' +
                        ' </li>' +
                        ' </li>' +
                        ' <li>' +
                        '<a href="/Content/UploadedFile/Attachments/' + aData.FileName + '" download="' + aData.FileName + '" "target="_blank"  class="lnk btnDeleteAttachment" data-id ="' + aData.Id + '"><i class="fa fa-download fa-fw"></i> تحميل</a>' +
                        ' </li>' +
                        '</ul>' +
                        ' </div>');
                    $('td:eq(0)', nRow).html('<i style="font-size:40px;line-height: 40px" class="' + aData.Icon + '"><i/>');
                    //$('td:eq(1)', nRow).html('<span>' + aData.NameAr + '-' + aData.NameEn + '</span>');
                
                $(nRow).dblclick(function () {
                    saveAttachmentModel($(this).find(".btnSaveAttachment").attr("data-id"), $("#basicModal"));

                });
            },
            "fnDrawCallback": function (oSettings) {
                getSaveAttachmentModal();
                deleteAttachment();
            },
            "bFilter": false
            //"sPaginationType": "bootstrap"
        });
    };
    var attachmentsDataTableUpdate = function () {
        var oTable = $('#tblAttachments').dataTable();
        oTable.fnDraw(false);
    };
    var saveAttachmentModel = function (id, bsModal) {
        bsModal.html('');
        setTimeout(function () {
            bsModal.load('/ControlPanel/SaveAttachmentModal?id=' + id, '', function () {
                bsModal.modal('show');
                resetbooststrapSelect();
                handleBootstrapSelect();
                saveAttachment();
                uploadFile();
            });
        }, 100);
    }
    var getSaveAttachmentModal = function () {
        var bsModal = $("#basicModal");
        $(".btnSaveAttachment").off('click').click(function () {
            var id = $(this).attr("data-id");
            bsModal.html('');
            setTimeout(function () {
                bsModal.load('/ControlPanel/SaveAttachmentModal?id=' + id, '', function () {
                    bsModal.modal('show');
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                    saveAttachment();
                    uploadFile();

                });
            }, 100);
        });
    };
    var saveAttachment = function () {
        $('#SaveAttachmentForm').submit(function () {
            var form = this;
            var postData = $(form).serializeArray();
            var formUrl = $(form).attr("action");
            $.ajax({
                type: "POST",
                cache: false,
                url: formUrl,
                data: postData,
                dataType: "json",
                success: function (data) {
                    gsEnableSubmitButton(form);
                    if (data.cStatus === "success") {
                        completedSuccessfuly(data.cMsg);
                        attachmentsDataTableUpdate();

                        $(".scroll-to-top").click();
                    } else if (data.cStatus === "notValid") {
                        notValidOperations(data.cMsg);
                    }
                    else {
                        notValidOperations(data.cMsg);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    gsNotifyMsg('' + Messages.noResultFound + '', "error");
                    gsEnableSubmitButton(form);
                }
            });
        });
    }
    var deleteAttachment = function () {
        $(".btnDeleteAttachment").off('click').click(function () {
            var id = $(this).attr('data-Id');
            gsConfirm('' + Messages.deleteConfirm + '', function (result) {
                if (result) {
                    $.ajax({
                        type: "POST",
                        cache: false,
                        url: '/ControlPanel/DeleteAttachment',
                        dataType: "JSON",
                        data: { 'id': id },
                        success: function (data) {
                            if (data.cStatus === "success") {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                                attachmentsDataTableUpdate();

                            } else {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            gsNotifyMsg('' + Messages.noResultFound + '', "error");
                        }
                    });
                }
            });
        });
    };
    var attachmentSearchAutoComplete = function () {
        if (!$('#txtAttachmentSearch').hasClass('tt-input')) {
            var attachment = new Bloodhound({
                datumTokenizer: function (d) { return d.tokens; },
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                remote: {
                    url: '/ControlPanel/SearchAutoCompleteAttachment/%QUERY',
                    wildcard: '%QUERY'
                }
            });
            attachment.initialize();

            $('#txtAttachmentSearch').typeahead({
                hint: true,
                highlight: true,
                minLength: 1,
                dir: true
            }, {
                    name: 'search-attachment',
                    displayKey: 'FileDescription',
                    source: attachment.ttAdapter(),
                    limit: 20,
                    dir: true,
                    templates: {
                        empty: [
                            '<div class="empty-message">',
                            '' + Messages.noResultFound + '',
                            '</div>'
                        ].join('\n'),
                        suggestion: Handlebars.compile([
                            '<div class="media">',
                            '<div class="pull-left">',
                            '<div class="media-object">',
                            '</div>',
                            '</div>',
                            '<div class="media-body">',
                            ' ',
                            ' <h5 class="media-heading">{{FileDescription}} </h5>',
                            '</div>',
                            '</div>',
                        ].join(''))
                    },

                }).on('typeahead:selected', function ($e, datum) {
                    $("#txtAttachmentSearch").attr('data-id', datum.Id);
                });
        }
    };
    var attachmentSearch = function () {
        $("#btnSearch").off('click').click(function () {
            attachmentsDataTableUpdate();
        });
    };
    var resetAttachmentsDataTable = function () {
        $("#btnClearForm").off("click").click(function () {
            $("#txtAttachmentSearch").removeAttr("data-id");
            gsResetInsertForm("SearchForm");
            attachmentsDataTableUpdate();
        });
    };
    /************/
    var staticPagesDataTable = function () {
        $('#tblStaticPages').dataTable({
            "language": {
                "url": lang === "ar" ? "/Content/assets/global/plugins/DataTables-1.10.12/languages/ar.json" : ""
            },
            "bServerSide": true,
            "sAjaxSource": "/ControlPanel/getStaticPagesDataTable",
            "bProcessing": true,
            "dom": '<"bottom"t><"clear">',
            "aaSorting": [[3, 'asc']],
            //"fnServerParams": function (aoData) {
            //    aoData.push({ "name": "Name", "value": $("#txtNewsSearch").val() },
            //        { "name": "NewsTypeId", "value": $("#ddlNewsType").val() });
            //},
            "bStateSave": true,
            "aoColumns": [
                { "sType": "html", "sWidth": '15%', "mDataProp": "Image", "bSortable": false, "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '35%', "mDataProp": "PageNameAr", "bSortable": false, "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '35%', "mDataProp": "PageNameEn", "bSortable": false },
                { "sType": "html", "sWidth": '5%', "mDataProp": "Id", "sClass": "tdCenter" }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    $('td:eq(3)', nRow).html('<div class="btn-group">' +
                        '<a class="btn btnx  dark btn-outline btn-xs" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">' +
                        '<i class="fa fa-cog fa-fw fa-xs"></i>' +
                        '</a>' +
                        ' <ul class="dropdown-menu pull-right">' +
                        '<li>' +
                        '<a href="javascript:;" class="lnk btnSaveStaticPage" data-id="' + aData.Id + '"><i class="fa fa-edit fa-fw"></i> ' + Messages.edit + '</a>' +
                        ' </li>' +
                        ' <li>' +
                        '<a href="javascript:;" class="lnk btnDeletebtnSaveStatic" data-id ="' + aData.Id + '"><i class="fa fa-trash fa-fw"></i> ' + Messages.delete + '</a>' +
                        ' </li>' +
                        '</ul>' +
                        ' </div>');
                    $('td:eq(0)', nRow).html('<img  style="width: 200px;" alt="" src="/Content/UploadedFile/News/Thumbnail/' + aData.Image + ' " onError="this.onerror=null;this.src=\'/Content/UploadedFile/Account/Avatar/NoImage.png\';"/>');
                
                $(nRow).dblclick(function () {
                    saveStaticPagesModel($(this).find(".btnSaveStaticPage").attr("data-id"), $("#SaveModal"));

                });
            },
            "fnDrawCallback": function (oSettings) {
                getSaveStaticPagesModal();
                //deleteNewsAccount();
            },
            "bFilter": false
            //"sPaginationType": "bootstrap"
        });
    };
    var staticPagesDataTableUpdate = function () {
        var oTable = $('#tblStaticPages').dataTable();
        oTable.fnDraw(false);
    };
    var saveStaticPagesModel = function (id, bsModal) {
        bsModal.html('');
        $(".page-content").LoadingOverlay("show");
        setTimeout(function () {
            bsModal.load('/ControlPanel/SaveStaticPageModal?id=' + id, '', function () {
                $(".contentDiv").show();
                $(".tableDiv").hide();
                handleSummernote();
                closeModal();
                uploadImg($("#imgUploadUser"), $("#hdImage"));
                $(".page-content").LoadingOverlay("hide", true);
                saveStaticPages();
            });
        }, 100);
    }
    var getSaveStaticPagesModal = function () {
        var bsModal = $("#SaveModal");
        $(".btnSaveStaticPage").off('click').click(function () {
            var id = $(this).attr("data-id");
            bsModal.html('');
            $(".page-content").LoadingOverlay("show");
            setTimeout(function () {
                bsModal.load('/ControlPanel/SaveStaticPageModal?id=' + id, '', function () {
                    $(".contentDiv").show();
                    $(".tableDiv").hide();
                    handleSummernote();
                    closeModal();
                    uploadImg($("#imgUploadUser"), $("#hdImage"));
                    $(".page-content").LoadingOverlay("hide", true);
                    saveStaticPages();
                });
            }, 100);
        });
    };
    var saveStaticPages = function () {
        $('#SaveStaticPageForm').submit(function () {
            var form = this;
            var postData = $(form).serializeArray();
            var formUrl = $(form).attr("action");
            $.ajax({
                type: "POST",
                cache: false,
                url: formUrl,
                data: postData,
                dataType: "json",
                success: function (data) {
                    gsEnableSubmitButton(form);
                    if (data.cStatus === "success") {
                        completedSuccessfuly(data.cMsg);
                        staticPagesDataTableUpdate();
                        $(".scroll-to-top").click();
                    } else if (data.cStatus === "notValid") {
                        notValidOperations(data.cMsg);
                        $(".scroll-to-top").click();
                    }
                    else {
                        notValidOperations(data.cMsg);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    gsNotifyMsg('' + Messages.noResultFound + '', "error");
                    gsEnableSubmitButton(form);
                }
            });
        });
    }
    /********************/
    var intiDropZone = function () {
        $("#dropZoneImages").dropzone({
            maxFilesize: 700,
            sending: function (file, xhr, data) {
                data.append('albumId', $("#ddlMediaAlbumId").val());
            },
            queuecomplete: function (file, response) {
                gsNotifyMsg("تم رفع الصور بنجاح", "success");
                mediaDataTableUpdate();
            }

        });
    };
    var ddlAlbumChange = function () {
        $("#ddlMediaAlbumId").change(function () {
            $(".dropz").show();
        });
    };
    var mediaDataTable = function () {
        $('#tblMedia').dataTable({
            "language": {
                "url": lang === "ar" ? "/Content/assets/global/plugins/DataTables-1.10.12/languages/ar.json" : ""
            },
            "bServerSide": true,
            "sAjaxSource": "/ControlPanel/GetMediasDataTable",
            "bProcessing": true,
            "dom": '<"bottom"t<"col-sm-3 "l><"col-sm-4"i><"col-sm-5"p>><"clear">',
            "aaSorting": [[4, 'asc']],
            "fnServerParams": function (aoData) {
                aoData.push({ "name": "AlbumId", "value": $("#hdAlbumId").val() });
            },
            "bStateSave": true,
            "aoColumns": [
                { "sType": "html", "sWidth": '25%', "mDataProp": "FilePath", "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '25%', "mDataProp": lang === "ar" ? "MediaTypeAr" : "MediaTypeEn", "bSortable": false },
                { "sType": "html", "sWidth": '20%', "mDataProp": lang === "ar" ? "CaptionAr" : "CaptionEn" },
                { "sType": "html", "sWidth": '25%', "mDataProp": lang === "ar" ? "AlbumAr" : "AlbumEn", "bSortable": false },
                { "sType": "html", "sWidth": '5%', "mDataProp": "Id", "sClass": "tdCenter" }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    $('td:eq(4)', nRow).html('<div class="btn-group">' +
                        '<a class="btn btnx  dark btn-outline btn-xs" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">' +
                        '<i class="fa fa-cog fa-fw fa-xs"></i>' +
                        '</a>' +
                        ' <ul class="dropdown-menu pull-right">' +
                        '<li>' +
                        '<a href="javascript:;" class="lnk btnSaveMedia" data-id="' + aData.Id + '"><i class="fa fa-edit fa-fw"></i> ' + Messages.edit + '</a>' +
                        ' </li>' +
                        ' <li>' +
                        '<a href="javascript:;" class="lnk btnDeleteMedia" data-id ="' + aData.Id + '"><i class="fa fa-trash fa-fw"></i> ' + Messages.delete + '</a>' +
                        ' </li>' +
                        '</ul>' +
                        ' </div>');

                    //$('td:eq(1)', nRow).html('<span>' + aData.MediaTypeAr + '-' + aData.MediaTypeEn + '</span>');
                    //$('td:eq(3)', nRow).html('<span>' + aData.AlbumAr + '-' + aData.AlbumEn + '</span>');
                if (aData.MediaType === 11) {
                    $('td:eq(0)', nRow).html('<a class="colorBox" href="/Content/UploadedFile/Albums/Large/' + aData.FilePath + ' "><img  style="width: 150px;" alt="" src="/Content/UploadedFile/Albums/Thumbnail/' + aData.FilePath + ' " onError="this.onerror=null;this.src=\'/Content/UploadedFile/Albums/Thumbinal/NoImage.png\';"/></a>');
                }
                else if (aData.MediaType === 12) {
                    $('td:eq(0)', nRow).html('<a class="colorBoxVideoSound " href="' + convertToEmbed(aData.ExternalLink) + ' "><img  style="width: 150px;" alt="" src="https://img.youtube.com/vi/' + getVideoId(aData.ExternalLink) + '/0.jpg" onError="this.onerror=null;this.src=\'/Content/UploadedFile/Albums/Thumbinal/NoImage.png\';"/></a>');

                } else if (aData.MediaType === 13) {
                    $('td:eq(0)', nRow).html('<a class="colorBoxVideoSound" href="' + aData.ExternalLink + ' "><img  style="width: 150px;" alt="" src="https://pmcvariety.files.wordpress.com/2015/08/soundcloud-logo.jpg" onError="this.onerror=null;this.src=\'/Content/UploadedFile/Albums/Thumbinal/NoImage.png\';"/></a>');
                }
                $(nRow).dblclick(function () {
                    saveMediaModel($(this).find(".btnSaveMedia").attr("data-id"), $("#basicModal"));
                });
            },
            "fnDrawCallback": function (oSettings) {
                getSaveMediaModal();
                deleteMedia();
                $(".colorBox").colorbox({ photo: true });
                $(".colorBoxVideoSound").colorbox({ iframe: true, innerWidth: 640, innerHeight: 390 });

            },
            "bFilter": false
            //"sPaginationType": "bootstrap"
        });
    };
    var mediaDataTableUpdate = function () {
        var oTable = $('#tblMedia').dataTable();
        oTable.fnDraw(false);
    };
    var mediaDataTableUpdateWithReSort = function () {
        var oTable = $('#tblMedia').dataTable();
        oTable.fnDraw(true);
    };
    var saveMediaModel = function (id, bsModal) {
        bsModal.html('');
        setTimeout(function () {
            bsModal.load('/ControlPanel/SaveMediaModal?id=' + id, '', function () {
                bsModal.modal('show');
                resetbooststrapSelect();
                handleBootstrapSelect();
                saveMedia();
                uploadAlbums();
                intiDropZone();
                ddlAlbumChange();

                handelChangeType();
            });
        }, 100);
    }
    var getSaveMediaModal = function () {
        var bsModal = $("#basicModal");
        $(".btnSaveMedia").off('click').click(function () {
            var id = $(this).attr("data-id");
            bsModal.html('');
            setTimeout(function () {
                bsModal.load('/ControlPanel/SaveMediaModal?id=' + id, '', function () {
                    bsModal.modal('show');
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                    saveMedia();
                    uploadAlbums();
                    intiDropZone();
                    ddlAlbumChange();
                    handelChangeType();
                });
            }, 100);
        });
    };
    var saveMedia = function () {
        $('#SaveMediaForm').submit(function () {
            var form = this;
            var postData = $(form).serializeArray();
            var formUrl = $(form).attr("action");
            $.ajax({
                type: "POST",
                cache: false,
                url: formUrl,
                data: postData,
                dataType: "json",
                success: function (data) {
                    gsEnableSubmitButton(form);
                    if (data.cStatus === "success") {
                        completedSuccessfuly(data.cMsg);
                        mediaDataTableUpdate();


                        $(".scroll-to-top").click();
                    } else if (data.cStatus === "notValid") {
                        notValidOperations(data.cMsg);
                    }
                    else {
                        notValidOperations(data.cMsg);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    gsNotifyMsg('' + Messages.noResultFound + '', "error");
                    gsEnableSubmitButton(form);
                }
            });
        });
    }
    var deleteMedia = function () {
        $(".btnDeleteMedia").off('click').click(function () {
            var id = $(this).attr('data-Id');
            gsConfirm('' + Messages.deleteConfirm + '', function (result) {
                if (result) {
                    $.ajax({
                        type: "POST",
                        cache: false,
                        url: '/ControlPanel/DeleteMedia',
                        dataType: "JSON",
                        data: { 'id': id },
                        success: function (data) {
                            if (data.cStatus === "success") {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                                mediaDataTableUpdate();

                            } else {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            gsNotifyMsg('' + Messages.noResultFound + '', "error");
                        }
                    });
                }
            });
        });
    };
    var handelChangeType = function () {
        $("select.ddlMediaType").on("change", function () {
            var vl = $(this).val();
            if (vl === "11") {
                $(".divExternalLink").hide();
                $(this).closest(".row").find(".imageDiv").show();
                $(this).closest(".mediaDiv").removeClass("col-md-12").addClass("col-md-7");
            }
            else {
                $(".divExternalLink").show();
                $(this).closest(".row").find(".imageDiv").hide();
                $(this).closest(".mediaDiv").removeClass("col-md-7").addClass("col-md-12");
            }
        });
    };
    /**********************/
    var adsDataTable = function () {
        $('#tblAds').dataTable({
            "language": {
                "url": lang === "ar" ? "/Content/assets/global/plugins/DataTables-1.10.12/languages/ar.json" : ""
            },
            "bServerSide": true,
            "sAjaxSource": "/ControlPanel/GetAdssDataTable",
            "bProcessing": true,
            "dom": '<"bottom"t<"col-sm-3 "l><"col-sm-4"i><"col-sm-5"p>><"clear">',
            "aaSorting": [[5, 'asc']],
            "bStateSave": true,
            "aoColumns": [
                { "sType": "html", "sWidth": '15%', "mDataProp": "FilePath", "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '25%', "mDataProp": "StartDate" },
                { "sType": "html", "sWidth": '25%', "mDataProp": "EndDate" },
                { "sType": "html", "sWidth": '20%', "mDataProp": lang === "ar" ? "NameAr" : "NameEn" },
                { "sType": "html", "sWidth": '25%', "mDataProp": "IsActive" },
                { "sType": "html", "sWidth": '5%', "mDataProp": "Id", "sClass": "tdCenter" }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    $('td:eq(5)', nRow).html('<div class="btn-group">' +
                        '<a class="btn btnx  dark btn-outline btn-xs" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">' +
                        '<i class="fa fa-cog fa-fw fa-xs"></i>' +
                        '</a>' +
                        ' <ul class="dropdown-menu pull-right">' +
                        '<li>' +
                        '<a href="javascript:;" class="lnk btnSaveAds" data-id="' + aData.Id + '"><i class="fa fa-edit fa-fw"></i> ' + Messages.edit + '</a>' +
                        ' </li>' +
                        ' <li>' +
                        '<a href="javascript:;" class="lnk btnDeleteAds" data-id ="' + aData.Id + '"><i class="fa fa-trash fa-fw"></i> ' + Messages.delete + '</a>' +
                        ' </li>' +
                        '</ul>' +
                        ' </div>');
                    if (aData.Ext === "swf") {
                        $('td:eq(0)', nRow).html('<a class="colorBoxVideoSound" href="/Content/UploadedFile/Attachments/' + aData.FilePath + '"><object width="150" height="100"><param name="" value="/Content/UploadedFile/Attachments/' + aData.FilePath + '"><embed src="/Content/UploadedFile/Attachments/' + aData.FilePath + '" width="150" height="100"></embed></object></a>');
                    }
                    else {
                        $('td:eq(0)', nRow).html('<a class="colorBox" href="/Content/UploadedFile/Attachments/' + aData.FilePath + '"><img  style="width: 150px;" alt="" src="/Content/UploadedFile/Attachments/' + aData.FilePath + ' " onError="this.onerror=null;this.src=\'/Content/UploadedFile/Albums/Thumbinal/NoImage.png\';"/></a>');
                    }
                    if (aData.IsActive === true) {
                        $('td:eq(4)', nRow).html("<span class='font-green-meadow fa fa-fw fa-check-circle-o fa-lg'></span>");
                    } else {
                        $('td:eq(4)', nRow).html("<span class='font-red-thunderbird fa fa-fw fa-times-circle-o fa-lg'></span>");
                    }
                    //$('td:eq(3)', nRow).html('<span>' + aData.NameAr + '-' + aData.NameEn + '</span>');
                $(nRow).dblclick(function () {
                    saveAdsModel($(this).find(".btnSaveAds").attr("data-id"), $("#basicModal"));
                });
            },
            "fnDrawCallback": function (oSettings) {
                getSaveAdsModal();
                deleteAds();
                $(".colorBox").colorbox({ photo: true });
                $(".colorBoxVideoSound").colorbox({ iframe: true, innerWidth: 640, innerHeight: 390 });
            },
            "bFilter": false
            //"sPaginationType": "bootstrap"
        });
    };
    var adsDataTableUpdate = function () {
        var oTable = $('#tblAds').dataTable();
        oTable.fnDraw(false);
    };
    var saveAdsModel = function (id, bsModal) {
        bsModal.html('');
        setTimeout(function () {
            bsModal.load('/ControlPanel/SaveAdsModal?id=' + id, '', function () {
                bsModal.modal('show');
                resetbooststrapSelect();
                handleBootstrapSelect();
                saveAds();
                uploadFile();
                handleDatePickers();
            });
        }, 100);
    }
    var getSaveAdsModal = function () {
        var bsModal = $("#basicModal");
        $(".btnSaveAds").off('click').click(function () {
            var id = $(this).attr("data-id");
            bsModal.html('');
            setTimeout(function () {
                bsModal.load('/ControlPanel/SaveAdsModal?id=' + id, '', function () {
                    bsModal.modal('show');
                    resetbooststrapSelect();
                    handleBootstrapSelect();
                    saveAds();
                    uploadFile();
                    handleDatePickers();
                });
            }, 100);
        });
    };
    var saveAds = function () {
        $('#SaveAdsForm').submit(function () {
            var form = this;
            var postData = $(form).serializeArray();
            var formUrl = $(form).attr("action");
            $.ajax({
                type: "POST",
                cache: false,
                url: formUrl,
                data: postData,
                dataType: "json",
                success: function (data) {
                    gsEnableSubmitButton(form);
                    if (data.cStatus === "success") {
                        completedSuccessfuly(data.cMsg);
                        adsDataTableUpdate();

                        $(".scroll-to-top").click();
                    } else if (data.cStatus === "notValid") {
                        notValidOperations(data.cMsg);
                    }
                    else {
                        notValidOperations(data.cMsg);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    gsNotifyMsg('' + Messages.noResultFound + '', "error");
                    gsEnableSubmitButton(form);
                }
            });
        });
    }
    var deleteAds = function () {
        $(".btnDeleteAds").off('click').click(function () {
            var id = $(this).attr('data-Id');
            gsConfirm('' + Messages.deleteConfirm + '', function (result) {
                if (result) {
                    $.ajax({
                        type: "POST",
                        cache: false,
                        url: '/ControlPanel/DeleteAds',
                        dataType: "JSON",
                        data: { 'id': id },
                        success: function (data) {
                            if (data.cStatus === "success") {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                                adsDataTableUpdate();

                            } else {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            gsNotifyMsg('' + Messages.noResultFound + '', "error");
                        }
                    });
                }
            });
        });
    };
    /*****************/
    var importantLinksDataTable = function () {
        $('#tblImportantLinks').dataTable({
            "language": {
                "url": lang === "ar" ? "/Content/assets/global/plugins/DataTables-1.10.12/languages/ar.json" : ""
            },
            "bServerSide": true,
            "sAjaxSource": "/ControlPanel/GetImportantLinkssDataTable",
            "bProcessing": true,
            "dom": '<"bottom"t<"col-sm-3 "l><"col-sm-4"i><"col-sm-5"p>><"clear">',
            "aaSorting": [[3, 'asc']],
            "bStateSave": true,
            "aoColumns": [
                { "sType": "html", "sWidth": '10%', "mDataProp": "Image", "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '80%', "mDataProp": "Name" },
                { "sType": "html", "sWidth": '5%', "mDataProp": "IsActive" },
                { "sType": "html", "sWidth": '5%', "mDataProp": "Id", "sClass": "tdCenter" }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    $('td:eq(3)', nRow).html('<div class="btn-group">' +
                        '<a class="btn btnx  dark btn-outline btn-xs" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">' +
                        '<i class="fa fa-cog fa-fw fa-xs"></i>' +
                        '</a>' +
                        ' <ul class="dropdown-menu pull-right">' +
                        '<li>' +
                        '<a href="javascript:;" class="lnk btnSaveImportantLinks" data-id="' + aData.Id + '"><i class="fa fa-edit fa-fw"></i> ' + Messages.edit + '</a>' +
                        ' </li>' +
                        ' <li>' +
                        '<a href="javascript:;" class="lnk btnDeleteImportantLinks" data-id ="' + aData.Id + '"><i class="fa fa-trash fa-fw"></i> ' + Messages.delete + '</a>' +
                        ' </li>' +
                        '</ul>' +
                        ' </div>');
                    $('td:eq(1)', nRow).html("<a target='_blank' href='" + aData.Link + "'>" + aData.Name + "</a>");
                    $('td:eq(0)', nRow).html('<img  style="width: 100px;" alt="" src="/Content/UploadedFile/Albums/Thumbnail/' + aData.Image + ' " onError="this.onerror=null;this.src=\'/Content/UploadedFile/Albums/Thumbinal/NoImage.png\';"/>');
                
                if (aData.IsActive === true) {
                    $('td:eq(2)', nRow).html("<span class='font-green-meadow fa fa-fw fa-check-circle-o fa-lg'></span>");
                } else {
                    $('td:eq(2)', nRow).html("<span class='font-red-thunderbird fa fa-fw fa-times-circle-o fa-lg'></span>");
                }
                $(nRow).dblclick(function () {
                    saveImportantLinksModel($(this).find(".btnSaveImportantLinks").attr("data-id"), $("#basicModal"));
                });
            },
            "fnDrawCallback": function (oSettings) {
                getSaveImportantLinksModal();
                deleteImportantLinks();
            },
            "bFilter": false
            //"sPaginationType": "bootstrap"
        });
    };
    var importantLinksDataTableUpdate = function () {
        var oTable = $('#tblImportantLinks').dataTable();
        oTable.fnDraw(false);
    };
    var saveImportantLinksModel = function (id, bsModal) {
        bsModal.html('');
        setTimeout(function () {
            bsModal.load('/ControlPanel/SaveImportantLinksModal?id=' + id, '', function () {
                bsModal.modal('show');
                saveImportantLinks();
                uploadAlbums();
            });
        }, 100);
    }
    var getSaveImportantLinksModal = function () {
        var bsModal = $("#basicModal");
        $(".btnSaveImportantLinks").off('click').click(function () {
            var id = $(this).attr("data-id");
            bsModal.html('');
            setTimeout(function () {
                bsModal.load('/ControlPanel/SaveImportantLinksModal?id=' + id, '', function () {
                    bsModal.modal('show');
                    saveImportantLinks();
                    uploadAlbums();
                });
            }, 100);
        });
    };
    var saveImportantLinks = function () {
        $('#SaveImportantLinksForm').submit(function () {
            var form = this;
            var postData = $(form).serializeArray();
            var formUrl = $(form).attr("action");
            $.ajax({
                type: "POST",
                cache: false,
                url: formUrl,
                data: postData,
                dataType: "json",
                success: function (data) {
                    gsEnableSubmitButton(form);
                    if (data.cStatus === "success") {
                        completedSuccessfuly(data.cMsg);
                        importantLinksDataTableUpdate();

                        $(".scroll-to-top").click();
                    } else if (data.cStatus === "notValid") {
                        notValidOperations(data.cMsg);
                    }
                    else {
                        notValidOperations(data.cMsg);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    gsNotifyMsg('' + Messages.noResultFound + '', "error");
                    gsEnableSubmitButton(form);
                }
            });
        });
    }
    var deleteImportantLinks = function () {
        $(".btnDeleteImportantLinks").off('click').click(function () {
            var id = $(this).attr('data-Id');
            gsConfirm('' + Messages.deleteConfirm + '', function (result) {
                if (result) {
                    $.ajax({
                        type: "POST",
                        cache: false,
                        url: '/ControlPanel/DeleteImportantLinks',
                        dataType: "JSON",
                        data: { 'id': id },
                        success: function (data) {
                            if (data.cStatus === "success") {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                                importantLinksDataTableUpdate();

                            } else {
                                gsNotifyMsg(data.cMsg, data.cStatus);
                            }
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            gsNotifyMsg('' + Messages.noResultFound + '', "error");
                        }
                    });
                }
            });
        });
    };
    /*****************/
    var saveSn = function () {
        $('#btnAdd').off('click').click(function () {
            var lst = [];
            $.each($(".social"), function (indexh, cb) {

                var Social = {
                    Id: $(cb).attr('SID'),
                    Link: $(cb).val()

                }
                lst.push(Social);
            });

            var str = JSON.stringify(lst, null, 2);
            $.ajax({
                type: 'post',
                dataType: 'json',
                url: '/ControlPanel/UpdateSocial',
                data: { 'str': str },
                success: function (data) {
                    if ($('.jquery-notific8-notification').length > 0) {
                        $('.jquery-notific8-notification').remove();
                    }
                    gsNotifyMsg(data.cMsg, data.cStatus);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if ($('.jquery-notific8-notification').length > 0) {
                        $('.jquery-notific8-notification').remove();
                    }
                    gsNotifyMsg('حدث خطأ ما! , الرجاء المحاولة ثانية', 'error');
                }
            });


        });
    }

    var appSettingsDataTable = function () {
        $('#tblAppSettings').dataTable({
            "language": {
                "url": lang === "ar" ? "/Content/assets/global/plugins/DataTables-1.10.12/languages/ar.json" : ""
            },
            "bServerSide": true,
            "sAjaxSource": "/ControlPanel/getAppSettingsDataTable",
            "bProcessing": true,
            "dom": '<"clear">',
            "aaSorting": [[2, 'asc']],
            //"fnServerParams": function (aoData) {
            //    aoData.push({ "name": "Id", "value": $("#txtAppSettingsSearch").attr("data-Id") },
            //        { "name": "Type", "value": $("#ddlType").val() });
            //},
            "bStateSave": true,
            "aoColumns": [
                { "sType": "html", "sWidth": '10%', "mDataProp": "KeyNameAr", "sClass": "tdCenter" },
                { "sType": "html", "sWidth": '15%', "mDataProp": "ValueNameAr" },
                { "sType": "html", "sWidth": '5%', "mDataProp": "ConKey", "sClass": "tdCenter" }
            ],
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    $('td:eq(2)', nRow).html('<div class="btn-group">' +
                        '<a class="btn btnx  dark btn-outline btn-xs" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true" aria-expanded="false">' +
                        '<i class="fa fa-cog fa-fw fa-xs"></i>' +
                        '</a>' +
                        ' <ul class="dropdown-menu pull-right">' +
                        '<li>' +
                        '<a href="javascript:;" class="lnk btnViewAppSettings" data-id="' + aData.ConKey + '"><i class="fa fa-edit fa-fw"></i> ' + Messages.edit + '</a>' +
                        ' </li>' +
                        ' </li>' +
                        '</ul>' +
                        ' </div>');
                    $('td:eq(0)', nRow).html(joinString(aData.KeyNameAr, aData.KeyNameEn));
                    $('td:eq(1)', nRow).html(joinString(aData.ValueNameAr, aData.ValueNameEn));
                $(nRow).dblclick(function () {
                    saveAppSettingsModel($(this).find(".btnViewAppSettings").attr("data-id"), $("#basicModal"));
                });
            },
            "fnDrawCallback": function (oSettings) {
                getSaveAppSettingsModal();
            },
            "bFilter": false
            //"sPaginationType": "bootstrap"
        });
    };
    var appSettingsDataTableUpdate = function () {
        var oTable = $('#tblAppSettings').dataTable();
        oTable.fnDraw(false);
    };
    var saveAppSettingsModel = function (id, bsModal) {
        bsModal.html('');
        setTimeout(function () {
            bsModal.load('/ControlPanel/SaveAppSettingsModal?id=' + id, '', function () {
                bsModal.modal('show');
                saveAppSettings();
                handleBootstrapSelect();

            });
        }, 100);
    }
    var getSaveAppSettingsModal = function () {
        var bsModal = $("#basicModal");
        $(".btnViewAppSettings").off('click').click(function () {
            var id = $(this).attr("data-id");
            bsModal.html('');
            setTimeout(function () {
                bsModal.load('/ControlPanel/SaveAppSettingsModal?id=' + id, '', function () {
                    bsModal.modal('show');
                    saveAppSettings();
                    handleBootstrapSelect();

                });
            }, 100);
        });
    };
    var saveAppSettings = function () {
        $('#SaveAppSettingsForm').submit(function () {
            var form = this;
            var postData = $(form).serializeArray();
            var formUrl = $(form).attr("action");
            $.ajax({
                type: "POST",
                cache: false,
                url: formUrl,
                data: postData,
                dataType: "json",
                success: function (data) {
                    gsEnableSubmitButton(form);
                    if (data.cStatus === "success") {
                        completedSuccessfuly(data.cMsg);
                        appSettingsDataTableUpdate();
                        $(".scroll-to-top").click();
                    } else if (data.cStatus === "notValid") {
                        notValidOperations(data.cMsg);
                    }
                    else {
                        notValidOperations(data.cMsg);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    gsNotifyMsg('' + Messages.noResultFound + '', "error");
                    gsEnableSubmitButton(form);
                }
            });
        });
    }
    /***************/


    return {
        initNews: function() {
            newsDataTable($("#tblNews").attr("data-categoryid"));
            newsSearchAutoComplete();
            newsSearch();
            resetNewsDataTable();
            handleDatePickers();
        },
        initCategory: function() {
            categoriesDataTable();
        },
        initMedia: function() {
            albumsDataTable();
            albumSearchAutoComplete();
            albumSearch();
            resetAlbumDataTable();
            mediaDataTable();
        },
        initAttachments: function() {
            attachmentsDataTable();
            attachmentSearchAutoComplete();
            attachmentSearch();
            resetAttachmentsDataTable();
        },
        initStaticPages: function() {
            staticPagesDataTable();
            handleSummernote();
            closeModal();
            uploadImg($("#imgUploadUser"), $("#hdImage"));
            uploadImg($("#imgUploadUser2"), $("#hdImage2"));
            uploadImg($("#imgUploadUser3"), $("#hdImage3"));

            saveStaticPages();
        },
        initAds: function() {
            adsDataTable();
        },
        initSocial: function() {
            saveSn();
        },
        initContactUs() {
            contactUsDataTable();
        },
        initAppSettings() {
            appSettingsDataTable();
        },
        initImportantLinks: function() {
            importantLinksDataTable();
        },
        initAgeCategory: function() {
            AgeCategoryDataTable();
        }

    };
}();