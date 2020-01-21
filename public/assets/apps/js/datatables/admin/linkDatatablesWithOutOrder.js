var DatatablesSearchOptionsAdvancedSearch = function() {
    var teamlead = $("#links-table").data('teamlead');
    $.fn.dataTable.Api.register("column().title()", function() {
        return $(this.header()).text().trim()
    });
    $.fn.dataTable.ext.buttons.change_status = {
        text: 'Change Status',
        action: function ( e, dt, node, config ) {
            //dt.ajax.reload();
            var link_ids = [];
            $.each($("input[name=link_ids]:checked"), function(){            
                link_ids.push($(this).val());
            });

            if(link_ids.length <= 0){
                swal("Error","Please Select links!","error");
                
            }else{
                $('#multistatusModal').modal({'show' : true})
                $('.change_multi_link_status').on('click', function(){
                    var status = $('#multistatusModal .modal-body select[name="status"]').val();
                    $.ajax({
                      type: "POST",
                      url: $("#multistatusModalForm").data('action'),
                      data: { status: status, link_id: link_ids },
                      headers: {
                          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                      },
                      success: function( json ) {
                          $('#multistatusModal').modal('hide');
                          window.location = json.url
                      },
                    });
                });
            }
            
            
            // $('#assignModal').on('show.bs.modal', function (event) {
            //     var button = $(event.relatedTarget) // Button that triggered the modal
            //     var link_id = button.data('id') // Extract info from data-* attributes
            //     var modal = $(this)
            //     //modal.find('.modal-body input[name="link_id"]').val(link_id);
            //   });
            console.log(link_ids);
        }
    };
    
    $.fn.dataTable.ext.buttons.bulk_assign = {
        text: 'Bulk Assign',
        action: function ( e, dt, node, config ) {
            //dt.ajax.reload();
            var link_ids = [];
            $.each($("input[name=link_ids]:checked"), function(){            
                link_ids.push($(this).val());
            });
            if(!teamlead){
                swal("Error","Not Allowed!","error");
                return 0;
            }
            if(link_ids.length <= 0){
                swal("Error","Please Select records!","error");
                
            }else{
                $('#multiassignModal').modal({'show' : true})
                $('.assign_multi_user').on('click', function(){
                    var user_id = $('#multiassignModal .modal-body select[name="user_id"]').val();
                    $.ajax({
                      type: "POST",
                      url: $("#multiassignForm").data('action'),
                      data: { user_id: user_id, link_id: link_ids },
                      headers: {
                          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                      },
                      success: function( json ) {
                          $('#multiassignModal').modal('hide');
                          window.location = json.url
                      },
                    });
                });
            }
        }
    };
        //console.log($.fn.dataTable.ext);
    
    
    return {
        init: function() {
            var a;
            var lnk = $("#links-table").data('link');
            //var teamlead = $("#links-table").data('teamlead');
            //console.log($("#dt-table thead tr th"));
            a = $("#links-table").DataTable({
                responsive: !0,
                dom: "<'row'<'col-sm-12 text-right' B 'tr'>>\n\t\t\t<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>",
                lengthMenu: [ [10, 25, 50, -1], [10, 25, 50, "All"] ],
                pageLength: 50,
                language: {
                    lengthMenu: "Display _MENU_"
                },
                buttons: ["print", "copyHtml5", "excelHtml5", "csvHtml5", "pdfHtml5", "change_status", "bulk_assign"],
                saveState: {
                    cookie: !1,
                    webstorage: !0
                },
                searchDelay: 500,
                processing: !0,
                serverSide: !0,
                ajax: {
                    url: lnk,
                    type: "GET",
                    data: function(d) {
                            d.s = $('input[name=start]').val();
                            d.e = $('input[name=end]').val();
                        }
                },
                createdRow: function( row, data, dataIndex ) {
                    // Check if days remaining is == 0 and status is not delvered
                    if(data.timer == 0 && data.status != 'delivered'){
                        $( row ).addClass('m-table__row--danger m--font-bolder');
                    }
                },
                fnRowCallback: function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
                    switch(aData['status']) {
                        case "delivered" :
                            $('td:eq(3)', nRow).html('<span class="m-badge  m-badge--success m-badge--wide"> Delivered </span>');
                            break;
                        case "outreaching":
                            $('td:eq(3)', nRow).html('<span class="m-badge  m-badge--warning m-badge--wide"> Outreaching </span>');
                            break;
                        case "writing":
                            $('td:eq(3)', nRow).html('<span class="m-badge  m-badge--accent m-badge--wide"> Writing </span>');
                            break;
                        case "link submission":
                            $('td:eq(3)', nRow).html('<span class="m-badge  m-badge--info m-badge--wide"> Link Submission </span>');
                            break;         
                        default:
                            $('td:eq(3)', nRow).html('<span class="m-badge  m-badge--danger m-badge--wide"> Not Delivered </span>');
                    }
                    switch(aData['priority']) {
                        case "high" :
                            $('td:eq(1)', nRow).html('<span class="m-badge  m-badge--warning"></span> '+aData['id']);
                            break;
                        case "medium":
                            $('td:eq(1)', nRow).html('<span class="m-badge  m-badge--info"></span> '+aData['id']);
                            break;
                        case "low":
                            $('td:eq(1)', nRow).html('<span class="m-badge  m-badge--success"></span> '+aData['id']);
                            break;
                        default:
                            $('td:eq(1)', nRow).html(aData['id']);
                    }

                    var progress = '<span class="m--font-bolder" style="text-align:center">'+ aData['timer'] +' Days</span>';
                    var days_remaining = (100 * aData['timer']) / 40;

                    progress += '<div class="progress">';
                    progress += '<div class="progress-bar progress-bar-striped bg-danger" role="progressbar" style="width: '+ days_remaining +'%" aria-valuenow="'+ aData['timer'] +'" aria-valuemin="0" aria-valuemax="40"></div>';
                    progress += '</div>';

                    if(aData['status'] == 'delivered'){
                        $('td:eq(2)', nRow).html("-"); 
                    }else{
                        $('td:eq(2)', nRow).html(progress);
                    }
                    
                    return nRow;
                },
                headerCallback: function(e, a, t, n, s) {
                    e.getElementsByTagName("th")[0].innerHTML = '\n<label class="m-checkbox m-checkbox--single m-checkbox--solid m-checkbox--metal">\n                        <input type="checkbox" value="" class="m-group-checkable">\n                        <span></span>\n                    </label>'
                },
                columns: [
                    {   
                        data: 'id', 
                        width: "10px",
                        name: 'id',
                        className: "dt-right",
                        orderable: false,
                        render: function(e, a, t, n) {
                            return '\n                        <label class="m-checkbox m-checkbox--single m-checkbox--solid m-checkbox--metal">\n                            <input type="checkbox" name="link_ids" value="'+ e +'" class="m-checkable">\n                            <span></span>\n                        </label>'
                        }
                    },
                    {data: 'id', orderable: false, name: 'id', className: 'text-center'},
                    {data: 'timer', orderable: true, name: 'timer', className: 'text-center'},
                    {data: 'status', orderable: false, name: 'status'},
                    {data: 'agency', orderable: false, name: 'agency', className: 'text-center'},
                    {data: 'user_id', orderable: false, name: 'user_id'},
                    {data: 'product_id', orderable: false, name: 'product_id'},
                    {data: 'country', orderable: false, name: 'country'},
                    {data: 'anchor_text', orderable: false, name: 'anchor_text'},
                    {data: 'live_link', orderable: false, name: 'live_link'},
                    {data: 'destination_link', orderable: false, name: 'destination_link'},
                    {data: 'da', orderable: false, name: 'da'},
                    {data: 'primary_category', orderable:false, name: 'primary_category'},
                    {data: 'secondry_category', orderable:false, name: 'secondry_category'},
                    {data: 'spam_score', orderable: false, name: 'spam_score'},
                    {data: 'do_follow', orderable: false, name: 'do_follow'},
                    {data: 'published_at', orderable: true, name: 'published_at'},
                    {data: 'created_at', orderable: true, name: 'created_at'},
                    {data: 'action', name: '', orderable: false, searchable: false},
                ]
            }), $("#m_search").on("click", function(t) {
                t.preventDefault();
                var e = {};
                $(".m-input").each(function() {
                    var a = $(this).data("col-index");
                    e[a] ? e[a] += "|" + $(this).val() : e[a] = $(this).val()
                }), $.each(e, function(t, e) {
                    //console.log(e);
                    a.column(t).search(e || "", !1, !1)
                }), a.table().draw()
            }), $("#m_reset").on("click", function(t) {
                t.preventDefault(), $(".m-input").each(function() {
                    $(this).val(""), a.column($(this).data("col-index")).search("", !1, !1)
                }), a.table().draw()
            }), $("#m_datepicker").datepicker({
                todayHighlight: !0,
                format: 'mm/dd/yyyy',
                templates: {
                    leftArrow: '<i class="la la-angle-left"></i>',
                    rightArrow: '<i class="la la-angle-right"></i>'
                }
            }), a.on("change", ".m-group-checkable", function() {
                    var e = $(this).closest("table").find("td:first-child .m-checkable"),
                        d = $(this).is(":checked");
                    $(e).each(function() {
                        d ? ($(this).prop("checked", !0), $(this).closest("tr").addClass("active")) : ($(this).prop("checked", !1), $(this).closest("tr").removeClass("active"))
                    })
                    //var c = a.rows(".active").nodes().length;
                    //$("#m_datatable_selected_number").html(c), c > 0 ? $("#m_datatable_group_action_form").collapse("show") : $("#m_datatable_group_action_form").collapse("hide")
                }), a.on("change", "tbody tr .m-checkbox", function() {
                    $(this).parents("tr").toggleClass("active")
                });
        }
    }

}();
jQuery(document).ready(function() {
    DatatablesSearchOptionsAdvancedSearch.init();

});