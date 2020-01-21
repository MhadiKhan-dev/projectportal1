var DatatablesSearchOptionsAdvancedSearch = function() {
    $.fn.dataTable.Api.register("column().title()", function() {
        return $(this.header()).text().trim()
    });
    return {
        init: function() {
            var a;
            var lnk = $("#links-table").data('link');
            //console.log($("#dt-table thead tr th"));
            a = $("#links-table").DataTable({
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
                fnRowCallback: function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {

                    switch(aData['status']) {
                        case "delivered" :
                            $('td:eq(12)', nRow).html('<span class="m-badge  m-badge--success m-badge--wide"> Delivered </span>');
                            break;
                        case "outreaching":
                            $('td:eq(12)', nRow).html('<span class="m-badge  m-badge--warning m-badge--wide"> Outreaching </span>');
                            break;
                        case "writing":
                            $('td:eq(12)', nRow).html('<span class="m-badge  m-badge--accent m-badge--wide"> Writing </span>');
                            break;
                        case "link submission":
                            $('td:eq(12)', nRow).html('<span class="m-badge  m-badge--info m-badge--wide"> Link Submission </span>');
                            break;
                        default:
                            $('td:eq(12)', nRow).html('<span class="m-badge  m-badge--danger m-badge--wide"> Not Delivered </span>');
                    }

                    return nRow;
                },
                columns: [
                    {data: 'id', orderable: false, name: 'id'},
                    {data: 'product_id', orderable: false, name: 'product_id'},
                    {data: 'destination_link', orderable:false, name: 'destination_link'},
                    {data: 'anchor_text', orderable:false, name: 'anchor_text'},
                    {data: 'live_link', orderable:false, name: 'live_link'},
                    {data: 'da', orderable:false, name: 'da'},
                    {data: 'primary_category', orderable:false, name: 'primary_category'},
                    {data: 'secondry_category', orderable:false, name: 'secondry_category'},
                    {data: 'do_follow', orderable:false, name: 'do_follow'},
                    {data: 'spam_score', orderable:false, name: 'spam_score'},
                    {data: 'published_at', orderable:true, name: 'published_at'},
                    {data: 'created_at', orderable:false, name: 'created_at', searchable: false},
                    {data: 'status', orderable:false, name: 'status'},
                    {data: 'action', orderable:false, name: 'action', className: "text-center"},
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
