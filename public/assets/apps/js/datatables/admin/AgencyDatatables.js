var DatatablesSearchOptionsAdvancedSearch = function() {
    $.fn.dataTable.Api.register("column().title()", function() {
        return $(this.header()).text().trim()
    });
    return {
        init: function() {
            var a;
            var lnk = $("#agency-table").data('link');
            //console.log($("#dt-table thead tr th"));
            a = $("#agency-table").DataTable({
                responsive: !0,
                dom: "<'row'<'col-sm-12 text-right'B>>\n\t\t\t<'row'<'col-sm-12'tr>>\n\t\t\t<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>",
                lengthMenu: [ [10, 25, 50, -1], [10, 25, 50, "All"] ],
                pageLength: 50,
                language: {
                    lengthMenu: "Display _MENU_"
                },
                buttons: ["print", "copyHtml5", "excelHtml5", "csvHtml5", "pdfHtml5"],
                // drawCallback: function(a) {
                //     var e = this.api(),
                //         t = e.rows({
                //             page: "current"
                //         }).nodes(),
                //         n = null;
                //     e.column(0, {
                //         page: "current"
                //     }).data().each(function(a, e) {
                //         n !== a && ($(t).eq(e).before('<tr class="group"><td colspan="10">' + a + "</td></tr>"), n = a)
                //     })
                // },
                
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
                    {data: 'name', orderable: false, name: 'name'},
                    {data: 'email', orderable: false, name: 'email'},
                    {data: 'current_active_orders', orderable: false, name: 'current_active_orders', className: "text-center"},
                    {data: 'customer_status', orderable: false, name: 'customer_status', className: "text-center"},
                    {data: 'total_links', orderable: false, name: 'total_links', className: "text-center"},
                    {data: 'order_value', orderable: false, name: 'order_value', className: "text-center"},
                    {data: 'role', orderable: false, name: 'role'},
                    {data: 'agency', orderable: false, name: 'agency'},
                    {data: 'created_at', name: 'created_at', searchable: false, className: "text-center"},
                    {data: 'action', name: '', orderable: false, searchable: false, className: "text-center"},
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
            }), $("#export_print").on("click", function(e) {
                e.preventDefault(), a.button(0).trigger()
            }), $("#export_copy").on("click", function(e) {
                e.preventDefault(), a.button(1).trigger()
            }), $("#export_excel").on("click", function(e) {
                e.preventDefault(), a.button(2).trigger()
            }), $("#export_csv").on("click", function(e) {
                e.preventDefault(), a.button(3).trigger()
            }), $("#export_pdf").on("click", function(e) {
                e.preventDefault(), a.button(4).trigger()
            })
        }
    }
}();
jQuery(document).ready(function() {
    DatatablesSearchOptionsAdvancedSearch.init()
});