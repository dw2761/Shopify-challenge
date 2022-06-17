$(document).ready(function(){
	// Activate tooltip
	$('[data-toggle="tooltip"]').tooltip();

	// Select/Deselect checkboxes
	var checkbox = $('table tbody input[type="checkbox"]');
	$("#selectAll").click(function(){
		if(this.checked){
			checkbox.each(function(){
				this.checked = true;
			});
		} else{
			checkbox.each(function(){
				this.checked = false;
			});
		}
	});
	checkbox.click(function(){
		if(!this.checked){
			$("#selectAll").prop("checked", false);
		}
	});

  $('#itemTable').on('click', '.edit', function () {
      var item_id = $(this).data('id');
      var item_name = $(this).data('item_name');
      var item_category = $(this).data('item_category');
      var item_quantity = $(this).data('item_quantity');
      var item_description = $(this).data('item_description');
      var item_status = $(this).data('item_status');
      $('#EditModal').modal('show');
      $('.item_name').val(item_name);
      $('.item_category').val(item_category);
      $('.item_quantity').val(item_quantity);
      $('.item_description').val(item_description);
      $('.item_status').val(item_status);
      $('.item_id').val(item_id);
  });
  //showing modal for delete record
  $('#itemTable').on('click', '.delete', function () {
      var item_delete_id = $(this).data('id');

      $('.item_delete_id').val(item_delete_id);

      $('#DeleteModal').modal('show');
      var deletedIdx = $(this).parents("tr").children(".index").text();

      $(".index").each(function(){
         var currentIdx = $(this).text();
         if(currentIdx > deletedIdx){
           currentIdx = currentIdx-1;
           $(this).text(currentIdx);
         }
       });
       $(this).parents("tr").remove();

  });

	$('#itemTable').on('click', '.delete-many', function () {
		  var items_id = [];
		  if($('input:checkbox:checked').length>0){
				$('input:checkbox:checked').each(function(){
        items_id.push($(this).attr('id'));
      });
			}

      $('.items_id').val(items_id);
			console.log(items_id);
      $('#DeleteManyItemsModal').modal('show');



  });

});

function onlyNumberKey(evt) {

       // Only ASCII character in that range allowed
       var ASCIICode = (evt.which) ? evt.which : evt.keyCode
       if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
           return false;
       return true;
  }
