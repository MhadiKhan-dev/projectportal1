var DatatablesSearchOptionsAdvancedSearch = function() {
    $.fn.dataTable.Api.register("column().title()", function() {
        return $(this.header()).text().trim()
    });
    return {
        init: function() {
            var a;
            var lnk = $("#linkPaymentRequests-table").data('link');
            //console.log($("#dt-table thead tr th"));
            a = $("#linkPaymentRequests-table").DataTable({
                responsive: !0,
                dom: "<'row'<'col-sm-12'tr>>\n\t\t\t<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>",
                lengthMenu: [5, 10, 25, 50],
                pageLength: 50,
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
                columns: [
                    {data: 'id', name: 'id', orderable: false,},
                    {data: 'user_id', name: 'user_id'},
                    {data: 'link_id', name: 'link_id'},
                    {data: 'vendor_name', name: 'vendor_name'},
                    {data: 'paypal_info', name: 'paypal_info'},
                    {data: 'amount', name: 'amount'},
                    {data: 'teamlead_approved', name: 'teamlead_approved'},
                    {data: 'status', name: 'status'},
                    {data: 'transaction_id', name: 'transaction_id'},
                    {data: 'due_at', name: 'due_at'},
                    {data: 'created_at', name: 'created_at'},
                    {data: 'action', name: 'action', orderable: false, searchable: false},
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
            })
        }
    }
}();
jQuery(document).ready(function() {
    DatatablesSearchOptionsAdvancedSearch.init()
});