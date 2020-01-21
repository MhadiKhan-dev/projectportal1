var DatatablesSearchOptionsAdvancedSearch = function() {
    $.fn.dataTable.Api.register("column().title()", function() {
        return $(this.header()).text().trim()
    });
    return {
        init: function() {
            var a;
            var lnk = $("#billings-table").data('link');
            //console.log($("#dt-table thead tr th"));
            a = $("#billings-table").DataTable({
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
                    {data: 'type', name: 'type', orderable:false, searchable: true, className: "text-center"},
                    {data: 'payment_method', name: 'payment_method', orderable:false, searchable: false, className: "text-center"},
                    {data: 'amount', name: 'amount', orderable:false, searchable: false, className: "text-center"},
                    {data: 'created_at', name: 'created_at', searchable: false, className: "text-center"},
                    {data: 'action', name: 'action', orderable:false, searchable: false, className: "text-center"},
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