var DatatablesSearchOptionsAdvancedSearch = function() {
    $.fn.dataTable.Api.register("column().title()", function() {
        return $(this.header()).text().trim()
    });
    $.fn.dataTable.ext.buttons.bulk_assign = {
        text: 'Assign Team Lead',
        action: function ( e, dt, node, config ) {
            //dt.ajax.reload();
            var user_ids = [];
            $.each($("input[name=user_ids]:checked"), function(){            
                user_ids.push($(this).val());
            });

            if(user_ids.length <= 0){
                swal("Error","Please Select records!","error");
                return;
            }

            $('#assignModal').modal({'show' : true})
            $('.assign_user').on('click', function(){
                var parent_id = $('#assignModal .modal-body select[name="parent_id"]').val();
                $.ajax({
                  type: "POST",
                  url: $("#assignForm").data('action'),
                  data: { parent_id: parent_id, user_ids: user_ids },
                  headers: {
                      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                  },
                  success: function( json ) {
                      $('#assignModal').modal('hide');
                      window.location = json.url
                  },
                });
            });
        }
    };
    return {
        init: function() {
            var a;
            var lnk = $("#users-table").data('link');
            //console.log($("#dt-table thead tr th"));
            a = $("#users-table").DataTable({
                responsive: !0,
                dom: "<'row'<'col-sm-12 text-right'B>>\n\t\t\t<'row'<'col-sm-12'tr>>\n\t\t\t<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>",
                lengthMenu: [5, 10, 25, 50],
                pageLength: 50,
                buttons: ["print", "copyHtml5", "excelHtml5", "csvHtml5", "pdfHtml5", "bulk_assign"],
                language: {
                    lengthMenu: "Display _MENU_"
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
                headerCallback: function(e, a, t, n, s) {
                    e.getElementsByTagName("th")[0].innerHTML = '\n                    <label class="m-checkbox m-checkbox--single m-checkbox--solid m-checkbox--metal">\n                        <input type="checkbox" value="" class="m-group-checkable">\n                        <span></span>\n                    </label>'
                },
                columns: [
                    {   
                        data: 'id', 
                        width: "10px",
                        name: 'id',
                        className: "dt-right",
                        orderable: false,
                        render: function(e, a, t, n) {
                            return '\n                        <label class="m-checkbox m-checkbox--single m-checkbox--solid m-checkbox--metal">\n                            <input type="checkbox" name="user_ids" value="'+ e +'" class="m-checkable">\n                            <span></span>\n                        </label>'
                        }
                    },
                    {data: 'name', name: 'name'},
                    {data: 'email', name: 'email'},
                    {data: 'role', name: 'role'},
                    {data: 'created_at', name: 'created_at'},
                    {data: 'action', name: '', orderable: false, searchable: false},

                ],
                

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
                })
        }
    }
}();
jQuery(document).ready(function() {
    DatatablesSearchOptionsAdvancedSearch.init()
});